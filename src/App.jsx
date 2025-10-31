import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import CriarQuizz from "./pages/CriarQuizz";
import "../src/Global.css";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Inicial">
            <Route index element={<Home />} />
            <Route path="Perfil" element={<Perfil />} />
            <Route path="CriarQuizz" element={<CriarQuizz />} />
          </Route>

          <Route path="/Acessar">
            <Route path="Cadastro" element={<Cadastro />} />
            <Route path="Login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
