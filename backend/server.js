import express from "express";
import cors from "cors";
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("ERRO: GEMINI_API_KEY não está definida!");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

app.post("/api/chat", async (req, res) => {
  const { mensagem } = req.body;

  if (!mensagem?.trim()) {
    return res.status(400).json({ resposta: "Nenhuma mensagem enviada." });
  }

  try {
    const result = await model.generateContent(mensagem);

    const resposta = result.response.text() || "Sem resposta.";

    res.json({ resposta });
  } catch (erro) {
    console.error("Erro ao chamar Gemini:", erro);
    res.status(500).json({ resposta: "Erro interno do servidor." });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
