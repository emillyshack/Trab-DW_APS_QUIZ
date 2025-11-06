import styles from "./Login.module.css";
import siteImg from "../assets/images/ImagemSite.png";

function Login() {
  return (
    <div className={`${styles["container"]}`}>
      <div className={`${styles["container-login"]}`}>
        <div className={`${styles["login-dados"]}`}>
          <h1 className={`${styles["titulo-login"]}`}>Login</h1>
          <input
            type="email"
            name="email"
            placeholder="Email"
            id={`${styles["input-email"]}`}
            className={`${styles["input"]}`}
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            id={`${styles["input-senha"]}`}
            className={`${styles["input"]}`}
          />
          <button className={`${styles["botao-entrar"]} doodle-border`}>
            Entrar
          </button>
          <div className={`${styles["linha-ou"]}`}>
            <hr className={`${styles["linha"]}`} />
            <p className={`${styles["texto"]}`}>ou</p>
            <hr className={`${styles["linha"]}`} />
          </div>
        </div>
        <img
          src={siteImg}
          alt="Imagem do site"
          className={`${styles["imagem-site"]}`}
        />
      </div>
    </div>
  );
}

export default Login;
