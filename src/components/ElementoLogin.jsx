import styles from "./ElementoLogin.module.css";
import logo from "../assets/images/Quizzy_logo.png";
import pessoa from "../assets/images/pessoa-joinha-removebg-preview.png";
import { useContext } from "react";
import { GeralContexto } from "../context/GeralContext";
import Quizz from "./Quizz";

function ElementoLogin() {
  const { quizzes } = useContext(GeralContexto);
  return (
    <div className={`${styles["tela-principal"]}`}>
      <img src={pessoa} alt="Pessoa joinha" className={styles.pessoa} />
      <div className={styles.quizz}>
        <img
          src={logo}
          alt="Logo do Site"
          className={styles.logo}
          title="Quizzy"
        />
        <div className={styles.quizzes}>
          {quizzes.map((p, index) => (
            <Quizz key={index} titulo={p.titulo} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ElementoLogin;
