import { Plus } from "lucide-react";
import styles from "./Home.module.css";
import { LoginContexto } from "../context/LoginContext";
import { GeralContexto } from "../context/GeralContext";
import { useContext, useEffect } from "react";
import { supabase } from "../supabase.js";
import { Link } from "react-router-dom";

export default function Home() {
  const { usuario, setLoading } = useContext(LoginContexto);
  const { getUser, pessoa } = useContext(GeralContexto);

  useEffect(() => {
    async function fetchUser() {
      const session = await supabase.auth.getSession();
      if (session?.data?.session?.user) {
        console.log(session.data.session.user.id);
        getUser(`${session.data.session.user.id}`);
        console.log(pessoa);
      }
    }
    fetchUser();
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

          <div className={`${styles.cardAdd} doodle-border`}>
            <Plus size={40} />
          </div>
        </div>
      </section>

      {/* COLUNA 2 — SALAS CRIADAS (agora clicável) */}
      <section className={styles.salas}>
        <h1 className={styles.titulo}>Salas Criadas</h1>

        <div className={styles.lista}>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`${styles.cardSala} doodle-border`}
              onClick={() => handleCardClick(i)}
            >
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

