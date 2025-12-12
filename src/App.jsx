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
// REMOVIDO: import Quizzes from "./pages/Quizzes"; // Componente antigo/não usado

import TelaPergunta from "./pages/QuizzJogo/TelaPergunta";
import CriarPergunta from "./pages/CriacaoQuizze/CriarPergunta";
import TelaRanking from "./pages/QuizzJogo/TelaRanking";
import SalasQuizzes from "./pages/QuizzJogo/SalasQuizzes"; // Lobby (Recebe ID)
import ListaQuizzes from './pages/QuizzJogo/ListaQuizzes'; // Lista de Quizzes Disponíveis

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
          {/* ===================================================
              ROTAS COM NAVBAR (PROTEGIDAS E APÓS LOGIN) 🔐
              =================================================== */}
          <Route
            element={
              <PrivateRoute>
                <ComNavBar />
              </PrivateRoute>
            }
          >
            {/* O path pai é "/Inicial" */}
            <Route path="/Inicial">
              {/* /Inicial */}
              <Route index element={<Home />} />
              {/* /Inicial/Perfil */}
              <Route path="Perfil" element={<Perfil />} />
              {/* /Inicial/CriarQuizz */}
              <Route path="CriarQuizz" element={<CriarQuizz />} />
              {/* /Inicial/CriarPergunta */}
              <Route path="CriarPergunta" element={<CriarPergunta />} />
              
              {/* NOVO: Lista de Quizzes Disponíveis (Acessada pelo menu) */}
              <Route path="Quizzes" element={<ListaQuizzes />} />
              
              {/* Lobby: Recebe o ID do Quiz (Acessada de Home ou ListaQuizzes) */}
              <Route path="SalasQuizzes/:id" element={<SalasQuizzes />} />
            </Route>
          </Route>

          {/* ===================================================
              ROTAS SEM NAVBAR (PÚBLICAS, COMO LOGIN) 🔓
              =================================================== */}
          <Route element={<SemNavBar />}>
            {/* / (Tela de Login) */}
            <Route path="/" element={<Login />} />
            {/* /Cadastro */}
            <Route path="/Cadastro" element={<Cadastro />} />
            {/* Rotas de Jogo (Geralmente sem navbar para foco) */}
            <Route path="/Ranking" element={<TelaRanking />} />
            <Route path="/Aviso" element={<TelaAviso />} />
            <Route path="/PrepararQuiz" element={<TelaPreparar />} />
            <Route path="/Perguntax" element={<TelaPergunta />} />
          </Route>

          {/* Erro 404 */}
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