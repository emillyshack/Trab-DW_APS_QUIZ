import NavBar from "../components/NavBar";
import ContainerPerfil from "../components/ContainerPerfil";
import styles from "./Perfil.module.css";

function Perfil() {
  return (
    <div className={styles["tela-principal"]}>
      <div className="column">
        <NavBar />
        <ContainerPerfil />
      </div>
    </div>
  );
}

export default Perfil;
