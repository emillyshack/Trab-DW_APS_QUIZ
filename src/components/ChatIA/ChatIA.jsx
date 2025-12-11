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
        "https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=AIzaSyDIDlVXpmN0FM-ZLbls4Pbqi68QRx6G0xg",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              {
                author: "user",
                content: [
                  {
                    type: "text",
                    text: input
                  }
                ]
              }
            ]
          }),
        }
      );

      const data = await response.json();
      // A resposta do chat-bison-001 vem em data.message.content[0].text
      const texto = data?.message?.content?.[0]?.text || "Sem resposta.";
      setResposta(texto);

    } catch (err) {
      console.error("Erro IA:", err);
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
