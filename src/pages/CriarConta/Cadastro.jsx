import logo from "../../assets/images/Quizzy_logo.png";
import pessoaCadastro from "../../assets/images/pessoa-cadastro2.png";
import pessoaOlhoFechado from "../../assets/images/pessoa-olho-fechado.png";
import passbolaAberta from "../../assets/images/passbola-aberta.png";
import passbolaFechada from "../../assets/images/passbola-fechada.png";
import { ArrowLeft } from "lucide-react";
import styles from "./Cadastro.module.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SinginWith from "../../components/SigninWith";
import { LoginContexto } from "../../context/LoginContext";

function Cadastro() {
  const navigate = useNavigate();
  const { cadastrar } = useContext(LoginContexto);
  const [state, setState] = useState({
    //Variáveis da pokebola
    mostrarSenha: false,
    mostrarSenha2: false,
    //Variáveis dos inputs
    inputNome: "",
    inputUsuario: "",
    inputEmail: "",
    inputEmailConfirmar: "",
    inputSenha: "",
    inputSenhaConfirmar: "",
    //Variáveis de input inválido (vermelho)
    errorNome: false,
    errorUsuario: false,
    errorEmail: false,
    errorEmailConfirmar: false,
    errorSenha: false,
    errorSenhaConfirmar: false,
    //Variáveis de input válido (verde)
    validoNome: false,
    validoUsuario: false,
    validoEmail: false,
    validoEmailConfirmar: false,
    validoSenha: false,
    validoSenhaConfirmar: false,
  });
  

  useEffect(() => {
    verificarEscritaEmail(state.inputEmail);
    // console.log(state.validoEmail);
  }, [state.inputEmail]);

  useEffect(() => {
    verificarEscritaEmail(state.inputEmailConfirmar);
  }, [state.inputEmailConfirmar]);

  useEffect(() => {
    verificarNome();
  }, [state.inputNome]);

  useEffect(() => {
    verificarUsuario();
  }, [state.inputUsuario]);

  const animacaoErro = (input) => {
    setState((prev) => ({ ...prev, [`error${input}`]: false }));
    setState((prev) => ({ ...prev, [`valido${input}`]: false }));
    setTimeout(() => {
      setState((prev) => ({ ...prev, [`error${input}`]: true }));
    }, 100);
    return true;
  };

  const animacaoValido = (input) => {
    setState((prev) => ({ ...prev, [`valido${input}`]: false }));
    setState((prev) => ({ ...prev, [`error${input}`]: false }));
    setTimeout(() => {
      setState((prev) => ({ ...prev, [`valido${input}`]: true }));
    }, 100);
    return false;
  };

  const verificarEscritaEmail = (email) => {
    if (!email) return;

    // Regex com os caracteres inválidos
    const regexInvalidos = /[\s,;!#()´`~^ç\/]/;

    const campo = email === state.inputEmail ? "Email" : "EmailConfirmar";

    if (regexInvalidos.test(email)) {
      return animacaoErro(campo);
    }

    return animacaoValido(campo);
  };

  const verificarConfirmarSenha = () => {
    if (!state.inputSenha) {
      return animacaoErro("Senha");
    } else if (!state.inputSenhaConfirmar) {
      return animacaoErro("SenhaConfirmar");
    } else if (
      state.inputSenha.length < 8 ||
      state.inputSenhaConfirmar.length < 8
    ) {
      animacaoErro("Senha");
      return animacaoErro("SenhaConfirmar");
    } else if (state.inputSenha.includes(" ")) {
      return animacaoErro("Senha");
    } else if (state.inputSenha != state.inputSenhaConfirmar) {
      return animacaoErro("Senha");
    }
    animacaoValido("SenhaConfirmar");
    return animacaoValido("Senha");
  };

  const verificarConfirmarEmail = () => {
    if (!state.inputEmail || !state.inputEmailConfirmar) {
      return animacaoErro("Email");
    } else if (state.inputEmail != state.inputEmailConfirmar) {
      animacaoErro("EmailConfirmar");
      return animacaoErro("Email");
    } else if (!state.inputEmail.includes("@")) {
      return animacaoErro("Email");
    }
    animacaoValido("EmailConfirmar");
    return animacaoValido("Email");
  };

  const verificarNome = () => {
    if (!state.inputNome) {
      return;
    }
    const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ'’\-\. ]+$/;
    if (!regexNome.test(state.inputNome)) {
      return animacaoErro("Nome");
    }
    return animacaoValido("Nome");
  };

  const verificarUsuario = () => {
    if (!state.inputUsuario) {
      return;
    }
    const regexUsuario = /^[A-Za-z0-9._-]+$/;

    if (!regexUsuario.test(state.inputUsuario)) {
      return animacaoErro("Usuario");
    }
    return animacaoValido("Usuario");
  };

  const toggleSenha = () => {
    setState((prev) => ({ ...prev, mostrarSenha: !prev.mostrarSenha }));
  };

  const toggleSenha2 = () => {
    setState((prev) => ({ ...prev, mostrarSenha2: !prev.mostrarSenha2 }));
  };

  async function handleCadastrar() {
    if (
      verificarConfirmarEmail() ||
      verificarConfirmarSenha() ||
      verificarNome() ||
      verificarUsuario()
    ) {
      return;
    }
    try {
      const novoUser = await cadastrar(
        state.inputNome,
        state.inputUsuario,
        state.inputEmail,
        state.inputSenha
      );
      console.log("Usuário cadastrado com sucesso: ", novoUser);
    } catch (error) {
      console.log("Erro ao cadastrar usuário: ", error.mensage);
    }
    console.log(state);
    const confirmado = window.confirm("Usuário cadastrado com sucesso!");
    if (confirmado) {
      navigate("/");
    }
  }

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
      <div className={styles.voltar}>
        <h2>Voltar à tela de Login</h2>
        <div
          className={`${styles["botao-voltar"]} circle-border`}
          onClick={() => navigate("/")}
          title="Clique para voltar"
        >
          <div className={styles["div-seta"]}>
            <ArrowLeft className={styles.arrow} />
          </div>
        </div>
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
              className={`${styles["input"]} ${
                state.errorNome ? styles.erro : ""
              } ${state.validoNome ? styles.valido : ""}`} // Adicionado 'valido'
              onChange={(e) =>
                setState((prev) => ({ ...prev, inputNome: e.target.value }))
              }
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
                state.errorUsuario ? styles.erro : ""
              } ${state.validoUsuario ? styles.valido : ""}`} // Adicionado 'valido'
              onChange={(e) =>
                setState((prev) => ({ ...prev, inputUsuario: e.target.value }))
              }
            />
          </div>

          <div className={styles["container-input"]}>
            <label htmlFor="input-email">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="email_super_legal@email.com"
              id="input-email"
              className={`${styles["input"]} ${
                state.errorEmail ? styles.erro : ""
              } ${state.validoEmail ? styles.valido : ""}`} // Adicionado 'valido'
              onChange={(e) => {
                setState((prev) => ({ ...prev, inputEmail: e.target.value }));
              }}
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
                state.errorEmailConfirmar ? styles.erro : ""
              } ${state.validoEmailConfirmar ? styles.valido : ""}`} // Adicionado 'valido'
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  inputEmailConfirmar: e.target.value,
                }))
              }
            />
          </div>

          <div className={styles["container-input"]}>
            <label htmlFor="input-senha">Senha:</label>
            <div className={styles["container-input-senha"]}>
              <input
                type={state.mostrarSenha ? "text" : "password"}
                name="senha"
                placeholder="1234..."
                id="input-senha"
                className={`${styles["input"]} ${styles["input-senha"]} ${
                  state.errorSenha ? styles.erro : ""
                } ${state.validoSenha ? styles.valido : ""}`} // Adicionado 'erro' e 'valido'
                onChange={(e) => {
                  setState((prev) => ({ ...prev, inputSenha: e.target.value }));
                }}
              />
              {state.inputSenha ? (
                <button
                  title="Ver senha"
                  className={styles["mostrar-senha"]}
                  onClick={toggleSenha}
                >
                  {state.mostrarSenha ? (
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
                type={state.mostrarSenha2 ? "text" : "password"}
                name="senha-confirmar"
                placeholder="1234..."
                id="input-confirmar-senha"
                className={`${styles["input"]} ${styles["input-senha"]} ${
                  state.errorSenhaConfirmar ? styles.erro : ""
                } ${state.validoSenhaConfirmar ? styles.valido : ""}`} // Adicionado 'erro' e 'valido'
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    inputSenhaConfirmar: e.target.value,
                  }))
                }
              />
              {state.inputSenhaConfirmar ? (
                <button
                  title="Ver senha"
                  className={styles["mostrar-senha"]}
                  onClick={toggleSenha2}
                >
                  {state.mostrarSenha2 ? (
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
          onClick={handleCadastrar}
        >
          Criar Conta
        </button>

        <div className={`${styles["linha-ou"]}`}>
          <hr className={`${styles["linha"]}`} />
          <p className={`${styles["texto"]}`}>ou</p>
          <hr className={`${styles["linha"]}`} />
        </div>

        <SinginWith />
        {state.mostrarSenha || state.mostrarSenha2 ? (
          <img
            src={pessoaOlhoFechado}
            alt="Pessoa Cadastro"
            className={styles["img-pessoa"]}
            title="To vendo nadinha"
          />
        ) : (
          <img
            src={pessoaCadastro}
            alt="Pessoa Cadastro"
            className={styles["img-pessoa"]}
            title="Já fez o cadastro?"
          />
        )}
      </div>
    </div>
  );
}

export default Cadastro;
