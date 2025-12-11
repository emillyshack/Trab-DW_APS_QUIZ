import styles from "./CriarPergunta.module.css";
import React, { useState, useRef } from "react";
import cyndaquill from "../../assets/images/Cyndaquill.png";
import { FileUp, Image, MessageSquare } from "lucide-react";
import Alternativas from "../../components/Alternativas";

import { GoogleGenerativeAI } from "@google/generative-ai";

function CriarPergunta() {
  const [alternativas, setAlternativas] = useState({});
  const [pergunta, setPergunta] = useState("");

  // ================================================================
  // CHAT DA IA
  // ================================================================
  const [mostrarChat, setMostrarChat] = useState(false);
  const [mensagemUsuario, setMensagemUsuario] = useState("");
  const [mensagensChat, setMensagensChat] = useState([]);
  const [carregandoIA, setCarregandoIA] = useState(false);

  const enviarMensagemIA = async () => {
    if (!mensagemUsuario.trim()) return;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) return alert("API KEY do Gemini ausente.");

    const msgUser = { autor: "user", texto: mensagemUsuario };
    setMensagensChat((prev) => [...prev, msgUser]);

    const prompt = mensagemUsuario;
    setMensagemUsuario("");
    setCarregandoIA(true);

    try {
      console.log("🔍 DEBUG — API KEY CARREGADA?:", apiKey ? "SIM" : "NÃO");
      console.log("Tentando modelo: gemini-2.5-flash");

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const result = await model.generateContent(prompt);
      const respostaTexto = result.response.text();

      console.log("Sucesso com modelo: gemini-2.5-flash");
      console.log("📌 RESPOSTA DO GEMINI:", respostaTexto);

      const msgIA = { autor: "ia", texto: respostaTexto };

      setMensagensChat((prev) => [...prev, msgIA]);
    } catch (err) {
      console.error("Erro ao buscar IA:", err);

      const msgErro = {
        autor: "ia",
        texto: "❌ Erro ao responder. Veja o console.",
      };

      setMensagensChat((prev) => [...prev, msgErro]);
    } finally {
      setCarregandoIA(false);
    }
  };

  const atualizarAlternativa = (alt) => {
    setAlternativas((prev) => ({
      ...prev,
      [alt.id]: alt,
    }));
  };

  // ================================================================
  // IMAGEM
  // ================================================================
  const [preview, setPreview] = useState(null);
  const inputArquivoRef = useRef(null);
  const inputEscondidoRef = useRef(null);

  const handleImagemSelecionada = () => inputArquivoRef.current.click();

  const handleMudarImagem = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      if (inputEscondidoRef.current) inputEscondidoRef.current.value =
        reader.result;
    };
    reader.readAsDataURL(file);
  };

  // ================================================================
  // TEMPO
  // ================================================================
  const [escolherTempo, setEscolherTempo] = useState(30);
  const handleMudarTempo = () => {
    let novo = escolherTempo + 15;
    if (novo > 90) novo = 15;
    setEscolherTempo(novo);
  };

  // ================================================================
  // RENDER
  // ================================================================
  return (
    <div className={styles["tela-principal"]}>
      <div className={styles.container}>
        <nav className={styles["titulo-criar"]}>
          <h1>Criando sua Pergunta</h1>
        </nav>

        {/* -----------------------------------------------------------
            JANELINHA DO CHAT IA
        ----------------------------------------------------------- */}
        <button
          className={styles.botaoAbrirChat}
          onClick={() => setMostrarChat(!mostrarChat)}
        >
          <MessageSquare size={18} /> Conversar com a IA
        </button>

        {mostrarChat && (
          <div className={styles.chatIA}>
            <h3>Assistente de Criação de Perguntas</h3>

            <div className={styles.chatArea}>
              {mensagensChat.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.autor === "user" ? styles.msgUser : styles.msgIA
                  }
                >
                  <p>{m.texto}</p>
                </div>
              ))}
            </div>

            <div className={styles.chatInput}>
              <input
                value={mensagemUsuario}
                onChange={(e) => setMensagemUsuario(e.target.value)}
                placeholder="Pergunte algo à IA..."
              />
              <button onClick={enviarMensagemIA} disabled={carregandoIA}>
                {carregandoIA ? "..." : "Enviar"}
              </button>
            </div>
          </div>
        )}

        {/* -----------------------------------------------------------
            TELA PRINCIPAL
        ----------------------------------------------------------- */}
        <div className={styles["elmt-1-2-3"]}>
          {/* Imagem */}
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

          {/* Tempo */}
          <div className={styles.padrao2}>
            <div className={styles["selecionar-tempo"]}>
              <label>Tempo:</label>
              <div className={styles.cronometro} onClick={handleMudarTempo}>
                <span className={styles["tempo-selecionado"]}>
                  {escolherTempo}s
                </span>
                <input type="hidden" value={escolherTempo} />
              </div>
            </div>

            <img src={cyndaquill} className={styles["cyndaquill-imagem"]} />
          </div>

          {/* Pergunta */}
          <div className={styles.column}>
            <label>Pergunta:</label>

            <textarea
              placeholder="Digite sua pergunta manualmente"
              className={styles["pergunta"]}
              value={pergunta}
              onChange={(e) => setPergunta(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Alternativas */}
        <div className={styles["elmt-4-5"]}>
          <div className={styles.column}>
            <label>Alternativas:</label>
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
              onClick={() =>
                console.log("Salvar:", { pergunta, alternativas })
              }
            >
              Salvar Pergunta (console)
            </button>

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
