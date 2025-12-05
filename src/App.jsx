import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { useContext } from "react";

import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import CriarQuizz from "./pages/CriarQuizz";
import Quizzes from "./pages/Quizzes";
import TelaPergunta from "./pages/TelaPergunta";
import CriarPergunta from "./pages/CriarPergunta";
import TelaRanking from "./pages/TelaRanking";

import TelaAviso from "./components/TelaAviso";           // ⬅ novo import 
import TelaPreparar from "./components/TelaPreparar";    // ⬅ novo import

import "../src/Global.css";
import NavBar from "./components/NavBar";
import { LoginProvider, LoginContexto } from "./LoginContext";
import { GeralProvider } from "./GeralContext";
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
      {loading ? <LoadingLogin /> : null}

      <Router>
        <Routes>

          {/* Rotas com Navbar */}
          <Route element={<ComNavBar />}>
            <Route path="/Inicial">
              <Route index element={<Home />} />
              <Route path="Perfil" element={<Perfil />} />
              <Route path="CriarQuizz" element={<CriarQuizz />} />
              <Route path="Quizzes" element={<Quizzes />} />
              <Route path="CriarPergunta" element={<CriarPergunta />} />
            </Route>
          </Route>

          {/* Rotas sem Navbar */}
          <Route element={<SemNavBar />}>
            <Route path="/" element={<Login />} />
            <Route path="/Cadastro" element={<Cadastro />} />

            {/* 🔥 Fluxo do Quiz */}
            <Route path="/Ranking" element={<TelaRanking />} />
            <Route path="/Aviso" element={<TelaAviso />} />
            <Route path="/PrepararQuiz" element={<TelaPreparar />} />
            <Route path="/Perguntax" element={<TelaPergunta />} />
          </Route>

        </Routes>
      </Router>
    </>
  );
}

export default function App() {
  return (
    <LoginProvider>
      <GeralProvider>
        <ConteudoApp />
      </GeralProvider>
    </LoginProvider>
  );
}
