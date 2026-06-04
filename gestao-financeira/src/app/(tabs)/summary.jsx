import { useContext, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import MonthYearFilter, {
  filterByPeriod
} from "../../components/MonthYearFilter";
import SummaryChart from "../../components/SummaryChart";
import SummaryItem from "../../components/SummaryItem";
import { colors } from "../../constants/colors";
import { MoneyContext } from "../../contexts/GlobalState";
import { globalStyles } from "../../styles/globalStyles";

export default function Summary() {
  const { categories, error, loading, refresh, transactions } =
    useContext(MoneyContext);
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  const filteredTransactions = useMemo(
    () => filterByPeriod(transactions, selectedPeriod),
    [transactions, selectedPeriod]
  );

  const totals = useMemo(() => {
    const nextTotals = { sum: 0 };

    for (let i = 0; i < categories.length; i++) {
      nextTotals[categories[i].id] = 0;
    }

    for (let i = 0; i < filteredTransactions.length; i++) {
      const item = filteredTransactions[i];

      if (!item.categoryId || !item.category) {
        continue;
      }

      const value = Number(item.value) || 0;

      nextTotals[item.categoryId] = (nextTotals[item.categoryId] ?? 0) + value;

      if (item.category.isIncome) {
        nextTotals.sum += value;
      } else {
        nextTotals.sum -= value;
      }
    }

    return nextTotals;
  }, [categories, filteredTransactions]);

  const chartItems = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        value: totals[category.id] ?? 0
      })),
    [categories, totals]
  );
  const valueStyle =
    totals.sum >= 0 ? globalStyles.positiveText : globalStyles.negativeText;

  if (loading) {
    return (
      <View style={[globalStyles.screenContainer, globalStyles.centered]}>
        <ActivityIndicator size="large" />
        <Text style={globalStyles.secondaryText}>Carregando resumo...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[globalStyles.screenContainer, globalStyles.centered]}>
        <Text style={globalStyles.primaryText}>{error}</Text>
        <Text style={globalStyles.linkText} onPress={refresh}>
          Tentar novamente
        </Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.screenContainer}>
      <ScrollView contentContainerStyle={globalStyles.content}>
        <MonthYearFilter
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          transactions={transactions}
        />

        {categories.map((category) => (
          <SummaryItem
            key={category.id}
            category={category}
            value={totals[category.id]}
          />
        ))}

        <View style={globalStyles.line} />

        <View style={styles.balance}>
          <Text style={styles.balanceText}>Saldo</Text>
          <Text style={valueStyle}>
            {totals.sum.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}
          </Text>
        </View>

        <View style={globalStyles.line} />

        <SummaryChart items={chartItems} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  balance: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  balanceText: {
    fontSize: 18,
    color: colors.primaryText,
    fontWeight: "800"
  }
});
