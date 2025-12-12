import styles from "./SalasQuizzes.module.css";
import { User, ChevronLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SalasQuizzes() {

  return (
    <div className={styles.telaPrincipal}>

      <div className={`${styles.container} doodle-border`}>

        <main className={styles.mainContent}>
        
          <div className={styles.titleAndPlayers}>
  
            <div className={styles.creatorInfo}>
              <div className={`${styles.creatorProfileIcon} ${styles.circleBorder}`}>
                <User size={20} />
              </div>
              <p className={styles.creatorText}>
                perfil do criador
                <br />
                do quiz
              </p>
              <h3 className={styles.creatorName}>Nome do criador</h3>
            </div>

            <h1 className={styles.mainTitle}>{quizDetails.titulo}</h1>

         
            <section className={styles.playersSection}>
              <div className={styles.playerAvatars}>
                {players.map((player, index) => (
                  <div
                    key={index}
                   
                    className={`${styles.playerCard} ${styles.circleBorder} ${player.avatarStyle}`} 
                  >
                    <User size={30} /> 
                    <div className={styles.playerNameTime}>
                      <p className={styles.playerName}>{player.name}</p>
                      <p className={styles.playerTime}>{player.time}</p>
                    </div>
                  </div>
                ))}
              </div>


              <div className={`${styles.playerListContainer} ${styles.darkGreenBox} doodle-border`}>
                <div className={styles.playerList}>
                  {fullPlayersList.map((player, index) => (
                    <div
                      key={index}
                      className={styles.playerItem}
                    >
                    
                      <div className={`${styles.circleRadio} ${styles.circleBorder}`}></div>
                      <p>{player}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Seção dos Detalhes, Imagem e Ações */}
          <div className={styles.detailsAndActions}>
            {/* Imagem principal do Quiz */}
            <div className={`${styles.quizImageContainer} doodle-border`}>
              <img src="/img/placeholder.png" alt="Question placeholder" />
              {/* Imagem placeholder dentro do box, conforme o wireframe */}
              <div className={styles.placeholderIcon}></div> 
            </div>
            
            {/* Detalhes do Quiz (Qtd. Perguntas, Tempo, Matérias) */}
            <div className={styles.quizDetails}>
              <div className={styles.detailBoxGroup}>
                {/* QTD. de perguntas */}
                <div className={`${styles.detailBox} ${styles.detailBoxSmall} doodle-border`}>
                  <p>QTD. de perguntas:</p>
                  <strong className={styles.detailValue}>12 perguntas</strong>
                </div>

                {/* Tempo máximo */}
                <div className={`${styles.detailBox} ${styles.detailBoxSmall} doodle-border`}>
                  <p>Tempo máximo:</p>
                  <strong className={styles.detailValue}>10 minutos</strong>
                </div>
              </div>

              {/* Matérias/Tags */}
              <div className={`${styles.subjectsBox} doodle-border`}>
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
            </div>

            {/* Ações/Botões e Mascote */}
            <section className={styles.actionsSection}>
              {/* Mascote (com o ícone do Wireframe) */}
              <img
                src="/img/mascote.png"
                alt="Mascote"
                className={styles.mascotImg}
              />

              {/* Botão Começar */}
              <button
                className={`${styles.actionButton} ${styles.startButton} doodle-border`}
              >
                Começar
              </button>
              {/* Botão Escolher Outro Quiz */}
              <button
                className={`${styles.actionButton} ${styles.chooseButton} doodle-border`}
                onClick={handleVoltar}
              >
                Escolher outro quiz
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}