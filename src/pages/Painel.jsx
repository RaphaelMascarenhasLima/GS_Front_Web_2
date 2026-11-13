import EquipeCard from "../components/EquipeCard";
import Carregando from "../components/Carregando";
import EstadoVazio from "../components/EstadoVazio";
import { useEquipes } from "@/hooks/useEquipes";

export default function Painel() {
  const { equipes, status } = useEquipes();

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-green-900">Equipes em campo</h2>

      {status === "carregando" && <Carregando mensagem="Carregando equipes..." />}

      {status === "simulado" && (
        <p className="mb-4 rounded border border-slate-400 bg-white p-3 text-base text-slate-800">
          Mostrando dados simulados: o servidor IoT está desligado.
        </p>
      )}

      {status !== "carregando" && equipes.length === 0 && (
        <EstadoVazio mensagem="Nenhuma equipe em campo agora." />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {equipes.map((equipe) => (
          <EquipeCard key={equipe.id} equipe={equipe} />
        ))}
      </div>
    </div>
  );
}