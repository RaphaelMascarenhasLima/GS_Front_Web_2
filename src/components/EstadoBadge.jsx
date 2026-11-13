// Classes do Tailwind
const ESTILO = {
  NORMAL: "bg-green-100 text-green-900 ring-green-600",
  ATENCAO: "bg-yellow-100 text-yellow-900 ring-yellow-600",
  CRITICO: "bg-red-100 text-red-900 ring-red-600",
  PERIGO: "bg-red-700 text-white ring-red-900 animate-pulse",
  FALHA_SENSOR: "bg-blue-100 text-blue-900 ring-blue-600",
};

// Texto que aparece escrito em cada estado
const TEXTO = {
  NORMAL: "Normal",
  ATENCAO: "Atenção",
  CRITICO: "Crítico",
  PERIGO: "Perigo",
  FALHA_SENSOR: "Sensor com falha",
};

export default function EstadoBadge({ estado }) {
  // Se vier um estado que não existe, mostra como falha de sensor
  const estilo = ESTILO[estado] || ESTILO.FALHA_SENSOR;
  const texto = TEXTO[estado] || estado;

  return (
    <span
      className={
        "inline-flex items-center rounded-full px-3 py-1 text-base font-semibold ring-1 " +
        estilo
      }
    >
      {texto}
    </span>
  );
}