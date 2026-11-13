import EstadoBadge from "./EstadoBadge";
import MedidorGalao from "./MedidorGalao";
import CronometroPausa from "./CronometroPausa";


const MENSAGEM = {
  NORMAL: "Trabalho normal.",
  ATENCAO: "Água e sombra.",
  CRITICO: "Calor crítico. Pausa na sombra na próxima parada da rota.",
  PERIGO: "Perigo. Suspender trabalho pesado até o calor baixar.",
  FALHA_SENSOR: "Conferir o sensor.",
};


const LIMITE_SEM_SINAL = 10;


function minutosDesde(timestamp) {
  const agora = new Date().getTime();
  const leitura = new Date(timestamp).getTime();
  return Math.round((agora - leitura) / 60000);
}

export default function EquipeCard({ equipe }) {
 
  const codigo = equipe.id.replace("EquipeCampo:", "");
  const minutos = minutosDesde(equipe.timestamp);

  let textoAtualizacao = "Atualizado há " + minutos + " min";
  if (minutos < 1) {
    textoAtualizacao = "Atualizado agora";
  }
  if (minutos > LIMITE_SEM_SINAL) {
    textoAtualizacao =
      "Sem atualização há " +
      minutos +
      " min. O caminhão pode estar sem rede; os dados chegam na garagem.";
  }

  return (
    <article className="rounded-lg border border-slate-300 bg-white p-4 shadow-sm">
      {/* o estado é a primeira coisa lida */}
      <div className="flex items-center justify-between">
        <EstadoBadge estado={equipe.estado} />
        <span className="text-base font-semibold text-slate-700">{codigo}</span>
      </div>

      <p className="mt-3 text-3xl font-bold text-slate-900">
        {equipe.indiceCalor_c !== null ? equipe.indiceCalor_c + " °C" : "—"}
      </p>
      <p className="text-base text-slate-700">Índice de calor</p>

      <p className="mt-2 text-base font-semibold text-slate-900">
        {MENSAGEM[equipe.estado]}
      </p>

      <div className="mt-4 flex flex-col gap-4">
        <CronometroPausa minutosSemPausa={equipe.minutosSemPausa} limite={50} />
        <MedidorGalao percentual={equipe.galao_pct} tempAgua={equipe.aguaTemp_c} />
      </div>

      <p className="mt-4 text-base text-slate-700">{textoAtualizacao}</p>
    </article>
  );
}