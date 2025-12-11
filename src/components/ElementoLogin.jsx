import styles from "./ElementoLogin.module.css";
import logo from "../assets/images/Quizzy_logo.png";

function ElementoLogin() {
  return (
    <div className={`${styles["tela-principal"]} doodle-border`}>
      <img src={logo} alt="Logo do Site" title="Quizzy" />
      <div className={styles.quizzys}>
        <span className={styles.quizz}>Item 1</span>
        <span className={styles.quizz}>Item 2</span>
        <span className={styles.quizz}>Item 3</span>
        <span className={styles.quizz}>Item 4</span>
        <span className={styles.quizz}>Item 5</span>
      </div>
    </div>
  );
}

export default ElementoLogin;
