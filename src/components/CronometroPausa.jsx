export default function CronometroPausa({ minutosSemPausa, limite }) {
  const passou = minutosSemPausa >= limite;
  const corBarra = passou ? "bg-red-600" : "bg-green-700";

  // A barra não pode passar de 100%
  let porcentagem = (minutosSemPausa / limite) * 100;
  if (porcentagem > 100) {
    porcentagem = 100;
  }

  return (
    <div>
      <div className="flex justify-between text-base">
        <span>Sem pausa há</span>
        <span className="font-semibold">{minutosSemPausa} min</span>
      </div>

      <div className="mt-1 h-3 w-full rounded-full bg-slate-200">
        <div
          className={"h-3 rounded-full " + corBarra}
          style={{ width: porcentagem + "%" }}
        ></div>
      </div>

      <p className="mt-1 text-base">Referência do regime: {limite} min</p>
    </div>
  );
}