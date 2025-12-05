import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../supabase.js";

export const GeralContexto = createContext();

export function GeralProvider({ children }) {
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
  return (
    <GeralContexto.Provider
      value={{
        pessoa,
        getUser,
      }}
    >
      {children}
    </GeralContexto.Provider>
  );
}
