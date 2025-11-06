import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import CriarQuizz from "./pages/CriarQuizz";
import Quizzes from "./pages/Quizzes";
import "../src/Global.css";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Inicial">
            <Route path="" element={<Home />} />
            <Route path="Perfil" element={<Perfil />} />
            <Route path="CriarQuizz" element={<CriarQuizz />} />
            <Route path="Quizzes" element={<Quizzes />} />
          </Route>

          <Route path="/Login" element={<Login />} />
          <Route path="/Cadastro" element={<Cadastro />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
