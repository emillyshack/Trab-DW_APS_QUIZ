import { createContext, useState, useEffect } from "react";
import { supabase } from "./supabase.js";

export const LoginContexto = createContext();

export function LoginProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarSessao() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUsuario(session?.user ?? null);
    }

    carregarSessao();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUsuario(session?.user ?? null);
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const logar = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const cadastrar = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  };

  const deslogar = async () => {
    await supabase.auth.signOut();
  };

  return (
    <LoginContexto.Provider
      value={{ usuario, loading, logar, cadastrar, deslogar }}
    >
      {children}
    </LoginContexto.Provider>
  );
}
