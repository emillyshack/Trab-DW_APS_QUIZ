import styles from "./Login.module.css";
import LoadingLogin from "../components/LoadingLogin";
import siteImg from "../assets/images/ImagemSite.png";
import logo from "../assets/images/Quizzy_logo.png";
import googleIcon from "../assets/images/google-icon.png";
import facebookIcon from "../assets/images/facebook-icon.png";
import pessoaCadastro from "../assets/images/pessoa-cadastro.png";
import gifPikachu from "../assets/images/pikachuCorrendo.gif";
import arbusto from "../assets/images/arbusto-8-bit.png";
import passbolaAberta from "../assets/images/passbola-aberta.png";
import passbolaFechada from "../assets/images/passbola-fechada.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { LoginContexto } from "../LoginContext";

function Login() {
  const navigate = useNavigate();
  const { usuario, setusuario, logar, loading } = useContext(LoginContexto);
  const [velocidadePikachu, setVelovidadePikachu] = useState(12);
  const [inputEmail, setInputEmail] = useState("");
  const [inputSenha, setInputSenha] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorSenha, setErrorSenha] = useState(false);
  const [emailValido, setEmailValido] = useState(false);
  const [senhaValido, setSenhaValido] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const toggleSenha = () => {
    setMostrarSenha((prev) => !prev);
  };

  const handleLogin = async () => {
    if (verificarEmail() && verificarSenha()) {
      try {
        const logado = await logar(inputEmail, inputSenha);
        if (logado?.user) {
          console.log("Logado: ", logado);
          navigate("/Inicial");
        } else {
          console.log("Erro no login: ", logado);
          setErrorEmail(true);
          setErrorSenha(true);
          setEmailValido(false);
          setSenhaValido(false);
        }
      } catch (e) {
        console.log("Erro no login: ", e.message);
        setErrorEmail(true);
        setEmailValido(false);
        setErrorSenha(true);
        setSenhaValido(false);
      }
    } else {
      verificarEmail();
      verificarSenha();
      console.log("Email ou senha inválido! ");
    }
  };

  const verificarEmail = () => {
    if (inputEmail.includes("@") && inputEmail.includes(".com")) {
      setErrorEmail(false);
      setEmailValido(false);

      setTimeout(() => {
        setEmailValido(true);
      }, 100);
      return true;
    }
    setErrorEmail(false);
    setEmailValido(false);

    setTimeout(() => {
      setErrorEmail(true);
    }, 100);
    return false;
  };

  const verificarSenha = () => {
    if (inputSenha.length > 7) {
      setErrorSenha(false);
      setSenhaValido(false);

      setTimeout(() => {
        setSenhaValido(true);
      }, 100);
      return true;
    }
    setErrorSenha(false);
    setSenhaValido(false);

    setTimeout(() => {
      setErrorSenha(true);
    }, 100);
    return false;
  };

  function diminuirVelPikachu() {
    velocidadePikachu - 3 <= 1
      ? setVelovidadePikachu(1)
      : setVelovidadePikachu((prev) => prev - 3);
    console.log(velocidadePikachu);
  }

  return (
    <div className={`${styles["container"]}`}>
      {loading ? <LoadingLogin /> : ""}
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
            className={`${styles["input"]} ${errorEmail ? styles.erro : ""} ${
              emailValido ? styles.valido : ""
            }`}
            onChange={(e) => setInputEmail(e.target.value)}
          />
          <div
            className={`${styles["container-input-senha"]} ${
              errorSenha ? styles.erro : ""
            }`}
          >
            <input
              type={mostrarSenha ? "text" : "password"}
              name="senha"
              placeholder="Senha"
              id="input-senha"
              className={`${styles["input"]} ${styles["input-senha"]} ${
                senhaValido ? styles.valido : ""
              }`}
              onChange={(e) => setInputSenha(e.target.value)}
            />
            {inputSenha ? (
              <button
                title="Ver senha"
                className={styles["mostrar-senha"]}
                onClick={toggleSenha}
              >
                {mostrarSenha ? (
                  <img
                    className={styles["pokebola"]}
                    src={passbolaAberta}
                    alt="Mostrar senha"
                  />
                ) : (
                  <img
                    className={styles["pokebola"]}
                    src={passbolaFechada}
                    alt="Não mostrar senha"
                  />
                )}{" "}
              </button>
            ) : (
              ""
            )}
          </div>

          <button
            onClick={handleLogin}
            className={`${styles["botao-entrar"]} doodle-border`}
          >
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
