import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import Button from "../components/Button";
import { colors } from "../constants/colors";
import { useAuth } from "../contexts/AuthState";
import { globalStyles } from "../styles/globalStyles";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setErrorMessage("");
    try {
      setLoading(true);
      await login(form);
      router.replace("/");
    } catch (error) {
      const message = error?.message ?? "Erro ao fazer login.";
      setErrorMessage(message);
      Alert.alert("Acesso negado", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>Gestão Financeira</Text>
          <Text style={globalStyles.secondaryText}>Acesse sua conta</Text>
        </View>

        <View>
          <Text style={globalStyles.inputLabel}>Usuário</Text>
          <TextInput
            autoCapitalize="none"
            onChangeText={(username) =>
              setForm((current) => ({ ...current, username }))
            }
            placeholder="admin"
            placeholderTextColor={colors.inactive}
            style={globalStyles.input}
            value={form.username}
          />
        </View>

        <View>
          <Text style={globalStyles.inputLabel}>Senha</Text>
          <TextInput
            onChangeText={(password) =>
              setForm((current) => ({ ...current, password }))
            }
            placeholder="123456"
            placeholderTextColor={colors.inactive}
            secureTextEntry
            style={globalStyles.input}
            value={form.password}
          />
        </View>

        <Button onPress={handleLogin} disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    padding: 20
  },
  content: {
    gap: 16
  },
  title: {
    color: colors.primaryText,
    fontSize: 28,
    fontWeight: "800"
  },
  errorText: {
    color: colors.negativeText,
    marginTop: 12,
    fontSize: 14
  }
});
