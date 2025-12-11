import React, { useState } from "react";
import styles from "./ChatIA.module.css";
import { X } from "lucide-react";

export default function ChatIA({ onClose }) {
  const [input, setInput] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);

  const enviarPergunta = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResposta("Gerando resposta...");

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=AIzaSyDkiLuOfPvMnvEE7G-y1EQVvFEnnP5e32s", // Substitua pela sua chave de API
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: {
              text: input, // O conteúdo da mensagem
            },
            model: "chat-bison-001", // Nome do modelo
            parameters: {
              temperature: 0.7, // Temperatura (opcional)
              max_output_tokens: 150, // Limite de tokens
            },
          }),
        }
      );

      // Verificando se a requisição foi bem-sucedida
      if (!response.ok) {
        const errorDetails = await response.json(); // Captura mais detalhes do erro
        console.error("Erro na requisição:", errorDetails);
        setResposta(`❌ Erro: ${errorDetails.error.message}`);
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log("Resposta completa da API:", data); // Verifique a resposta completa da API

      // Acessando a resposta correta
      const texto = data?.choices?.[0]?.message?.content || "Sem resposta.";
      setResposta(texto);

    } catch (err) {
      console.error("Erro ao chamar a IA:", err);
      setResposta("❌ Erro ao gerar resposta.");
    }

    setLoading(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.chatBox}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>

        <h3 className={styles.titulo}>Assistente IA</h3>

        <div className={styles.respostaBox}>
          {loading ? (
            <p className={styles.loading}>⏳ Pensando...</p>
          ) : (
            <p>{resposta || "Faça uma pergunta para a IA..."}</p>
          )}
        </div>

        <div className={styles.inputArea}>
          <input
            type="text"
            placeholder="Escreva aqui..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviarPergunta()}
          />
          <button onClick={enviarPergunta}>Enviar</button>
        </div>
      </div>
    </div>
  );
}
