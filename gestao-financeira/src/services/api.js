import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "web"
    ? "http://localhost:3000"
    : process.env.EXPO_PUBLIC_API_URL ?? "http://10.0.2.2:3000";

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });

  if (!response.ok) {
    const text = await response.text();
    let data = null;

    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }

    throw new Error(data?.error ?? `HTTP ${response.status}: ${text}`);
  }

  return response.status === 204 ? null : response.json();
}

export const api = {
  login: (data) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  listCategories: () => request("/categories"),
  createCategory: (data) =>
    request("/categories", { method: "POST", body: JSON.stringify(data) }),
  updateCategory: (id, data) =>
    request(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),
  deleteCategory: (id) =>
    request(`/categories/${id}`, { method: "DELETE" }),
  listTransactions: () => request("/transactions"),
  createTransaction: (data) =>
    request("/transactions", { method: "POST", body: JSON.stringify(data) }),
  updateTransaction: (id, data) =>
    request(`/transactions/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),
  deleteTransaction: (id) =>
    request(`/transactions/${id}`, { method: "DELETE" })
};
