import { createContext, useState } from "react";
import { supabase } from "../supabase.js";

export const GeralContexto = createContext();

export function GeralProvider({ children }) {
  // Verificar usuário ====================
  const [pessoa, setPessoa] = useState(null);
  const getUser = async (id) => {
    const { data, error } = await supabase
      .from("pessoas")
      .select("*")
      .eq("id_usuario", id)
      .single();

    if (error) console.error(error);
    setPessoa(data);
    return data;
  };

  const [quizzId,setQuizzId] = useState(null)
  const [perguntas, setPerguntas] = useState([])


  const changeFtPerfil = async (idUsuario, arquivo) => {
    try {
      const nomeArquivo = `${idUsuario}-${Date.now()}-${arquivo.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
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

      return urlPublica; // retorna a URL da imagem para exibir no front
    } catch (erro) {
      console.error("Erro ao alterar foto de perfil:", erro);
      return null;
    }
  };

  // Criar um novo quizz ==================

  return (
    <GeralContexto.Provider
      value={{
        pessoa,
        getUser,
        novaAlternativa,
        setNovaAlternativa,
        novaPergunta,
        changeFtPerfil,
        quizzId, 
        setQuizzId,
        perguntas, 
        setPerguntas
      }}
    >
      {children}
    </GeralContexto.Provider>
  );
}
