import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import { colors } from "../constants/colors";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página não encontrada</Text>
      <Button onPress={() => router.replace("/")}>Voltar para o início</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    gap: 16,
    justifyContent: "center",
    padding: 24
  },
  title: {
    color: colors.primaryText,
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center"
  }
});
