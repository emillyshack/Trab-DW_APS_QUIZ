import styles from "./CriarPergunta.module.css";
import React, { useState } from "react";
import cyndaquill from "../assets/images/Cyndaquill.png";
import { FileUp } from "lucide-react";

function CriarPergunta() {
  const [escolherTempo, setEscolherTempo] = useState(30);

  const handleMudarTempo = () => {
    let somar15 = escolherTempo + 15;
    if (somar15 > 90) {
      somar15 = 15;
    }
    setEscolherTempo(somar15);
  };

  return (
    <div className={styles["tela-principal"]}>
      <div className={styles.container}>
        <nav className={styles["titulo-criar"]}>
          <h1>Criando sua Pergunta</h1>
        </nav>

        <div className={styles["elmt-1-2-3"]}>
          <div className={styles["selecionar-imagem"]}>
            <div className={styles["file-imagem"]}>
              <FileUp />
            </div>
            <input type="hidden" />
          </div>

          <div className={styles.padrao2}>
            <div className={`${styles["selecionar-tempo"]}`}>
              <label htmlFor=""> Tempo:</label>
              <div className={styles.cronometro} onClick={handleMudarTempo}>
                <span className={styles["tempo-selecionado"]} id="tempo-valor">
                  {escolherTempo}s
                </span>

                <input type="hidden" value={escolherTempo} />
              </div>
            </div>
            <div>
              <img src={cyndaquill} className={styles["cyndaquill-imagem"]} />
            </div>
          </div>

          <div className={styles["fazer-pergunta"]}> fwewefwefeffewffwe</div>
        </div>
      </div>
    </div>
  );
}

export default CriarPergunta;
