import { useEquipes } from "@/hooks/useEquipes";

// Limite de minutos sem pausa do regime de exemplo do guia (maxSemPausaCritico)
const LIMITE_PAUSA = 50;

export function useRelatorio() {
  const { equipes, status } = useEquipes();

  // Uma linha por EQUIPE. Nunca por pessoa.
  const linhas = equipes.map((e) => {
    // Pausa em atraso: a equipe passou do limite do regime sem parar
    let emAtraso = 0;
    if (e.minutosSemPausa >= LIMITE_PAUSA) {
      emAtraso = 1;
    }

    return {
      id: e.id,
      codigo: e.id.replace("EquipeCampo:", ""),
      estado: e.estado,
      minutosSemPausa: e.minutosSemPausa,
      pausasRealizadas: e.pausasHoje,
      pausasRecomendadas: e.pausasHoje + emAtraso,
    };
  });

  // Quantas equipes em cada estado
  const contagem = { NORMAL: 0, ATENCAO: 0, CRITICO: 0, PERIGO: 0, FALHA_SENSOR: 0 };
  let totalRealizadas = 0;
  let totalRecomendadas = 0;

  linhas.forEach((l) => {
    contagem[l.estado] = contagem[l.estado] + 1;
    totalRealizadas = totalRealizadas + l.pausasRealizadas;
    totalRecomendadas = totalRecomendadas + l.pausasRecomendadas;
  });

  return { linhas, contagem, totalRealizadas, totalRecomendadas, status };
}