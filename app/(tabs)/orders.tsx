import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, CheckCircle, Package } from 'lucide-react-native';

const orders = [
  {
    id: '1',
    number: '#12345',
    date: '15 Dez, 2024',
    status: 'delivered',
    total: 107.8,
    items: 3,
  },
  {
    id: '2',
    number: '#12344',
    date: '12 Dez, 2024',
    status: 'processing',
    total: 189.9,
    items: 1,
  },
  {
    id: '3',
    number: '#12343',
    date: '10 Dez, 2024',
    status: 'delivered',
    total: 69.9,
    items: 2,
  },
];

const getStatusInfo = (status: string) => {
  switch (status) {
    case 'delivered':
      return {
        label: 'Entregue',
        color: '#22c55e',
        icon: CheckCircle,
      };
    case 'processing':
      return {
        label: 'Preparando',
        color: '#d4af37',
        icon: Clock,
      };
    default:
      return {
        label: 'Pendente',
        color: '#666',
        icon: Package,
      };
  }
};

export default function OrdersScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.wrapper, { maxWidth: 900, alignSelf: 'center', width: '100%' }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Pedidos</Text>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
        {orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum pedido ainda</Text>
            <Text style={styles.emptySubtext}>
              Seus pedidos aparecerão aqui
            </Text>
          </View>
        ) : (
          <View style={styles.ordersContainer}>
            {orders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;

              return (
                <TouchableOpacity
                  key={order.id}
                  style={styles.orderCard}
                  onPress={() =>
                    order.status === 'processing'
                      ? router.push('/(tabs)/tracking')
                      : null
                  }>
                  <View style={styles.orderHeader}>
                    <View>
                      <Text style={styles.orderNumber}>{order.number}</Text>
                      <Text style={styles.orderDate}>{order.date}</Text>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: `${statusInfo.color}20` },
                      ]}>
                      <StatusIcon
                        size={14}
                        color={statusInfo.color}
                        strokeWidth={2}
                      />
                      <Text
                        style={[styles.statusText, { color: statusInfo.color }]}>
                        {statusInfo.label}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.orderFooter}>
                    <Text style={styles.itemsCount}>
                      {order.items} {order.items === 1 ? 'item' : 'itens'}
                    </Text>
                    <Text style={styles.orderTotal}>
                      R$ {order.total.toFixed(2)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  wrapper: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
  },
  ordersContainer: {
    gap: 16,
  },
  orderCard: {
    backgroundColor: '#151515',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#252525',
    padding: 18,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#252525',
    marginVertical: 16,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemsCount: {
    fontSize: 14,
    color: '#666',
  },
  orderTotal: {
    fontSize: 20,
    fontWeight: '700',
    color: '#d4af37',
  },
});
