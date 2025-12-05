import { useEffect, useState } from "react";
import styles from "./Alternativas.module.css";
import { X, Check } from "lucide-react";

function Alternativas({ id, onChange }) {
  const [texto, setTexto] = useState("");
  const [salvo, setSalvo] = useState("");
  const [editada, setEditada] = useState(false);
  const [ehCerta, setEhCerta] = useState(false);

  const handleSalvar = () => {
    setSalvo(texto);
    setEditada(false);
  };

  useEffect(() => {
    onChange({
      id,
      texto: salvo,
      certa: ehCerta,
    });
  }, [salvo, ehCerta]);

  return (
    <div>
      <div className={`${styles["botao-alt"]} ${styles.btn4} `}>
        <button className={styles["errada"]} onClick={() => setEhCerta(false)}>
          {" "}
          <X />
        </button>

        <div style={{ position: "relative", width: "100%" }}>
          <input
            type="text"
            className={styles.resposta}
            value={texto}
            onChange={(e) => {
              setTexto(e.target.value);
              setEditada(true);
            }}
          />
          {editada && <button onClick={handleSalvar}>x</button>}
        </div>

        <button className={styles["certa"]} onClick={() => setEhCerta(true)}>
          {" "}
          <Check />
        </button>
      </div>
    </div>
  );
}

export default Alternativas;
