import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContexto } from "./context/LoginContext";

function PrivateRoute({ children }) {
  const { usuario, loading } = useContext(LoginContexto);

  if (loading) {
    return <div>Carregando...</div>;
  }
  if (!usuario) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default PrivateRoute;
