// Mostra um ponto de apoio. Recebe o ponto e as funções de editar e excluir por props.
export default function PontoApoioItem({ ponto, onEditar, onExcluir }) {
  return (
    <article className="rounded-lg border border-slate-300 bg-white p-4 shadow-sm">
      <p className="text-base font-semibold uppercase text-green-800">{ponto.tipo}</p>
      <h3 className="text-xl font-bold text-slate-900">{ponto.nome}</h3>

      <p className="mt-1 text-base text-slate-700">
        {ponto.logradouro}, {ponto.bairro}
      </p>
      <p className="text-base text-slate-700">CEP {ponto.cep}</p>

      <ul className="mt-2 text-base text-slate-900">
        {ponto.temSombra && <li>Tem sombra</li>}
        {ponto.temAgua && <li>Tem água</li>}
        {ponto.temBanheiro && <li>Tem banheiro</li>}
      </ul>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => onEditar(ponto)}
          className="rounded border border-green-800 px-4 py-3 text-base font-semibold text-green-900 hover:bg-green-100"
        >
          Editar
        </button>
        <button
          onClick={() => onExcluir(ponto)}
          className="rounded border border-red-700 px-4 py-3 text-base font-semibold text-red-800 hover:bg-red-50"
        >
          Excluir
        </button>
      </div>
    </article>
  );
}