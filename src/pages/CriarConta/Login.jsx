import styles from "./Login.module.css";

import siteImg from "../../assets/images/ImagemSite.png";
import logo from "../../assets/images/Quizzy_logo.png";
import googleIcon from "../../assets/images/google-icon.png";
import facebookIcon from "../../assets/images/facebook-icon.png";
import pessoaCadastro from "../../assets/images/pessoa-cadastro.png";
import gifPikachu from "../../assets/images/pikachuCorrendo.gif";
import arbusto from "../../assets/images/arbusto-8-bit.png";
import passbolaAberta from "../../assets/images/passbola-aberta.png";
import passbolaFechada from "../../assets/images/passbola-fechada.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LoginContexto } from "../../context/LoginContext";
import ElementoLogin from "../../components/ElementoLogin";

function Login() {
  const navigate = useNavigate();
  const { logar, carregarSessao, usuario } = useContext(LoginContexto);
  const [velocidadePikachu, setVelovidadePikachu] = useState(12);

  useEffect(() => {
    carregarSessao();

    if (usuario) {
      navigate("/Inicial");
    }
  }, [usuario]);

  const [state, setState] = useState({
    inputEmail: "",
    inputSenha: "",
    errorEmail: false,
    errorSenha: false,
    emailValido: false,
    senhaValido: false,
    mostrarSenha: false,
  });

  const toggleSenha = () => {
    setState((prev) => ({ ...prev, mostrarSenha: !prev.mostrarSenha }));
  };

  const handleLogin = async () => {
    if (verificarEmail() && verificarSenha()) {
      try {
        const logado = await logar(state.inputEmail, state.inputSenha);
        if (logado?.user) {
          console.log("Logado: ", logado);
          navigate("/Inicial");
        } else {
          console.log("Erro no login: ", logado);
          setState((prev) => ({ ...prev, errorEmail: true }));
          setState((prev) => ({ ...prev, emailValido: true }));
          setState((prev) => ({ ...prev, errorSenha: false }));
          setState((prev) => ({ ...prev, senhaValido: false }));
        }
      } catch (e) {
        console.log("Erro no login: ", e.message);
        setState((prev) => ({ ...prev, errorEmail: true }));
        setState((prev) => ({ ...prev, emailValido: false }));
        setState((prev) => ({ ...prev, errorSenha: true }));
        setState((prev) => ({ ...prev, senhaValido: false }));
      }
    } else {
      verificarEmail();
      verificarSenha();
      console.log("Email ou senha inválido! ");
    }
  };

  const verificarEmail = () => {
    if (state.inputEmail.includes("@") && state.inputEmail.includes(".com")) {
      setState((prev) => ({ ...prev, errorEmail: false }));
      setState((prev) => ({ ...prev, emailValido: false }));

      setTimeout(() => {
        setState((prev) => ({ ...prev, emailValido: true }));
      }, 100);
      return true;
    }
    setState((prev) => ({ ...prev, errorEmail: false }));
    setState((prev) => ({ ...prev, emailValido: false }));

    setTimeout(() => {
      setState((prev) => ({ ...prev, errorEmail: true }));
    }, 100);
    return false;
  };

  const verificarSenha = () => {
    if (state.inputSenha.length > 7) {
      setState((prev) => ({ ...prev, errorSenha: false }));
      setState((prev) => ({ ...prev, senhaValido: false }));

      setTimeout(() => {
        setState((prev) => ({ ...prev, senhaValido: true }));
      }, 100);
      return true;
    }
    setState((prev) => ({ ...prev, errorSenha: false }));
    setState((prev) => ({ ...prev, senhaValido: false }));

    setTimeout(() => {
      setState((prev) => ({ ...prev, errorSenha: true }));
      setState((prev) => ({ ...prev, errorSenha: true }));
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
            className={`${styles["input"]} ${
              state.errorEmail ? styles.erro : ""
            } ${state.emailValido ? styles.valido : ""}`}
            onChange={(e) =>
              setState((prev) => ({ ...prev, inputEmail: e.target.value }))
            }
          />
          <div
            className={`${styles["container-input-senha"]} ${
              state.errorSenha ? styles.erro : ""
            }`}
          >
            <input
              type={state.mostrarSenha ? "text" : "password"}
              name="senha"
              placeholder="Senha"
              id="input-senha"
              className={`${styles["input"]} ${styles["input-senha"]} ${
                state.senhaValido ? styles.valido : ""
              }`}
              onChange={(e) =>
                setState((prev) => ({ ...prev, inputSenha: e.target.value }))
              }
            />
            {state.inputSenha ? (
              <button
                title="Ver senha"
                className={styles["mostrar-senha"]}
                onClick={toggleSenha}
              >
                {state.mostrarSenha ? (
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

          <div className={`${styles["container-siginin-with"]}`}>
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
        {/* <img
          src={siteImg}
          alt="Imagem do site"
          className={`${styles["imagem-site"]}`}
        /> */}

        <ElementoLogin verSenha={state.mostrarSenha} />
      </div>
    </div>
  );
}

export default Login;
