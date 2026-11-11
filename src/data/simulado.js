import { indiceCalor, nivelPorIndice } from "@/lib/calor";

// Se o grupo escolher outra rota, é só trocar aqui (ex.: "COL-PARA")
const PREFIXO = "COL-CAM";

// Recebe os dados "crus" de uma equipe e devolve no formato do contrato.
// O índice de calor e o estado são calculados, para nunca ficarem errados.
function criarEquipe(dados) {
  let indice = null;

  // Só calcula se o sensor mandou temperatura
  if (dados.temperatura_c !== null) {
    indice = indiceCalor(dados.temperatura_c, dados.umidade_pct);
  }

  // Monta o horário da leitura: agora menos os minutos de atraso
  const agora = new Date().getTime();
  const horario = new Date(agora - dados.minutosAtras * 60 * 1000);

  return {
    id: "EquipeCampo:" + PREFIXO + "-" + dados.numero,
    temperatura_c: dados.temperatura_c,
    umidade_pct: dados.umidade_pct,
    globo_c: dados.globo_c,
    solDireto: dados.solDireto,
    indiceCalor_c: indice,
    ibutgEstimado_c: dados.ibutgEstimado_c,
    estado: nivelPorIndice(indice),
    minutosSemPausa: dados.minutosSemPausa,
    pausasHoje: dados.pausasHoje,
    galao_pct: dados.galao_pct,
    aguaTemp_c: dados.aguaTemp_c,
    timestamp: horario.toISOString(),
  };
}

export const equipesSimuladas = [
  criarEquipe({
    numero: "03", temperatura_c: 24.0, umidade_pct: 55, globo_c: 28.0,
    solDireto: false, ibutgEstimado_c: 22.0, minutosSemPausa: 15,
    pausasHoje: 1, galao_pct: 80, aguaTemp_c: 22.0, minutosAtras: 1,
  }),
  criarEquipe({
    numero: "05", temperatura_c: 28.0, umidade_pct: 55, globo_c: 36.0,
    solDireto: true, ibutgEstimado_c: 26.0, minutosSemPausa: 35,
    pausasHoje: 2, galao_pct: 55, aguaTemp_c: 27.0, minutosAtras: 2,
  }),
  criarEquipe({
    numero: "07", temperatura_c: 34.2, umidade_pct: 46, globo_c: 47.5,
    solDireto: true, ibutgEstimado_c: 30.5, minutosSemPausa: 52,
    pausasHoje: 3, galao_pct: 35, aguaTemp_c: 31.0, minutosAtras: 1,
  }),
  criarEquipe({
    numero: "09", temperatura_c: 36.0, umidade_pct: 50, globo_c: 52.0,
    solDireto: true, ibutgEstimado_c: 32.5, minutosSemPausa: 78,
    pausasHoje: 2, galao_pct: 15, aguaTemp_c: 34.0, minutosAtras: 3,
  }),
  criarEquipe({
    numero: "11", temperatura_c: null, umidade_pct: null, globo_c: null,
    solDireto: false, ibutgEstimado_c: null, minutosSemPausa: 0,
    pausasHoje: 0, galao_pct: 60, aguaTemp_c: null, minutosAtras: 18,
  }),
];