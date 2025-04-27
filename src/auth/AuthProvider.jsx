import { useContext, createContext, useState, useEffect } from "react";

// Definimos el contexto con las propiedades necesarias
const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simula verificación desde localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    localStorage.setItem("token", "example-token");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para consumir el contexto
export const useAuth = () => useContext(AuthContext);
