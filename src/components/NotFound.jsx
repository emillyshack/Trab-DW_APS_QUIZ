import styles from "./NotFound.module.css";
import psyduck from "../assets/images/psyduck.gif";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles["tela-principal"]}>
      <div className={styles.voltar}>
        <h2>Voltar</h2>{" "}
        <div
          className={`${styles["botao-voltar"]} circle-border`}
          onClick={() => navigate("/")}
          title="Voltar a tela inicial"
        >
          <div className={styles["div-seta"]}>
            <ArrowLeft className={styles.arrow} />
          </div>
        </div>
      </div>
      <h1>Página não encontrada!</h1>
      <h1 className={styles.erro}>404</h1>
      <img className={styles.psyduck} src={psyduck} alt="Psydux tonto" />
    </div>
  );
}

export default NotFound;
