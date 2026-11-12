// Aparece quando a lista existe, mas não tem nada dentro
export default function EstadoVazio({ mensagem }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-400 bg-white p-6 text-center">
      <p className="text-base text-slate-800">{mensagem}</p>
    </div>
  );
}