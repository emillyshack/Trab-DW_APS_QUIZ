import { useEffect, useState } from "react";
import styles from "./Alternativas.module.css";
import { X, Check } from "lucide-react";

function Alternativas({ id, onChange }) {
  const [ehCerta, setEhCerta] = useState(false);



   useEffect(() => {
  onChange({
    id,
    texto: "",
    certa: ehCerta,
  });
}, [ehCerta]);

  return (
    <div>
      <div
        className={`${styles["botao-alt"]} 
        ${ehCerta ? styles.correta : styles.incorreta} `}
      >
        <button className={styles["errada"]} onClick={() => setEhCerta(false)}>
          {" "}
          <X />
        </button>

        <div style={{ position: "relative", width: "100%" }}>
      <input
  type="text"
  className={styles.resposta}
  onChange={(e) =>
    onChange({
      id,
      texto: e.target.value,
      certa: ehCerta,
    })
  }
/>
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
