import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MoneyContext } from "../contexts/GlobalState";
import { globalStyles } from "../styles/globalStyles";
import SelectField from "./SelectField";

export default function CategoryPicker({ form, setForm }) {
  const { categories } = useContext(MoneyContext);
  const options = categories.map((category) => ({
    label: category.displayName,
    value: category.id
  }));

  return (
    <View style={styles.container}>
      <Text style={globalStyles.inputLabel}>Categoria</Text>
      <SelectField
        onChange={(categoryId) => setForm({ ...form, categoryId })}
        options={options}
        placeholder="Selecione uma categoria"
        value={form.categoryId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8
  }
});
