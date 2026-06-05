import { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { colors } from "../constants/colors";
import { MoneyContext } from "../contexts/GlobalState";
import { globalStyles } from "../styles/globalStyles";
import Button from "./Button";
import CategoryPicker from "./CategoryPicker";
import CurrencyInput from "./CurrencyInput";
import DatePicker from "./DatePicker";
import DescriptionInput from "./DescriptionInput";

export default function EditTransactionModal({ onClose, selectedTransaction }) {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const valueInputRef = useRef(null);
  const { removeTransaction, updateTransaction } = useContext(MoneyContext);

  useEffect(() => {
    if (selectedTransaction) {
      setForm({
        ...selectedTransaction,
        categoryId: selectedTransaction.categoryId,
        date: new Date(selectedTransaction.date),
        value: Number(selectedTransaction.value) || 0
      });
    }
  }, [selectedTransaction]);

  const saveTransaction = async () => {
    if (!form.description.trim() || form.value <= 0 || !form.categoryId) {
      Alert.alert("Dados incompletos", "Preencha descrição, valor e categoria.");
      return;
    }

    try {
      setSaving(true);
      await updateTransaction(selectedTransaction.id, {
        description: form.description.trim(),
        value: form.value,
        date: form.date,
        categoryId: form.categoryId
      });
      onClose();
      Alert.alert("Sucesso!", "Transação atualizada com sucesso!");
    } catch (error) {
      Alert.alert("Erro", error.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteTransaction = async () => {
    try {
      setSaving(true);
      await removeTransaction(selectedTransaction.id);
      onClose();
      Alert.alert("Sucesso!", "Transação excluída com sucesso!");
    } catch (error) {
      Alert.alert("Erro", error.message);
    } finally {
      setSaving(false);
    }
  };

  if (!form) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={Boolean(selectedTransaction)}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Editar transação</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
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

            <Button onPress={saveTransaction} disabled={saving}>
              {saving ? "Salvando..." : "Salvar"}
            </Button>
            <TouchableOpacity
              disabled={saving}
              onPress={deleteTransaction}
              style={[styles.deleteButton, saving && styles.disabled]}
            >
              <Text style={styles.deleteText}>Excluir transação</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.35)"
  },
  modal: {
    maxHeight: "88%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: colors.background
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14
  },
  title: {
    fontSize: 18,
    color: colors.primaryText,
    fontWeight: "800"
  },
  closeButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36
  },
  closeText: {
    color: colors.primaryText,
    fontSize: 18,
    fontWeight: "800"
  },
  content: {
    ...globalStyles.content,
    paddingTop: 0
  },
  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    borderRadius: 8,
    borderColor: colors.negativeText,
    borderWidth: 1
  },
  deleteText: {
    color: colors.negativeText,
    fontSize: 18,
    fontWeight: "600"
  },
  disabled: {
    opacity: 0.6
  }
});
