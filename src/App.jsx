import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { useContext } from "react";

import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Cadastro from "./pages/CriarConta/Cadastro";
import Login from "./pages/CriarConta/Login";
import CriarQuizz from "./pages/CriacaoQuizze/CriarQuizz";
import Quizzes from "./pages/Quizzes";
import TelaPergunta from "./pages/QuizzJogo/TelaPergunta";
import CriarPergunta from "./pages/CriacaoQuizze/CriarPergunta";
import TelaRanking from "./pages/QuizzJogo/TelaRanking";
import TelaAviso from "./components/TelaAviso";
import TelaPreparar from "./components/TelaPreparar";
import PrivateRoute from "./PrivateRoute";
import Salas from "./pages/QuizzJogo/SalasQuizzes";

import "../src/Global.css";
import NavBar from "./components/NavBar";
import { LoginProvider, LoginContexto } from "./context/LoginContext";
import { GeralProvider } from "./context/GeralContext";
import LoadingLogin from "./components/LoadingLogin";
import NotFound from "./components/NotFound";

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
          <Route
            element={
              <PrivateRoute>
                <ComNavBar />
              </PrivateRoute>
            }
          >
            <Route path="/Inicial">
              <Route index element={<Home />} />
              <Route path="Perfil" element={<Perfil />} />
              <Route path="CriarQuizz" element={<CriarQuizz />} />
              <Route path="Quizzes" element={<Quizzes />} />
              <Route path="CriarPergunta" element={<CriarPergunta />} />
              <Route path="SalasQuizzes" element={<Salas />} />
            </Route>
          </Route>


          {/* Rotas sem Navbar */}
          <Route element={<SemNavBar />}>
            <Route path="/" element={<Login />} />
            <Route path="/Cadastro" element={<Cadastro />} />
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

export default function App() {
  return (
    <LoginProvider>
      <GeralProvider>
        <ConteudoApp />
      </GeralProvider>
    </LoginProvider>
  );
}
