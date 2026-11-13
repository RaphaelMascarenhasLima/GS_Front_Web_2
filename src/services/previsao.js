// Busca a previsão hora a hora (hoje e amanhã) na Open-Meteo.
export async function previsaoHoraria(lat, lon) {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=" + lat +
    "&longitude=" + lon +
    "&hourly=temperature_2m,relative_humidity_2m" +
    "&timezone=America%2FSao_Paulo&forecast_days=2";

  const resposta = await fetch(url);
  if (!resposta.ok) {
    throw new Error("Previsão indisponível");
  }
  return resposta.json();
}