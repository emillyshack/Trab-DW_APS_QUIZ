import { createContext, useEffect, useState } from "react";
import { supabase } from "../supabase.js";

export const GeralContexto = createContext();

export function GeralProvider({ children }) {
  const [quizzes, setQuizzes] = useState([{}]);

  const [inputQuizz, setInputQuizz] = useState({});
  const [materiasQuizz, setMateriasQuizz] = useState();

  const [inputPerguntas, setInputPerguntas] = useState([]);
  const [inputAlternativas, setInputAlternativas] = useState([]);
  const [loadingGeral, setLoadingGeral] = useState(true);
  const [quizzId, setQuizzId] = useState(null);
  const [perguntas, setPerguntas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getQuizz();
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(inputPerguntas);
  }, [inputPerguntas]);

  const getQuizz = async () => {
    setLoadingGeral(true);
    const { data, error } = await supabase.from("quizzes").select("*");
    if (error) throw error;
    setQuizzes(data);
    setLoadingGeral(false);
  };

  const criarQuizzCompleto = async (idPessoa) => {
    setLoadingGeral(true);
    try {
      const { data: quizzData, error: quizzError } = await supabase
        .from("quizzes")
        .insert({
          pessoa_id: idPessoa,
          titulo: inputQuizz.titulo,
          senha: inputQuizz.senha,
        })
        .select("id, codigo")
        .single();

      if (quizzError) throw quizzError;
      setQuizzId(quizzData.id);

      const { data: perguntasData, error: perguntasError } = await supabase
        .from("perguntas")
        .insert(inputPerguntas)
        .select("id, ordem_pergunta");

      if (perguntasError) throw perguntasError;

      console.log("Quizz, perguntas e alternativas criados com sucesso!");
      setLoadingGeral(false);
      return true;
    } catch (erro) {
      console.error("Erro ao criar quizz completo:", erro);
      setLoadingGeral(false);
      return false;
    }
  };

  const criarEditarQuizz = async (codigo) => {
    if (codigo === "novo") {
      setInputQuizz({
        senha: "",
        confirmarSenha: "",
        titulo: "",
        materias: [],
      });
      setMateriasQuizz([]);
    }

    const { data: quizzData, error: quizzError } = await supabase
      .from("quizzes")
      .select("*")
      .eq("codigo", codigo)
      .single();
    if (quizzError) throw quizzError;

    const { data: materiasData, error: materiasError } = await supabase
      .from("quizzes_materias")
      .select(
        `
    id_quizzes,
    materias (
      id,
      nome_materia
    )
  `
      )
      .eq("id_quizzes", quizzData.id);
    if (materiasError) throw materiasError;

    setMateriasQuizz(
      materiasData.map((item) => item.materias?.nome_materia).filter(Boolean)
    );

    setInputQuizz({
      senha: quizzData.senha,
      confirmarSenha: quizzData.senha,
      titulo: quizzData.titulo,
      materias: materiasQuizz,
    });
  };

  const addImagem = async (idPessoa, idPergunta, idQuizz, pasta, arquivo) => {
    setLoadingGeral(true);
    if (pasta === "fotos_perfil") {
      try {
        const nomeArquivo = `${idPessoa}-${Date.now()}-${arquivo.name}`;
        const { error: uploadError } = await supabase.storage
          .from("imagens")
          .upload(`${pasta}/${nomeArquivo}`, arquivo, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("imagens")
          .getPublicUrl(`${pasta}/${nomeArquivo}`);

        const urlPublica = publicUrlData.publicUrl;

        const { data, error } = await supabase
          .from("pessoas")
          .update({ foto_perfil: urlPublica })
          .eq("id_pessoa", idPessoa);

        if (error) throw error;

        console.log("Foto de perfil atualizada com sucesso!", data);
        setLoadingGeral(false);
        return urlPublica;
      } catch (erro) {
        console.error("Erro ao alterar foto de perfil:", erro);
        setLoadingGeral(false);
        return null;
      }
    } else if (pasta === "fotos_perguntas") {
      try {
        const imagemPergunta = `${idPergunta}-${Date.now()}-${arquivo.name}`;
        const { error: uploadError } = await supabase.storage
          .from("imagens")
          .upload(`${pasta}/${imagemPergunta}`, arquivo, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("imagens")
          .getPublicUrl(`${pasta}/${imagemPergunta}`);

        const urlPublica = publicUrlData.publicUrl;

        const { data, error } = await supabase
          .from("perguntas")
          .update({ pasta: urlPublica })
          .eq("id_pergunta", idPergunta);

        if (error) throw error;

        console.log("Imagem da pergunta atualizada com sucesso!", data);
        setLoadingGeral(false);
        return urlPublica;
      } catch (erro) {
        console.error("Erro ao alterar imagem da pergunta:", erro);
        setLoadingGeral(false);
        return null;
      }
    } else if (pasta === "fotos_quizz") {
      try {
        const imagemQuizz = `${idQuizz}-${Date.now()}-${arquivo.name}`;
        const { error: uploadError } = await supabase.storage
          .from("imagens")
          .upload(`${pasta}/${imagemQuizz}`, arquivo, { upsert: true });
        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("imagens")
          .getPublicUrl(`${pasta}/${imagemQuizz}`);

        const urlPublica = publicUrlData.publicUrl;

        const { data, error } = await supabase
          .from("quizzes")
          .update({ pasta: urlPublica })
          .eq("id_quizz", idQuizz);

        if (error) throw error;

        console.log("Imagem do quizz atualizada com sucesso!", data);
        setLoadingGeral(false);
        return urlPublica;
      } catch (erro) {
        setLoadingGeral(false);
        console.error("Erro do quizz imagem da pergunta:", erro);
        return null;
      }
    }
  };

  return (
    <GeralContexto.Provider
      value={{
        addImagem,
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
      }}
    >
      {children}
    </GeralContexto.Provider>
  );
}
