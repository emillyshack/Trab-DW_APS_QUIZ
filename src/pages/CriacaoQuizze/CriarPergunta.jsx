import styles from "./CriarPergunta.module.css";
import React, { useState, useRef } from "react";
import cyndaquill from "../../assets/images/Cyndaquill.png";
import { FileUp, Image, Sparkles } from "lucide-react";
import Alternativas from "../../components/Alternativas";

// ======== IMPORTANDO GEMINI ========
import { GoogleGenerativeAI } from "@google/generative-ai";

function CriarPergunta() {
  const [alternativas, setAlternativas] = useState({});
  const [pergunta, setPergunta] = useState("");
  const [gerando, setGerando] = useState(false);

  const atualizarAlternativa = (alt) => {
    setAlternativas((prev) => ({
      ...prev,
      [alt.id]: alt,
    }));
  };

  // ================= SALVAR NO BD ====================
  const salvarQuestao = async () => {
    const payload = {
      pergunta: pergunta,
      alternativas: Object.values(alternativas),
    };

    console.log("ENVIANDO PARA O BANCO:", payload);

    await fetch("http://localhost:3000/salvarQuestao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  };

  // ================= GEMINI IA ====================
  const genAI = new GoogleGenerativeAI("SUA_API_KEY_AQUI");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const gerarPerguntaComGemini = async () => {
    if (!pergunta.trim()) return alert("Digite algo para a IA gerar!");

    try {
      setGerando(true);

      const prompt = `
        Gere uma pergunta objetiva, clara e curta baseada no pedido:
        "${pergunta}".  
        Apenas retorne a pergunta, sem explicações adicionais.
      `;

      const result = await model.generateContent(prompt);
      const perguntaGerada = result.response.text();

      setPergunta(perguntaGerada); // substitui o textarea
    } catch (erro) {
      console.error("Erro na IA:", erro);
      alert("Erro ao gerar pergunta com a IA.");
    } finally {
      setGerando(false);
    }
  };

  //=============== Imagem ===============
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
      inputEscondidoRef.current.value = reader.result;
    };
    reader.readAsDataURL(file);
  };

  //=============== Tempo ===============
  const [escolherTempo, setEscolherTempo] = useState(30);
  const handleMudarTempo = () => {
    let novo = escolherTempo + 15;
    if (novo > 90) novo = 15;
    setEscolherTempo(novo);
  };

  return (
    <div className={styles["tela-principal"]}>
      <div className={styles.container}>
        <nav className={styles["titulo-criar"]}>
          <h1>Criando sua Pergunta</h1>
        </nav>

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
            <div className={`${styles["selecionar-tempo"]}`}>
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

            <div className={styles["fazer-pergunta"]}>
              {/* Preview */}
              <div className={styles["span-pergunta"]}>
                <p className={styles["preview-pergunta"]}>
                  {pergunta || "Sua pergunta irá aparecer aqui!!"}
                </p>
              </div>

              {/* Textarea + Botão IA */}
              <div className={styles["input-ia"]}>
                <textarea
                  placeholder="Digite algo para a IA transformar em pergunta"
                  className={styles["pergunta"]}
                  value={pergunta}
                  onChange={(e) => setPergunta(e.target.value)}
                ></textarea>

                <button
                  className={styles["botaoIA"]}
                  onClick={gerarPerguntaComGemini}
                  disabled={gerando}
                >
                  <Sparkles size={18} />
                  {gerando ? "Gerando..." : "Usar IA"}
                </button>
              </div>
            </div>
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
              onClick={salvarQuestao}
            >
              Salvar Pergunta
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
