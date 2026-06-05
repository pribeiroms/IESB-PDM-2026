import { router } from "expo-router";
import { useContext, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  RefreshControl,
  Text,
  View
} from "react-native";
import EditTransactionModal from "../../components/EditTransactionModal";
import MonthYearFilter, {
  filterByPeriod
} from "../../components/MonthYearFilter";
import TransactionItem from "../../components/TransactionItem";
import { colors } from "../../constants/colors";
import { useAuth } from "../../contexts/AuthState";
import { MoneyContext } from "../../contexts/GlobalState";
import { globalStyles } from "../../styles/globalStyles";

export default function Transactions() {
  const { logout, user } = useAuth();
  const { error, loading, refresh, removeTransaction, transactions } =
    useContext(MoneyContext);
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const filteredTransactions = useMemo(
    () => filterByPeriod(transactions, selectedPeriod),
    [transactions, selectedPeriod]
  );

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const deleteTransaction = async (transaction) => {
    try {
      await removeTransaction(transaction.id);
    } catch (deleteError) {
      if (Platform.OS === "web") {
        window.alert(deleteError.message);
        return;
      }

      Alert.alert("Erro", deleteError.message);
    }
  };

  const confirmDelete = (transaction) => {
    const message = `Deseja excluir ${transaction.description}?`;

    if (Platform.OS === "web") {
      if (window.confirm(message)) {
        deleteTransaction(transaction);
      }

      return;
    }

    Alert.alert("Excluir transação", message, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => deleteTransaction(transaction)
      }
    ]);
  };

  if (loading) {
    return (
      <View style={[globalStyles.screenContainer, globalStyles.centered]}>
        <ActivityIndicator size="large" />
        <Text style={globalStyles.secondaryText}>Carregando dados...</Text>
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
      <FlatList
        data={filteredTransactions}
        renderItem={({ item }) => (
          <TransactionItem
            {...item}
            onDelete={() => confirmDelete(item)}
            onLongPress={() => setSelectedTransaction(item)}
          />
        )}
        keyExtractor={(item) => String(item.id)}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.welcomeRow}>
              <View>
                <Text style={styles.welcome}>
                  Olá, {user?.username ?? user?.name}
                </Text>
                <Text style={globalStyles.secondaryText}>Bem-vindo de volta</Text>
              </View>
              <Text style={styles.logout} onPress={handleLogout}>
                Sair
              </Text>
            </View>
            <MonthYearFilter
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
              transactions={transactions}
            />
          </View>
        }
        ListEmptyComponent={
          <Text style={globalStyles.secondaryText}>
            Ainda não há nenhum item!
          </Text>
        }
        contentContainerStyle={globalStyles.content}
      />
      <EditTransactionModal
        selectedTransaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </View>
  );
}

const styles = {
  header: {
    gap: 12
  },
  logout: {
    color: colors.negativeText,
    fontSize: 16,
    fontWeight: "800"
  },
  welcome: {
    color: colors.primaryText,
    fontSize: 18,
    fontWeight: "800"
  },
  welcomeRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  }
};
