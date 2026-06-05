import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { globalStyles } from "../styles/globalStyles";
import CategoryItem from "./CategoryItem";

export default function TransactionItem({
  category,
  date,
  description,
  onDelete,
  onLongPress,
  value
}) {
  const valueStyle =
    category?.isIncome ? globalStyles.positiveText : globalStyles.negativeText;
  const transactionDate = new Date(date);
  const transactionValue = Number(value) || 0;

  return (
    <>
      <View style={styles.itemContainer}>
        <TouchableOpacity
          activeOpacity={0.75}
          onLongPress={onLongPress}
          style={styles.transactionContent}
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
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <MaterialIcons name="delete" size={22} color={colors.negativeText} />
        </TouchableOpacity>
      </View>
      <View style={globalStyles.line} />
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 4
  },
  transactionContent: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
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
  },
  deleteButton: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    marginLeft: 4,
    width: 40
  }
});
