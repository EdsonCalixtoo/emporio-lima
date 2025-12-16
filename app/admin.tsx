import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Thermometer,
  MapPin,
  CreditCard,
  ChevronRight,
  Bell,
  Settings,
  ArrowLeft,
} from 'lucide-react-native';
import { useState } from 'react';

const adminOrders = [
  {
    id: '1',
    number: '#12345',
    customer: 'João Silva',
    status: 'pending',
    timestamp: '14:32',
    total: 107.8,
    items: [
      {
        id: '1',
        name: 'Cerveja Artesanal IPA',
        quantity: 2,
        price: 18.9,
        type: 'cold',
      },
      {
        id: '2',
        name: 'Picanha Premium',
        quantity: 1,
        price: 69.9,
        type: 'hot',
      },
    ],
    paymentMethod: 'Cartão de Crédito',
    address: 'Rua das Flores, 123 - Apto 45',
    phone: '(11) 98765-4321',
  },
  {
    id: '2',
    number: '#12344',
    customer: 'Maria Santos',
    status: 'preparing',
    timestamp: '14:28',
    total: 189.9,
    items: [
      {
        id: '1',
        name: 'Refrigerante Premium 2L',
        quantity: 1,
        price: 12.9,
        type: 'cold',
      },
      {
        id: '2',
        name: 'Moqueca de Peixe',
        quantity: 2,
        price: 78.5,
        type: 'hot',
      },
    ],
    paymentMethod: 'PIX',
    address: 'Av. Paulista, 1000 - Sala 250',
    phone: '(11) 99876-5432',
  },
  {
    id: '3',
    number: '#12343',
    customer: 'Pedro Costa',
    status: 'ready',
    timestamp: '14:15',
    total: 56.7,
    items: [
      {
        id: '1',
        name: 'Chopp 1L',
        quantity: 1,
        price: 35.9,
        type: 'cold',
      },
      {
        id: '2',
        name: 'Petisco Misto',
        quantity: 1,
        price: 20.8,
        type: 'hot',
      },
    ],
    paymentMethod: 'Dinheiro',
    address: 'Rua XV de Novembro, 500',
    phone: '(11) 97654-3210',
  },
];

const getStatusInfo = (status: string) => {
  switch (status) {
    case 'pending':
      return {
        label: 'Novo Pedido',
        color: '#ef4444',
        bgColor: '#fee2e2',
        icon: Bell,
      };
    case 'preparing':
      return {
        label: 'Preparando',
        color: '#d4af37',
        bgColor: 'rgba(212, 175, 55, 0.1)',
        icon: Clock,
      };
    case 'ready':
      return {
        label: 'Pronto para Entrega',
        color: '#22c55e',
        bgColor: '#dcfce7',
        icon: CheckCircle,
      };
    default:
      return {
        label: 'Pendente',
        color: '#666',
        bgColor: '#f3f4f6',
        icon: AlertCircle,
      };
  }
};

export default function AdminScreen() {
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const selectedOrderData = selectedOrder
    ? adminOrders.find((o) => o.id === selectedOrder)
    : null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonIcon}
          onPress={() => router.back()}>
          <ArrowLeft size={24} color="#d4af37" strokeWidth={2} />
        </TouchableOpacity>
        <View style={styles.headerLeft}>
          <Image
            source={require('@/assets/images/emporio_lima copy.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.headerTitle}>Empório Lima</Text>
            <Text style={styles.headerSubtitle}>Dashboard Admin</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#d4af37" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Pedidos Ativos</Text>
        </View>
        <View style={[styles.statCard, styles.statCardSecondary]}>
          <Text style={styles.statNumber}>R$ 354,40</Text>
          <Text style={styles.statLabel}>Total do Dia</Text>
        </View>
      </View>

      <View style={styles.content}>
        {selectedOrderData ? (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ maxWidth: 1200, alignSelf: 'center', width: '100%', padding: 20 }}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedOrder(null)}>
              <Text style={styles.backText}>← Voltar</Text>
            </TouchableOpacity>

            <View style={styles.orderDetailCard}>
              <View style={styles.detailHeader}>
                <View>
                  <Text style={styles.detailOrderNumber}>
                    {selectedOrderData.number}
                  </Text>
                  <Text style={styles.detailCustomer}>
                    {selectedOrderData.customer}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: getStatusInfo(selectedOrderData.status)
                        .bgColor,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.statusBadgeText,
                      {
                        color: getStatusInfo(selectedOrderData.status).color,
                      },
                    ]}>
                    {getStatusInfo(selectedOrderData.status).label}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Itens do Pedido</Text>
                <View style={styles.itemsList}>
                  {selectedOrderData.items.map((item) => (
                    <View key={item.id} style={styles.orderItem}>
                      <View style={styles.itemInfo}>
                        <View style={styles.itemHeader}>
                          <Text style={styles.itemName}>{item.name}</Text>
                          <View
                            style={[
                              styles.typeTag,
                              {
                                backgroundColor:
                                  item.type === 'hot'
                                    ? 'rgba(239, 68, 68, 0.1)'
                                    : 'rgba(59, 130, 246, 0.1)',
                              },
                            ]}>
                            <Thermometer
                              size={14}
                              color={item.type === 'hot' ? '#ef4444' : '#3b82f6'}
                              strokeWidth={2.5}
                            />
                            <Text
                              style={[
                                styles.typeTagText,
                                {
                                  color:
                                    item.type === 'hot'
                                      ? '#ef4444'
                                      : '#3b82f6',
                                },
                              ]}>
                              {item.type === 'hot' ? 'Quente' : 'Gelado'}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.itemRow}>
                          <Text style={styles.itemQuantity}>
                            Qtd: {item.quantity}
                          </Text>
                          <Text style={styles.itemPrice}>
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Dados do Pedido</Text>
                <View style={styles.dataGrid}>
                  <View style={styles.dataItem}>
                    <View style={styles.dataIconContainer}>
                      <CreditCard
                        size={20}
                        color="#d4af37"
                        strokeWidth={2}
                      />
                    </View>
                    <View style={styles.dataContent}>
                      <Text style={styles.dataLabel}>Pagamento</Text>
                      <Text style={styles.dataValue}>
                        {selectedOrderData.paymentMethod}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.dataItem}>
                    <View style={styles.dataIconContainer}>
                      <MapPin size={20} color="#d4af37" strokeWidth={2} />
                    </View>
                    <View style={styles.dataContent}>
                      <Text style={styles.dataLabel}>Endereço</Text>
                      <Text style={styles.dataValue}>
                        {selectedOrderData.address}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.dataItem}>
                    <View style={styles.dataIconContainer}>
                      <Text style={styles.phoneIcon}>📱</Text>
                    </View>
                    <View style={styles.dataContent}>
                      <Text style={styles.dataLabel}>Telefone</Text>
                      <Text style={styles.dataValue}>
                        {selectedOrderData.phone}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total do Pedido</Text>
                <Text style={styles.totalValue}>
                  R$ {selectedOrderData.total.toFixed(2)}
                </Text>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Recusar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.acceptButton]}>
                  <Text style={styles.acceptButtonText}>Aceitar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        ) : (
          <View style={[styles.ordersList, { maxWidth: 1200, alignSelf: 'center', width: '100%' }]}>
            <Text style={styles.listTitle}>Pedidos Pendentes</Text>
            {adminOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;

              return (
                <TouchableOpacity
                  key={order.id}
                  style={[
                    styles.orderListItem,
                    order.status === 'pending' && styles.orderListItemHighlight,
                  ]}
                  onPress={() => setSelectedOrder(order.id)}>
                  <View style={styles.orderListLeft}>
                    <View style={styles.orderListHeader}>
                      <View>
                        <Text style={styles.orderListNumber}>
                          {order.number}
                        </Text>
                        <Text style={styles.orderListCustomer}>
                          {order.customer}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.orderListStatus,
                          { backgroundColor: statusInfo.bgColor },
                        ]}>
                        <StatusIcon
                          size={14}
                          color={statusInfo.color}
                          strokeWidth={2}
                        />
                        <Text
                          style={[
                            styles.orderListStatusText,
                            { color: statusInfo.color },
                          ]}>
                          {statusInfo.label}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.orderListFooter}>
                      <Text style={styles.orderListTime}>
                        {order.timestamp}
                      </Text>
                      <Text style={styles.orderListTotal}>
                        R$ {order.total.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  <ChevronRight
                    size={24}
                    color="#d4af37"
                    strokeWidth={2}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
    gap: 12,
  },
  backButtonIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#151515',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#252525',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#d4af37',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#151515',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#252525',
  },
  statsContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#151515',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#252525',
  },
  statCardSecondary: {
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#d4af37',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
  },
  content: {
    flex: 1,
  },
  ordersList: {
    padding: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  orderListItem: {
    flexDirection: 'row',
    backgroundColor: '#151515',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#252525',
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderListItemHighlight: {
    borderColor: '#d4af37',
    borderWidth: 2,
  },
  orderListLeft: {
    flex: 1,
    gap: 12,
  },
  orderListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderListNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  orderListCustomer: {
    fontSize: 13,
    color: '#666',
  },
  orderListStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  orderListStatusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  orderListFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderListTime: {
    fontSize: 12,
    color: '#666',
  },
  orderListTotal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#d4af37',
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#d4af37',
  },
  orderDetailCard: {
    backgroundColor: '#151515',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#252525',
    padding: 20,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  detailOrderNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  detailCustomer: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#252525',
    marginVertical: 16,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  itemsList: {
    gap: 12,
  },
  orderItem: {
    backgroundColor: '#0a0a0a',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#252525',
  },
  itemInfo: {
    gap: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  typeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeTagText: {
    fontSize: 12,
    fontWeight: '700',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemQuantity: {
    fontSize: 13,
    color: '#666',
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#d4af37',
  },
  dataGrid: {
    gap: 12,
  },
  dataItem: {
    flexDirection: 'row',
    backgroundColor: '#0a0a0a',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#252525',
    alignItems: 'flex-start',
    gap: 12,
  },
  dataIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneIcon: {
    fontSize: 20,
  },
  dataContent: {
    flex: 1,
  },
  dataLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  dataValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  totalContainer: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#d4af37',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  acceptButton: {
    backgroundColor: '#d4af37',
    borderColor: '#d4af37',
  },
  acceptButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0a0a0a',
  },
});
