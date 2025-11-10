import { useState } from "react";
import styles from "./ContainerPerfil.module.css";

export default function ContainerPerfil() {
  const [nomeUsuario, setNomeUsuario] = useState("Emanuel"); // nome inicial
  const [editandoNome, setEditandoNome] = useState(false);
  const [selected, setSelected] = useState("");
  const [tags, setTags] = useState([]);

  function alternarEdicaoNome() {
    setEditandoNome(!editandoNome);
  }

  function addTags() {
    if (!selected || tags.includes(selected)) return;
    setTags([...tags, selected]);
    setSelected("");
  }

  function removeTag(tag) {
    setTags(tags.filter((t) => t !== tag));
  }
  return (
    <div className={`${styles.container} doodle-border`}>
      <div className={styles["titulo-perfil"]}>
        <h1>Seu Perfil 🫵</h1>
      </div>

      <div className={styles.elementos}>
        {/* FOTO + NOME */}
        <div className={styles["area-nome-foto"]}>
          <div className={styles["foto-perfil"]}></div>

          <div className={styles.display}>
            {editandoNome ? (
              <input
                type="text"
                className={styles.nome}
                value={nomeUsuario}
                onChange={(e) => setNomeUsuario(e.target.value)}
                onBlur={alternarEdicaoNome}
                autoFocus
              />
            ) : (
              <span className={styles.nome} onClick={alternarEdicaoNome}>
                {nomeUsuario}
              </span>
            )}

            <button
              onClick={alternarEdicaoNome}
              className={styles["nome-editavel"]}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-pencil"
              >
                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                <path d="m15 5 4 4" />
              </svg>
            </button>
          </div>
        </div>

        {/* DESCRIÇÃO */}
        <div className={`${styles["area-descricao"]} doodle-border`}>
          {/* EMAIL */}
          <div className={`${styles["dados-especiais"]} doodle-border`}>
            <label className={styles.label}>E-mail</label>
            <div className={styles["editar-celula"]}>
              <input type="text" className={styles["input-charger"]} />

              <button className={styles["nome-editavel"]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-pencil"
                >
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                  <path d="m15 5 4 4" />
                </svg>
              </button>
            </div>
          </div>

          {/* REDES SOCIAIS */}
          <div className={`${styles["dados-especiais"]} doodle-border`}>
            <label className={styles.label}>Intagram</label>
            <div className={styles["editar-celula"]}>
              <input type="text" className={styles["input-charger"]} />

              <button className={styles["nome-editavel"]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-pencil"
                >
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                  <path d="m15 5 4 4" />
                </svg>
              </button>
            </div>
          </div>

          {/* INTERESSES */}
          <div className={`${styles["dados-especiais"]} doodle-border`}>
            <label className={styles.label}>Interesses</label>
            <div className={styles["editar-celula"]}>
              <div className={styles.adicionar}>
                <select
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
                <button onClick={addTags}> + </button>
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
              <textarea className={styles.textarea}></textarea>
            </div>
          </div>
        </div>

        {/* HISTÓRICO */}
        <div className={`${styles["area-historico"]} doodle-border`}></div>
      </div>
    </div>
  );
}
