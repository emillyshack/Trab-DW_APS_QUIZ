import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import styles from "./NavBar.module.css";
import logo from "../assets/images/Quizzy_logo.png";
import ditto from "../assets/images/Ditto.png";

function NavBar() {
  const location = useLocation();

  const ehInicio = location.pathname === "/Inicial";
  const ehCriacao = location.pathname === "/Inicial/CriarQuizz";
  const ehQuizzes = location.pathname === "/Inicial/Quizzes";

  return (
    <nav className={`${styles.NavBar} doodle-border`}>
      <Link title="Quizzy" className={styles["logo-quizzy"]} to="/Inicial">
        <img
          className={styles["imagem-quizzy"]}
          src={logo}
          alt="Logo da Quizzy"
        />
      </Link>

      <Link
        title="Voltar a tela inical"
        className={`${styles.linkClass} ${styles.amarelo} ${
          ehInicio ? styles.ativo : styles.inativo
        } doodle-border`}
        to="/Inicial"
      >
        <h2>Início</h2>
      </Link>
      <Link
        title="Ir a tela de quizzes"
        className={`${styles.linkClass} ${styles.verde} ${
          ehQuizzes ? styles.ativo : styles.inativo
        } doodle-border`}
        to="/Inicial/Quizzes"
      >
        <h2>Quizzes</h2>
      </Link>
      <Link
        title="Ir a tela de criação de quizzes"
        className={`${styles.linkClass} ${styles.azul} ${
          ehCriacao ? styles.ativo : styles.inativo
        } doodle-border`}
        to="/Inicial/CriarQuizz"
      >
        <h2>Criar Quizz</h2>
      </Link>
      <Link
        title="Seu perfil"
        className={`${styles["perfil-button"]}`}
        to="/Inicial/Perfil"
      >
        <div className={styles["foto-perfil"]}>
          <img className={styles["ditto"]} src={ditto} alt="" />
        </div>
      </Link>
    </nav>
  );
}

export default NavBar;
