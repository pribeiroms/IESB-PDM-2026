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
  const [form, setForm] = useState({ name: "", password: "" });

  const handleLogin = () => {
    try {
      login(form);
      router.replace("/");
    } catch (error) {
      Alert.alert("Acesso negado", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>Gestao Financeira</Text>
          <Text style={globalStyles.secondaryText}>Acesse sua conta</Text>
        </View>

        <View>
          <Text style={globalStyles.inputLabel}>Usuario</Text>
          <TextInput
            autoCapitalize="words"
            onChangeText={(name) => setForm((current) => ({ ...current, name }))}
            placeholder="Seu usuario"
            style={globalStyles.input}
            value={form.name}
          />
        </View>

        <View>
          <Text style={globalStyles.inputLabel}>Senha</Text>
          <TextInput
            onChangeText={(password) =>
              setForm((current) => ({ ...current, password }))
            }
            placeholder="Senha"
            secureTextEntry
            style={globalStyles.input}
            value={form.password}
          />
        </View>

        <Button onPress={handleLogin}>Entrar</Button>
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
  }
});
