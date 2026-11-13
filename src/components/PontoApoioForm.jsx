import { useState } from "react";
import { buscarCep } from "@/services/cep";

const TIPOS = ["parceiro", "comunidade", "sombra", "agua", "banheiro", "garagem"];

// Formulário em branco
const VAZIO = {
  nome: "",
  tipo: "",
  cep: "",
  logradouro: "",
  bairro: "",
  temSombra: false,
  temAgua: false,
  temBanheiro: false,
};

// Classe repetida nos campos, para não escrever tudo de novo
const CAMPO = "mt-1 w-full rounded border border-slate-400 bg-white p-3 text-base";

// inicial: dados para preencher (vai servir na edição). onSalvar: função que recebe o ponto.
export default function PontoApoioForm({ inicial, onSalvar, onCancelar }) {
  const [dados, setDados] = useState(inicial || VAZIO);
  const [erro, setErro] = useState("");
  const [buscando, setBuscando] = useState(false);
  const [salvando, setSalvando] = useState(false);

  // Troca um campo só. O ...dados copia os outros campos sem mexer neles.
  function mudar(campo, valor) {
    setDados({ ...dados, [campo]: valor });
  }

  // Pede o endereço ao ViaCEP e preenche rua e bairro
  async function buscarEndereco() {
    setErro("");
    setBuscando(true);

    try {
      const resultado = await buscarCep(dados.cep);
      setDados({ ...dados, logradouro: resultado.logradouro, bairro: resultado.bairro });
    } catch (e) {
      setErro(e.message);
    } finally {
      setBuscando(false);
    }
  }

  // Devolve a mensagem do problema, ou "" se está tudo certo
  function validar() {
    if (dados.nome.trim().length < 3) return "Informe o nome do ponto (mínimo 3 letras).";
    if (dados.tipo === "") return "Escolha o tipo do ponto.";
    if (dados.cep.replace(/\D/g, "").length !== 8) return "O CEP precisa ter 8 números.";
    if (dados.logradouro.trim() === "") return "Informe a rua (use o botão Buscar endereço).";
    if (dados.bairro.trim() === "") return "Informe o bairro.";
    return "";
  }

  async function salvar(evento) {
    evento.preventDefault(); // não deixa a página recarregar

    const problema = validar();
    if (problema !== "") {
      setErro(problema);
      return;
    }

    setErro("");
    setSalvando(true);

    try {
      await onSalvar(dados);
      if (!inicial) {
        setDados(VAZIO); // cadastro novo: limpa o formulário
      }
    } catch (e) {
      setErro("Não foi possível salvar. Tente de novo.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form onSubmit={salvar} className="rounded-lg border border-slate-300 bg-white p-4">
      <h3 className="text-xl font-bold text-green-900">
        {inicial ? "Editar ponto de apoio" : "Novo ponto de apoio"}
      </h3>

      <label className="mt-4 block text-base font-semibold text-slate-900">
        Nome
        <input
          type="text"
          value={dados.nome}
          onChange={(e) => mudar("nome", e.target.value)}
          className={CAMPO}
        />
      </label>

      <label className="mt-4 block text-base font-semibold text-slate-900">
        Tipo
        <select
          value={dados.tipo}
          onChange={(e) => mudar("tipo", e.target.value)}
          className={CAMPO}
        >
          <option value="">Escolha...</option>
          {TIPOS.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-4 block text-base font-semibold text-slate-900">
        CEP
        <input
          type="text"
          inputMode="numeric"
          placeholder="00000-000"
          value={dados.cep}
          onChange={(e) => mudar("cep", e.target.value)}
          className={CAMPO}
        />
      </label>

      <button
        type="button"
        onClick={buscarEndereco}
        disabled={buscando}
        className="mt-2 rounded border border-green-800 px-4 py-3 text-base font-bold text-green-900 hover:bg-green-100 disabled:opacity-50"
      >
        {buscando ? "Buscando..." : "Buscar endereço"}
      </button>

      <label className="mt-4 block text-base font-semibold text-slate-900">
        Rua
        <input
          type="text"
          value={dados.logradouro}
          onChange={(e) => mudar("logradouro", e.target.value)}
          className={CAMPO}
        />
      </label>

      <label className="mt-4 block text-base font-semibold text-slate-900">
        Bairro
        <input
          type="text"
          value={dados.bairro}
          onChange={(e) => mudar("bairro", e.target.value)}
          className={CAMPO}
        />
      </label>

      <div className="mt-4 flex flex-col gap-2 text-base text-slate-900">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={dados.temSombra}
            onChange={(e) => mudar("temSombra", e.target.checked)}
            className="h-5 w-5"
          />
          Tem sombra
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={dados.temAgua}
            onChange={(e) => mudar("temAgua", e.target.checked)}
            className="h-5 w-5"
          />
          Tem água
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={dados.temBanheiro}
            onChange={(e) => mudar("temBanheiro", e.target.checked)}
            className="h-5 w-5"
          />
          Tem banheiro
        </label>
      </div>

      {erro !== "" && (
        <p role="alert" className="mt-4 text-base font-semibold text-red-800">
          {erro}
        </p>
      )}

      <div className="mt-4 flex gap-3">
        <button
          type="submit"
          disabled={salvando}
          className="rounded bg-green-800 px-4 py-3 text-base font-bold text-white hover:bg-green-700 disabled:opacity-50"
        >
          {salvando ? "Salvando..." : "Salvar"}
        </button>

        {onCancelar && (
          <button
            type="button"
            onClick={onCancelar}
            className="rounded border border-slate-400 px-4 py-3 text-base text-slate-900 hover:bg-slate-100"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}