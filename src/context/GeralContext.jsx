import { createContext, useEffect, useState } from "react";
import { supabase } from "../supabase.js";

export const GeralContexto = createContext();

export function GeralProvider({ children }) {
  const [quizzes, setQuizzes] = useState([{}]);
  const [quizzPessoa, setQuizzPessoa] = useState([{}]);

  const [inputQuizz, setInputQuizz] = useState({
    senha: "",
    confirmarSenha: "",
    titulo: "",
    materias: "",
  });

  const [inputPerguntas, setInputPerguntas] = useState([]);
  const [inputAlternativas, setInputAlternativas] = useState([]);
  const [pessoa, setPessoa] = useState(null);
  const [quizzId, setQuizzId] = useState(null);
  const [perguntas, setPerguntas] = useState([]);

  const getUser = async (id) => {
    const { data, error } = await supabase
      .from("pessoas")
      .select("*")
      .eq("id_usuario", id)
      .single();

    if (error) console.error(error);
    setPessoa(data);

    const getQuizzPessoa = async (idPessoa) => {
      const { data, error } = await supabase
        .from("quizzes")
        .select("*")
        .eq("pessoa_id", idPessoa);
      if (error) throw error;
      setQuizzPessoa(data);
    };
    getQuizzPessoa(pessoa.id);
    return data;
  };

  const changeFtPerfil = async (idUsuario, arquivo) => {
    try {
      const nomeArquivo = `${idUsuario}-${Date.now()}-${arquivo.name}`;
      const { error: uploadError } = await supabase.storage
        .from("imagens")
        .upload(`fotos_perfil/${nomeArquivo}`, arquivo, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("imagens")
        .getPublicUrl(`fotos_perfil/${nomeArquivo}`);

      const urlPublica = publicUrlData.publicUrl;

      const { data, error } = await supabase
        .from("pessoas")
        .update({ foto_perfil: urlPublica })
        .eq("id_usuario", idUsuario);

      if (error) throw error;

      console.log("Foto de perfil atualizada com sucesso!", data);
      return urlPublica;
    } catch (erro) {
      console.error("Erro ao alterar foto de perfil:", erro);
      return null;
    }
  };

  const getQuizz = async () => {
    const { data, error } = await supabase.from("quizzes").select("*");
    if (error) throw error;
    setQuizzes(data);
  };

  const criarQuizzCompleto = async () => {
    try {
      const { data: quizzData, error: quizzError } = await supabase
        .from("quizzes")
        .insert({
          pessoa_id: pessoa?.id,
          titulo: inputQuizz.titulo,
          senha: inputQuizz.senha,
        })
        .select("id, codigo")
        .single();

      if (quizzError) throw quizzError;
      setQuizzId(quizzData.id);
      const novoQuizzCodigo = quizzData.codigo;

      // 2️⃣ Criar perguntas
      const perguntasParaInserir = inputPerguntas.map((p) => ({
        texto_pergunta: p.pergunta,
        tempo_limite: p.tempo,
        pessoa_id: pessoa?.id,
        quizz_pergunta: novoQuizzCodigo,
        ordem_pergunta: p.ordemPergunta,
      }));

      const { data: perguntasData, error: perguntasError } = await supabase
        .from("perguntas")
        .insert(perguntasParaInserir)
        .select("id, ordem_pergunta");

      if (perguntasError) throw perguntasError;

      // 3️⃣ Criar alternativas
      const alternativasParaInserir = inputAlternativas.map((a) => {
        const perguntaCorrespondente = perguntasData.find(
          (p) => p.ordem_pergunta === a.ordemPergunta
        );
        return {
          pergunta_id: perguntaCorrespondente.id,
          texto: a.texto,
          valor: a.certa,
        };
      });

      const { error: alternativasError } = await supabase
        .from("alternativas")
        .insert(alternativasParaInserir);

      if (alternativasError) throw alternativasError;

      console.log("Quizz, perguntas e alternativas criados com sucesso!");
      return true;
    } catch (erro) {
      console.error("Erro ao criar quizz completo:", erro);
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getQuizz();
    };
    fetchData();
  }, []);

  return (
    <GeralContexto.Provider
      value={{
        pessoa,
        getUser,
        changeFtPerfil,
        quizzId,
        setQuizzId,
        perguntas,
        setPerguntas,
        inputQuizz,
        setInputQuizz,
        inputPerguntas,
        setInputPerguntas,
        inputAlternativas,
        setInputAlternativas,
        criarQuizzCompleto,
        quizzes,
        quizzPessoa,
      }}
    >
      {children}
    </GeralContexto.Provider>
  );
}
