import { useState, useRef, useContext, useEffect } from "react";
import { Check, Plus, X, Pencil, LogOut, Save } from "lucide-react";
import styles from "./Perfil.module.css";
import { GeralContexto } from "../context/GeralContext";
import { LoginContexto } from "../context/LoginContext";

function Perfil() {
  const { pessoa, changeFtPerfil, setPessoa } = useContext(GeralContexto);
  const { usuario, deslogar } = useContext(LoginContexto);

  const [hasChanges, setHasChanges] = useState(false);

  // --------------------------
  // Valores e edição de inputs
  // --------------------------
  const [valores, setValores] = useState({
    nome: pessoa.nome,
    usuario: pessoa.nome_usuario,
    email: usuario.email,
    instagram: "",
  });

  const [temporarios, setTemporarios] = useState({
    nome: "",
    usuario: "",
    email: "",
    instagram: "",
  });

  const [editavel, setEditavel] = useState({
    nome: false,
    usuario: false,
    email: false,
    instagram: false,
  });

  const [confirmar, setConfirmar] = useState({
    nome: false,
    usuario: false,
    email: false,
    instagram: false,
  });

  // --------------------------
  // Descrição
  // --------------------------
  const [descricao, setDescricao] = useState(pessoa.biografia);
  const [descricaoTemp, setDescricaoTemp] = useState(pessoa.biografia);
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
    const alterado = novoValor !== valores[campo];
    setConfirmar((prev) => ({
      ...prev,
      [campo]: alterado,
    }));
    if (alterado) {
      setHasChanges(true);
    }
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

    setHasChanges(true);
  }

  function removeTag(tag) {
    setTags(tags.filter((t) => t !== tag));

    setHasChanges(true);
  }

  // --------------------------
  // Funções de salvamento
  // --------------------------
  function salvarTudo() {
    Object.keys(valores).forEach((campo) => {
      if (confirmar[campo] || editavel[campo]) {
        setValores((prev) => ({
          ...prev,
          [campo]: temporarios[campo] || prev[campo],
        }));
        setEditavel((prev) => ({ ...prev, [campo]: false }));
        setConfirmar((prev) => ({ ...prev, [campo]: false }));
      }
    });

    setDescricao(descricaoTemp);
    setTextareaMod(false);

    console.log("Salvando todas as alterações...");
    console.log("Novos valores:", {
      ...valores,
      nome: temporarios.nome || valores.nome,
      usuario: temporarios.usuario || valores.usuario,
      email: temporarios.email || valores.email,
      instagram: temporarios.instagram || valores.instagram,
      biografia: descricaoTemp,
      interesses: tags,
      cor_fundo: corContainer,
    });

    // --------------------------
    // 🔥 ADIÇÃO: salvar cor no localStorage SOMENTE aqui
    // --------------------------
    localStorage.setItem("cor_fundo_perfil", corContainer);

    setHasChanges(false);
  }

  // --------------------------
  // Foto de Perfil
  // --------------------------
  const [preview, setPreview] = useState(pessoa.foto_perfil);
  const inputRef = useRef(null);

  const handleFotoClick = () => inputRef.current.click();

  const handleArquivoChange = async (e) => {
    const arquivo = e.target.files[0];
    if (arquivo) {
      await changeFtPerfil(pessoa.id_usuario, arquivo);

      setPreview(pessoa.foto_perfil);
    }
  };

  // --------------------------
  // Cor de Fundo
  // --------------------------
  const [corContainer, setCorContainer] = useState("#d0bfff");

  // 🔥 ADIÇÃO: carregar cor salva
  useEffect(() => {
    const corSalva = localStorage.getItem("cor_fundo_perfil");
    if (corSalva) setCorContainer(corSalva);
  }, []);

  function gerarCorAleatoria() {
    const letras = "0123456789ABCDEF";
    let cor = "#";
    for (let i = 0; i < 6; i++) {
      cor += letras[Math.floor(Math.random() * 16)];
    }
    return cor;
  }

  // --------------------------
  // JSX
  // --------------------------
  return (
    <div className={styles["tela-principal"]}>
      <div
        className={`${styles.container}`}
        style={{ backgroundColor: corContainer }}
      >
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

              <div className={styles.campo}>
                <input
                  type="text"
                  value={editavel.nome ? temporarios.nome : valores.nome}
                  onChange={(e) => alterarValor("anonimo", e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          {/* DESCRIÇÃO E DADOS */}
          <div className={`${styles["area-descricao"]}`}>
            {/* NOME */}
            <div className={`${styles["dados-especiais"]} doodle-border`}>
              <label className={styles.label}>Nome completo:</label>
              <div className={styles["editar-celula"]}>
                <input
                  className={styles["input-charger"]}
                  value={editavel.nome ? temporarios.nome : valores.nome}
                  readOnly={!editavel.nome}
                  onChange={(e) => alterarValor("nome", e.target.value)}
                />
                {!editavel.nome && (
                  <button
                    onClick={() => iniciarEdicao("nome")}
                    className={styles["editar-tag"]}
                  >
                    <Pencil />
                  </button>
                )}

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
              </div>
            </div>

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
                <label className={styles.label}>Descrição</label>
                <textarea
                  className={styles.textarea}
                  value={descricaoTemp}
                  onChange={(e) => {
                    setDescricaoTemp(e.target.value);

                    if (e.target.value !== descricao) {
                      setHasChanges(true);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* HISTÓRICO */}
          <div className={styles.column}>
            {hasChanges && (
              <button
                className={styles["save-all-button"]}
                onClick={salvarTudo}
              >
                <Save size={20} /> Salvar Alterações
              </button>
            )}

            <div className={styles.display}>
              <div className={`${styles["mudar-cor"]} doodle-border`}>
                <button
                  className={styles["cor"]}
                  onClick={() => {
                    setCorContainer(gerarCorAleatoria());
                    setHasChanges(true); // ADIÇÃO: mostra o botão ao mudar cor
                  }}
                >
                  <div
                    className={`${styles["cor-fundo"]} doodle-border`}
                    style={{ backgroundColor: corContainer }}
                  ></div>{" "}
                  Mudar: Cor de Fundo
                </button>
              </div>

              <div
                onClick={() => {
                  deslogar();
                }}
                className={`${styles["deslogar"]} doodle-border`}
              >
                <h2 className={styles["deslogar-titulo"]}> Deslogar</h2>
                <LogOut />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
