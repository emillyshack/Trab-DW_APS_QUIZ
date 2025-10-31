import { Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import CriarQuizz from "./pages/CriarQuizz";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route to="/Inicial">
            <Route path="/Home" elemet={<Home />} />
            <Route path="/Perfil" elemet={<Perfil />} />

            <Route path="/CriarQuizz" elemet={<CriarQuizz />} />
            <Route path="/Home" elemet={<Home />} />
          </Route>

          <Route to="/Acessar">
            <Route path="/Cadastro" elemet={<Cadastro />} />
            <Route path="/Login" elemet={<Login />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
