import styles from "./Pergunta.module.css";

function Pergunta({ pergunta }) {
  return (
    <div className={`${styles["container"]} doodle-border`}>
      <p>{pergunta}</p>
    </div>
  );
}

export default Pergunta;
