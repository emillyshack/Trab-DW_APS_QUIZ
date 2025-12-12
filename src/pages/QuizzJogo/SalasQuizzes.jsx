import styles from "./SalasQuizzes.module.css";
import { User, ChevronLeft } from "lucide-react";
import { useParams } from "react-router-dom";

export default function SalasQuizzes() {
  const { id } = useParams();

  const players = [
    { name: "Nome 5:40", time: "5:40" },
    { name: "Nome 4:20", time: "4:20" },
    { name: "Nome 6:31", time: "6:31" },
  ];

  const fullPlayersList = ["Fulano xxx", "Fulano xxx", "Fulano xxx"];
  const subjects = ["Física", "Matemática", "Geometria"];

  return (
    <div className={`${homeStyles["telaPrincipal"]} ${styles.roomWrapper}`}>
      <div className={`${styles.container} doodle-border`}>
        <header className={styles.header}>
          {}
          <div className={`${styles.logo} doodle-border`}>
            ? Quizzy (Sala ID: {id})
          </div>
          <nav className={styles.nav}>
            <button className={`${styles.navButton} ${styles.navInicio}`}>
              Início
            </button>
            <button className={`${styles.navButton} ${styles.navQuizzes}`}>
              Quizzes
            </button>
            <button className={`${styles.navButton} ${styles.navCriar}`}>
              Criar Quiz
            </button>
          </nav>
          <button className={`${styles.profileButton} ${styles.circleBorder}`}>
            perfil
          </button>
        </header>

        <main className={styles.mainContent}>
          <div className={styles.titleArea}>
            <div className={styles.creatorProfile}>
              <div className={`${styles.creatorIcon} ${styles.circleBorder}`}>
                <User size={20} />
              </div>
              <p className={styles.creatorText}>
                perfil do criador
                <br />
                do quiz
              </p>
              <h2 className={styles.creatorName}>Nome do criador</h2>
            </div>
            <h1 className={styles.mainTitle}>Quiz Matemática</h1>
          </div>

          <div className={styles.quizArea}>
            <section className={styles.playersSection}>
              <div className={styles.playerAvatars}>
                {players.map((player, index) => (
                  <div
                    key={index}
                    className={`${styles.playerCard} ${styles.circleBorder}`}
                  >
                    <User size={30} />
                    <p>{player.name}</p>
                  </div>
                ))}
              </div>
              <div className={styles.playerList}>
                {fullPlayersList.map((player, index) => (
                  <div
                    key={index}
                    className={`${styles.playerItem} doodle-border`}
                  >
                    <div
                      className={`${styles.circleRadio} ${styles.circleBorder}`}
                    ></div>
                    <p>{player}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.detailsSection}>
              <div className={`${styles.questionBox} doodle-border`}>
                <img src="/img/placeholder.png" alt="Question placeholder" />
              </div>

              <div className={styles.quizDetails}>
                <div className={`${styles.detailBox} doodle-border`}>
                  <p>QTD. de perguntas:</p>
                  <strong>12 perguntas</strong>
                </div>
                <div className={styles.subjectsBox}>
                  <p>Matérias:</p>
                  <div className={styles.subjectsList}>
                    {subjects.map((subject, index) => (
                      <span
                        key={index}
                        className={`${styles.subjectTag} doodle-border`}
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={`${styles.detailBox} doodle-border`}>
                  <p>Tempo máximo:</p>
                  <strong>10 minutos</strong>
                </div>
              </div>
            </section>

            <section className={styles.actionsSection}>
              <img
                src="/img/mascote.png"
                alt="Mascote"
                className={styles.mascotImg}
              />

              <button
                className={`${styles.actionButton} ${styles.startButton} doodle-border`}
              >
                Começar
              </button>
              <button
                className={`${styles.actionButton} ${styles.chooseButton} doodle-border`}
              >
                <ChevronLeft size={16} /> Escolher outro quiz
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
