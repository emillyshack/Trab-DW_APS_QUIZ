import { Plus } from "lucide-react";
import home from "./Home.module.css";
import styles from "./Quizzes.module.css";

export default function Quizzes() {
  return (
    <div className={`${home["tela-principal"]} ${styles.telaPrincipal}`}>
      <div className={styles.container}>

        {/* COLUNA 1 — CRIAR QUIZ */}
        <section className={styles.criarQuiz}>
          <h2 className={styles.titulo}>Criar Quiz</h2>

          <div className={styles.gridQuizzes}>
            <div className={`${styles.cardQuiz} doodle-border`}>Quiz 1</div>
            <div className={`${styles.cardQuiz} doodle-border`}>Quiz 2</div>
            <div className={`${styles.cardQuiz} doodle-border`}>Quiz 3</div>

            <div className={`${styles.cardAdd} doodle-border`}>
              <Plus size={40} />
            </div>
          </div>
        </section>

        {/* COLUNA 2 — SALAS CRIADAS */}
        <section className={styles.salas}>
          <h2 className={styles.titulo}>Salas Criadas</h2>

          <div className={styles.lista}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`${styles.cardSala} doodle-border`}>
                <div>
                  <p className={styles.salaTitulo}>Quiz Matemática</p>
                  <p className={styles.salaDono}>Fulano</p>
                </div>
                <span className={styles.online}>Online</span>
              </div>
            ))}
          </div>
        </section>

        {/* COLUNA 3 — ENTRAR COM CÓDIGO */}
        <section className={styles.codigo}>
          <h2 className={styles.titulo}>Entrar com código</h2>

          <input
            type="text"
            placeholder="XXX-XXX-XXX"
            className={`${styles.input} doodle-border`}
          />

          <button className={`${styles.botao} doodle-border`}>
            Entrar
          </button>

          <img
            src="/img/squirtle.gif"
            alt="Mascote"
            className={styles.squirtle}
          />
        </section>

      </div>
    </div>
  );
}
