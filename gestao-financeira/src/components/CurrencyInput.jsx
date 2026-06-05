import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

function valueToDigits(value) {
  if (!value) {
    return "";
  }

  return String(Math.round(Number(value) * 100));
}

export default function CurrencyInput({ form, setForm, valueInputRef }) {
  const [digits, setDigits] = useState(valueToDigits(form.value));

  useEffect(() => {
    setDigits(valueToDigits(form.value));
  }, [form.value]);

  const handleCurrencyChange = (text) => {
    const nextDigits = text.replace(/\D/g, "");
    const numberValue = nextDigits ? Number(nextDigits) / 100 : 0;

    setDigits(nextDigits);
    setForm({ ...form, value: numberValue });
  };

  const maskedValue = digits
    ? currencyFormatter.format(Number(digits) / 100)
    : "";

  return (
    <View>
      <Text style={globalStyles.inputLabel}>Valor</Text>
      <TextInput
        ref={valueInputRef}
        value={maskedValue}
        onChangeText={handleCurrencyChange}
        keyboardType="numeric"
        placeholder="R$ 0,00"
        style={globalStyles.input}
      />
    </View>
  );
}
