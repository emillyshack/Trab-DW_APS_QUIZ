import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../assets/images/Quizzy_logo.png";
import ditto from "../assets/images/Ditto.png";
import { useContext } from "react";
import { LoginContexto } from "../context/LoginContext";
import { GeralContexto } from "../context/GeralContext";

function NavBar() {
  const { pessoa } = useContext(GeralContexto);
  return (
    <nav className={`${styles.NavBar} doodle-border`}>
      <NavLink title="Quizzy" className={styles["logo-quizzy"]} to="/Inicial">
        <img
          className={styles["imagem-quizzy"]}
          src={logo}
          alt="Logo da Quizzy"
        />
      </NavLink>

      <NavLink
        title="Voltar a tela inical"
        end
        className={({ isActive }) =>
          `${styles.linkClass} ${styles.amarelo} ${
            isActive ? styles.ativo : styles.inativo
          } doodle-border`
        }
        to="/Inicial"
      >
        <h2>Início</h2>
      </NavLink>
      <NavLink
        title="Ir a tela de quizzes"
        className={({ isActive }) =>
          `${styles.linkClass} ${styles.verde} ${
            isActive ? styles.ativo : styles.inativo
          } doodle-border`
        }
        to="/Inicial/Quizzes"
      >
        <h2>Quizzes</h2>
      </NavLink>
      <NavLink
        title="Ir a tela de criação de quizzes"
        className={({ isActive }) =>
          `${styles.linkClass} ${styles.azul} ${
            isActive ? styles.ativo : styles.inativo
          } doodle-border`
        }
        to="/Inicial/CriarQuizz"
      >
        <h2>Criar Quizz</h2>
      </NavLink>
      <NavLink
        title="Seu perfil"
        className={styles["perfil-button"]}
        to="/Inicial/Perfil"
      >
        <div className={styles["foto-perfil"]}>
          <img
            className={styles["ditto"]}
            src={pessoa?.foto_perfil ? pessoa?.foto_perfil : ditto}
            alt=""
          />
        </div>
      </NavLink>
    </nav>
  );
}

export default NavBar;
