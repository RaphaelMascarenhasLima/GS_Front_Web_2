import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Painel from "./pages/Painel";
import Equipe from "./pages/Equipe";
import Equipes from "./pages/Equipes";
import Pontos from "./pages/Pontos";
import Previsao from "./pages/Previsao";
import Relatorio from "./pages/Relatorio";
import Alerta from "./pages/Alerta";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Painel />} />
        <Route path="/equipe/:id" element={<Equipe />} />
        <Route path="/equipes" element={<Equipes />} />
        <Route path="/pontos" element={<Pontos />} />
        <Route path="/previsao" element={<Previsao />} />
        <Route path="/relatorio" element={<Relatorio />} />
        <Route path="/alerta" element={<Alerta />} />
      </Route>
    </Routes>
  );
}