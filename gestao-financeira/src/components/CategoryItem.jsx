import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { colors } from "../constants/colors";
import { getCategoryConfig } from "../utils/categories";

export default function CategoryItem({ category }) {
  const categoryConfig = getCategoryConfig(category);

  return (
    <View
      style={[styles.background, { backgroundColor: categoryConfig.background }]}
    >
      <MaterialIcons
        name={categoryConfig.icon}
        size={24}
        color={colors.primaryContrast}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: 22
  }
});
