import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Search,
  Plus,
  MapPin,
  Clock,
  TrendingUp,
  Sparkles,
} from 'lucide-react-native';
import { useResponsive } from '@/hooks/useResponsive';

const banners = [
  {
    id: '1',
    title: 'Cervejas Premium',
    subtitle: 'Até 30% OFF',
    gradient: ['#1a1a1a', '#404040'],
    image: 'https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg',
  },
  {
    id: '2',
    title: 'Carnes Nobres',
    subtitle: 'Qualidade garantida',
    gradient: ['#2a2a2a', '#505050'],
    image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg',
  },
];

const categoryCards = [
  {
    id: '1',
    name: 'Cervejas',
    icon: 'beer',
    count: 24,
    slug: 'drinks',
  },
  {
    id: '2',
    name: 'Vinhos',
    icon: 'wine',
    count: 18,
    slug: 'drinks',
  },
  {
    id: '3',
    name: 'Destilados',
    icon: 'whisky',
    count: 12,
    slug: 'drinks',
  },
  {
    id: '4',
    name: 'Carnes',
    icon: 'meat',
    count: 15,
    slug: 'meats',
  },
  {
    id: '5',
    name: 'Queijos',
    icon: 'cheese',
    count: 10,
    slug: 'cheese',
  },
  {
    id: '6',
    name: 'Petiscos',
    icon: 'snacks',
    count: 20,
    slug: 'snacks',
  },
  {
    id: '7',
    name: 'Sobremesas',
    icon: 'dessert',
    count: 8,
    slug: 'desserts',
  },
];

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
  },
  {
    id: '2',
    name: 'Vinho Tinto Premium',
    category: 'drinks',
    price: 89.9,
    image: 'https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg',
    unit: 'und',
    badge: 'Premium',
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
  },
  {
    id: '4',
    name: 'Costela Bovina',
    category: 'meats',
    price: 45.9,
    image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg',
    unit: 'kg',
  },
  {
    id: '5',
    name: 'Whisky 12 Anos',
    category: 'drinks',
    price: 189.9,
    image: 'https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg',
    unit: 'und',
    badge: 'Importado',
  },
  {
    id: '6',
    name: 'Filé Mignon',
    category: 'meats',
    price: 79.9,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
    unit: 'kg',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { isDesktop, isTablet, width } = useResponsive();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBanner, setCurrentBanner] = useState(0);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const discountedProducts = products.filter((p) => p.discount);

  const getProductColumns = () => {
    if (width >= 1536) return 5;
    if (width >= 1024) return 4;
    if (width >= 768) return 3;
    return 2;
  };

  const getCategoryColumns = () => {
    if (width >= 1024) return 7;
    if (width >= 768) return 5;
    return 0;
  };

  const productColumns = getProductColumns();
  const categoryColumns = getCategoryColumns();
  const maxWidth = isDesktop ? 1400 : '100%';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.content, { maxWidth, alignSelf: 'center', width: '100%' }]}>
          <View style={styles.logoHeader}>
            <Image
              source={require('@/assets/images/emporio_lima copy.jpg')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.brandInfo}>
              <Text style={styles.brandName}>Empório Lima</Text>
              <Text style={styles.brandTagline}>Qualidade Premium</Text>
            </View>
          </View>

          <View style={styles.topBar}>
            <View style={styles.locationContainer}>
              <MapPin size={18} color="#d4af37" strokeWidth={2} />
              <View>
                <Text style={styles.locationLabel}>Entregando em</Text>
                <Text style={styles.locationText}>São Paulo, SP</Text>
              </View>
            </View>
            <View style={styles.deliveryBadge}>
              <Clock size={16} color="#d4af37" strokeWidth={2} />
              <Text style={styles.deliveryText}>35 min</Text>
            </View>
          </View>

          <View style={[styles.searchContainer, isDesktop && styles.searchContainerDesktop]}>
            <Search size={18} color="#666" strokeWidth={2} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar produtos..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.bannerContainer}>
            {isDesktop ? (
              <View style={styles.bannersGrid}>
                {banners.map((banner) => (
                  <TouchableOpacity key={banner.id} style={styles.bannerDesktop}>
                    <Image
                      source={{ uri: banner.image }}
                      style={styles.bannerImage}
                      resizeMode="cover"
                    />
                    <View style={styles.bannerOverlay} />
                    <View style={styles.bannerContent}>
                      <Text style={styles.bannerTitle}>{banner.title}</Text>
                      <View style={styles.bannerBadge}>
                        <TrendingUp size={14} color="#0a0a0a" strokeWidth={2.5} />
                        <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={16}
                  decelerationRate="fast"
                  snapToInterval={336}
                  snapToAlignment="start"
                  onScroll={(e) => {
                    const offset = e.nativeEvent.contentOffset.x;
                    const index = Math.round(offset / 336);
                    setCurrentBanner(index);
                  }}>
                  {banners.map((banner) => (
                    <TouchableOpacity key={banner.id} style={styles.banner}>
                      <Image
                        source={{ uri: banner.image }}
                        style={styles.bannerImage}
                        resizeMode="cover"
                      />
                      <View style={styles.bannerOverlay} />
                      <View style={styles.bannerContent}>
                        <Text style={styles.bannerTitle}>{banner.title}</Text>
                        <View style={styles.bannerBadge}>
                          <TrendingUp size={14} color="#0a0a0a" strokeWidth={2.5} />
                          <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View style={styles.dots}>
                  {banners.map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.dot,
                        currentBanner === i && styles.dotActive,
                      ]}
                    />
                  ))}
                </View>
              </>
            )}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categorias</Text>
            </View>
            {isTablet || isDesktop ? (
              <View style={[styles.categoriesGrid, { paddingHorizontal: isDesktop ? 20 : 10 }]}>
                {categoryCards.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryCard,
                      { width: `${100 / categoryColumns - 2}%` },
                    ]}
                    onPress={() => setSelectedCategory(category.slug)}>
                    <View style={styles.categoryCardInner}>
                      <View style={styles.categoryIconBox}>
                        <Text style={styles.categoryEmoji}>
                          {category.icon === 'beer'
                            ? '🍺'
                            : category.icon === 'wine'
                              ? '🍷'
                              : category.icon === 'whisky'
                                ? '🥃'
                                : category.icon === 'meat'
                                  ? '🥩'
                                  : category.icon === 'cheese'
                                    ? '🧀'
                                    : category.icon === 'snacks'
                                      ? '🍟'
                                      : '🍰'}
                        </Text>
                      </View>
                      <Text style={styles.categoryCardName}>{category.name}</Text>
                      <Text style={styles.categoryCardCount}>
                        {category.count} itens
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.categoriesWrapper}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={16}
                  nestedScrollEnabled={true}
                  contentContainerStyle={styles.categoriesContent}>
                  {categoryCards.map((category) => (
                    <TouchableOpacity
                      key={category.id}
                      style={styles.categoryCard}
                      onPress={() => setSelectedCategory(category.slug)}>
                      <View style={styles.categoryCardInner}>
                        <View style={styles.categoryIconBox}>
                          <Text style={styles.categoryEmoji}>
                            {category.icon === 'beer'
                              ? '🍺'
                              : category.icon === 'wine'
                                ? '🍷'
                                : category.icon === 'whisky'
                                  ? '🥃'
                                  : category.icon === 'meat'
                                    ? '🥩'
                                    : category.icon === 'cheese'
                                      ? '🧀'
                                      : category.icon === 'snacks'
                                        ? '🍟'
                                        : '🍰'}
                          </Text>
                        </View>
                        <Text style={styles.categoryCardName}>{category.name}</Text>
                        <Text style={styles.categoryCardCount}>
                          {category.count} itens
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Em Promoção</Text>
                <Text style={styles.sectionSubtitle}>
                  Aproveite os melhores preços
                </Text>
              </View>
              <Sparkles size={22} color="#d4af37" strokeWidth={2} />
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              decelerationRate="fast"
              contentContainerStyle={styles.horizontalProducts}>
              {discountedProducts.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={[
                    styles.productCardHorizontal,
                    isDesktop && styles.productCardHorizontalDesktop,
                  ]}
                  onPress={() => router.push(`/(tabs)/product-details?id=${product.id}`)}>
                  <View style={styles.productImageContainer}>
                    <Image
                      source={{ uri: product.image }}
                      style={styles.productImageHorizontal}
                      resizeMode="cover"
                    />
                    {product.discount && (
                      <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>
                          -{product.discount}%
                        </Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.productInfoHorizontal}>
                    <Text style={styles.productNameHorizontal} numberOfLines={2}>
                      {product.name}
                    </Text>
                    <View style={styles.priceContainer}>
                      {product.originalPrice && (
                        <Text style={styles.originalPrice}>
                          R$ {product.originalPrice.toFixed(2)}
                        </Text>
                      )}
                      <Text style={styles.priceHorizontal}>
                        R$ {product.price.toFixed(2)}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.addButtonHorizontal}
                      onPress={(e) => {
                        e.stopPropagation();
                      }}>
                      <Plus size={18} color="#0a0a0a" strokeWidth={2.5} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Todos os Produtos</Text>
            </View>
            <View style={[styles.productsGrid, { paddingHorizontal: isDesktop ? 20 : 10 }]}>
              {filteredProducts.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={[
                    styles.productCard,
                    { width: `${100 / productColumns - 2}%` },
                  ]}
                  onPress={() => router.push(`/(tabs)/product-details?id=${product.id}`)}>
                  <View style={styles.productImageContainer}>
                    <Image
                      source={{ uri: product.image }}
                      style={styles.productImage}
                      resizeMode="cover"
                    />
                    {product.badge && (
                      <View style={styles.badgeLabel}>
                        <Text style={styles.badgeText}>{product.badge}</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={2}>
                      {product.name}
                    </Text>
                    <Text style={styles.productUnit}>por {product.unit}</Text>
                    <View style={styles.productFooter}>
                      <View>
                        <Text style={styles.productPrice}>
                          R$ {product.price.toFixed(2)}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={(e) => {
                          e.stopPropagation();
                        }}>
                        <Plus size={18} color="#0a0a0a" strokeWidth={2.5} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    flex: 1,
  },
  logoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
    gap: 14,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#d4af37',
  },
  brandInfo: {
    flex: 1,
  },
  brandName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  brandTagline: {
    fontSize: 13,
    color: '#d4af37',
    fontWeight: '600',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: '#666',
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#d4af37',
  },
  deliveryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  deliveryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#d4af37',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151515',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 24,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#252525',
  },
  searchContainerDesktop: {
    maxWidth: 600,
    alignSelf: 'center',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#fff',
  },
  bannerContainer: {
    marginBottom: 32,
  },
  bannersGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 20,
  },
  bannerDesktop: {
    flex: 1,
    height: 240,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#252525',
  },
  banner: {
    width: 320,
    height: 180,
    marginLeft: 20,
    marginRight: 16,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#252525',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bannerContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  bannerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#d4af37',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  bannerSubtitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0a0a0a',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#252525',
  },
  dotActive: {
    backgroundColor: '#d4af37',
    width: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  categoriesWrapper: {
    height: 180,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 14,
    paddingRight: 40,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  categoryCard: {
    width: 120,
  },
  categoryCardInner: {
    backgroundColor: '#151515',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#252525',
  },
  categoryIconBox: {
    fontSize: 40,
    marginBottom: 12,
  },
  categoryEmoji: {
    fontSize: 40,
  },
  categoryCardName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
  },
  categoryCardCount: {
    fontSize: 12,
    color: '#666',
  },
  horizontalProducts: {
    paddingHorizontal: 20,
    gap: 14,
  },
  productCardHorizontal: {
    width: 180,
    backgroundColor: '#151515',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#252525',
  },
  productCardHorizontalDesktop: {
    width: 220,
  },
  productImageContainer: {
    position: 'relative',
    width: '100%',
    height: 140,
    backgroundColor: '#0a0a0a',
  },
  productImageHorizontal: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#d4af37',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0a0a0a',
  },
  productInfoHorizontal: {
    padding: 14,
  },
  productNameHorizontal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  originalPrice: {
    fontSize: 12,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  priceHorizontal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#d4af37',
  },
  addButtonHorizontal: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#151515',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#252525',
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#0a0a0a',
  },
  badgeLabel: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#d4af37',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0a0a0a',
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
  },
  productUnit: {
    fontSize: 13,
    color: '#666',
    marginBottom: 14,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 22,
    fontWeight: '700',
    color: '#d4af37',
  },
  addButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
