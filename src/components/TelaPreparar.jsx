import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TelaPreparar.module.css";  // AGORA COMO MODULE

export default function TelaPreparar() {
  const [tempo, setTempo] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => setTempo(t => t - 1), 1000);

    if (tempo === 0) navigate("/Perguntax");

    return () => clearInterval(interval);

  }, [tempo, navigate]);

  return (
    <div className={styles.prepContainer}>
      <div className={styles.prepCard}>

        <div className={styles.timerCircle}>
          <span>{tempo}s</span>
        </div>

        <h2 className={styles.prepTitle}>Para começar o Quiz!</h2>

        <button className={styles.prepBtn} onClick={() => navigate("/Perguntax")}>
         Pronto!
        </button>

        <p className={styles.txtPequeno}>Preparado???</p>

      </div>
    </div>
  );
}
