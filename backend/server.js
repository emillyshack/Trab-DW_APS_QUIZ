import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Certifique-se de que o node-fetch está instalado

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyDIDlVXpmN0FM-ZLbls4Pbqi68QRx6G0xg"; // Sua chave da API

app.post("/api/chat", async (req, res) => {
  const { mensagem } = req.body;

  if (!mensagem || mensagem.trim() === "") {
    return res.json({ resposta: "❌ Nenhuma mensagem enviada." });
  }

  try {
    // Requisição para o modelo Gemini
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/chat-bison-001:generateMessage?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: mensagem,  // Alteração aqui: "prompt" ao invés de "messages"
          temperature: 0.7,   // Controle de criatividade
          max_tokens: 150,    // Limite de tokens na resposta
        }),
      }
    );

    // Verificar se a resposta da API foi bem-sucedida
    if (!response.ok) {
      console.error("Erro na requisição para a API Gemini:", response.status, response.statusText);
      return res.status(500).json({ resposta: "❌ Erro ao gerar resposta da Gemini." });
    }

    const data = await response.json();
    console.log("Resposta da API Gemini:", data); // Para debug

    // A resposta pode ter a estrutura 'choices' dependendo da versão da API
    const texto = data?.choices?.[0]?.text || "Sem resposta.";
    res.json({ resposta: texto });
  } catch (err) {
    console.error("Erro ao chamar a API Gemini:", err);
    res.status(500).json({ resposta: "❌ Erro ao gerar resposta." });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
