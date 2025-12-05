import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabase.js";

export const LoginContexto = createContext();

export function LoginProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function carregarSessao() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUsuario(session?.user ?? null);
      setLoading(false);
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

  const cadastrar = async (nome, usuario, email, password) => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setLoading(false);
        throw error;
      }

      const user = data.user;
      const { data: novaPessoa, error: insertError } = await supabase
        .from("pessoas")
        .insert({
          id_usuario: user.id,
          nome: nome,
          nome_usuario: usuario,
        })
        .select()
        .single();

      if (insertError) throw insertError;
      setLoading(false);
      return { user, novaPessoa };
    } catch (error) {
      setLoading(false);
      throw error;
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
