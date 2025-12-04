import styles from "./CriarPergunta.module.css";
import React, { useState, useRef } from "react";
import cyndaquill from "../assets/images/Cyndaquill.png";
import { FileUp, Image } from "lucide-react";

function CriarPergunta() {
  const [escolherTempo, setEscolherTempo] = useState(30);

  const handleMudarTempo = () => {
    let somar15 = escolherTempo + 15;
    if (somar15 > 90) {
      somar15 = 15;
    }
    setEscolherTempo(somar15);
  };

  const [preview, setPreview] = useState(null);
  const inputHiddenRef = useRef(null);
  const inputFileRef = useRef(null);

  const handleClickFile = () => inputFileRef.current.click();

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result); // mostra a imagem no quadrado
      inputHiddenRef.current.value = reader.result; // salva no input hidden
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles["tela-principal"]}>
      <div className={styles.container}>
        <nav className={styles["titulo-criar"]}>
          <h1>Criando sua Pergunta</h1>
        </nav>

        <div className={styles["elmt-1-2-3"]}>
          <div className={styles["selecionar-imagem"]}>
            {/* Imagem central */}
            <div className={styles["imagem-central"]}>
              {preview ? (
                <img src={preview} className={styles.preview} alt="preview" />
              ) : (
                <Image size={70} />
              )}
            </div>

            {/* Área de botões */}
            <div className={styles["area-botoes-imagem"]}>
              <div className={styles["file-imagem"]} onClick={handleClickFile}>
                <FileUp />
              </div>
            </div>

            {/* Inputs */}
            <input
              type="file"
              ref={inputFileRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleChangeFile}
            />

            <input type="hidden" ref={inputHiddenRef} />
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
          <div className={styles["fazer-pergunta"]}>
            <div className={styles["span-pergunta"]}>
              <p>Sua pergunta irá aparecer aqui!!</p>
            </div>

            <div className={styles["input-ia"]}>
              <textarea
                type="text"
                placeholder="Faça sua pergunta"
                className={styles["pergunta"]}
              ></textarea>
            </div>
          </div>
        </div>
        <div className={styles["elmt-4-5"]}>
          <div className={styles["alternativas"]}>
            <div className={`${styles["botao-alt"]} ${styles.btn4}`}>
              <button className={styles["errada"]}>
                {" "}
                <FileUp />
              </button>
              <input type="text" className={styles.resposta} />
              <button className={styles["certa"]}>
                {" "}
                <FileUp />
              </button>
            </div>
            <div className={`${styles["botao-alt"]} ${styles.btn4}`}>
              <button className={styles["errada"]}>
                {" "}
                <FileUp />
              </button>
              <input type="text" className={styles.resposta} />
              <button className={styles["certa"]}>
                {" "}
                <FileUp />
              </button>
            </div>
            <div className={`${styles["botao-alt"]} ${styles.btn4}`}>
              <button className={styles["errada"]}>
                {" "}
                <FileUp />
              </button>
              <input type="text" className={styles.resposta} />
              <button className={styles["certa"]}>
                {" "}
                <FileUp />
              </button>
            </div>
            <div className={`${styles["botao-alt"]} ${styles.btn4}`}>
              <button className={styles["errada"]}>
                {" "}
                <FileUp />
              </button>
              <input type="text" className={styles.resposta} />
              <button className={styles["certa"]}>
                {" "}
                <FileUp />
              </button>
            </div>
          </div>

          <div className={styles.column}>
            <button className={`${styles["salvar-mudancas"]} doodle-border`}>
              Salvar Pergunta
            </button>
            <br />
            <button className={`${styles["cancelar-quizz"]} doodle-border`}>
              Ir a Uma Nova Pergunta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CriarPergunta;
