import NavBar from "../components/NavBar";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles["tela-principal"]}>
      <NavBar />
    </div>
  );
}
