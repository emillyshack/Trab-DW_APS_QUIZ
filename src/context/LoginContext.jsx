import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabase.js";

export const LoginContexto = createContext();

export function LoginProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [pessoa, setPessoa] = useState({});
  const [loading, setLoading] = useState(true);

  async function carregarSessao() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      setUsuario(session.user);
      await getUser(session.user.id);
    } else {
      setUsuario(null);
    }

    setLoading(false);
  }

  useEffect(() => {
    carregarSessao();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUsuario(session.user);
          getUser(session.user.id);
        } else {
          setUsuario(null);
          setPessoa({});
        }
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
      await getUser(data.user.id);
      setLoading(false);
      return data;
    }
  };

  const getUser = async (id) => {
    if (!id) return null;
    const { data, error } = await supabase
      .from("pessoas")
      .select("*")
      .eq("id_usuario", id)
      .single();

    if (error) {
      console.error(error);
      return null;
    }
    setPessoa(data);
    return data;
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
        getUser,
        pessoa,
        cadastrar,
        deslogar,
        carregarSessao,
      }}
    >
      {children}
    </LoginContexto.Provider>
  );
}
