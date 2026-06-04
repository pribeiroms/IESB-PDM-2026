import { Picker } from "@react-native-picker/picker";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { MoneyContext } from "../contexts/GlobalState";
import { globalStyles } from "../styles/globalStyles";

export default function CategoryPicker({ form, setForm }) {
  const { categories } = useContext(MoneyContext);

  return (
    <View style={styles.container}>
      <Text style={globalStyles.inputLabel}>Categoria</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={form.categoryId}
          onValueChange={(itemValue) =>
            setForm({ ...form, categoryId: itemValue })
          }
        >
          {categories.map((category) => (
            <Picker.Item
              key={category.id}
              label={category.displayName}
              value={category.id}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8
  },
  picker: {
    justifyContent: "center",
    height: 44,
    borderColor: colors.secondaryText,
    borderWidth: 1,
    borderRadius: 8,
    flexGrow: 1,
    backgroundColor: colors.primaryContrast,
    overflow: "hidden"
  }
});
