import styles from "./Quizz.module.css";

function Quizz({ titulo }) {
  return (
    <div className={`${styles.container} doodle-border`}>
      <h2>Quizz:</h2>
      <p className={titulo}>{titulo}</p>
    </div>
  );
}

export default Quizz;
