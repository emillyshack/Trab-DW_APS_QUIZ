import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI("SUA_API_KEY_AQUI");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/gerarPerguntaIA", async (req, res) => {
  try {
    const texto = req.body.texto;

    const prompt = `
      Gere uma pergunta objetiva baseada em:
      "${texto}"
      Responda apenas com a pergunta.
    `;

    const result = await model.generateContent(prompt);
    res.json({ pergunta: result.response.text() });
  } catch (e) {
    res.json({ erro: true, detalhe: e.toString() });
  }
});

app.listen(3000, () => console.log("BACKEND RODANDO NA PORTA 3000"));
