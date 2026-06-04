import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import Button from "../../components/Button";
import CategoryPicker from "../../components/CategoryPicker";
import CurrencyInput from "../../components/CurrencyInput";
import DatePicker from "../../components/DatePicker";
import DescriptionInput from "../../components/DescriptionInput";
import { MoneyContext } from "../../contexts/GlobalState";
import { globalStyles } from "../../styles/globalStyles";

const initialForm = {
  description: "",
  value: 0,
  date: new Date(),
  categoryId: ""
};

export default function AddTransactions() {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const valueInputRef = useRef(null);
  const { addTransaction, categories } = useContext(MoneyContext);

  const defaultCategoryId = useMemo(
    () =>
      categories.find((category) => category.isIncome)?.id ??
      categories[0]?.id ??
      "",
    [categories]
  );

  useEffect(() => {
    if (!form.categoryId && defaultCategoryId) {
      setForm((current) => ({ ...current, categoryId: defaultCategoryId }));
    }
  }, [defaultCategoryId, form.categoryId]);

  const handleAddTransaction = async () => {
    if (!form.description.trim() || form.value <= 0 || !form.categoryId) {
      Alert.alert("Dados incompletos", "Preencha descricao, valor e categoria.");
      return;
    }

    try {
      setSaving(true);
      await addTransaction({
        description: form.description.trim(),
        value: form.value,
        date: form.date,
        categoryId: form.categoryId
      });

      setForm({ ...initialForm, categoryId: defaultCategoryId });
      Alert.alert("Sucesso!", "Transacao adicionada com sucesso!");
    } catch (error) {
      Alert.alert("Erro", error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={globalStyles.screenContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={globalStyles.content}>
          <View style={styles.form}>
            <DescriptionInput
              form={form}
              setForm={setForm}
              valueInputRef={valueInputRef}
            />
            <CurrencyInput
              form={form}
              setForm={setForm}
              valueInputRef={valueInputRef}
            />
            <DatePicker form={form} setForm={setForm} />
            <CategoryPicker form={form} setForm={setForm} />
          </View>

          <Button onPress={handleAddTransaction} disabled={saving}>
            {saving ? "Salvando..." : "Adicionar"}
          </Button>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 12,
    marginBottom: 40,
    marginTop: 10
  }
});
