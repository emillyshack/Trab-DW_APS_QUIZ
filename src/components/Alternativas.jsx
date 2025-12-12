import styles from "./Alternativas.module.css";
import { X, Check } from "lucide-react";

function Alternativas({ id, onChange, idPergunta, valor }) {
  const { texto, certa } = valor;

  const handleChange = (novoTexto, novaCerta) => {
    onChange({
      id,
      texto: novoTexto,
      certa: novaCerta,
      idPergunta,
    });
  };

  return (
    <div
      className={`${styles["botao-alt"]} ${
        certa ? styles.correta : styles.incorreta
      }`}
    >
      <button
        className={styles["errada"]}
        onClick={() => handleChange(texto, false)}
      >
        <X />
      </button>

      <input
        type="text"
        className={styles.resposta}
        value={texto}
        onChange={(e) => handleChange(e.target.value, certa)}
      />

      <button
        className={styles["certa"]}
        onClick={() => handleChange(texto, true)}
      >
        <Check />
      </button>
    </div>
  );
}

export default Alternativas;
