import { useState } from "react";
import styles from "./ContainerPerfil.module.css";

export default function ContainerPerfil() {
  const [nomeUsuario, setNomeUsuario] = useState();

  return (
    <div className={styles.container}>
      <div className={styles["titulo-perfil"]}>
        <h1>Seu Perfil 🫵</h1>
      </div>
      <div className={styles.elementos}>
        <div className={styles["area-nome-foto"]}>
          <div className={styles["foto-perfil"]}></div>
          <div className={styles.display}>
            <input type="text" readOnly className={styles["nome-editavel"]} />{" "}
            <button className={styles.nome}>Editar</button>
          </div>
        </div>
        <div className={styles["area-biografia"]}></div>
        <div className={styles["area-historico"]}></div>
      </div>
    </div>
  );
}
