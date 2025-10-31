import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../assets/images/Quizzy_logo.png";
import ditto from "../assets/images/Ditto.png";

function NavBar() {
  return (
    <nav className={styles.NavBar}>
      <Link className={styles["logo-quizzy"]} to="/Inicial/Home">
        <img
          className={styles["imagem-quizzy"]}
          src={logo}
          alt="logo do site "
        />
      </Link>

      <Link
        title="Voltar a tela inical"
        className={styles["inicio-button"]}
        to="/Inicial"
      >
        Início
      </Link>

      <Link
        title="Ir a tela de quizzes"
        className={styles["quizzes-button"]}
        to="/Inicial"
      >
        Quizzes
      </Link>

      <Link
        title="Ir a tela de criação de quizzes"
        className={styles["criacao-button"]}
        to="/Inicial/Criar-Quizz"
      >
        Criar Quizz
      </Link>

      <Link className={styles["perfil-button"]} to="/Inicial/Perfil">
        <div className={styles["foto-perfil"]}>
          <img className={styles["ditto"]} src={ditto} alt="" />
        </div>
      </Link>
    </nav>
  );
}

export default NavBar;
