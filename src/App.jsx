import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import CriarQuizz from "./pages/CriarQuizz";
import Quizzes from "./pages/Quizzes";
import "../src/Global.css";
import NavBar from "./components/NavBar";
import { LoginProvider } from "./LoginContext";
import LoadingTeste from "./pages/LoadingTeste";

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

function App() {
  return (
    <LoginProvider>
      <Router>
        <Routes>
          {/* Com Navbar */}
          <Route element={<ComNavBar />}>
            <Route path="/Inicial">
              <Route index element={<Home />} />
              <Route path="Perfil" element={<Perfil />} />
              <Route path="CriarQuizz" element={<CriarQuizz />} />
              <Route path="Quizzes" element={<Quizzes />} />
            </Route>
          </Route>
          {/* Sem NavBar */}
          <Route element={<SemNavBar />}>
            <Route path="/" element={<Login />} />
            <Route path="/Loading" element={<LoadingTeste />} />
            <Route path="/Cadastro" element={<Cadastro />} />
          </Route>

          {/*  */}
        </Routes>
      </Router>
    </LoginProvider>
  );
}

export default App;
