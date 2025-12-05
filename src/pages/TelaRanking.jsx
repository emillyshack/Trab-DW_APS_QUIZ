import { useEffect, useState } from "react";
import styles from "./TelaRanking.module.css";

export default function TelaRanking() {
  const [ranking, setRanking] = useState([]);
  const [usuarioAtual, setUsuarioAtual] = useState(null);

  useEffect(() => {
    buscarRanking();
    const u = localStorage.getItem("ultimoUsuario");
    if (u) setUsuarioAtual(u);
  }, []);

  async function buscarRanking() {
    
    
    const dataFake = [
      { id: 1, usuario: "Ana", acertos: 5, erros: 1 },
      { id: 2, usuario: "Bruno", acertos: 4, erros: 2 },
      { id: 3, usuario: "Carlos", acertos: 3, erros: 3 },
    ];

    setRanking(dataFake);
  }

  return (
    <div className={styles.rankingContainer}>
      <div className={styles.rankingCard}>
        <h1 className={styles.titulo}>Ranking Atual</h1>

        <div className={styles.listaRanking}>
          {ranking.map((item, index) => {
            const isUser = item.usuario === usuarioAtual;

            return (
              <div
                key={item.id}
                className={`${styles.linhaRanking} ${
                  isUser ? styles.linhaRankingEu : ""
                }`}
              >
                <span>{index + 1}º</span>
                <span>{item.usuario}</span>
                <span>#{item.acertos * 100 - item.erros * 10}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
