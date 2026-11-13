// Busca o endereço de um CEP no ViaCEP.
export async function buscarCep(cep) {
  // tira tudo que não é número (traço, espaço)
  const limpo = cep.replace(/\D/g, "");

  if (limpo.length !== 8) {
    throw new Error("O CEP precisa ter 8 números.");
  }

  const resposta = await fetch("https://viacep.com.br/ws/" + limpo + "/json/");
  if (!resposta.ok) {
    throw new Error("Não foi possível consultar o CEP agora.");
  }

  const dados = await resposta.json();

  // o ViaCEP responde 200 mesmo quando o CEP não existe, mas manda erro: true
  if (dados.erro) {
    throw new Error("CEP não encontrado.");
  }

  return dados;
}