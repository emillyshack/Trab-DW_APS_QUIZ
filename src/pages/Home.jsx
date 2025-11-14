import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles["tela-principal"]}>
      <h1>Pagina Inicial</h1>
      <Link
        to="/"
        className={`${styles["linkClass"]} ${styles["azul"]} doodle-border`}
      >
        Login
      </Link>
    </div>
  );
}
