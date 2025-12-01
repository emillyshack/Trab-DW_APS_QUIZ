import styles from "./BotaoAdicionarPerg.module.css";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BotaoAdicionarPerg() {
  const navigate = useNavigate();

  function telaAdicionarPergunta() {
    navigate("/Inicial/CriarPergunta");
  }

  return (
    <div>
      <button
        className={`${styles["adicionar-pergunta"]} doodle-border`}
        onClick={telaAdicionarPergunta}
      >
        <Plus />
      </button>
    </div>
  );
}
