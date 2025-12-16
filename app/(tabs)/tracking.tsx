import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import {
  MapPin,
  User,
  Phone,
  MessageCircle,
  Check,
  Package,
  Bike,
  Home,
  Clock,
} from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';

const orderSteps = [
  { id: '1', title: 'Pedido Confirmado', icon: Check, completed: true },
  { id: '2', title: 'Preparando', icon: Package, completed: true },
  { id: '3', title: 'Saiu para Entrega', icon: Bike, completed: true },
  { id: '4', title: 'Entregue', icon: Home, completed: false },
];

export default function TrackingScreen() {
  const router = useRouter();
  const [estimatedTime, setEstimatedTime] = useState(18);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const bikePosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(bikePosition, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    const timer = setInterval(() => {
      setEstimatedTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const bikeTranslateY = bikePosition.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -5, 0],
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ maxWidth: 1000, alignSelf: 'center', width: '100%' }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Rastreamento</Text>
          <View style={styles.backButton} />
        </View>

        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <View style={styles.mapGrid}>
              {[...Array(8)].map((_, i) => (
                <View key={i} style={styles.gridLine} />
              ))}
              {[...Array(8)].map((_, i) => (
                <View key={`h-${i}`} style={styles.gridLineHorizontal} />
              ))}
            </View>

            <View style={styles.routeLine} />

            <View style={styles.destinationMarker}>
              <Home size={20} color="#d4af37" strokeWidth={2.5} />
            </View>

            <Animated.View
              style={[
                styles.bikeMarker,
                { transform: [{ translateY: bikeTranslateY }] },
              ]}>
              <Animated.View
                style={[
                  styles.pulse,
                  {
                    transform: [{ scale: pulseAnim }],
                  },
                ]}
              />
              <View style={styles.bikeIcon}>
                <Bike size={22} color="#0a0a0a" strokeWidth={2.5} />
              </View>
            </Animated.View>

            <View style={styles.restaurantMarker}>
              <Package size={18} color="#fff" strokeWidth={2.5} />
            </View>
          </View>
        </View>

        <View style={styles.timeCard}>
          <View style={styles.timeIconContainer}>
            <Clock size={28} color="#d4af37" strokeWidth={2} />
          </View>
          <View style={styles.timeInfo}>
            <Text style={styles.timeLabel}>Tempo estimado</Text>
            <Text style={styles.timeValue}>{estimatedTime} minutos</Text>
          </View>
        </View>

        <View style={styles.deliveryCard}>
          <View style={styles.deliveryHeader}>
            <View style={styles.avatarContainer}>
              <User size={24} color="#d4af37" strokeWidth={2} />
            </View>
            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryName}>Carlos Santos</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>⭐ 4.9</Text>
                <Text style={styles.deliveriesText}>• 1.234 entregas</Text>
              </View>
            </View>
          </View>

          <View style={styles.deliveryDetails}>
            <View style={styles.detailRow}>
              <MapPin size={16} color="#666" strokeWidth={2} />
              <Text style={styles.detailText}>A 2.3 km de distância</Text>
            </View>
            <View style={styles.detailRow}>
              <Bike size={16} color="#666" strokeWidth={2} />
              <Text style={styles.detailText}>Moto Honda CG 160</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Phone size={20} color="#d4af37" strokeWidth={2} />
              <Text style={styles.actionButtonText}>Ligar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.messageButton]}>
              <MessageCircle size={20} color="#d4af37" strokeWidth={2} />
              <Text style={styles.actionButtonText}>Mensagem</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.orderCard}>
          <Text style={styles.orderTitle}>Pedido #12345</Text>

          <View style={styles.stepsContainer}>
            {orderSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isLast = index === orderSteps.length - 1;

              return (
                <View key={step.id} style={styles.stepWrapper}>
                  <View style={styles.stepIndicator}>
                    <View
                      style={[
                        styles.stepIconContainer,
                        step.completed && styles.stepIconContainerCompleted,
                      ]}>
                      <StepIcon
                        size={18}
                        color={step.completed ? '#0a0a0a' : '#666'}
                        strokeWidth={2.5}
                      />
                    </View>
                    {!isLast && (
                      <View
                        style={[
                          styles.stepLine,
                          step.completed && styles.stepLineCompleted,
                        ]}
                      />
                    )}
                  </View>
                  <View style={styles.stepContent}>
                    <Text
                      style={[
                        styles.stepTitle,
                        step.completed && styles.stepTitleCompleted,
                      ]}>
                      {step.title}
                    </Text>
                    {step.completed && (
                      <Text style={styles.stepTime}>
                        {index === 0
                          ? '14:30'
                          : index === 1
                            ? '14:45'
                            : '15:02'}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.addressCard}>
          <View style={styles.addressHeader}>
            <MapPin size={20} color="#d4af37" strokeWidth={2} />
            <Text style={styles.addressTitle}>Endereço de Entrega</Text>
          </View>
          <Text style={styles.addressText}>Rua das Flores, 123</Text>
          <Text style={styles.addressSubtext}>
            Apto 45 - Jardim Paulista, São Paulo - SP
          </Text>
          <Text style={styles.addressNote}>Portão azul, interfone 45</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 28,
    color: '#d4af37',
    fontWeight: '700',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  mapContainer: {
    margin: 20,
    marginBottom: 16,
  },
  mapPlaceholder: {
    height: 320,
    backgroundColor: '#151515',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#252525',
    position: 'relative',
    overflow: 'hidden',
  },
  mapGrid: {
    ...StyleSheet.absoluteFillObject,
  },
  gridLine: {
    position: 'absolute',
    width: 1,
    height: '100%',
    backgroundColor: '#1a1a1a',
    left: `${12.5 * (Math.floor(Math.random() * 8) + 1)}%`,
  },
  gridLineHorizontal: {
    position: 'absolute',
    height: 1,
    width: '100%',
    backgroundColor: '#1a1a1a',
    top: `${12.5 * (Math.floor(Math.random() * 8) + 1)}%`,
  },
  routeLine: {
    position: 'absolute',
    top: 60,
    left: 40,
    right: 40,
    height: 200,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  bikeMarker: {
    position: 'absolute',
    top: 140,
    left: 60,
  },
  pulse: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    top: -10,
    left: -10,
  },
  bikeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#0a0a0a',
  },
  destinationMarker: {
    position: 'absolute',
    bottom: 40,
    right: 50,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0a0a0a',
    borderWidth: 3,
    borderColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  restaurantMarker: {
    position: 'absolute',
    top: 50,
    left: 30,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d4af37',
    borderWidth: 3,
    borderColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#151515',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#d4af37',
    marginBottom: 20,
  },
  timeIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  timeInfo: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#d4af37',
  },
  deliveryCard: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#151515',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#252525',
    marginBottom: 20,
  },
  deliveryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderWidth: 2,
    borderColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  deliveryInfo: {
    flex: 1,
  },
  deliveryName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#d4af37',
  },
  deliveriesText: {
    fontSize: 14,
    color: '#666',
  },
  deliveryDetails: {
    gap: 10,
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#252525',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#999',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    borderRadius: 16,
  },
  messageButton: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#d4af37',
  },
  orderCard: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#151515',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#252525',
    marginBottom: 20,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
  },
  stepsContainer: {
    gap: 0,
  },
  stepWrapper: {
    flexDirection: 'row',
    gap: 14,
  },
  stepIndicator: {
    alignItems: 'center',
  },
  stepIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  stepIconContainerCompleted: {
    backgroundColor: '#d4af37',
  },
  stepLine: {
    width: 3,
    flex: 1,
    backgroundColor: '#252525',
    marginTop: 4,
    marginBottom: 4,
  },
  stepLineCompleted: {
    backgroundColor: '#d4af37',
  },
  stepContent: {
    flex: 1,
    paddingBottom: 24,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  stepTitleCompleted: {
    color: '#fff',
  },
  stepTime: {
    fontSize: 13,
    color: '#666',
  },
  addressCard: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#151515',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#252525',
    marginBottom: 32,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  addressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
  },
  addressSubtext: {
    fontSize: 14,
    color: '#999',
    marginBottom: 12,
  },
  addressNote: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#252525',
  },
});
