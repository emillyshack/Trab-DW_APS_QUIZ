import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import multer from "multer";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" })); // aceita base64 também

// uploads
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// multer config (salva arquivos em /uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".png";
    const name = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, name);
  },
});
const upload = multer({ storage });

// arquivo JSON onde guardamos as questões (cria se não existir)
const DB_FILE = path.join(process.cwd(), "questions.json");
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, "[]", "utf-8");

// -------------------- Helpers --------------------
const readQuestions = () => JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
const writeQuestions = (arr) => fs.writeFileSync(DB_FILE, JSON.stringify(arr, null, 2), "utf-8");

// ---------- MOCK gerador de IA (substituir pela chamada real ao Gemini) ----------
/*
  Funções abaixo simulam o comportamento da IA:
  - generateQuestionFromText(text) => transforma um texto em uma pergunta
  - generateAlternativesFromQuestion(pergunta) => gera 4 alternativas e indica a correta
  Para usar Gemini, substitua o conteúdo dessas funções pela chamada real à API.
*/
const generateQuestionFromText = async (text) => {
  // Mock simples: pega a primeira frase e transforma em pergunta
  if (!text || !text.trim()) return null;
  const s = text.trim();
  const primeiraFrase = s.split(/[.?!]\s/)[0];
  // torna interrogativa simples
  return primeiraFrase.endsWith("?") ? primeiraFrase : primeiraFrase.replace(/(^\w)/, (m) => m.toUpperCase()) + "?";
};

const generateAlternativesFromQuestion = async (pergunta) => {
  // Mock: gera 4 alternativas baseadas em palavras-chave
  const base = pergunta.replace(/\W/g, " ").split(" ").filter(Boolean);
  const key = base.slice(0, 3).join(" ") || "opção";
  const alternativas = [
    { id: 1, texto: `${key} - alternativa A`, correta: false },
    { id: 2, texto: `${key} - alternativa B`, correta: false },
    { id: 3, texto: `${key} - alternativa C`, correta: false },
    { id: 4, texto: `${key} - alternativa D`, correta: false },
  ];
  // marca a 1ª como correta no mock
  alternativas[0].correta = true;
  return alternativas;
};

// -------------------- Rotas --------------------

// Rota: gerar pergunta com IA
app.post("/gerarPerguntaIA", async (req, res) => {
  try {
    const { texto } = req.body;
    if (!texto) return res.status(400).json({ erro: "Campo 'texto' é obrigatório" });

    // ======= AQUI: substitua generateQuestionFromText pelo call ao Gemini ======
    // Exemplo: const pergunta = await callGeminiToGenerateQuestion(texto);
    const pergunta = await generateQuestionFromText(texto);
    // ========================================================================

    if (!pergunta) return res.status(500).json({ erro: "IA não retornou pergunta" });
    return res.json({ pergunta });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Erro no servidor" });
  }
});

// Rota: gerar alternativas com IA (recebe a pergunta e devolve array de alternativas)
app.post("/gerarAlternativasIA", async (req, res) => {
  try {
    const { pergunta } = req.body;
    if (!pergunta) return res.status(400).json({ erro: "Campo 'pergunta' é obrigatório" });

    // ======= AQUI: substitua generateAlternativesFromQuestion pelo call ao Gemini ======
    const alternativas = await generateAlternativesFromQuestion(pergunta);
    // ==============================================================================

    return res.json({ alternativas });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Erro ao gerar alternativas" });
  }
});

/*
  Rota: salvarQuestao
  Aceita:
    - multipart/form-data com campos:
        pergunta (string)
        tempo (number)
        alternativas (string JSON)
        imagem (arquivo)  <-- opcional
    - ou JSON com:
        pergunta, tempo, alternativas (array), imageBase64 (opcional)
*/
app.post("/salvarQuestao", upload.single("imagem"), async (req, res) => {
  try {
    let { pergunta, tempo, alternativas } = req.body;
    let imagemUrl = null;

    // se multipart e arquivo foi enviado
    if (req.file) {
      imagemUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.imageBase64) {
      // se mandaram base64 no JSON
      const b64 = req.body.imageBase64;
      const match = b64.match(/^data:(image\/\w+);base64,(.+)$/);
      const ext = match ? match[1].split("/")[1] : "png";
      const data = match ? match[2] : b64;
      const filename = Date.now() + "-" + Math.round(Math.random() * 1e9) + "." + ext;
      const filepath = path.join(uploadsDir, filename);
      fs.writeFileSync(filepath, Buffer.from(data, "base64"));
      imagemUrl = `/uploads/${filename}`;
    }

    // parse alternativas se veio string
    if (typeof alternativas === "string") {
      try {
        alternativas = JSON.parse(alternativas);
      } catch {
        // se for formato separado por |, tenta decompor
        alternativas = alternativas.split("|").map((t, i) => ({ id: i + 1, texto: t.trim(), correta: false }));
      }
    }

    const nova = {
      id: Date.now(),
      pergunta,
      alternativas: alternativas || [],
      tempo: Number(tempo) || 30,
      imagem: imagemUrl,
      criadoEm: new Date().toISOString(),
    };

    const arr = readQuestions();
    arr.push(nova);
    writeQuestions(arr);

    console.log("Questão salva:", nova);
    return res.json({ status: "ok", questao: nova });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Erro ao salvar questão" });
  }
});

// rota para listar questões (útil para debug)
app.get("/questoes", (req, res) => res.json(readQuestions()));

// servir uploads estaticos
app.use("/uploads", express.static(uploadsDir));

// start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend rodando em http://localhost:${PORT}`));
