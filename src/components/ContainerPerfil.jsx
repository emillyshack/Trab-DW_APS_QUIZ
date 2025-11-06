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
            <button className={styles.nome}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-pencil-icon lucide-pencil"
              >
                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                <path d="m15 5 4 4" />
              </svg>
            </button>
          </div>
        </div>
        <div className={styles["area-biografia"]}></div>
        <div className={styles["area-historico"]}></div>
      </div>
    </div>
  );
}
