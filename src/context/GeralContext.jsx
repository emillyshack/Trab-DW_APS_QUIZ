import { createContext, useState, useEffect, useContext } from "react";
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

  const changeFtPerfil = async (id,newPhoto) =>{
    const {data,error} = await supabase
    .from("pessoas")
    .update({foto_perfil: newPhoto,})
    .eq("id_usuario", id);
    
    if (error) {
      throw error
      return(error)
    }else{
      console.log("foto atualizada", data)
    }
  };

  // Criar um novo quizz ==================
  const [novaAlternativa, setNovaAlternativa] = useState([{}]);
  const [novaPergunta, setNovaPergunta] = useState([{}]);

  return (
    <GeralContexto.Provider
      value={{
        pessoa,
        getUser,
        novaAlternativa,
        setNovaAlternativa,
        novaPergunta,
        setNovaPergunta,
        changeFtPerfil,
      }}
    >
      {children}
    </GeralContexto.Provider>
  );
}
