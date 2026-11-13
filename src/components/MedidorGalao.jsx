// Barra do galão de água. Recebe o percentual e a temperatura da água.
export default function MedidorGalao({ percentual, tempAgua }) {
  // Abaixo de 20% o texto do guia manda reabastecer
  const baixo = percentual < 20;
  const corBarra = baixo ? "bg-red-600" : "bg-green-700";

  return (
    <div>
      <div className="flex justify-between text-base">
        <span>Galão de água</span>
        <span className="font-semibold">{percentual}%</span>
      </div>

      <div className="mt-1 h-3 w-full rounded-full bg-slate-200">
        <div
          className={"h-3 rounded-full " + corBarra}
          style={{ width: percentual + "%" }}
        ></div>
      </div>

      {/* sem sensor a temperatura vem null, então só mostra se existir */}
      {tempAgua !== null && <p className="mt-1 text-base">Água a {tempAgua} °C</p>}

      {baixo && (
        <p className="mt-1 text-base font-semibold text-red-800">
          Água acabando. Reabastecer antes da próxima parada.
        </p>
      )}
    </div>
  );
}