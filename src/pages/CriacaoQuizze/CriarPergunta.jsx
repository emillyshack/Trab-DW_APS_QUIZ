import styles from "./CriarPergunta.module.css";
import React, { useState, useRef, useContext } from "react";
import cyndaquill from "../../assets/images/Cyndaquill.png";
import { FileUp, Image, MessageSquare } from "lucide-react";
import Alternativas from "../../components/Alternativas";
import ChatIA from "../../components/ChatIA/ChatIA";
import { GeralContexto } from "../../context/GeralContext";
import { useNavigate } from "react-router-dom";
import { LoginContexto } from "../../context/LoginContext";

function CriarPergunta() {
  const navigate = useNavigate();
  const { inputPerguntas, setInputPerguntas, setInputAlternativas } =
    useContext(GeralContexto);

  const { pessoa, loading, setLoading } = useContext(LoginContexto);

  const [inputPergunta, setInputPergunta] = useState({
    imagem: "",
    pergunta: "",
    tempo: 30,
    alternativas: [
      { id: 1, texto: "", valor: false },
      { id: 2, texto: "", valor: false },
      { id: 3, texto: "", valor: false },
      { id: 4, texto: "", valor: false },
    ],
  });

  const [alternativas, setAlternativas] = useState(inputPergunta.alternativas);
  const [abrirIA, setAbrirIA] = useState(false);
  const [preview, setPreview] = useState(null);

  const inputArquivoRef = useRef(null);
  const inputEscondidoRef = useRef(null);

  const numeroPergunta = inputPerguntas.length + 1;

  const handleImagemSelecionada = () => inputArquivoRef.current.click();

  const handleMudarImagem = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setInputPergunta((prev) => ({ ...prev, imagem: reader.result }));
      if (inputEscondidoRef.current)
        inputEscondidoRef.current.value = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleMudarTempo = () => {
    let novo = inputPergunta.tempo + 15;
    if (novo > 90) novo = 15;
    setInputPergunta((prev) => ({ ...prev, tempo: novo }));
  };

  const atualizarAlternativa = (alt) => {
    setAlternativas((prev) =>
      prev.map((a) =>
        a.id === alt.id ? { ...a, texto: alt.texto, certa: alt.certa } : a
      )
    );
  };

  const salvarPergunta = () => {
    setLoading(true);
    if (alternativas.some((a) => !a.texto)) {
      alert("Preencha as 4 alternativas antes de salvar.");
      setLoading(false);
      return;
    }

    const novaPergunta = {
      imagem: inputPergunta.imagem,
      texto_pergunta: inputPergunta.pergunta,
      tempo_limite: inputPergunta.tempo,
      ordem_pergunta: numeroPergunta,
      pessoa_id: pessoa.id,
      alternativas: alternativas,
    };

    setInputPerguntas((prev) => [...prev, novaPergunta]);

    const novasAlternativas = alternativas.map((a) => ({
      ...a,
      ordemPergunta: numeroPergunta,
    }));
    setInputAlternativas((prev) => [...prev, ...novasAlternativas]);

    setInputPergunta({ imagem: "", pergunta: "", tempo: 30 });
    setAlternativas([
      { id: 1, texto: "", valor: false },
      { id: 2, texto: "", valor: false },
      { id: 3, texto: "", valor: false },
      { id: 4, texto: "", valor: false },
    ]);
    setPreview(null);

    setLoading(false);
    navigate("/inicial/quizz/novo");
  };

  return (
    <div className={styles["tela-principal"]}>
      <div className={styles.container}>
        <nav className={styles["titulo-criar"]}>
          <h1>Criando sua Pergunta</h1>
        </nav>

        {abrirIA && <ChatIA onClose={() => setAbrirIA(false)} />}

        {/* GRID PRINCIPAL */}
        <div className={styles["elmt-1-2-3"]}>
          {/* IMAGEM */}
          <div className={styles.column}>
            <label>Imagem:</label>
            <div className={styles["selecionar-imagem"]}>
              {!preview && (
                <div className={styles["imagem-ilustrativa"]}>
                  <Image size={70} />
                </div>
              )}
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

          {/* TEMPO */}
          <div className={styles.padrao2}>
            <div className={styles["selecionar-tempo"]}>
              <label>Tempo:</label>
              <div className={styles.cronometro} onClick={handleMudarTempo}>
                <span className={styles["tempo-selecionado"]}>
                  {inputPergunta.tempo}s
                </span>
                <input type="hidden" value={inputPergunta.tempo} />
              </div>
            </div>

            <img src={cyndaquill} className={styles["cyndaquill-imagem"]} />
          </div>

          {/* PERGUNTA */}
          <div className={styles.column}>
            <label>Pergunta:</label>
            <textarea
              placeholder="Digite sua pergunta manualmente"
              className={styles["pergunta"]}
              value={inputPergunta.pergunta}
              onChange={(e) =>
                setInputPergunta((prev) => ({
                  ...prev,
                  pergunta: e.target.value,
                }))
              }
            />

            {/* ➤ AGORA O BOTÃO FICA AQUI! */}
            <button
              className={`${styles.botaoAbrirChat} doodle-border`}
              onClick={() => setAbrirIA(true)}
            >
              <MessageSquare size={18} /> Usar Inteligência Artificial
            </button>
          </div>
        </div>

        {/* ALTERNATIVAS + SALVAR */}
        <div className={styles["elmt-4-5"]}>
          <div className={styles.column}>
            <label>Alternativas:</label>

            <div className={styles["alternativas"]}>
              {alternativas.map((alt) => (
                <Alternativas
                  key={alt.id}
                  id={alt.id}
                  idPergunta={numeroPergunta}
                  valor={alt}
                  onChange={atualizarAlternativa}
                />
              ))}
            </div>
          </div>

          <div className={styles.column}>
            <button
              className={`${styles["salvar-mudancas"]} doodle-border`}
              onClick={salvarPergunta}
            >
              Salvar Pergunta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CriarPergunta;
