import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // Assegure-se de importar o fetch dessa forma se estiver utilizando módulos ES

const app = express();
app.use(cors());
app.use(express.json());

// Sua chave da API do Gemini
const API_KEY = 'Sua_Chave_Aqui';

// Endpoint para interagir com o chat-bison-001
app.post('/api/chat', async (req, res) => {
  const { mensagem } = req.body;

  if (!mensagem || mensagem.trim() === '') {
    return res.json({ resposta: '❌ Nenhuma mensagem enviada.' });
  }

  try {
    // Requisição para a API Gemini
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=${AIzaSyDkiLuOfPvMnvEE7G-y1EQVvFEnnP5e32s}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: mensagem,
            },
          ],
          temperature: 0.7,
          max_tokens: 150,
        }),
      }
    );

    if (!response.ok) {
      console.error('Erro na requisição para a API Gemini:', response.status, response.statusText);
      return res.status(500).json({ resposta: '❌ Erro ao gerar resposta da Gemini.' });
    }

    const data = await response.json();
    console.log('Resposta da API Gemini:', data);

    // Acessando a resposta do modelo corretamente
    const texto = data?.choices?.[0]?.message?.content || 'Sem resposta.';
    res.json({ resposta: texto });

  } catch (err) {
    console.error('Erro ao chamar a API Gemini:', err);
    res.status(500).json({ resposta: '❌ Erro ao gerar resposta.' });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
