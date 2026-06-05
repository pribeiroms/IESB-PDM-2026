import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../constants/colors";

export default function Button({ children, disabled, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.background, disabled && styles.disabled]}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.primary
  },
  disabled: {
    opacity: 0.6
  },
  pressed: {
    opacity: 0.8
  },
  text: {
    color: colors.primaryContrast,
    fontSize: 18,
    fontWeight: "600"
  }
});
