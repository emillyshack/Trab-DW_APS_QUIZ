import styles from "./CriarQuizz.module.css";

import { useSprings, animated } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import clamp from "lodash.clamp";
import swap from "lodash-move";

import { useState, useRef } from "react";
import { LockKeyhole, Settings, Eye, Plus } from "lucide-react";

// Função de animação (apenas reorganizada)
const fn =
  (order, active = false, originalIndex = 0, curIndex = 0, x = 0) =>
  (index) =>
    active && index === originalIndex
      ? {
          x: curIndex * 150 + x,
          scale: 1.1,
          zIndex: 1,
          shadow: 15,
          immediate: (key) => key === "x" || key === "zIndex",
        }
      : {
          x: order.indexOf(index) * 150,
          scale: 1,
          zIndex: 0,
          shadow: 1,
          immediate: false,
        };

// -----------------------------------------------------------------------------
// LISTA ARRASTÁVEL — HORIZONTAL
// -----------------------------------------------------------------------------
function DraggableList({ items }) {
  const order = useRef(items.map((_, index) => index));
  const [springs, api] = useSprings(items.length, fn(order.current));

  const bind = useDrag(({ args: [originalIndex], active, movement: [x] }) => {
    const curIndex = order.current.indexOf(originalIndex);

    const curCol = clamp(
      Math.round((curIndex * 150 + x) / 150),
      0,
      items.length - 1
    );

    const newOrder = swap(order.current, curIndex, curCol);

    api.start(fn(newOrder, active, originalIndex, curIndex, x));

    if (!active) order.current = newOrder;
  });

  return (
    <div
      className={styles.content}
      style={{
        width: items.length * 150,
        display: "flex",
        position: "relative",
        height: 80,
      }}
    >
      {springs.map(({ x, scale, zIndex, shadow }, i) => (
        <animated.div
          {...bind(i)}
          key={i}
          style={{
            position: "absolute",
            width: 140,
            height: 60,
            background: "#fff",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "grab",
            x,
            scale,
            zIndex,
            boxShadow: shadow.to(
              (s) => `rgba(0,0,0,0.15) 0px ${s}px ${2 * s}px 0px`
            ),
          }}
        >
          {items[i]}
        </animated.div>
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// TELA CRIAR QUIZZ
// -----------------------------------------------------------------------------
function CriarQuizz() {
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

  // TAGS DAS MATÉRIAS
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
    <div className={`${styles["tela-principal"]}`}>
      <div className={`${styles.container}`}>
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

          {/* TÍTULO E SENHAS */}
          <div className={styles["elemento-2"]}>
            <label htmlFor="">Título:</label>
            <input
              type="text"
              placeholder="Este é o Título do seu Quizz"
              className={`${styles["nome-quizz"]} doodle-border`}
            />
            <br />

            <div className={styles.column}>
              <label htmlFor="">Senha:</label>

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
                  {/* SELECT + ADD */}
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

                  {/* TAGS */}
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
        <div className={styles["elmt_4-5"]}>
          <h1>Perguntas</h1>
          <DraggableList items={["a", "b", "c", "d"]} />
        </div>
      </div>
    </div>
  );
}

export default CriarQuizz;
