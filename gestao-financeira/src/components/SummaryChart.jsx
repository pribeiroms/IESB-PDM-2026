import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { colors } from "../constants/colors";
import { globalStyles } from "../styles/globalStyles";

const CHART_SIZE = 180;
const CENTER = CHART_SIZE / 2;
const RADIUS = 82;

function polarToCartesian(angle) {
  const angleInRadians = ((angle - 90) * Math.PI) / 180;

  return {
    x: CENTER + RADIUS * Math.cos(angleInRadians),
    y: CENTER + RADIUS * Math.sin(angleInRadians)
  };
}

function createSlicePath(startAngle, endAngle) {
  const start = polarToCartesian(endAngle);
  const end = polarToCartesian(startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    `M ${CENTER} ${CENTER}`,
    `L ${start.x} ${start.y}`,
    `A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    "Z"
  ].join(" ");
}

export default function SummaryChart({ items }) {
  const expenses = items.filter((item) => !item.isIncome && item.value > 0);
  const total = expenses.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  if (expenses.length === 0) {
    return (
      <Text style={globalStyles.secondaryText}>
        Nenhuma despesa para exibir no gráfico.
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Despesas por categoria</Text>
      <View style={styles.chartContainer}>
        <Svg height={CHART_SIZE} width={CHART_SIZE}>
          {expenses.length === 1 ? (
            <Circle
              cx={CENTER}
              cy={CENTER}
              fill={expenses[0].background}
              r={RADIUS}
            />
          ) : (
            expenses.map((item) => {
              const sliceAngle = (item.value / total) * 360;
              const startAngle = currentAngle;
              const endAngle = currentAngle + sliceAngle;
              currentAngle = endAngle;

              return (
                <Path
                  d={createSlicePath(startAngle, endAngle)}
                  fill={item.background}
                  key={item.id}
                  stroke={colors.background}
                  strokeWidth={2}
                />
              );
            })
          )}
        </Svg>

        <View style={styles.legend}>
          {expenses.map((item) => {
            const percent = total > 0 ? (item.value / total) * 100 : 0;

            return (
              <View key={item.id} style={styles.legendItem}>
                <View
                  style={[
                    styles.legendColor,
                    { backgroundColor: item.background }
                  ]}
                />
                <View style={styles.legendText}>
                  <Text numberOfLines={1} style={styles.label}>
                    {item.displayName}
                  </Text>
                  <Text style={styles.value}>
                    {percent.toFixed(1).replace(".", ",")}% -{" "}
                    {item.value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL"
                    })}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
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
  chartContainer: {
    alignItems: "center",
    gap: 16
  },
  legend: {
    gap: 8,
    width: "100%"
  },
  legendItem: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8
  },
  legendColor: {
    borderRadius: 6,
    height: 12,
    width: 12
  },
  legendText: {
    flex: 1
  },
  label: {
    color: colors.primaryText,
    fontSize: 14,
    fontWeight: "700"
  },
  value: {
    color: colors.secondaryText,
    fontSize: 12
  }
});
