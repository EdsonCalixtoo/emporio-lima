import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Plus, Minus, Trash2 } from 'lucide-react-native';
import { useResponsive } from '@/hooks/useResponsive';

const cartItems = [
  {
    id: '1',
    name: 'Cerveja Artesanal IPA',
    price: 18.9,
    quantity: 2,
    image: 'https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg',
    unit: 'und',
  },
  {
    id: '2',
    name: 'Picanha Premium',
    price: 69.9,
    quantity: 1,
    image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg',
    unit: 'kg',
  },
];

export default function CartScreen() {
  const router = useRouter();
  const { isDesktop } = useResponsive();
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 5.9;
  const total = subtotal + deliveryFee;

  const summarySection = (
    <View style={[styles.summaryContainer, isDesktop && styles.summaryContainerDesktop]}>
      <Text style={styles.summaryTitle}>Resumo do Pedido</Text>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Subtotal</Text>
        <Text style={styles.summaryValue}>R$ {subtotal.toFixed(2)}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Taxa de entrega</Text>
        <Text style={styles.summaryValue}>R$ {deliveryFee.toFixed(2)}</Text>
      </View>
      <View style={[styles.summaryRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
      </View>
      {!isDesktop && (
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => router.push('/(tabs)/tracking')}>
          <Text style={styles.checkoutButtonText}>Finalizar Pedido</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Carrinho</Text>
        <Text style={styles.itemCount}>{cartItems.length} itens</Text>
      </View>

      {isDesktop ? (
        <View style={styles.desktopLayout}>
          <ScrollView style={styles.desktopContent} showsVerticalScrollIndicator={false}>
            {cartItems.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
                <Text style={styles.emptySubtext}>
                  Adicione produtos para começar
                </Text>
              </View>
            ) : (
              <View style={styles.itemsContainer}>
                {cartItems.map((item) => (
                  <View key={item.id} style={styles.cartItem}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.itemImage}
                      resizeMode="cover"
                    />
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName} numberOfLines={2}>
                        {item.name}
                      </Text>
                      <Text style={styles.itemPrice}>
                        R$ {item.price.toFixed(2)} / {item.unit}
                      </Text>
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity style={styles.quantityButton}>
                          <Minus size={16} color="#d4af37" strokeWidth={2} />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity style={styles.quantityButton}>
                          <Plus size={16} color="#d4af37" strokeWidth={2} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.itemActions}>
                      <Text style={styles.itemTotal}>
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </Text>
                      <TouchableOpacity style={styles.removeButton}>
                        <Trash2 size={18} color="#ff4444" strokeWidth={2} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
          <View style={styles.desktopSidebar}>
            {summarySection}
            <TouchableOpacity
              style={styles.checkoutButtonDesktop}
              onPress={() => router.push('/(tabs)/tracking')}>
              <Text style={styles.checkoutButtonTextDesktop}>Finalizar Pedido</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {cartItems.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
              <Text style={styles.emptySubtext}>
                Adicione produtos para começar
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.itemsContainer}>
                {cartItems.map((item) => (
                  <View key={item.id} style={styles.cartItem}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.itemImage}
                      resizeMode="cover"
                    />
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName} numberOfLines={2}>
                        {item.name}
                      </Text>
                      <Text style={styles.itemPrice}>
                        R$ {item.price.toFixed(2)} / {item.unit}
                      </Text>
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity style={styles.quantityButton}>
                          <Minus size={16} color="#d4af37" strokeWidth={2} />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity style={styles.quantityButton}>
                          <Plus size={16} color="#d4af37" strokeWidth={2} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.itemActions}>
                      <Text style={styles.itemTotal}>
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </Text>
                      <TouchableOpacity style={styles.removeButton}>
                        <Trash2 size={18} color="#ff4444" strokeWidth={2} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
              {summarySection}
            </>
          )}
        </ScrollView>
      )}
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
  itemCount: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
  },
  desktopLayout: {
    flex: 1,
    flexDirection: 'row',
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
  },
  desktopContent: {
    flex: 1,
  },
  desktopSidebar: {
    width: 400,
    padding: 20,
    borderLeftWidth: 1,
    borderLeftColor: '#1a1a1a',
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
  itemsContainer: {
    padding: 20,
    gap: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#151515',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#252525',
    padding: 14,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 16,
    backgroundColor: '#0a0a0a',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  itemPrice: {
    fontSize: 13,
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    minWidth: 24,
    textAlign: 'center',
  },
  itemActions: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginLeft: 14,
  },
  itemTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#d4af37',
  },
  removeButton: {
    padding: 6,
  },
  summaryContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#151515',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#252525',
    gap: 14,
  },
  summaryContainerDesktop: {
    margin: 0,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 15,
    color: '#666',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  totalRow: {
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#252525',
    marginTop: 6,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#d4af37',
  },
  checkoutButton: {
    backgroundColor: '#d4af37',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  checkoutButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0a0a0a',
  },
  checkoutButtonDesktop: {
    backgroundColor: '#d4af37',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  checkoutButtonTextDesktop: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0a0a0a',
  },
});
