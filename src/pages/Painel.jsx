import EquipeCard from "../components/EquipeCard";
import { equipesSimuladas } from "@/data/simulado";

export default function Painel() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-green-900">Equipes em campo</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {equipesSimuladas.map((equipe) => (
          <EquipeCard key={equipe.id} equipe={equipe} />
        ))}
      </div>
    </div>
  );
}