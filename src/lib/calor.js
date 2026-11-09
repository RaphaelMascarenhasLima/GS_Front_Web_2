// Calcula o índice de calor (sensação térmica com a umidade).
// Fórmula da NOAA. Recebe a temperatura em °C e a umidade em %.
export function indiceCalor(tempC, umidade) {
  // A fórmula foi feita para Fahrenheit, então converte primeiro
  const tempF = tempC * 1.8 + 32;

  // Fórmula simples, usada quando está mais fresco
  let indiceF = 0.5 * (tempF + 61 + (tempF - 68) * 1.2 + umidade * 0.094);

  // Quando está bem quente, usa a fórmula completa
  if ((indiceF + tempF) / 2 >= 80) {
    indiceF =
      -42.379 +
      2.04901523 * tempF +
      10.14333127 * umidade -
      0.22475541 * tempF * umidade -
      0.00683783 * tempF * tempF -
      0.05481717 * umidade * umidade +
      0.00122874 * tempF * tempF * umidade +
      0.00085282 * tempF * umidade * umidade -
      0.00000199 * tempF * tempF * umidade * umidade;
  }

  // Volta para Celsius e arredonda com 1 casa decimal
  const indiceC = (indiceF - 32) / 1.8;
  return Math.round(indiceC * 10) / 10;
}

// Diz em qual estado a equipe está, de acordo com o índice
export function nivelPorIndice(indice) {
  // Sem leitura do sensor
  if (indice === null) {
    return "FALHA_SENSOR";
  }

  if (indice < 27) {
    return "NORMAL";
  } else if (indice < 32) {
    return "ATENCAO";
  } else if (indice < 41) {
    return "CRITICO";
  } else {
    return "PERIGO";
  }
}