import { usePrevisao } from "@/hooks/usePrevisao";
import { ROTA } from "@/data/rota";
import EstadoBadge from "../components/EstadoBadge";
import Carregando from "../components/Carregando";
import EstadoVazio from "../components/EstadoVazio";
import Erro from "../components/Erro";

export default function Previsao() {
  const { horas, faixaCritica, carregando, erro, recarregar } = usePrevisao();

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-900">Previsão e escala de amanhã</h2>
      <p className="mb-4 text-base text-slate-700">Região: {ROTA.nome}</p>

      {carregando && <Carregando mensagem="Carregando previsão..." />}

      {erro && <Erro mensagem={erro} onTentarDeNovo={recarregar} />}

      {!carregando && !erro && horas.length === 0 && (
        <EstadoVazio mensagem="Sem previsão disponível para amanhã." />
      )}

      {!carregando && !erro && horas.length > 0 && (
        <div>
          <div className="mb-4 rounded-lg border border-slate-300 bg-white p-4">
            {faixaCritica ? (
              <p className="text-base font-semibold text-slate-900">
                Calor crítico previsto das {faixaCritica.inicio}h às {faixaCritica.fim}h.
                Sugestão: começar a rota antes das {faixaCritica.inicio}h.
              </p>
            ) : (
              <p className="text-base font-semibold text-slate-900">
                Nenhuma hora em estado crítico prevista para amanhã.
              </p>
            )}
          </div>

          <ul className="flex flex-col gap-2">
            {horas.map((h) => (
              <li
                key={h.hora}
                className="flex items-center justify-between gap-3 rounded border border-slate-300 bg-white p-3"
              >
                <div>
                  <p className="text-base font-bold text-slate-900">{h.hora}h</p>
                  <p className="text-base text-slate-700">
                    {h.temp} °C, umidade {h.umidade}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-slate-900">{h.indice} °C</p>
                  <EstadoBadge estado={h.estado} />
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-base text-slate-700">
            Índice de calor calculado com a temperatura e a umidade previstas, à sombra.
            Ao sol direto a sensação é maior. Fonte: Open-Meteo.
          </p>
        </div>
      )}
    </div>
  );
}