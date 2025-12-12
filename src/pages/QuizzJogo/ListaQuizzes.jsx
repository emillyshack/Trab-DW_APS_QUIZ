import styles from "./SalasQuizzes.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase.js"; 

// A função do componente ListaQuizzes deve envolver todo o código de lógica e o return.
export default function ListaQuizzes() {
  
  const navigate = useNavigate();
  const [quizzesDisponiveis, setQuizzesDisponiveis] = useState([]);
  
  async function fetchQuizzesDisponiveis() {
    const mockQuizzes = [
      { id: 201, titulo: "Matemática Avançada", criador: "Professor João", tema: "Exatas" },
      { id: 202, titulo: "Literatura Brasileira", criador: "Ana Júlia", tema: "Humanas" },
      { id: 203, titulo: "Química Orgânica", criador: "Dr. Silva", tema: "Ciências" },
    ];
    setQuizzesDisponiveis(mockQuizzes);
  }

  useEffect(() => {
    fetchQuizzesDisponiveis();
  }, []);

  const handleEntrarClick = (id) => {
    navigate(`/Inicial/SalasQuizzes/${id}`);
  };

  // O bloco return do componente
  return (
    <div className={styles.telaPrincipal}>
      <div className={styles.container}>
        <h1 className={styles.tituloPagina}>Quizzes Disponíveis</h1>

        <div className={styles.buscaBox}>
          <input 
            type="text" 
            placeholder="Buscar por título ou tema..." 
            className={`${styles.inputBusca} doodle-border`}
          />
        </div> 

        <div className={styles.listaSalas}>
          {quizzesDisponiveis.map((quiz) => (
            <div key={quiz.id} className={`${styles.cardSala} doodle-border`}>
              <div className={styles.salaInfo}>
                <p className={styles.salaNome}>{quiz.titulo}</p>
                <p className={styles.salaCriador}>Criador: {quiz.criador}</p>
                <p className={styles.salaTema}>Tema: {quiz.tema}</p>
              </div>
              <div className={styles.acoes}>
                <button 
                  className={`${styles.botaoEntrar} doodle-border`}
                  onClick={() => handleEntrarClick(quiz.id)}
                >
                  Entrar
                </button>
              </div>
            </div>
          ))}
          {quizzesDisponiveis.length === 0 && <p>Nenhum quiz encontrado.</p>}
        </div>
      </div>
    </div>
  );
}