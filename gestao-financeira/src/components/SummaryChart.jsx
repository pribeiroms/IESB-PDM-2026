import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { globalStyles } from "../styles/globalStyles";

export default function SummaryChart({ items }) {
  const expenses = items.filter((item) => !item.isIncome && item.value > 0);
  const maxValue = Math.max(...expenses.map((item) => item.value), 0);

  if (expenses.length === 0) {
    return (
      <Text style={globalStyles.secondaryText}>
        Nenhuma despesa para exibir no grafico.
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Despesas por categoria</Text>
      {expenses.map((item) => {
        const percent = maxValue > 0 ? (item.value / maxValue) * 100 : 0;

        return (
          <View key={item.id} style={styles.row}>
            <Text style={styles.label}>{item.displayName}</Text>
            <View style={styles.track}>
              <View
                style={[
                  styles.bar,
                  {
                    width: `${Math.max(percent, 6)}%`,
                    backgroundColor: item.background
                  }
                ]}
              />
            </View>
            <Text style={styles.value}>
              {item.value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10
  },
  title: {
    fontSize: 18,
    color: colors.primaryText,
    fontWeight: "800"
  },
  row: {
    gap: 4
  },
  label: {
    color: colors.primaryText,
    fontSize: 14
  },
  track: {
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E6E6E6",
    overflow: "hidden"
  },
  bar: {
    height: 12,
    borderRadius: 6
  },
  value: {
    color: colors.secondaryText,
    fontSize: 12,
    textAlign: "right"
  }
});
