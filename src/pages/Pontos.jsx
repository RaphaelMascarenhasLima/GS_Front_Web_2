import { useState } from "react";
import { usePontosApoio } from "@/hooks/usePontosApoio";
import PontoApoioItem from "../components/PontoApoioItem";
import PontoApoioForm from "../components/PontoApoioForm";
import ConfirmDialog from "../components/ConfirmDialog";
import Carregando from "../components/Carregando";
import EstadoVazio from "../components/EstadoVazio";
import Erro from "../components/Erro";

export default function Pontos() {
  const { pontos, carregando, erro, recarregar, criar, editar, excluir } = usePontosApoio();

  // true quando o formulário de cadastro está aparecendo
  const [mostrarForm, setMostrarForm] = useState(false);

  // guarda o ponto que está sendo editado (null = nenhum)
  const [pontoEditando, setPontoEditando] = useState(null);

  // guarda o ponto que o usuário clicou para excluir (null = nenhum)
  const [pontoParaExcluir, setPontoParaExcluir] = useState(null);
  const [erroExcluir, setErroExcluir] = useState("");

  // Os dois formulários nunca aparecem juntos
  function abrirNovo() {
    setPontoEditando(null);
    setMostrarForm(true);
  }

  function abrirEdicao(ponto) {
    setMostrarForm(false);
    setPontoEditando(ponto);
    window.scrollTo(0, 0); // sobe a tela para o formulário aparecer
  }

  async function salvarNovo(ponto) {
    await criar(ponto);
    setMostrarForm(false);
  }

  async function salvarEdicao(ponto) {
    await editar(pontoEditando.id, ponto);
    setPontoEditando(null);
  }

  async function confirmarExclusao() {
    try {
      await excluir(pontoParaExcluir.id);
      setErroExcluir("");
    } catch (e) {
      setErroExcluir("Não foi possível excluir o ponto. Tente de novo.");
    } finally {
      setPontoParaExcluir(null); // fecha a janela
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-green-900">Pontos de apoio</h2>

        {!mostrarForm && !pontoEditando && (
          <button
            onClick={abrirNovo}
            className="rounded bg-green-800 px-4 py-3 text-base font-bold text-white hover:bg-green-700"
          >
            Novo ponto
          </button>
        )}
      </div>

      {mostrarForm && (
        <div className="mb-6">
          <PontoApoioForm onSalvar={salvarNovo} onCancelar={() => setMostrarForm(false)} />
        </div>
      )}

      {pontoEditando && (
        <div className="mb-6">
          {/* o key faz o formulário recomeçar do zero se você editar outro ponto */}
          <PontoApoioForm
            key={pontoEditando.id}
            inicial={pontoEditando}
            onSalvar={salvarEdicao}
            onCancelar={() => setPontoEditando(null)}
          />
        </div>
      )}

      {erroExcluir !== "" && (
        <p role="alert" className="mb-4 text-base font-semibold text-red-800">
          {erroExcluir}
        </p>
      )}

      {carregando && <Carregando mensagem="Carregando pontos de apoio..." />}

      {erro && <Erro mensagem={erro} onTentarDeNovo={recarregar} />}

      {!carregando && !erro && pontos.length === 0 && (
        <EstadoVazio mensagem="Nenhum ponto cadastrado nesta rota." />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pontos.map((ponto) => (
          <PontoApoioItem
            key={ponto.id}
            ponto={ponto}
            onEditar={abrirEdicao}
            onExcluir={setPontoParaExcluir}
          />
        ))}
      </div>

      {pontoParaExcluir && (
        <ConfirmDialog
          mensagem={
            "Excluir '" +
            pontoParaExcluir.nome +
            "' dos pontos de apoio? Essa ação não pode ser desfeita."
          }
          onConfirmar={confirmarExclusao}
          onCancelar={() => setPontoParaExcluir(null)}
        />
      )}
    </div>
  );
}