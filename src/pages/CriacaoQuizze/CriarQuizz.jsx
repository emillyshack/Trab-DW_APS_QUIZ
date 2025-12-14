import styles from "./CriarQuizz.module.css";
import BotaoAdd from "../../components/BotaoAdicionarPerg";
import Pergunta from "../../components/Pergunta";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import {
  LockKeyhole,
  LockOpen,
  Eye,
  EyeOff,
  Settings,
  Plus,
} from "lucide-react";

import { GeralContexto } from "../../context/GeralContext";

// ===================================================================
// Função auxiliar para gerar senha aleatória
// ===================================================================
const generateRandomPassword = (length = 12) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// ===================================================================
// Componente principal
// ===================================================================
function CriarQuizz() {
  const navigate = useNavigate();

  const {
    pessoa,
    setQuizzId,
    inputPerguntas,
    inputQuizz,
    setInputQuizz,
    setInputPerguntas,
    setInputAlternativas,
  } = useContext(GeralContexto);

  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const [isDisabled, setIsDisabled] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // removido selected — agora só existe inputQuizz.materias
  const [tags, setTags] = useState([]);

  const LockIcon = isDisabled ? LockKeyhole : LockOpen;
  const EyeIcon = isPasswordVisible ? EyeOff : Eye;

  const handleLockToggle = () => {
    setIsDisabled((prev) => !prev);
  };

  const handleVisibilityToggle = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleGeneratePassword = () => {
    const newPassword = generateRandomPassword();
    setInputQuizz((prev) => ({
      ...prev,
      senha: newPassword,
      confirmarSenha: newPassword,
    }));
    setIsDisabled(false);
  };

  const handleFotoClick = () => inputRef.current.click();

  const handleArquivoChange = (e) => {
    const arquivo = e.target.files[0];
    if (arquivo) {
      const url = URL.createObjectURL(arquivo);
      setPreview(url);
    }
  };

  // ===============================
  // addTags agora usa inputQuizz.materias
  // ===============================
  const addTags = () => {
    if (!inputQuizz.materias || tags.includes(inputQuizz.materias)) return;

    setTags([...tags, inputQuizz.materias]);

    // limpa o select
    setInputQuizz((prev) => ({
      ...prev,
      materias: "",
    }));
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // ===================================================================
  // FUNÇÕES DE BANCO DE DADOS
  // ===================================================================
  async function criarQuizzBanco(titulo, senha) {
    const { data, error } = await supabase
      .from("quizzes")
      .insert({
        pessoa_id: pessoa?.id,
        titulo: titulo,
        senha: senha,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Erro ao criar Quizz:", error);
      return;
    }

    setQuizzId(data.id);
    return data;
  }

  const botaoCriarQuizz = async () => {
    console.log(inputQuizz.titulo, inputQuizz.senha);
    const quizz = await criarQuizzBanco(inputQuizz.titulo, inputQuizz.senha);
    if (!quizz) {
      alert("Erro ao criar quizz");
    }
  };

  const botaoCancelar = () => {
    // Resetar o formulário do quizz
    setInputQuizz({
      titulo: "",
      senha: "",
      confirmarSenha: "",
      materias: "",
    });

    // Resetar perguntas e alternativas
    setInputPerguntas([]);
    setInputAlternativas([]);

    // Resetar tags e preview da imagem
    setTags([]);
    setPreview(null);
    navigate("/Inicial");
  };

  return (
    <div className={styles["tela-principal"]}>
      <div className={styles.container}>
        <span className={styles["titulo-criar"]}>
          <h1>Criar Quiz!</h1>
        </span>

        <div className={styles["elmt_1-2-3"]}>
          {/* ============================= IMAGEM ============================= */}
          <div className={styles["elemento-1"]}>
            <div className={`${styles.hbz}`} onClick={handleFotoClick}>
              {preview ? (
                <img
                  src={preview}
                  alt="Foto de perfil"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span>+</span>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={inputRef}
              onChange={handleArquivoChange}
              style={{ display: "none" }}
            />
          </div>

          {/* ======================== TÍTULO + SENHA ======================== */}
          <div className={styles["elemento-2"]}>
            <label>Título:</label>
            <input
              type="text"
              placeholder="Este é o Título do seu Quizz"
              className={`${styles["nome-quizz"]} doodle-border`}
              value={inputQuizz.titulo}
              onChange={(e) =>
                setInputQuizz((prev) => ({ ...prev, titulo: e.target.value }))
              }
            />

            <div className={styles.column}>
              <label>Senha:</label>

              <div className={styles.padrao1}>
                <button
                  className={styles["priv-trancada"]}
                  onClick={handleLockToggle}
                  title={isDisabled ? "Desbloquear Edição" : "Bloquear Edição"}
                >
                  <LockIcon />
                </button>

                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Digitar Senha"
                  className={`${styles["senha-quizz"]} doodle-border`}
                  value={inputQuizz.senha}
                  onChange={(e) =>
                    setInputQuizz((prev) => ({
                      ...prev,
                      senha: e.target.value,
                    }))
                  }
                  disabled={isDisabled}
                />

                <div className={styles.padrao2}>
                  <input
                    type="password"
                    placeholder="Confirmar Senha"
                    className={`${styles["senha-confir"]} doodle-border`}
                    value={inputQuizz.confirmarSenha}
                    onChange={(e) =>
                      setInputQuizz((prev) => ({
                        ...prev,
                        confirmarSenha: e.target.value,
                      }))
                    }
                    disabled={isDisabled}
                  />

                  <button
                    className={styles["vizualizar-senha"]}
                    onClick={handleVisibilityToggle}
                    title={
                      isPasswordVisible ? "Ocultar Senha" : "Visualizar Senha"
                    }
                  >
                    <EyeIcon />
                  </button>

                  <button
                    className={styles["gerar-senha"]}
                    onClick={handleGeneratePassword}
                    title="Gerar Senha Aleatória"
                  >
                    <Settings />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ============================= MATÉRIAS ============================= */}
          <div className={styles["elemento-3"]}>
            <div className={styles.column}>
              <h1>Matérias</h1>

              <div className={`${styles["materias"]} doodle-border`}>
                <div className={styles.column}>
                  <div className={styles.adicionar}>
                    <select
                      className={styles["select-materias"]}
                      value={inputQuizz.materias}
                      onChange={(e) =>
                        setInputQuizz((prev) => ({
                          ...prev,
                          materias: e.target.value,
                        }))
                      }
                    >
                      <option value="">Selecione</option>
                      <option value="Portugues">Português</option>
                      <option value="Matematica">Matemática</option>
                      <option value="Historia">História</option>
                      <option value="Geografia">Geografia</option>
                      <option value="Ciencias">Ciências</option>
                      <option value="Biologia">Biologia</option>
                      <option value="Fisica">Física</option>
                      <option value="Quimica">Química</option>
                      <option value="Ingles">Inglês</option>
                      <option value="Artes">Artes</option>
                      <option value="EducacaoFisica">Educação Física</option>
                      <option value="Filosofia">Filosofia</option>
                      <option value="Sociologia">Sociologia</option>
                    </select>

                    <button
                      onClick={addTags}
                      className={styles["adicionar-tag"]}
                    >
                      <Plus />
                    </button>
                  </div>

                  <div className={styles["lista-materias"]}>
                    {tags.map((tag) => (
                      <div
                        key={tag}
                        onClick={() => removeTag(tag)}
                        className={styles.tag}
                      >
                        {tag} ×
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================= PERGUNTAS ============================= */}
        <nav className={styles["titulo-perguntas"]}>
          <h2>Adicionar Perguntas:</h2>
        </nav>

        <div className={styles["elmt_4-5"]}>
          <div className={styles["elemento-4"]}>
            {inputPerguntas.map((p, index) => (
              <Pergunta key={index} pergunta={p.pergunta} />
            ))}

            <BotaoAdd />
          </div>

          <div className={styles.column}>
            <Link to="/Inicial">
              <button
                onClick={botaoCriarQuizz}
                className={`${styles["salvar-mudancas"]} doodle-border`}
              >
                Criar Quizz
              </button>
            </Link>

            <br />

            <button
              onClick={botaoCancelar}
              className={`${styles["cancelar-quizz"]} doodle-border`}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CriarQuizz;
