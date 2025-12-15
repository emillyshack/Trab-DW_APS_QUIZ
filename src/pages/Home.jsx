import { Plus } from "lucide-react";
import styles from "./Home.module.css";
import { LoginContexto } from "../context/LoginContext";
import { GeralContexto } from "../context/GeralContext";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabase.js";
import { Link, useNavigate } from "react-router-dom";
import squirtleMascote from "../assets/images/squirtle-removebg-preview.png";
import Quizz from "../components/Quizz.jsx";

export default function Home() {
  const { usuario, setLoading, pessoa } = useContext(LoginContexto);
  const { quizzPessoa } = useContext(GeralContexto);
  const navigate = useNavigate();

  const [salas, setSalas] = useState([]);

  const handleCardClick = (roomId) => {
    navigate(`/Inicial/SalasQuizzes/${roomId}`);
  };

  async function fetchSalas(userId) {
    if (!userId) return;

    const mockSalas = [
      { id: 101, titulo: "Quiz Matemática I", dono: "Fulano" },
      { id: 102, titulo: "Quiz Português Básico", dono: "Fulano" },
      { id: 103, titulo: "Quiz História", dono: "Fulano" },
      { id: 104, titulo: "Quiz Ciência de Dados", dono: "Fulano" },
    ];
    setSalas(mockSalas);
  }

  useEffect(() => {
    async function fetchUserAndSalas() {
      const userId = await pessoa.id;
      if (userId) {
        console.log("Usuário logado ID:", userId);
        fetchSalas(userId);
      }
    }
    fetchUserAndSalas();
  }, []);

  return (
    <div className={`${styles["tela-principal"]} ${styles.telaPrincipal}`}>
      <div className={styles.container}>
        <section className={styles.criarQuiz}>
          <h1 className={styles.titulo}>Seus Quizzes</h1>
          <div className={styles.gridQuizzes}>
            {quizzPessoa.map((q, index) => (
              <Quizz key={index} titulo={q.titulo} />
            ))}

            <Link
              to="/Inicial/CriarQuizz"
              className={`${styles.cardAdd} doodle-border`}
              title="Criar Quiz"
            >
              <Plus size={40} />
            </Link>
          </div>
        </section>

        <section className={styles.salas}>
          <h1 className={styles.titulo}>Todos os Quizzes:</h1>

          <div className={styles.lista}>
            <Link to={"/Perguntax"}>
              {salas.map((sala) => (
                <div
                  key={sala.id}
                  className={`${styles.cardSala} doodle-border`}
                  onClick={() => handleCardClick(sala.id)}
                >
                  <div>
                    <p className={styles.salaTitulo}>{sala.titulo}</p>
                    <p className={styles.salaDono}>{sala.dono}</p>
                  </div>
                  <span className={styles.online}>Online</span>
                </div>
              ))}
              {salas.length === 0 && <p>Nenhum quiz criado ainda.</p>}
            </Link>
          </div>
        </section>

        <div className={styles.sessao3}>
          <section className={styles.codigo}>
            <h1 className={styles.titulo}>Entrar com código</h1>
            <input
              type="text"
              placeholder="XXX-XXX-XXX"
              className={`${styles.input} doodle-border`}
            />
            <button className={`${styles.botao} doodle-border`}>Entrar</button>
          </section>
          <img
            src={squirtleMascote}
            alt="Mascote Squirtle"
            className={styles.squirtle}
          />
        </div>
      </div>
    </div>
  );
}
