import { useState, useEffect } from "react";
import { previsaoHoraria } from "@/services/previsao";
import { indiceCalor, nivelPorIndice } from "@/lib/calor";
import { ROTA } from "@/data/rota";

// Data de amanhã no formato "2026-11-14"
function dataDeAmanha() {
  const amanha = new Date();
  amanha.setDate(amanha.getDate() + 1);
  const ano = amanha.getFullYear();
  const mes = String(amanha.getMonth() + 1).padStart(2, "0");
  const dia = String(amanha.getDate()).padStart(2, "0");
  return ano + "-" + mes + "-" + dia;
}

// Transforma a resposta da API numa lista de horas de amanhã (6h às 18h),

function montarHoras(dados) {
  const amanha = dataDeAmanha();
  const horas = [];

  for (let i = 0; i < dados.hourly.time.length; i++) {
    const quando = dados.hourly.time[i]; // exemplo: "2026-11-14T12:00"
    const hora = Number(quando.slice(11, 13));

    if (quando.slice(0, 10) === amanha && hora >= 6 && hora <= 18) {
      const temp = dados.hourly.temperature_2m[i];
      const umidade = dados.hourly.relative_humidity_2m[i];
      const indice = indiceCalor(temp, umidade);

      horas.push({ hora, temp, umidade, indice, estado: nivelPorIndice(indice) });
    }
  }
  return horas;
}

export function usePrevisao() {
  const [horas, setHoras] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  async function carregar() {
    setCarregando(true);
    setErro(null);

    try {
      const dados = await previsaoHoraria(ROTA.lat, ROTA.lon);
      setHoras(montarHoras(dados));
    } catch (e) {
      setErro("Não foi possível carregar a previsão do tempo.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  // Faixa de horas em CRITICO ou PERIGO (null se não tiver nenhuma)
  const criticas = horas.filter((h) => h.estado === "CRITICO" || h.estado === "PERIGO");
  let faixaCritica = null;
  if (criticas.length > 0) {
    faixaCritica = {
      inicio: criticas[0].hora,
      fim: criticas[criticas.length - 1].hora + 1,
    };
  }

  return { horas, faixaCritica, carregando, erro, recarregar: carregar };
}