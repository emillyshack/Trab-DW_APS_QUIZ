import { Plus } from "lucide-react";
import styles from "./Home.module.css";
import { LoginContexto } from "../context/LoginContext";
import { GeralContexto } from "../context/GeralContext";
import { useContext, useEffect, useState } from "react"; 
import { supabase } from "../supabase.js";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const { usuario, setLoading } = useContext(LoginContexto);
  const { getUser, pessoa } = useContext(GeralContexto);
  const navigate = useNavigate();


  const [salas, setSalas] = useState([]);

 
  const handleCardClick = (roomId) => {

    navigate(`/SalasQuizzes/${roomId}`); 
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


    /*
    // ✅ Lógica de busca real no Supabase:
    setLoading(true);
    const { data, error } = await supabase
      .from('sua_tabela_de_quizzes') 
      .select('id, titulo, dono') // Ajuste os campos
      .eq('dono_id', userId); 

    if (error) {
      console.error("Erro ao buscar salas:", error);
    } else {
      setSalas(data);
    }
    setLoading(false);
    */
  }


  useEffect(() => {
    async function fetchUserAndSalas() {
      const session = await supabase.auth.getSession();
      const userId = session?.data?.session?.user?.id;
      
      if (userId) {
        console.log("Usuário logado ID:", userId);
        getUser(userId); // Busca informações adicionais do usuário
        fetchSalas(userId); // Busca as salas criadas
      }
    }
    fetchUserAndSalas();
  }, []); 
  return (
    <div className={`${styles["tela-principal"]} ${styles.telaPrincipal}`}>
      <div className={styles.container}>
        {/* COLUNA 1 — CRIAR QUIZ */}
        <section className={styles.criarQuiz}>
          <h1 className={styles.titulo}>Criar Quiz</h1>

          <div className={styles.gridQuizzes}>
            <div className={`${styles.cardQuiz} doodle-border`}>Quiz 1</div>
            <div className={`${styles.cardQuiz} doodle-border`}>Quiz 2</div>
            <div className={`${styles.cardQuiz} doodle-border`}>Quiz 3</div>

            {}
            {}
            <Link to="/CriarQuizzes" className={`${styles.cardAdd} doodle-border`}>
              <Plus size={40} />
            </Link>
          </div>
        </section>

        ---

        {/* COLUNA 2 — SALAS CRIADAS (agora dinâmico e clicável) */}
        <section className={styles.salas}>
          <h1 className={styles.titulo}>Salas Criadas</h1>

          <div className={styles.lista}>
            {}
            {salas.map((sala) => (
              <div
                key={sala.id}
                className={`${styles.cardSala} doodle-border`}
                // 2° PONTO: Chama a função de navegação com o ID da sala
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
          </div>
        </section>

        ---

        {/* COLUNA 3 — ENTRAR COM CÓDIGO */}
        <section className={styles.codigo}>
          <h1 className={styles.titulo}>Entrar com código</h1>

          <input
            type="text"
            placeholder="XXX-XXX-XXX"
            className={`${styles.input} doodle-border`}
          />

          <button className={`${styles.botao} doodle-border`}>Entrar</button>

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