import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { useContext, useState } from "react";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import CriarQuizz from "./pages/CriarQuizz";
import Quizzes from "./pages/Quizzes";
import "../src/Global.css";
import NavBar from "./components/NavBar";
import { LoginProvider, LoginContexto } from "./LoginContext";
import { GeralProvider } from "./GeralContext";
import TelaPergunta from "./pages/TelaPergunta";
import CriarPergunta from "./pages/CriarPergunta";
import LoadingLogin from "./components/LoadingLogin";

function ComNavBar() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

function SemNavBar() {
  return <Outlet />;
}

function ConteudoApp() {
  const { loading } = useContext(LoginContexto);
  return (
    <>
      {loading ? <LoadingLogin /> : ""}
      <Router>
        <Routes>
          {/* Com Navbar */}
          <Route element={<ComNavBar />}>
            <Route path="/Inicial">
              <Route index element={<Home />} />
              <Route path="Perfil" element={<Perfil />} />
              <Route path="CriarQuizz" element={<CriarQuizz />} />
              <Route path="Quizzes" element={<Quizzes />} />
              <Route path="CriarPergunta" element={<CriarPergunta />} />
            </Route>
          </Route>
          {/* Sem NavBar */}
          <Route element={<SemNavBar />}>
            <Route path="/" element={<Login />} />
            <Route path="/Cadastro" element={<Cadastro />} />
            <Route path="Perguntax" element={<TelaPergunta />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

function App() {
  return (
    <LoginProvider>
      <GeralProvider>
        <ConteudoApp />
      </GeralProvider>
    </LoginProvider>
  );
}

export default App;
