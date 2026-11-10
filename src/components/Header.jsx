import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navegacao from "./Navegacao";

const ITENS = [
  { texto: "Painel", caminho: "/" },
  { texto: "Pontos de apoio", caminho: "/pontos" },
  { texto: "Equipes e regimes", caminho: "/equipes" },
  { texto: "Previsão", caminho: "/previsao" },
  { texto: "Relatório", caminho: "/relatorio" },
  { texto: "Sinais de alerta", caminho: "/alerta" },
];

export default function Header({ titulo }) {
  // aberto = true quando o painel lateral está aparecendo
  const [aberto, setAberto] = useState(false);

  // endereço atual, para destacar o item da página em que estamos
  const local = useLocation();

  return (
    <header className="bg-green-800 p-4 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{titulo}</h1>
          <p className="text-base">Calor, pausa e segurança na coleta</p>
        </div>

        {/* botão ☰: só aparece no celular */}
        <button
          onClick={() => setAberto(true)}
          aria-label="Abrir menu"
          className="rounded px-3 py-2 text-2xl md:hidden"
        >
          ☰
        </button>
      </div>

      {/* menu do computador: fica embaixo do título, sempre visível */}
      <div className="mt-3 hidden md:block">
        <Navegacao itens={ITENS} ativo={local.pathname} />
      </div>

      {/* fundo escurecido: só existe quando o painel está aberto */}
      {aberto && (
        <div
          onClick={() => setAberto(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        ></div>
      )}

      {/* painel lateral: fica fora da tela (-translate-x-full) até abrir */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-3/4 max-w-xs bg-green-800 p-4 transition-transform md:hidden ${
          aberto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xl font-bold">Menu</span>
          <button
            onClick={() => setAberto(false)}
            aria-label="Fechar menu"
            className="rounded px-3 py-2 text-2xl"
          >
            ✕
          </button>
        </div>

        <Navegacao
          itens={ITENS}
          ativo={local.pathname}
          onEscolher={() => setAberto(false)}
        />
      </div>
    </header>
  );
}