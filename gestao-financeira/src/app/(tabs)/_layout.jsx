import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.primaryContrast,
        headerTitleAlign: "center",
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.inactive,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 76,
          paddingBottom: 18,
          paddingTop: 5,
          backgroundColor: colors.background
        },
        tabBarButton: (props) => (
          <TouchableOpacity {...props} activeOpacity={0.8} />
        )
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Transações",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="attach-money" size={28} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categorias",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="category" size={26} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="add-transactions"
        options={{
          title: "Adicionar Transação",
          tabBarLabel: "",
          tabBarIconStyle: styles.addIconWrapper,
          tabBarIcon: () => (
            <View style={styles.addButton}>
              <MaterialIcons
                name="add"
                size={26}
                color={colors.primaryContrast}
              />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="summary"
        options={{
          title: "Resumo",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="pie-chart" size={28} color={color} />
          )
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  addIconWrapper: {
    marginTop: 10
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 42,
    width: 42,
    borderRadius: 21,
    backgroundColor: colors.primary
  }
});
