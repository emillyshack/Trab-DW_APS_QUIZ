import React, { useState } from "react";
import styles from "./ChatIA.module.css";
import { X } from "lucide-react";

export default function ChatIA({ onClose }) {
  const [input, setInput] = useState("");
  const [resposta, setResposta] = useState("");

  const enviarPergunta = () => {
    if (!input.trim()) return;
    setResposta("Gerando resposta...");

    setTimeout(() => {
      setResposta(`🔮 Resposta da IA para: "${input}"`);
    }, 1200);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <button className={styles.close} onClick={onClose}>
          <X size={26} />
        </button>

        <h2 className={styles.titulo}>Assistente IA</h2>

        <div className={styles.resposta}>
          {resposta || "Digite algo para a IA..."}
        </div>

        <div className={styles.linha}>
          <input
            type="text"
            placeholder="Escreva aqui..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={enviarPergunta}>Enviar</button>
        </div>

      </div>
    </div>
  );
}
