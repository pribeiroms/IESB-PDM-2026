import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Button from "../../components/Button";
import { colors } from "../../constants/colors";
import { MoneyContext } from "../../contexts/GlobalState";
import { globalStyles } from "../../styles/globalStyles";
import { createCategoryKey, customCategoryPalette } from "../../utils/categories";

const initialForm = {
  name: "",
  displayName: "",
  icon: "label",
  background: customCategoryPalette[0],
  isIncome: false
};

function showMessage(title, message) {
  if (Platform.OS === "web") {
    window.alert(message ? `${title}\n${message}` : title);
    return;
  }

  Alert.alert(title, message);
}

export default function Categories() {
  const { addCategory, categories, removeCategory } = useContext(MoneyContext);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  const categoryNames = useMemo(
    () => new Set(categories.map((category) => category.name)),
    [categories]
  );

  const handleDisplayNameChange = (displayName) => {
    const name = form.name || createCategoryKey(displayName, categories);
    setForm((current) => ({ ...current, displayName, name }));
  };

  const handleCreate = async () => {
    const displayName = form.displayName.trim();
    let name = form.name.trim();

    if (!displayName || !name || !form.icon.trim()) {
      showMessage("Dados incompletos", "Preencha nome, identificador e ícone.");
      return;
    }

    if (categoryNames.has(name)) {
      name = createCategoryKey(displayName, categories);
    }

    try {
      setSaving(true);
      await addCategory({
        ...form,
        name,
        displayName,
        icon: form.icon.trim()
      });
      setForm(initialForm);
      showMessage("Sucesso!", "Categoria criada com sucesso!");
    } catch (error) {
      showMessage("Erro", error.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteCategory = async (category) => {
    try {
      await removeCategory(category.id);
    } catch (error) {
      showMessage("Erro", error.message);
    }
  };

  const confirmDelete = (category) => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        `Deseja excluir ${category.displayName}?`
      );

      if (confirmed) {
        deleteCategory(category);
      }

      return;
    }

    Alert.alert(
      "Excluir categoria",
      `Deseja excluir ${category.displayName}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => deleteCategory(category)
        }
      ]
    );
  };

  return (
    <View style={globalStyles.screenContainer}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={globalStyles.content}
        ListHeaderComponent={
          <View style={styles.form}>
            <Text style={styles.title}>Nova categoria</Text>
            <TextInput
              value={form.displayName}
              onChangeText={handleDisplayNameChange}
              placeholder="Nome exibido"
              style={globalStyles.input}
            />
            <TextInput
              value={form.name}
              onChangeText={(name) =>
                setForm((current) => ({ ...current, name }))
              }
              autoCapitalize="none"
              placeholder="identificador"
              style={globalStyles.input}
            />
            <TextInput
              value={form.icon}
              onChangeText={(icon) =>
                setForm((current) => ({ ...current, icon }))
              }
              autoCapitalize="none"
              placeholder="ícone Material Icons"
              style={globalStyles.input}
            />

            <View style={styles.palette}>
              {customCategoryPalette.map((background) => (
                <TouchableOpacity
                  key={background}
                  onPress={() =>
                    setForm((current) => ({ ...current, background }))
                  }
                  style={[
                    styles.swatch,
                    { backgroundColor: background },
                    form.background === background && styles.selectedSwatch
                  ]}
                />
              ))}
            </View>

            <View style={styles.switchRow}>
              <Text style={globalStyles.primaryText}>Receita</Text>
              <Switch
                value={form.isIncome}
                onValueChange={(isIncome) =>
                  setForm((current) => ({ ...current, isIncome }))
                }
              />
            </View>

            <Button onPress={handleCreate} disabled={saving}>
              {saving ? "Salvando..." : "Criar categoria"}
            </Button>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.categoryRow}>
            <View style={[styles.icon, { backgroundColor: item.background }]}>
              <MaterialIcons
                name={item.icon}
                size={24}
                color={colors.primaryContrast}
              />
            </View>
            <View style={styles.categoryText}>
              <Text style={globalStyles.primaryText}>{item.displayName}</Text>
              <Text style={globalStyles.secondaryText}>
                {item.name}
                {item.isIncome ? " - receita" : " - despesa"}
                {item.isDefault ? " - padrão" : " - personalizada"}
              </Text>
            </View>
            {!item.isDefault && (
              <TouchableOpacity
                onPress={() => confirmDelete(item)}
                style={styles.deleteButton}
              >
                <MaterialIcons
                  name="delete"
                  size={22}
                  color={colors.negativeText}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
        ItemSeparatorComponent={() => <View style={globalStyles.line} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 10,
    marginBottom: 14
  },
  title: {
    color: colors.primaryText,
    fontSize: 18,
    fontWeight: "800"
  },
  palette: {
    flexDirection: "row",
    gap: 8
  },
  swatch: {
    width: 36,
    height: 36,
    borderRadius: 18
  },
  selectedSwatch: {
    borderColor: colors.primaryText,
    borderWidth: 3
  },
  switchRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  categoryRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    paddingVertical: 8
  },
  icon: {
    alignItems: "center",
    borderRadius: 22,
    height: 44,
    justifyContent: "center",
    width: 44
  },
  categoryText: {
    flex: 1
  },
  deleteButton: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    width: 40
  }
});
