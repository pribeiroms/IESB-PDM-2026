import { createContext, useCallback, useEffect, useState } from "react";
import { api } from "../services/api";

export const MoneyContext = createContext();

export default function GlobalState({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [nextCategories, nextTransactions] = await Promise.all([
        api.listCategories(),
        api.listTransactions()
      ]);

      setCategories(nextCategories);
      setTransactions(nextTransactions);
    } catch (err) {
      setError(err.message ?? "Falha ao carregar dados do servidor");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addTransaction = useCallback(async (data) => {
    const transaction = await api.createTransaction(data);
    setTransactions((current) => [transaction, ...current]);
    return transaction;
  }, []);

  const updateTransaction = useCallback(async (id, data) => {
    const transaction = await api.updateTransaction(id, data);
    setTransactions((current) =>
      current.map((item) => (item.id === id ? transaction : item))
    );
    return transaction;
  }, []);

  const removeTransaction = useCallback(async (id) => {
    await api.deleteTransaction(id);
    setTransactions((current) => current.filter((item) => item.id !== id));
  }, []);

  const addCategory = useCallback(async (data) => {
    const category = await api.createCategory(data);
    setCategories((current) =>
      [...current, category].sort((a, b) =>
        a.displayName.localeCompare(b.displayName, "pt-BR")
      )
    );
    return category;
  }, []);

  const removeCategory = useCallback(async (id) => {
    await api.deleteCategory(id);
    setCategories((current) => current.filter((item) => item.id !== id));
    setTransactions((current) =>
      current.filter((item) => item.categoryId !== id)
    );
  }, []);

  return (
    <MoneyContext.Provider
      value={{
        transactions,
        categories,
        loading,
        error,
        refresh,
        addTransaction,
        updateTransaction,
        removeTransaction,
        addCategory,
        removeCategory
      }}
    >
      {children}
    </MoneyContext.Provider>
  );
}
