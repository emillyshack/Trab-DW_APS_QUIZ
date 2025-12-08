import styles from "./CriarPergunta.module.css";
import React, { useState, useRef } from "react";
import cyndaquill from "../../assets/images/Cyndaquill.png";
import { FileUp, Image, Check, X } from "lucide-react";
import Alternativas from "../../components/Alternativas";

function CriarPergunta() {
  const [alternativas, setAlternativas] = useState({});
  const [pergunta, setPergunta] = useState("");

  const atualizarAlternativa = (alt) => {
    setAlternativas((prev) => ({
      ...prev,
      [alt.id]: alt,
    }));
  };

  const salvarQuestao = async () => {
    const listaAlternativas = Object.values(alternativas);

    const payload = {
      pergunta: pergunta,
      alternativas: listaAlternativas,
    };

    console.log("ENVIANDO PARA O BANCO:", payload);

    await fetch("http://localhost:3000/salvarQuestao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  };

  //dddddddddddddddddddddddddddddddddddddddddddddd
  const [escolherTempo, setEscolherTempo] = useState(30);

  const handleMudarTempo = () => {
    let somar15 = escolherTempo + 15;
    if (somar15 > 90) {
      somar15 = 15;
    }
    setEscolherTempo(somar15);
  };

  //================Selecionar Imagem de Pergunta==============
  const [preview, setPreview] = useState(null);
  const inputArquivoRef = useRef(null);
  const inputEscondidoRef = useRef(null);

  const handleImagemSelecionada = () => inputArquivoRef.current.click();

  const handleMudarImagem = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result); // mostra a imagem
      inputEscondidoRef.current.value = reader.result; // salva base64
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
          <div className={styles.column}>
            <label htmlFor="">Imagem:</label>
            <div className={styles["selecionar-imagem"]}>
              {/* Se NÃO tiver imagem -> mostra o ícone */}
              {!preview && (
                <div className={styles["imagem-ilustrativa"]}>
                  <Image size={70} />
                </div>
              )}

              {/* Se tiver imagem -> ela ocupa o quadrado inteiro */}
              {preview && (
                <img src={preview} className={styles.preview} alt="preview" />
              )}

              <div className={styles["area-botoes-imagem"]}>
                <div
                  className={styles["file-imagem"]}
                  onClick={handleImagemSelecionada}
                >
                  <FileUp />
                </div>
              </div>

              <input
                type="file"
                ref={inputArquivoRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleMudarImagem}
              />

              <input type="hidden" ref={inputEscondidoRef} />
            </div>
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
          <div className={styles.column}>
            <label htmlFor="">Pergunta:</label>
            <div className={styles["fazer-pergunta"]}>
              <div className={styles["span-pergunta"]}>
                <p className={styles["preview-pergunta"]}>
                  Sua pergunta irá aparecer aqui!!
                </p>
              </div>

              <div className={styles["input-ia"]}>
                <textarea
                  type="text"
                  placeholder="Faça sua pergunta"
                  className={styles["pergunta"]}
                  value={pergunta}
                  onChange={(e) => setPergunta(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["elmt-4-5"]}>
          <div className={styles.column}>
            <label htmlFor="">Alternativas:</label>
            <div className={styles["alternativas"]}>
              <Alternativas id={1} onChange={atualizarAlternativa} />
              <Alternativas id={2} onChange={atualizarAlternativa} />
              <Alternativas id={3} onChange={atualizarAlternativa} />
              <Alternativas id={4} onChange={atualizarAlternativa} />
            </div>
          </div>

          <div className={styles.column}>
            <button
              className={`${styles["salvar-mudancas"]} doodle-border`}
              onClick={salvarQuestao}
            >
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
