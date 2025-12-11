import styles from "./CriarPergunta.module.css";
import React, { useState, useRef } from "react";
import cyndaquill from "../../assets/images/Cyndaquill.png";
import { FileUp, Image, Sparkles } from "lucide-react";
import Alternativas from "../../components/Alternativas";

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

  // ================= GEMINI ====================
  const gerarPerguntaComGemini = async () => {
    if (!pergunta.trim()) return alert("Digite algo para a IA gerar!");

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    console.log("🔍 DEBUG — API KEY CARREGADA?:", apiKey ? "SIM" : "NÃO");

    if (!apiKey) {
      alert("Erro: chave da API do Gemini não está carregada.");
      return;
    }

    // lista de candidatos de nomes de modelos (tenta um por vez)
    const candidateModels = [
      "gemini-2.5-flash",
      "gemini-2.5-flash-latest",
      "gemini-2.5-pro",
      "gemini-1.5-flash-latest",
      "gemini-1.5-pro",
      "gemini-1.5-flash",
      // você pode adicionar outros nomes aqui se souber
    ];

    try {
      setGerando(true);

      const genAI = new GoogleGenerativeAI(apiKey);

      const prompt = `
Transforme o seguinte texto em uma PERGUNTA clara, objetiva e de múltipla escolha:
"${pergunta}"
Apenas devolva a PERGUNTA, sem alternativas.
      `;

      let lastError = null;
      let respostaTexto = null;
      let usadoModelo = null;

      for (const modelName of candidateModels) {
        try {
          console.log(`Tentando modelo: ${modelName}`);
          const modelo = genAI.getGenerativeModel({ model: modelName });
          const resposta = await modelo.generateContent(prompt);

          // resposta.response pode ser função ou objeto — convertemos com segurança
          const texto = await (async () => {
            if (!resposta) return null;
            // alguns SDKs usam resposta.response.text() (async) ou resposta.response?.text()
            if (resposta?.response?.text) {
              // se response.text é uma função que retorna string
              return await resposta.response.text();
            }
            // fallback: se resposta.content existe
            if (typeof resposta === "string") return resposta;
            if (resposta?.outputText) return resposta.outputText;
            return null;
          })();

          if (texto && texto.trim()) {
            respostaTexto = texto.trim();
            usadoModelo = modelName;
            console.log(`Sucesso com modelo: ${modelName}`);
            break;
          } else {
            console.log(`Modelo ${modelName} respondeu vazio. Continuando...`);
          }
        } catch (eModel) {
          lastError = eModel;
          // Se for 404 model not found, log e continua para o próximo
          console.warn(`Modelo ${modelName} falhou:`, eModel?.message || eModel);
          // continue para o próximo modelo
        }
      }

      if (!respostaTexto) {
        console.error("Nenhum modelo retornou resposta válida. Último erro:", lastError);
        alert("A IA não conseguiu gerar a pergunta (ver console). Tente listar modelos ou checar permissões da chave.");
        return;
      }

      console.log("📌 RESPOSTA DO GEMINI (modelo usado:", usadoModelo, "):", respostaTexto);
      setPergunta(respostaTexto);
    } catch (erro) {
      console.error("❌ ERRO GEMINI (fora do loop):", erro);
      alert("Erro ao gerar pergunta com IA (veja console).");
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
      if (inputEscondidoRef.current) inputEscondidoRef.current.value = reader.result;
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
              onClick={() =>
                console.log("Sem backend → payload:", {
                  pergunta,
                  alternativas,
                })
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