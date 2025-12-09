import styles from "./CriarQuizz.module.css";
import BotaoAdd from "../../components/BotaoAdicionarPerg";
import { useState, useRef, use, useContext } from "react";
import GeralContexto from "../../context/GeralContext";
import { LockKeyhole, Settings, Eye, Plus } from "lucide-react";

function CriarQuizz() {
  const [preview, setPreview] = useState(null);
  const { novaPergunta, novaAlternativa, setNovaPergunta, setNovaAlternativa } =
    useContext(GeralContexto);
  const inputRef = useRef(null);

  const handleFotoClick = () => inputRef.current.click();

  const handleArquivoChange = (e) => {
    const arquivo = e.target.files[0];
    if (arquivo) {
      const url = URL.createObjectURL(arquivo);
      setPreview(url);
    }
  };

  const [selected, setSelected] = useState("");
  const [tags, setTags] = useState([]);

  function addTags() {
    if (!selected || tags.includes(selected)) return;
    setTags([...tags, selected]);
    setSelected("");
  }

  function removeTag(tag) {
    setTags(tags.filter((t) => t !== tag));
  }

  return (
    <div className={styles["tela-principal"]}>
      <div className={styles.container}>
        <nav className={styles["titulo-criar"]}>
          <h1>Criar Quiz!</h1>
        </nav>

        <div className={styles["elmt_1-2-3"]}>
          {/* IMAGEM */}
          <div className={styles["elemento-1"]}>
            <div
              className={`${styles["imagem-quizz"]} ${styles.hbz}`}
              onClick={handleFotoClick}
            >
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

          {/* TÍTULO + SENHA */}
          <div className={styles["elemento-2"]}>
            <label>Título:</label>
            <input
              type="text"
              placeholder="Este é o Título do seu Quizz"
              className={`${styles["nome-quizz"]} doodle-border`}
            />

            <div className={styles.column}>
              <label>Senha:</label>
              <div className={styles.padrao1}>
                <button className={styles["priv-trancada"]}>
                  <LockKeyhole />
                </button>

                <input
                  type="text"
                  placeholder="Digitar Senha"
                  className={`${styles["senha-quizz"]} doodle-border`}
                />

                <div className={styles.padrao2}>
                  <input
                    type="text"
                    placeholder="Confirmar Senha"
                    className={`${styles["senha-confir"]} doodle-border`}
                  />

                  <button className={styles["vizualizar-senha"]}>
                    <Eye />
                  </button>

                  <button className={styles["gerar-senha"]}>
                    <Settings />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MATÉRIAS */}
          <div className={styles["elemento-3"]}>
            <div className={styles.column}>
              <h1>Matérias</h1>

              <div className={`${styles["materias"]} doodle-border`}>
                <div className={styles.column}>
                  <div className={styles.adicionar}>
                    <select
                      className={styles["select-materias"]}
                      value={selected}
                      onChange={(e) => setSelected(e.target.value)}
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

        {/* PERGUNTAS */}

        <nav className={styles["titulo-perguntas"]}>
          <h2>Adicionar Perguntas:</h2>
        </nav>
        <div className={styles["secao-perguntas"]}>
          <div className={styles["elmt_4-5"]}>
            <div className={styles["elemento-4"]}>
              <BotaoAdd />
            </div>
            <div className={styles.column}>
              <button className={`${styles["salvar-mudancas"]} doodle-border`}>
                Criar Quizz
              </button>
              <br />
              <button className={`${styles["cancelar-quizz"]} doodle-border`}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
        <div className={styles["nivel-dificuldade"]}>
          <div>
            <div>
              <h2>Nível de Dificuldade:</h2>
              <br />
              <button
                className={`${styles["botao-dificuldade"]}  ${styles["m-facil"]}`}
              >
                Muito Fácil
              </button>
              <button
                className={`${styles["botao-dificuldade"]}  ${styles["facil"]}`}
              >
                Fácil
              </button>
              <button
                className={`${styles["botao-dificuldade"]}  ${styles["normal"]}`}
              >
                Normal
              </button>
              <button
                className={`${styles["botao-dificuldade"]}  ${styles["dificil"]}`}
              >
                Difícil
              </button>
              <button
                className={`${styles["botao-dificuldade"]}  ${styles["e-dificil"]}`}
              >
                Extremamente Difícil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CriarQuizz;
