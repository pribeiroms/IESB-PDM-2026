import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import CategoryItem from "./CategoryItem";

export default function TransactionItem({
  category,
  date,
  description,
  onLongPress,
  value
}) {
  const valueStyle =
    category?.isIncome ? globalStyles.positiveText : globalStyles.negativeText;
  const transactionDate = new Date(date);
  const transactionValue = Number(value) || 0;

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.75}
        onLongPress={onLongPress}
        style={styles.itemContainer}
      >
        <CategoryItem category={category} />
        <View style={styles.textContainer}>
          <Text style={globalStyles.secondaryText}>
            {transactionDate.toLocaleDateString("pt-BR")}
          </Text>
          <View style={styles.bottomLineContainer}>
            <Text style={[globalStyles.primaryText, styles.description]}>
              {description}
            </Text>
            <Text style={[valueStyle, styles.value]}>
              {transactionValue.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={globalStyles.line} />
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 4
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 12,
    paddingVertical: 8
  },
  bottomLineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12
  },
  description: {
    flex: 1
  },
  value: {
    flexShrink: 0
  }
});
