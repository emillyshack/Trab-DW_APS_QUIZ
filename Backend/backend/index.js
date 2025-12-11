import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ================= CONFIGURAR GEMINI ===================
const genAI = new GoogleGenerativeAI("SUA_API_KEY_AQUI"); // <-- COLOQUE SUA CHAVE AQUI
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ================= ROTA: GERAR PERGUNTA =================
app.post("/gerarPerguntaIA", async (req, res) => {
  try {
    const texto = req.body.texto;

    if (!texto) {
      return res.status(400).json({ erro: "Nenhum texto enviado." });
    }

    const prompt = `Transforme isso em uma pergunta clara e objetiva para um quiz: "${texto}"`;

    const resposta = await model.generateContent(prompt);

    const perguntaGerada =
      resposta.response.text().trim() || "Pergunta não gerada.";

    res.json({ pergunta: perguntaGerada });
  } catch (erro) {
    console.error("Erro IA:", erro);
    res.status(500).json({ erro: "Erro ao gerar pergunta." });
  }
});

// ================= ROTA: SALVAR QUESTÃO =================
app.post("/salvarQuestao", (req, res) => {
  console.log("Recebido do frontend:", req.body);

  // Aqui você pode salvar em BD, JSON, arquivo, etc.
  // Por enquanto só retorna sucesso:
  res.json({ ok: true });
});

// ================= INICIAR SERVIDOR =====================
app.listen(3000, () => {
  console.log("Servidor backend rodando em http://localhost:3000");
});
