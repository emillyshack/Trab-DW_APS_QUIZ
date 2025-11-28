import styles from "./Login.module.css";
import siteImg from "../assets/images/ImagemSite.png";
import logo from "../assets/images/Quizzy_logo.png";
import googleIcon from "../assets/images/google-icon.png";
import facebookIcon from "../assets/images/facebook-icon.png";
import pessoaCadastro from "../assets/images/pessoa-cadastro.png";
import gifPikachu from "../assets/images/pikachuCorrendo.gif";
import arbusto from "../assets/images/arbusto-8-bit.png";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { LoginContexto } from "../LoginContext";

function Login() {
  const { usuario, setusuario } = useContext(LoginContexto);
  const [velocidadePikachu, setVelovidadePikachu] = useState(12);

  function diminuirVelPikachu() {
    velocidadePikachu - 3 <= 1
      ? setVelovidadePikachu(1)
      : setVelovidadePikachu((prev) => prev - 3);
    console.log(velocidadePikachu);
  }

  return (
    <div className={`${styles["container"]}`}>
      <img src={logo} alt="Logo do site" className={styles["logo-site"]} />
      <div className={`${styles["container-login"]}`}>
        <div className={styles["container-pikachu"]}>
          <img
            src={arbusto}
            className={styles["arbusto-1"]}
            alt="Arbusto do pikachu"
          />
          <img
            src={gifPikachu}
            alt="Pikachu correndo"
            className={`${styles["pikachu-correndo"]}`}
            style={{ animationDuration: `${velocidadePikachu}s` }}
            onClick={diminuirVelPikachu}
          />
          <img
            src={arbusto}
            className={styles["arbusto-2"]}
            alt="Arbusto do pikachu"
          />
        </div>
        <div className={`${styles["login-dados"]}`}>
          <h1 className={`${styles["titulo-login"]}`}>Login</h1>
          <input
            type="email"
            name="email"
            placeholder="Email"
            id="input-email"
            className={`${styles["input"]}`}
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            id="input-senha"
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
          <div className={styles["container-cadastro"]}>
            <p>Não tem uma conta?</p>
            <div className={styles["cadastro"]} title="Faça seu cadastro">
              <Link
                className={`${styles["botao-cadastro"]} doodle-border`}
                type="button"
                to="/Cadastro"
              >
                Faça o cadastro
              </Link>
              <img
                src={pessoaCadastro}
                alt=""
                className={styles["pessoa-cadastro"]}
              />
            </div>
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
