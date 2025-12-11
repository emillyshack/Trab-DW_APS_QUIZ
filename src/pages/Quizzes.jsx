import { Link } from "react-router-dom";
import styles from "./Quizzes.module.css";
import { LoginContexto } from "../context/LoginContext";
import { GeralContexto } from "../context/GeralContext";
import { useContext, useState, useEffect } from "react";
import { supabase } from "../supabase.js";

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
    <div className={styles["tela-principal"]}>
      <h1>Pagina Inicial</h1>
      <Link
        to="/"
        className={`${styles["linkClass"]} ${styles["azul"]} doodle-border`}
      >
        Login
      </Link>
    </div>
  );
}
