import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { useContext } from "react";

// ------------------- IMPORTAÇÕES -------------------
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Cadastro from "./pages/CriarConta/Cadastro";
import Login from "./pages/CriarConta/Login";
import CriarQuizz from "./pages/CriacaoQuizze/CriarQuizz";

import TelaPergunta from "./pages/QuizzJogo/TelaPergunta";
import CriarPergunta from "./pages/CriacaoQuizze/CriarPergunta";
import TelaRanking from "./pages/QuizzJogo/TelaRanking";
import SalasQuizzes from "./pages/QuizzJogo/SalasQuizzes"; // Lobby (Recebe ID)
import ListaQuizzes from "./pages/QuizzJogo/ListaQuizzes"; // Lista de Quizzes Disponíveis

import TelaAviso from "./components/TelaAviso";
import TelaPreparar from "./components/TelaPreparar";
import PrivateRoute from "./PrivateRoute";
import "../src/Global.css";
import NavBar from "./components/NavBar";
import { LoginProvider, LoginContexto } from "./context/LoginContext";
import { GeralProvider } from "./context/GeralContext";
import LoadingLogin from "./components/LoadingLogin";
import NotFound from "./components/NotFound";

// ------------------- LAYOUTS -------------------

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

// ------------------- CONTEÚDO PRINCIPAL -------------------

function ConteudoApp() {
  const { loading } = useContext(LoginContexto);

  return (
    <>
      {loading ? <LoadingLogin /> : null}
      <Router>
        <Routes>
          <Route
            element={
              <PrivateRoute>
                <ComNavBar />
              </PrivateRoute>
            }
          >
            <Route path="/inicial">
              <Route index element={<Home />} />
              <Route path="perfil" element={<Perfil />} />
              <Route path="quizz/novo" element={<CriarQuizz />} />
              <Route path="quizz/:id/editar" element={<CriarQuizz />} />
              <Route path="CriarPergunta" element={<CriarPergunta />} />
              <Route path="quizzes" element={<ListaQuizzes />} />
              <Route path="SalasQuizzes/:id" element={<SalasQuizzes />} />
            </Route>
          </Route>

          <Route element={<SemNavBar />}>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/ranking" element={<TelaRanking />} />
            <Route path="/aviso" element={<TelaAviso />} />
            <Route path="/PrepararQuiz" element={<TelaPreparar />} />
            <Route path="/Perguntax" element={<TelaPergunta />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

// ------------------- PROVIDERS (Contextos) -------------------

export default function App() {
  return (
    <LoginProvider>
      <GeralProvider>
        <ConteudoApp />
      </GeralProvider>
    </LoginProvider>
  );
}
