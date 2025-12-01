import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "./supabase.js";
import { LoginContexto } from "./LoginContext.jsx";

export const GeralContexto = createContext();

export function GeralProvider({ children }) {
  const [pessoa, setPessoa] = useState({});
  const { loading, setLoading } = useContext(LoginContexto);

  const getUser = async (id) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("pessoas")
      .select(id)
      .eq("id", id)
      .single();

    if (error) console.error(error);
    setLoading(false);
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
