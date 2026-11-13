import { useState, useEffect } from "react";
import { listarPontos, criarPonto, editarPonto, excluirPonto } from "@/services/pontos";

export function usePontosApoio() {
  const [pontos, setPontos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  async function carregar() {
    setCarregando(true);
    setErro(null);

    try {
      const dados = await listarPontos();
      setPontos(dados);
    } catch (e) {
      setErro("Não foi possível carregar os pontos de apoio.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function criar(ponto) {
    const novo = await criarPonto(ponto);
    setPontos([...pontos, novo]);
  }

  // Edita no MockAPI e troca o ponto antigo pelo atualizado na lista.
  // map percorre a lista: se o id é o editado, usa o novo; senão, deixa como está.
  async function editar(id, ponto) {
    const atualizado = await editarPonto(id, ponto);
    setPontos(pontos.map((p) => (p.id === id ? atualizado : p)));
  }

  async function excluir(id) {
    await excluirPonto(id);
    setPontos(pontos.filter((ponto) => ponto.id !== id));
  }

  return { pontos, carregando, erro, recarregar: carregar, criar, editar, excluir };
}