import { Platform } from "react-native";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { api } from "../services/api";

const AuthContext = createContext();
const AUTH_STORE_KEY = "gestao-financeira_user";

async function saveUser(user) {
  const value = JSON.stringify(user);
  if (Platform.OS === "web") {
    window.localStorage.setItem(AUTH_STORE_KEY, value);
    return;
  }

  await SecureStore.setItemAsync(AUTH_STORE_KEY, value);
}

async function removeSavedUser() {
  if (Platform.OS === "web") {
    window.localStorage.removeItem(AUTH_STORE_KEY);
    return;
  }

  await SecureStore.deleteItemAsync(AUTH_STORE_KEY);
}

async function getSavedUser() {
  let data = null;

  if (Platform.OS === "web") {
    data = window.localStorage.getItem(AUTH_STORE_KEY);
  } else {
    data = await SecureStore.getItemAsync(AUTH_STORE_KEY);
  }

  return data ? JSON.parse(data) : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function restoreUser() {
      try {
        const storedUser = await getSavedUser();
        if (storedUser && isMounted) {
          setUser(storedUser);
        }
      } catch (error) {
        console.warn("Falha ao restaurar usuário:", error);
      } finally {
        if (isMounted) {
          setIsRestoring(false);
        }
      }
    }

    restoreUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async ({ username, password }) => {
    const nextUsername = username.trim();

    if (nextUsername.length < 2) {
      throw new Error("Informe um usuário com pelo menos 2 caracteres.");
    }

    if (password.length < 4) {
      throw new Error("A senha deve ter pelo menos 4 caracteres.");
    }

    const nextUser = await api.login({
      username: nextUsername,
      password
    });

    setUser(nextUser);
    await saveUser(nextUser);
    return nextUser;
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    await removeSavedUser();
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(user),
      isRestoring,
      login,
      logout,
      user
    }),
    [login, logout, user, isRestoring]
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
