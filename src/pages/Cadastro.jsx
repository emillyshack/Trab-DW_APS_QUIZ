import facebookIcon from "../assets/images/facebook-icon.png";
import googleIcon from "../assets/images/google-icon.png";
import styles from "./Cadastro.module.css";

function Cadastro() {
  return (
    <div className={styles["tela-principal"]}>
      <div className={styles["container"]}>
        <h1>Criar Conta</h1>
        <div className={styles["inputs"]}>
          <div className="container-input">
            <label htmlFor="nome">Nome completo:</label>
            <input
              type="text"
              name="nome"
              placeholder="Nome Super Legal da Silva"
              id="input-nome"
              className={`${styles["input"]}`}
            />
          </div>

          <div className="container-input">
            <label htmlFor="usuario">Nome de usuário:</label>
            <input
              type="text"
              name="usuario"
              placeholder="NomeSuperLegal"
              id="input-usuario"
              className={`${styles["input"]}`}
            />
          </div>

          <div className="container-input">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="email_super_legal@email.com"
              id="input-email"
              className={`${styles["input"]}`}
            />
          </div>

          <div className="container-input">
            <label htmlFor="email">Confirmar email:</label>
            <input
              type="email"
              name="email"
              placeholder="email_super_legal@email.com"
              id="input-confirmar-email"
              className={`${styles["input"]}`}
            />
          </div>
        </div>

        <button className={styles["button-criar-conta"]}>Criar Conta</button>

        <div className={`${styles["linha-ou"]}`}>
          <hr className={`${styles["linha"]}`} />
          <p className={`${styles["texto"]}`}>ou</p>
          <hr className={`${styles["linha"]}`} />
        </div>

        <div className={`${styles["container-singin-with"]}`}>
          <div
            className={`${styles["login-google"]} ${styles["singin-with"]}`}
            title="Login com o Google"
          >
            <img
              src={googleIcon}
              alt="Google Icon"
              className={`${styles["icon"]} ${styles["google-icon"]}`}
            />
            <h2>Login com o Google</h2>
          </div>
          <div
            className={`${styles["login-facebook"]} ${styles["singin-with"]}`}
            title="Login com o Facebook"
          >
            <img
              src={facebookIcon}
              alt="Facebook Icon"
              className={`${styles["icon"]} ${styles["facebook-icon"]}`}
            />
            <h2>Login com o Facebook</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
