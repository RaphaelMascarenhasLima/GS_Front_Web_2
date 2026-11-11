import { Link } from "react-router-dom";

export default function Navegacao({ itens, ativo, onEscolher }) {
  return (
    <nav>
      <ul className="flex flex-col gap-1 md:flex-row">
        {itens.map((item) => (
          <li key={item.caminho}>
            <Link
              to={item.caminho}
              onClick={onEscolher}
              className={
                item.caminho === ativo
                  ? "block rounded bg-green-800 px-3 py-3 text-base font-bold text-white"
                  : "block rounded px-3 py-3 text-base text-green-900 hover:bg-green-100"
              }
            >
              {item.texto}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}