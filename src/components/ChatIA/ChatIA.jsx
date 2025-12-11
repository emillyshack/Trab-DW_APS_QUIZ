import React, { useState } from "react";
import styles from "./ChatIA.module.css";
import { X } from "lucide-react";

export default function ChatIA({ onClose }) {
  const [input, setInput] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);

  const enviarPergunta = async () => {
    if (!input.trim()) return;

    const pergunta = input.trim();
    setLoading(true);
    setResposta("Gerando resposta...");

    try {
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensagem: pergunta }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        console.error("Erro no servidor:", response.status, error);
        setResposta("Erro ao se comunicar com o servidor.");
        setLoading(false);
        return;
      }

      const data = await response.json();

      // Backend retorna { resposta: "texto" }
      setResposta(data.resposta || "Sem resposta gerada.");
    } catch (err) {
      console.error("Erro na requisição:", err);
      setResposta("Erro de rede ou servidor offline.");
    }

    setInput("");
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
            <p className={styles.loading}>Pensando...</p>
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
            disabled={loading}
          />
          <button onClick={enviarPergunta} disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </div>
    </div>
  );
}
