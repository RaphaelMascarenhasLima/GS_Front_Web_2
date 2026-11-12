// Aparece enquanto os dados ainda estão chegando
export default function Carregando({ mensagem }) {
  return (
    <div role="status" className="rounded-lg border border-slate-300 bg-white p-6 text-center">
      <p className="text-base text-slate-800">{mensagem}</p>
    </div>
  );
}