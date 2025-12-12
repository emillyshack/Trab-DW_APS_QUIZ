import styles from "./ElementoLogin.module.css";
import logo from "../assets/images/Quizzy_logo.png";
import MiniSite from "./Minisite";
import cyndaquill from "../../assets/images/Cyndaquill.png";

function ElementoLogin() {
  return (
    <div className={`${styles["tela-principal"]}`}>
      <img
        src={logo}
        alt="Logo do Site"
        className={styles.logo}
        title="Quizzy"
      />
      <div className={styles.quizzes}>
        <span className={styles.quizz}><img src={cyndaquill} alt="" /></span>
        <span className={styles.quizz}>Item 2</span>
        <span className={styles.quizz}>Item 3</span>
        <span className={styles.quizz}>Item 4</span>
        {/* <MiniSite url="http://localhost:5173/Inicial" /> */}
      </div>
    </div>
  );
}

export default ElementoLogin;
