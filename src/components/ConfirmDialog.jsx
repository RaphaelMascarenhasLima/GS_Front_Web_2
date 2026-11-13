// Janela de confirmação. Só desenha: quem decide o que fazer é quem usa.
export default function ConfirmDialog({ mensagem, onConfirmar, onCancelar }) {
  return (
    // fundo escuro cobrindo a tela toda
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-sm rounded-lg bg-white p-6"
      >
        <p className="text-base font-semibold text-slate-900">{mensagem}</p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onConfirmar}
            className="rounded bg-red-700 px-4 py-3 text-base font-bold text-white hover:bg-red-800"
          >
            Excluir
          </button>
          <button
            onClick={onCancelar}
            className="rounded border border-slate-400 px-4 py-3 text-base text-slate-900 hover:bg-slate-100"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}