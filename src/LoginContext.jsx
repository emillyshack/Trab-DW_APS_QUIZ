import { createContext, useState, useEffect } from "react";
import { supabase } from "./supabase.js";

export const LoginContexto = createContext();

export function LoginProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function carregarSessao() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUsuario(session?.user ?? null);
      setLoading(true);
    }

    carregarSessao();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUsuario(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const logar = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setLoading(false);
      throw error;
    } else {
      setLoading(false);
      return data;
    }
  };

  const cadastrar = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setLoading(false);
      throw error;
    } else {
      setLoading(false);
      return data;
    }
  };

  const deslogar = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  };

  return (
    <LoginContexto.Provider
      value={{
        usuario,
        setUsuario,
        loading,
        setLoading,
        logar,
        cadastrar,
        deslogar,
      }}
    >
      {children}
    </LoginContexto.Provider>
  );
}
