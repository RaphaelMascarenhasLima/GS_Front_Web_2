// Todas as chamadas HTTP dos pontos de apoio ficam aqui.
// Os componentes e os hooks nunca usam fetch direto.

const BASE = import.meta.env.VITE_MOCKAPI_URL + "/pontos";

// Faz a chamada e já trata o erro, para não repetir em cada função
async function pedir(url, opcoes) {
  const resposta = await fetch(url, opcoes);

  if (!resposta.ok) {
    throw new Error("Erro " + resposta.status);
  }

  return resposta.json();
}

// Read: lista todos os pontos
export function listarPontos() {
  return pedir(BASE);
}

// Create: cadastra um ponto novo
export function criarPonto(ponto) {
  return pedir(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ponto),
  });
}

// Update: troca os dados de um ponto que já existe
export function editarPonto(id, ponto) {
  return pedir(BASE + "/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ponto),
  });
}

// Delete: apaga um ponto
export function excluirPonto(id) {
  return pedir(BASE + "/" + id, { method: "DELETE" });
}