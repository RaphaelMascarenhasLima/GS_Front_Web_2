// Aparece quando algo deu errado. O botão só existe se vier a função onTentarDeNovo.
export default function Erro({ mensagem, onTentarDeNovo }) {
  return (
    <div role="alert" className="rounded-lg border border-slate-400 bg-white p-6 text-center">
      <p className="text-base font-semibold text-slate-900">{mensagem}</p>

      {onTentarDeNovo && (
        <button
          onClick={onTentarDeNovo}
          className="mt-4 rounded bg-green-800 px-4 py-3 text-base font-bold text-white hover:bg-green-700"
        >
          Tentar de novo
        </button>
      )}
    </div>
  );
}