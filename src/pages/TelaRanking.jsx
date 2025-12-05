import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import "./TelaRanking.css"; // você cria o CSS depois

export default function TelaRanking() {
  const [ranking, setRanking] = useState([]);
  const [usuarioAtual, setUsuarioAtual] = useState(null);

  useEffect(() => {
    buscarRanking();
    const u = localStorage.getItem("ultimoUsuario"); 
    if (u) setUsuarioAtual(u);
  }, []);

  async function buscarRanking() {
    const { data, error } = await supabase
      .from("ranking")
      .select("*")
      .order("acertos", { ascending: false })
      .order("erros", { ascending: true });

    if (error) console.error(error);
    else setRanking(data);
  }

  return (
    <div className="ranking-container">
      <div className="ranking-card">
        <h1 className="titulo">Ranking Atual</h1>

        <div className="lista-ranking">
          {ranking.map((item, index) => {
            const isUser = item.usuario === usuarioAtual;

            return (
              <div 
                key={item.id}
                className={`linha-ranking ${isUser ? "eu" : ""}`}
              >
                <span className="posicao">{index + 1}º</span>
                <span className="nome">{item.usuario}</span>
                <span className="pontos">
                  #{item.acertos * 100 - item.erros * 10}
                </span>
              </div>
            );  
          })}
        </div>
      </div>
    </div>
  );
}
