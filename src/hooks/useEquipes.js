import { useState, useEffect } from "react";
import { equipesSimuladas } from "@/data/simulado";

// Quanto maior o número, mais perigoso. Usado para ordenar.
const PESO = { PERIGO: 4, CRITICO: 3, ATENCAO: 2, FALHA_SENSOR: 1, NORMAL: 0 };

// Devolve uma cópia da lista, com os mais perigosos primeiro
function ordenarPorRisco(lista) {
  const copia = [...lista];
  copia.sort((a, b) => PESO[b.estado] - PESO[a.estado]);
  return copia;
}

export function useEquipes(intervaloMs = 30000) {
  const [equipes, setEquipes] = useState([]);
  // status: "carregando", "ao-vivo" ou "simulado"
  const [status, setStatus] = useState("carregando");

  useEffect(() => {
    // ativo evita mexer no estado depois que o componente saiu da tela
    let ativo = true;

    async function carregar() {
      try {
        const resposta = await fetch("/api/orion");
        if (!resposta.ok) {
          throw new Error("Orion fora do ar");
        }
        const dados = await resposta.json();
        if (ativo) {
          setEquipes(ordenarPorRisco(dados));
          setStatus("ao-vivo");
        }
      } catch (erro) {
        // plano B: se der qualquer erro, usa os dados simulados
        if (ativo) {
          setEquipes(ordenarPorRisco(equipesSimuladas));
          setStatus("simulado");
        }
      }
    }

    carregar(); // busca já na primeira vez
    const id = setInterval(carregar, intervaloMs); // e repete a cada 30 s

    // limpeza: quando sair da tela, para o relógio
    return () => {
      ativo = false;
      clearInterval(id);
    };
  }, [intervaloMs]);

  return { equipes, status };
}