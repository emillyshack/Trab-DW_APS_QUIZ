import NavBar from "../components/NavBar";
import styles from "./Home.module.css";

function Quizzes() {
  return (
    <div className={`${styles["tela-principal"]}`}>
      <NavBar />
    </div>
  );
}

export default Quizzes;
