import styles from "./ElementoLogin.module.css";
import logo from "../assets/images/Quizzy_logo.png";
import { useContext } from "react";
import { GeralContexto } from "../context/GeralContext";
import Pergunta from "../components/Pergunta";

function ElementoLogin() {
  const { quizzes } = useContext(GeralContexto);
  return (
    <div className={`${styles["tela-principal"]}`}>
      <img
        src={logo}
        alt="Logo do Site"
        className={styles.logo}
        title="Quizzy"
      />
      <div className={styles.quizzes}>
        {quizzes.map((p, index) => (
          <Pergunta key={index} pergunta={p.titulo} />
        ))}
      </div>
    </div>
  );
}

export default ElementoLogin;
