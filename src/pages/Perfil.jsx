import { useState, useRef, useContext } from "react";
import { Check, Plus, X, Pencil } from "lucide-react";
import styles from "./Perfil.module.css";
import { GeralContexto } from "../GeralContext";
import { LoginContexto } from "../LoginContext";

function Perfil() {
  const { pessoa } = useContext(GeralContexto);
  const { usuario } = useContext(LoginContexto);
  // --------------------------
  // Valores e edição de inputs
  // --------------------------
  const [valores, setValores] = useState({
    nome: pessoa.nome,
    email: usuario.email,
    instagram: "",
  });

  const [temporarios, setTemporarios] = useState({
    nome: "",
    email: "",
    instagram: "",
  });

  const [editavel, setEditavel] = useState({
    nome: false,
    email: false,
    instagram: false,
  });

  const [confirmar, setConfirmar] = useState({
    nome: false,
    email: false,
    instagram: false,
  });

  // --------------------------
  // Descrição
  // --------------------------
  const [descricao, setDescricao] = useState(pessoa.biografia);
  const [textareaMod, setTextareaMod] = useState(false);

  // --------------------------
  // Funções para inputs simples
  // --------------------------
  function iniciarEdicao(campo) {
    setEditavel((prev) => ({ ...prev, [campo]: true }));
    setTemporarios((prev) => ({ ...prev, [campo]: valores[campo] }));
    setConfirmar((prev) => ({ ...prev, [campo]: false }));
  }

  function alterarValor(campo, novoValor) {
    setTemporarios((prev) => ({ ...prev, [campo]: novoValor }));
    setConfirmar((prev) => ({
      ...prev,
      [campo]: novoValor !== valores[campo],
    }));
  }

  function confirmarMudanca(campo) {
    setValores((prev) => ({ ...prev, [campo]: temporarios[campo] }));
    setEditavel((prev) => ({ ...prev, [campo]: false }));
    setConfirmar((prev) => ({ ...prev, [campo]: false }));
  }

  function cancelarMudanca(campo) {
    setEditavel((prev) => ({ ...prev, [campo]: false }));
    setConfirmar((prev) => ({ ...prev, [campo]: false }));
  }

  // --------------------------
  // Interesses
  // --------------------------
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

  // --------------------------
  // Foto de Perfil
  // --------------------------
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleFotoClick = () => inputRef.current.click();

  const handleArquivoChange = (e) => {
    const arquivo = e.target.files[0];
    if (arquivo) {
      const url = URL.createObjectURL(arquivo);
      setPreview(url);
    }
  };

  // --------------------------
  // Cor de Fundo
  // --------------------------

  return (
    <div className={styles["tela-principal"]}>
      <div className={`${styles.container}`}>
        <nav className={styles["titulo-perfil"]}>
          <h1>Seu Perfil 🫵</h1>
        </nav>

        <div className={styles.elementos}>
          {/* FOTO + NOME */}
          <div className={styles.column}>
            <div className={styles["area-nome-foto"]}>
              <div
                className={`${styles["foto-perfil"]} ${styles.hbz}`}
                onClick={handleFotoClick}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Foto de perfil"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
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

              <div className={styles.display1}>
                {editavel.nome ? (
                  <>
                    <input
                      placeholder="Anônimo"
                      className={styles.nome}
                      value={temporarios.nome}
                      onChange={(e) => alterarValor("nome", e.target.value)}
                    />
                    {confirmar.nome && (
                      <>
                        <button
                          className={styles["adicionar-tag"]}
                          onClick={() => confirmarMudanca("nome")}
                        >
                          <Check />
                        </button>
                        <button
                          className={styles["remover-tag"]}
                          onClick={() => cancelarMudanca("nome")}
                        >
                          <X />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <span
                    className={styles.nome}
                    onClick={() => iniciarEdicao("nome")}
                  >
                    {valores.nome}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* DESCRIÇÃO E DADOS */}
          <div className={`${styles["area-descricao"]}`}>
            {/* EMAIL */}
            <div className={`${styles["dados-especiais"]} doodle-border`}>
              <label className={styles.label}>E-mail</label>
              <div className={styles["editar-celula"]}>
                <input
                  className={styles["input-charger"]}
                  value={editavel.email ? temporarios.email : valores.email}
                  readOnly={!editavel.email}
                  onChange={(e) => alterarValor("email", e.target.value)}
                />
                {!editavel.email && (
                  <button
                    onClick={() => iniciarEdicao("email")}
                    className={styles["editar-tag"]}
                  >
                    <Pencil />
                  </button>
                )}
                {confirmar.email && (
                  <>
                    <button
                      className={styles["adicionar-tag"]}
                      onClick={() => confirmarMudanca("email")}
                    >
                      <Check />
                    </button>
                    <button
                      className={styles["remover-tag"]}
                      onClick={() => cancelarMudanca("email")}
                    >
                      <X />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* INSTAGRAM */}
            <div className={`${styles["dados-especiais"]} doodle-border`}>
              <label className={styles.label}>Instagram</label>
              <div className={styles["editar-celula"]}>
                <input
                  className={styles["input-charger"]}
                  value={
                    editavel.instagram
                      ? temporarios.instagram
                      : valores.instagram
                  }
                  readOnly={!editavel.instagram}
                  onChange={(e) => alterarValor("instagram", e.target.value)}
                />
                {!editavel.instagram && (
                  <button
                    onClick={() => iniciarEdicao("instagram")}
                    className={styles["editar-tag"]}
                  >
                    <Pencil />
                  </button>
                )}
                {confirmar.instagram && (
                  <>
                    <button
                      className={styles["adicionar-tag"]}
                      onClick={() => confirmarMudanca("instagram")}
                    >
                      <Check />
                    </button>
                    <button
                      className={styles["remover-tag"]}
                      onClick={() => cancelarMudanca("instagram")}
                    >
                      <X />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* INTERESSES */}
            <div className={`${styles["dados-especiais"]} doodle-border`}>
              <label className={styles.label}>Interesses</label>
              <div className={styles["editar-celula-interesses"]}>
                <div className={styles.adicionar}>
                  <select
                    className={styles["select-interesses"]}
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="Filmes">Filmes</option>
                    <option value="Jogos">Jogos</option>
                    <option value="Livros">Livros</option>
                    <option value="Desenhar">Desenhar</option>
                    <option value="Música">Música</option>
                    <option value="Esportes">Esportes</option>
                    <option value="Tecnologias">Tecnologias</option>
                    <option value="Mais">Mais</option>
                  </select>
                  <button onClick={addTags} className={styles["adicionar-tag"]}>
                    <Plus />
                  </button>
                </div>
                <div className={styles.interesses}>
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

            {/* BIO */}
            <div className={`${styles["dados-especiais"]} doodle-border`}>
              <div className={styles["bio-celula"]}>
                <label className={styles.label}>
                  Descrição{" "}
                  {textareaMod && (
                    <button
                      className={styles["button-ok"]}
                      onClick={() => setTextareaMod(false)}
                    >
                      <Check />
                    </button>
                  )}
                </label>
                <textarea
                  className={styles.textarea}
                  value={descricao}
                  onChange={(e) => {
                    setDescricao(e.target.value);
                    setTextareaMod(true);
                  }}
                />
              </div>
            </div>
          </div>

          {/* HISTÓRICO */}
          <div className={styles.column}>
            <div className={`${styles["area-historico"]} doodle-border`}></div>

            <div className={styles.display}>
              <div className={`${styles["mudar-cor"]} doodle-border`}>
                <button className={styles["cor"]}>
                  <div className={`${styles["cor-fundo"]} doodle-border`}></div>{" "}
                  Mudar: Cor de Fundo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
