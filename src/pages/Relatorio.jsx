import { useRelatorio } from "@/hooks/useRelatorio";
import EstadoBadge from "../components/EstadoBadge";
import Carregando from "../components/Carregando";
import EstadoVazio from "../components/EstadoVazio";

const ESTADOS = ["PERIGO", "CRITICO", "ATENCAO", "NORMAL", "FALHA_SENSOR"];

export default function Relatorio() {
  const { linhas, contagem, totalRealizadas, totalRecomendadas, status } = useRelatorio();

  return (
    <div>
      <h2 className="mb-1 text-2xl font-bold text-green-900">Relatório por equipe</h2>
      <p className="mb-4 text-base text-slate-700">
        Os números são por equipe. O sistema não identifica trabalhadores.
      </p>

      {status === "carregando" && <Carregando mensagem="Carregando relatório..." />}

      {status === "simulado" && (
        <p className="mb-4 rounded border border-slate-400 bg-white p-3 text-base text-slate-800">
          Mostrando dados simulados: o servidor IoT está desligado.
        </p>
      )}

      {status !== "carregando" && linhas.length === 0 && (
        <EstadoVazio mensagem="Sem dados de equipes para o relatório." />
      )}

      {linhas.length > 0 && (
        <div>
          <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-5">
            {ESTADOS.map((estado) => (
              <div key={estado} className="rounded-lg border border-slate-300 bg-white p-3">
                <EstadoBadge estado={estado} />
                <p className="mt-2 text-3xl font-bold text-slate-900">{contagem[estado]}</p>
                <p className="text-base text-slate-700">equipes</p>
              </div>
            ))}
          </div>

          <p className="mb-4 text-base font-semibold text-slate-900">
            Pausas: {totalRealizadas} realizadas de {totalRecomendadas} recomendadas.
          </p>

          <div className="overflow-x-auto rounded-lg border border-slate-300 bg-white">
            <table className="w-full text-left text-base">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="p-3">Equipe</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3">Sem pausa (min)</th>
                  <th className="p-3">Pausas realizadas</th>
                  <th className="p-3">Pausas recomendadas</th>
                </tr>
              </thead>
              <tbody>
                {linhas.map((l) => (
                  <tr key={l.id} className="border-t border-slate-300">
                    <td className="p-3 font-semibold">{l.codigo}</td>
                    <td className="p-3">
                      <EstadoBadge estado={l.estado} />
                    </td>
                    <td className="p-3">{l.minutosSemPausa}</td>
                    <td className="p-3">{l.pausasRealizadas}</td>
                    <td className="p-3">{l.pausasRecomendadas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-base text-slate-700">
            Pausa recomendada = pausas realizadas + 1 se a equipe passou do limite do regime
            ({50} min) sem parar.
          </p>
        </div>
      )}
    </div>
  );
}