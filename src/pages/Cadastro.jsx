import facebookIcon from "../assets/images/facebook-icon.png";
import googleIcon from "../assets/images/google-icon.png";
import logo from "../assets/images/Quizzy_logo.png";
import pessoaCadastro from "../assets/images/pessoa-cadastro2.png";
import passbolaAberta from "../assets/images/passbola-aberta.png";
import passbolaFechada from "../assets/images/passbola-fechada.png";
import styles from "./Cadastro.module.css";
import { useState } from "react";

function Cadastro() {
  //Variáveis da pokebola
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarSenha2, setMostrarSenha2] = useState(false);
  //Variáveis dos inputs
  const [inputNome, setInputNome] = useState("");
  const [inputUsuario, setInputUsuario] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputEmailConfirmar, setInputEmailConfirmar] = useState("");
  const [inputSenha, setInputSenha] = useState("");
  const [inputSenhaConfirmar, setInputSenhaConfirmar] = useState("");
  //Variáveis de input inválido (vermelho)
  const [errorNome, setErrorNome] = useState(false);
  const [errorUsuario, setErrorUsuario] = useState(false);
  const [errorSenha, setErrorSenha] = useState(false);
  const [errorSenhaConfirmar, setErrorSenhaConfirmar] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailConfirmar, setErrorEmailConfirmar] = useState(false);
  //Variáveis de input válido (verde)
  const [validoNome, setValidoNome] = useState(false);
  const [validoUsuario, setValidoUsuario] = useState(false);
  const [validoSenha, setValidoSenha] = useState(false);
  const [validoSenhaConfirmar, setValidoSenhaConfirmar] = useState(false);
  const [validoEmail, setValidoEmail] = useState(false);
  const [validoEmailConfirmar, setValidoEmailConfirmar] = useState(false);

  const toggleSenha = () => {
    setMostrarSenha((prev) => !prev);
  };

  const toggleSenha2 = () => {
    setMostrarSenha2((prev) => !prev);
  };

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
              className={`${styles["input"]} ${errorNome ? styles.erro : ""}`}
              onChange={(e) => setInputNome(e.target.value)}
            />
          </div>

          <div className={styles["container-input"]}>
            <label htmlFor="input-usuario">Nome de usuário:</label>
            <input
              type="text"
              name="usuario"
              placeholder="NomeSuperLegal"
              id="input-usuario"
              className={`${styles["input"]} ${
                errorUsuario ? styles.erro : ""
              }`}
              onChange={(e) => setInputUsuario(e.target.value)}
            />
          </div>

          <div className={styles["container-input"]}>
            <label htmlFor="input-email">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="email_super_legal@email.com"
              id="input-email"
              className={`${styles["input"]} ${errorEmail ? styles.erro : ""}`}
              onChange={(e) => setInputEmail(e.target.value)}
            />
          </div>

          <div className={styles["container-input"]}>
            <label htmlFor="input-confirmar-email">Confirmar email:</label>
            <input
              type="email"
              name="email-confirmar"
              placeholder="email_super_legal@email.com"
              id="input-confirmar-email"
              className={`${styles["input"]} ${
                errorEmailConfirmar ? styles.erro : ""
              }`}
              onChange={(e) => setInputEmailConfirmar(e.target.value)}
            />
          </div>

          <div className={styles["container-input"]}>
            <label htmlFor="input-senha">Senha:</label>
            <div className={styles["container-input-senha"]}>
              <input
                type={mostrarSenha ? "text" : "password"}
                name="senha"
                placeholder="1234..."
                id="input-senha"
                className={`${styles["input"]} ${styles["input-senha"]}`}
                onChange={(e) => {
                  setInputSenha(e.target.value);
                }}
              />
              {inputSenha ? (
                <button
                  title="Ver senha"
                  className={styles["mostrar-senha"]}
                  onClick={toggleSenha}
                >
                  {mostrarSenha ? (
                    <img
                      src={passbolaAberta}
                      alt="Mostrar senha"
                      className={styles["pokebola"]}
                    />
                  ) : (
                    <img
                      className={styles.pokebola}
                      src={passbolaFechada}
                      alt="Não mostrar senha"
                    />
                  )}
                </button>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className={styles["container-input"]}>
            <label htmlFor="input-confirmar-senha">Confirmar senha:</label>
            <div className={styles["container-input-senha"]}>
              <input
                type={mostrarSenha2 ? "text" : "password"}
                name="senha-confirmar"
                placeholder="1234..."
                id="input-confirmar-senha"
                className={`${styles["input"]} ${styles["input-senha"]}`}
                onChange={(e) => setInputSenhaConfirmar(e.target.value)}
              />
              {inputSenhaConfirmar ? (
                <button
                  title="Ver senha"
                  className={styles["mostrar-senha"]}
                  onClick={toggleSenha2}
                >
                  {mostrarSenha2 ? (
                    <img
                      src={passbolaAberta}
                      alt="Mostrar senha"
                      className={styles["pokebola"]}
                    />
                  ) : (
                    <img
                      className={styles.pokebola}
                      src={passbolaFechada}
                      alt="Não mostrar senha"
                    />
                  )}
                </button>
              ) : (
                ""
              )}
            </div>
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
