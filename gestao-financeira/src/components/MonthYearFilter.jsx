import { Picker } from "@react-native-picker/picker";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { globalStyles } from "../styles/globalStyles";

function getPeriodKey(date) {
  const transactionDate = new Date(date);
  const year = transactionDate.getFullYear();
  const month = String(transactionDate.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

function getPeriodLabel(periodKey) {
  const [year, month] = periodKey.split("-").map(Number);
  const date = new Date(year, month - 1, 1);

  return date.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric"
  });
}

export function filterByPeriod(transactions, selectedPeriod) {
  if (selectedPeriod === "all") {
    return transactions;
  }

  return transactions.filter((transaction) => {
    return getPeriodKey(transaction.date) === selectedPeriod;
  });
}

export default function MonthYearFilter({
  selectedPeriod,
  setSelectedPeriod,
  transactions
}) {
  const periods = useMemo(() => {
    const uniquePeriods = new Set(
      transactions.map((transaction) => getPeriodKey(transaction.date))
    );

    return [...uniquePeriods].sort().reverse();
  }, [transactions]);

  return (
    <View>
      <Text style={globalStyles.inputLabel}>Periodo</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={selectedPeriod}
          onValueChange={(value) => setSelectedPeriod(value)}
        >
          <Picker.Item label="Todos os meses" value="all" />
          {periods.map((period) => (
            <Picker.Item
              key={period}
              label={getPeriodLabel(period)}
              value={period}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    justifyContent: "center",
    height: 44,
    borderColor: colors.secondaryText,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colors.primaryContrast,
    overflow: "hidden"
  }
});
