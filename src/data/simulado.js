import { indiceCalor, nivelPorIndice } from "@/lib/calor";

// Monta uma equipe no formato do contrato EquipeCampo.
// indiceCalor_c e estado são calculados, para nunca ficarem incoerentes.
function equipe(base) {
  const semLeitura = base.temperatura_c === null;
  const indice = semLeitura ? null : indiceCalor(base.temperatura_c, base.umidade_pct);

  return {
    ...base,
    id: `EquipeCampo:${base.codigo}`,
    indiceCalor_c: indice,
    estado: nivelPorIndice(indice),
    // "atualizado há X min": a data é gerada a partir de agora
    timestamp: new Date(Date.now() - base.atrasoMin * 60000).toISOString(),
  };
}

export const equipesSimuladas = [
  equipe({
    codigo: "COL-CAM-03", temperatura_c: 24.0, umidade_pct: 55, globo_c: 28.0,
    solDireto: false, ibutgEstimado_c: 22.0, minutosSemPausa: 15,
    pausasHoje: 1, galao_pct: 80, aguaTemp_c: 22.0, atrasoMin: 1,
  }),
  equipe({
    codigo: "COL-CAM-05", temperatura_c: 28.0, umidade_pct: 55, globo_c: 36.0,
    solDireto: true, ibutgEstimado_c: 26.0, minutosSemPausa: 35,
    pausasHoje: 2, galao_pct: 55, aguaTemp_c: 27.0, atrasoMin: 2,
  }),
  equipe({
    codigo: "COL-CAM-07", temperatura_c: 34.2, umidade_pct: 46, globo_c: 47.5,
    solDireto: true, ibutgEstimado_c: 30.5, minutosSemPausa: 52,
    pausasHoje: 3, galao_pct: 35, aguaTemp_c: 31.0, atrasoMin: 1,
  }),
  equipe({
    codigo: "COL-CAM-09", temperatura_c: 36.0, umidade_pct: 50, globo_c: 52.0,
    solDireto: true, ibutgEstimado_c: 32.5, minutosSemPausa: 78,
    pausasHoje: 2, galao_pct: 15, aguaTemp_c: 34.0, atrasoMin: 3,
  }),
  equipe({
    codigo: "COL-CAM-11", temperatura_c: null, umidade_pct: null, globo_c: null,
    solDireto: false, ibutgEstimado_c: null, minutosSemPausa: 0,
    pausasHoje: 0, galao_pct: 60, aguaTemp_c: null, atrasoMin: 18,
  }),
];