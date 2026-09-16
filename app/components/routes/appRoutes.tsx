import { Routes, Route } from "react-router-dom";

import Page from "@/app/page";
import Catalogo from "@/app/categorias/page";
import Entrar from "@/app/entrar/page";
import Lancamentos from "@/app/lancamentos/page";
import MinhaLista from "@/app/minhaLista/page";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Page />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/entrar" element={<Entrar />} />
      <Route path="/lancamentos" element={<Lancamentos />} />
      <Route path="/minha-lista" element={<MinhaLista />} />
    </Routes>
  );
}
