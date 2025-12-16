import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft, Plus, Minus, ShoppingCart, Snowflake, Flame } from 'lucide-react-native';
import { useState } from 'react';

const products = [
  {
    id: '1',
    name: 'Cerveja Artesanal IPA',
    category: 'drinks',
    price: 18.9,
    originalPrice: 26.9,
    image: 'https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg',
    unit: 'und',
    discount: 30,
    badge: 'Promoção',
    description:
      'Cerveja artesanal IPA com notas cítricas e amargor equilibrado. Perfeita para acompanhar petiscos.',
    abv: '5.5%',
    volume: '355ml',
  },
  {
    id: '2',
    name: 'Vinho Tinto Premium',
    category: 'drinks',
    price: 89.9,
    image: 'https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg',
    unit: 'und',
    badge: 'Premium',
    description:
      'Vinho tinto encorpado com taninos macios e final prolongado. Ideal para carnes vermelhas.',
    abv: '13%',
    volume: '750ml',
  },
  {
    id: '3',
    name: 'Picanha Premium',
    category: 'meats',
    price: 69.9,
    originalPrice: 89.9,
    image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg',
    unit: 'kg',
    discount: 22,
    badge: 'Destaque',
    description:
      'Picanha premium de primeira qualidade, macia e suculenta. Corte nobre para churrasco.',
    origin: 'Brasil',
  },
  {
    id: '4',
    name: 'Costela Bovina',
    category: 'meats',
    price: 45.9,
    image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg',
    unit: 'kg',
    description:
      'Costela bovina de alta qualidade, perfeita para assados e churrascos longos.',
    origin: 'Brasil',
  },
  {
    id: '5',
    name: 'Whisky 12 Anos',
    category: 'drinks',
    price: 189.9,
    image: 'https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg',
    unit: 'und',
    badge: 'Importado',
    description:
      'Whisky envelhecido por 12 anos com notas de carvalho e especiarias. Sabor refinado e complexo.',
    abv: '40%',
    volume: '750ml',
  },
  {
    id: '6',
    name: 'Filé Mignon',
    category: 'meats',
    price: 79.9,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
    unit: 'kg',
    description:
      'Filé mignon premium, o corte mais macio da carne bovina. Perfeito para grelhados.',
    origin: 'Brasil',
  },
];

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [temperature, setTemperature] = useState<'cold' | 'hot'>('cold');

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFoundText}>Produto não encontrado</Text>
      </SafeAreaView>
    );
  }

  const isDrink = product.category === 'drinks';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ maxWidth: 1000, alignSelf: 'center', width: '100%' }}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}>
            <ArrowLeft size={24} color="#fff" strokeWidth={2} />
          </TouchableOpacity>
          {product.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{product.discount}%</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.name}>{product.name}</Text>
              {product.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{product.badge}</Text>
                </View>
              )}
            </View>

            <View style={styles.priceContainer}>
              {product.originalPrice && (
                <Text style={styles.originalPrice}>
                  R$ {product.originalPrice.toFixed(2)}
                </Text>
              )}
              <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
              <Text style={styles.unit}>por {product.unit}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descrição</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {(product.abv || product.volume || product.origin) && (
            <>
              <View style={styles.divider} />
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informações</Text>
                {product.abv && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Teor Alcoólico</Text>
                    <Text style={styles.infoValue}>{product.abv}</Text>
                  </View>
                )}
                {product.volume && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Volume</Text>
                    <Text style={styles.infoValue}>{product.volume}</Text>
                  </View>
                )}
                {product.origin && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Origem</Text>
                    <Text style={styles.infoValue}>{product.origin}</Text>
                  </View>
                )}
              </View>
            </>
          )}

          <View style={styles.divider} />

          {isDrink && (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Temperatura</Text>
                <View style={styles.temperatureContainer}>
                  <TouchableOpacity
                    style={[
                      styles.temperatureButton,
                      temperature === 'cold' && styles.temperatureButtonActive,
                    ]}
                    onPress={() => setTemperature('cold')}>
                    <Snowflake
                      size={20}
                      color={temperature === 'cold' ? '#0a0a0a' : '#666'}
                      strokeWidth={2}
                    />
                    <Text
                      style={[
                        styles.temperatureText,
                        temperature === 'cold' && styles.temperatureTextActive,
                      ]}>
                      Gelado
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.temperatureButton,
                      temperature === 'hot' && styles.temperatureButtonActive,
                    ]}
                    onPress={() => setTemperature('hot')}>
                    <Flame
                      size={20}
                      color={temperature === 'hot' ? '#0a0a0a' : '#666'}
                      strokeWidth={2}
                    />
                    <Text
                      style={[
                        styles.temperatureText,
                        temperature === 'hot' && styles.temperatureTextActive,
                      ]}>
                      Quente
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.divider} />
            </>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quantidade</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus size={20} color="#d4af37" strokeWidth={2} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}>
                <Plus size={20} color="#d4af37" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>
            R$ {(product.price * quantity).toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton}>
          <ShoppingCart size={20} color="#0a0a0a" strokeWidth={2} />
          <Text style={styles.addToCartText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  notFoundText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  imageContainer: {
    width: '100%',
    height: 400,
    backgroundColor: '#151515',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(10, 10, 10, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#252525',
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#d4af37',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  discountText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0a0a0a',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
  },
  badge: {
    backgroundColor: '#d4af37',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0a0a0a',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  price: {
    fontSize: 34,
    fontWeight: '700',
    color: '#d4af37',
  },
  unit: {
    fontSize: 16,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#252525',
    marginVertical: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#999',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  quantityButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    minWidth: 50,
    textAlign: 'center',
  },
  temperatureContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  temperatureButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#252525',
  },
  temperatureButtonActive: {
    backgroundColor: '#d4af37',
    borderColor: '#d4af37',
  },
  temperatureText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  temperatureTextActive: {
    color: '#0a0a0a',
  },
  footer: {
    padding: 20,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
    gap: 12,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalPrice: {
    fontSize: 26,
    fontWeight: '700',
    color: '#d4af37',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d4af37',
    borderRadius: 20,
    padding: 20,
    gap: 10,
  },
  addToCartText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0a0a0a',
  },
});
