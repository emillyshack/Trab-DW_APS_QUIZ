import styles from "./CriarQuizz.module.css";
import BotaoAdd from "../../components/BotaoAdicionarPerg";
import {supabase} from "../../supabase"
import { useState, useRef, useEffect , useContext } from "react";
import { LockKeyhole, LockOpen, Eye, EyeOff, Settings, Plus } from "lucide-react";
import { GeralContexto } from "../../context/GeralContext";


const generateRandomPassword = (length = 12) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

function CriarQuizz() {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);
  const { setQuizzId } = useContext(GeralContexto);

 useEffect(() => {
  async function criarQuizzBanco(){
    const {data, error} = await supabase
    .from("quizzes")
    .insert({
        titulo:"",
        senha:"",
        pessoa_id:"a47cbff9-7d30-4f0b-87b3-9f85aa6107fb"
    })
    .select("id")
    .single();

    if (error) {
      console.error("Erro ao criar Quizz:",error)
      return
    }
  setQuizzId(data.id); 
  }

  criarQuizzBanco();
}, []);

async function salvarAlternativas(perguntaId) {
  const lista = Object.values(alternativas).map((alt) => ({
    texto: alt.texto,
    valor: alt.certa,
    pergunta_id: perguntaId
  }));

  const { error } = await supabase.from("alternativas").insert(lista);

  if (error) {
    console.error("Erro ao salvar alternativas:", error);
    alert("Erro ao salvar alternativas.");
  }
}

//==========================================================

const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLockToggle = () => {
    setIsDisabled(prev => !prev);
  };

  const handleVisibilityToggle = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const handleGeneratePassword = () => {
    const newPassword = generateRandomPassword();
    setPassword(newPassword);
    setConfirmPassword('');
    setIsDisabled(false);
  };

  const LockIcon = isDisabled ? LockKeyhole : LockOpen;
  const EyeIcon = isPasswordVisible ? EyeOff : Eye;
  //==============================================

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
                <button 
                className={styles["priv-trancada"]} 
        onClick={handleLockToggle}
        title={isDisabled ? "Desbloquear Edição" : "Bloquear Edição"}>
                  <LockKeyhole />
                </button>

                <input
        type={isPasswordVisible ? "text" : "password"}
        placeholder="Digitar Senha"
        className={`${styles["senha-quizz"]} doodle-border`}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isDisabled}
      />

                <div className={styles.padrao2}>
                  <input
          type="password"
          placeholder="Confirmar Senha"
          className={`${styles["senha-confir"]} doodle-border`}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isDisabled}
        />

                  <button className={styles["vizualizar-senha"]}
           
          onClick={handleVisibilityToggle}
          title={isPasswordVisible ? "Ocultar Senha" : "Visualizar Senha"}>
                    <Eye />
                  </button>

                  <button className={styles["gerar-senha"]}
          onClick={handleGeneratePassword}
          title="Gerar Senha Aleatória">
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
    
            </div>
          </div>

  );
}

export default CriarQuizz;
