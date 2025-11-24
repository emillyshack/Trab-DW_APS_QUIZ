import styles from "./CriarQuizz.module.css";
import { useState, useRef } from "react";

function CriarQuizz() {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleFotoClick = () => inputRef.current.click();

  const handleArquivoChange = (e) => {
    const arquivo = e.target.files[0];
    if (arquivo) {
      const url = URL.createObjectURL(arquivo);
      setPreview(url);
    }
  };

  return (
    <div className={`${styles["tela-principal"]}`}>
      <div className={`${styles.container}`}>
        <nav className={styles["titulo-criar"]}>
          {" "}
          <h1>Criar Quiz!</h1>
        </nav>
        <div className={styles["elmt_1-2-3"]}>
          <div className={styles["elemento-1"]}>
            <div
              className={`${styles["imagem-quizz"]} ${styles.hbz}`}
              onClick={handleFotoClick}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Foto de perfil"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span>+</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={inputRef}
              onChange={handleArquivoChange}
              style={{ display: "none" }}
            />
          </div>
          <div className={styles["elemento-2"]}>
            <input type="text" className={`${styles["nome-quizz"]} doodle-border`} />
          </div>
          <div  className={styles["elemento-3"]}>
            <p>pl,mvrlpevpemrvpervrvv</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CriarQuizz;
