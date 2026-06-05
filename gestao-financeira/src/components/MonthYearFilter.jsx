import { useMemo } from "react";
import { Text, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import SelectField from "./SelectField";

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
  const options = useMemo(
    () => [
      { label: "Todos os meses", value: "all" },
      ...periods.map((period) => ({
        label: getPeriodLabel(period),
        value: period
      }))
    ],
    [periods]
  );

  return (
    <View>
      <Text style={globalStyles.inputLabel}>Período</Text>
      <SelectField
        onChange={setSelectedPeriod}
        options={options}
        placeholder="Selecione um período"
        value={selectedPeriod}
      />
    </View>
  );
}
