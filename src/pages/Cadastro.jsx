import facebookIcon from "../assets/images/facebook-icon.png";
import googleIcon from "../assets/images/google-icon.png";
import logo from "../assets/images/Quizzy_logo.png";
import pessoaCadastro from "../assets/images/pessoa-cadastro2.png";
import styles from "./Cadastro.module.css";

function Cadastro() {
  return (
    <div className={styles["tela-principal"]}>
      <div className={styles["nav-logo"]}>
        <img
          src={logo}
          alt="Logo do site"
          className={styles["logo-site"]}
          title="Quizzy"
        />
      </div>
      <div className={styles["container"]}>
        <h1>Criar Conta</h1>
        <div className={styles["inputs"]}>
          <div className={styles["container-input"]}>
            <label htmlFor="input-nome">Nome completo:</label>
            <input
              type="text"
              name="nome"
              placeholder="Nome Super Legal da Silva"
              id="input-nome"
              className={`${styles["input"]}`}
            />
          </div>

          <div className={styles["container-input"]}>
            <label htmlFor="input-usuario">Nome de usuário:</label>
            <input
              type="text"
              name="usuario"
              placeholder="NomeSuperLegal"
              id="input-usuario"
              className={`${styles["input"]}`}
            />
          </div>

          <div className={styles["container-input"]}>
            <label htmlFor="input-email">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="email_super_legal@email.com"
              id="input-email"
              className={`${styles["input"]}`}
              autoComplete="email"
            />
          </div>

          <div className={styles["container-input"]}>
            <label htmlFor="input-confirmar-email">Confirmar email:</label>
            <input
              type="email"
              name="email-confirmar"
              placeholder="email_super_legal@email.com"
              id="input-confirmar-email"
              className={`${styles["input"]}`}
              autoComplete="email"
            />
          </div>

          <div className={styles["container-input"]}>
            <label htmlFor="input-confirmar-email">Senha:</label>
            <input
              type="password"
              name="senha"
              placeholder="1234..."
              id="input-senha"
              className={`${styles["input"]}`}
            />
          </div>

          <div className={styles["container-input"]}>
            <label htmlFor="input-confirmar-email">Confirmar senha:</label>
            <input
              type="password"
              name="senha-confirmar"
              placeholder="1234..."
              id="input-confirmar-senha"
              className={`${styles["input"]}`}
            />
          </div>
        </div>

        <button
          title="Está pronto para sua nova jornada?"
          className={`${styles["botao-criar-conta"]} doodle-border`}
        >
          Criar Conta
        </button>

        <div className={`${styles["linha-ou"]}`}>
          <hr className={`${styles["linha"]}`} />
          <p className={`${styles["texto"]}`}>ou</p>
          <hr className={`${styles["linha"]}`} />
        </div>

        <div className={`${styles["container-singin-with"]}`}>
          <div
            className={`${styles["singin-with"]}`}
            title="Cadastro com o Google"
          >
            <img
              src={googleIcon}
              alt="Google Icon"
              className={`${styles["icon"]} ${styles["google-icon"]}`}
            />
            <h2>Criar conta com o Google</h2>
          </div>
          <div
            className={`${styles["singin-with"]}`}
            title="Cadastro com o Facebook"
          >
            <img
              src={facebookIcon}
              alt="Facebook Icon"
              className={`${styles["icon"]} ${styles["facebook-icon"]}`}
            />
            <h2>Criar conta com o Facebook</h2>
          </div>
        </div>
        <img
          src={pessoaCadastro}
          alt="Pessoa Cadastro"
          className={styles["img-pessoa"]}
          title="Já fez o cadastro?"
        />
      </div>
    </div>
  );
}

export default Cadastro;
