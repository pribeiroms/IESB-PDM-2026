import { StyleSheet, Text, TouchableHighlight } from "react-native";
import { colors } from "../constants/colors";

export default function Button({ children, disabled, onPress }) {
  return (
    <TouchableHighlight
      style={[styles.background, disabled && styles.disabled]}
      disabled={disabled}
      onPress={onPress}
      underlayColor={colors.positiveText}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableHighlight>
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
  text: {
    color: colors.primaryContrast,
    fontSize: 18,
    fontWeight: "600"
  }
});
