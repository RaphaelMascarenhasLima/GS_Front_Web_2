import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-creme text-slate-900">
      <Header titulo="Pausa Certa" />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}