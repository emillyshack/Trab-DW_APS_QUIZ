import { useEffect, useState, useRef } from "react";
import styles from "./TelaPergunta.module.css";
import Froakie from "../../assets/images/Frokie.png";

export default function TelaPergunta() {
  // Pergunta vazia (você preencherá depois)
  const perguntas = [
    {
      pergunta: "",
      imagem: null,
      respostas: ["A", "B", "C", "D"],
      correta: 0,
    },
  ];

  const [index, setIndex] = useState(0);
  const [tempo, setTempo] = useState(30);
  const [bloqueado, setBloqueado] = useState(false);
  const [selecionada, setSelecionada] = useState(null);

  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const inputFile = useRef(null);

  // TIMER
  useEffect(() => {
    if (bloqueado) return;

    const interval = setInterval(() => {
      setTempo((t) => {
        if (t <= 1) {
          finalizarPergunta();
          return 30;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [bloqueado]);

  function responder(pos) {
    if (bloqueado) return;

    setSelecionada(pos);
    setBloqueado(true);

    setTimeout(() => {
      finalizarPergunta();
    }, 1200);
  }

  function finalizarPergunta() {
    setBloqueado(false);
    setSelecionada(null);
    setTempo(30);
    setImagemSelecionada(null);

    setIndex((i) => {
      if (i + 1 < perguntas.length) return i + 1;
      return 0;
    });
  }

  const atual = perguntas[index];

  // 🔵 Carregar imagem via clique
  function openFilePicker() {
    inputFile.current.click();
  }

  function onFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImagemSelecionada(url);
  }

  // 🔵 Drag & Drop
  function onDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImagemSelecionada(url);
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* PERGUNTA */}
        <div className={styles.header}>{atual.pergunta || "Pergunta x"}</div>

        {/* ÁREA DO MEIO */}
        <div className={styles.middleArea}>
          {/* Froakie */}
          <img src={Froakie} alt="froakie" className={styles.frog} />

          {/* Caixa da imagem */}
          <div
            className={styles.imageBox}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            onClick={openFilePicker}
          >
            {imagemSelecionada ? (
              <img src={imagemSelecionada} className={styles.imgPreview} />
            ) : (
              <span className={styles.imageIcon}>🖼️</span>
            )}

            <input
              type="file"
              ref={inputFile}
              style={{ display: "none" }}
              accept="image/*"
              onChange={onFileSelect}
            />
          </div>

          {/* Timer + contador */}
          <div className={styles.timerBlock}>
            <div className={styles.questionCount}>1/x</div>
            <div className={styles.counterCircle}>{tempo}s</div>
          </div>
        </div>

        {/* RESPOSTAS */}
        <div className={styles.answersGrid}>
          {["A", "B", "C", "D"].map((resp, i) => {
            // cor das respostas
            const cor = [styles.resA, styles.resB, styles.resC, styles.resD][i];

            // efeito de correta/errada
            let estado = "";
            if (selecionada !== null) {
              if (i === atual.correta) estado = styles.correta;
              else if (i === selecionada) estado = styles.errada;
            }

            return (
              <button
                key={i}
                className={`${styles.answerBtn} ${cor} ${estado}`}
                onClick={() => responder(i)}
                disabled={bloqueado}
              >
                {resp}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
