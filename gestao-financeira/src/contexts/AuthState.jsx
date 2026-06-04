import { createContext, useCallback, useContext, useMemo, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback(({ name, password }) => {
    const nextName = name.trim();

    if (nextName.length < 2) {
      throw new Error("Informe um nome com pelo menos 2 caracteres.");
    }

    if (password.length < 4) {
      throw new Error("A senha deve ter pelo menos 4 caracteres.");
    }

    const nextUser = { name: nextName };
    setUser(nextUser);
    return nextUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(user),
      login,
      logout,
      user
    }),
    [login, logout, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  }

  return context;
}
