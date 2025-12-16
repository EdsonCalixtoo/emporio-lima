import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  User,
  MapPin,
  CreditCard,
  Bell,
  HelpCircle,
  Settings,
  ChevronRight,
  LogOut,
  Shield,
} from 'lucide-react-native';

const menuItems = [
  {
    id: '1',
    title: 'Dados pessoais',
    icon: User,
    section: 'account',
  },
  {
    id: '2',
    title: 'Endereços',
    icon: MapPin,
    section: 'account',
  },
  {
    id: '3',
    title: 'Pagamentos',
    icon: CreditCard,
    section: 'account',
  },
  {
    id: '4',
    title: 'Notificações',
    icon: Bell,
    section: 'settings',
  },
  {
    id: '5',
    title: 'Ajuda',
    icon: HelpCircle,
    section: 'settings',
  },
  {
    id: '6',
    title: 'Configurações',
    icon: Settings,
    section: 'settings',
  },
];

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.wrapper, { maxWidth: 800, alignSelf: 'center', width: '100%' }]}>
          <View style={styles.header}>
          <Text style={styles.title}>Perfil</Text>
        </View>

        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>João da Silva</Text>
            <Text style={styles.userEmail}>joao.silva@email.com</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.adminButton}
          onPress={() => router.push('/admin')}>
          <View style={styles.adminButtonContent}>
            <View style={styles.adminIconContainer}>
              <Shield size={24} color="#d4af37" strokeWidth={2} />
            </View>
            <View style={styles.adminTextContainer}>
              <Text style={styles.adminButtonTitle}>Dashboard Admin</Text>
              <Text style={styles.adminButtonSubtitle}>
                Gerenciar pedidos e produtos
              </Text>
            </View>
          </View>
          <ChevronRight size={24} color="#d4af37" strokeWidth={2} />
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conta</Text>
          <View style={styles.menuContainer}>
            {menuItems
              .filter((item) => item.section === 'account')
              .map((item) => {
                const Icon = item.icon;
                return (
                  <TouchableOpacity key={item.id} style={styles.menuItem}>
                    <View style={styles.menuItemLeft}>
                      <View style={styles.iconContainer}>
                        <Icon size={20} color="#d4af37" strokeWidth={2} />
                      </View>
                      <Text style={styles.menuItemText}>{item.title}</Text>
                    </View>
                    <ChevronRight size={20} color="#666" strokeWidth={2} />
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferências</Text>
          <View style={styles.menuContainer}>
            {menuItems
              .filter((item) => item.section === 'settings')
              .map((item) => {
                const Icon = item.icon;
                return (
                  <TouchableOpacity key={item.id} style={styles.menuItem}>
                    <View style={styles.menuItemLeft}>
                      <View style={styles.iconContainer}>
                        <Icon size={20} color="#d4af37" strokeWidth={2} />
                      </View>
                      <Text style={styles.menuItemText}>{item.title}</Text>
                    </View>
                    <ChevronRight size={20} color="#666" strokeWidth={2} />
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#ff4444" strokeWidth={2} />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>

          <Text style={styles.version}>Versão 1.0.0</Text>
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
  wrapper: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 24,
    padding: 20,
    backgroundColor: '#151515',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#252525',
    marginBottom: 32,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0a0a0a',
  },
  userInfo: {
    marginLeft: 18,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  menuContainer: {
    backgroundColor: '#0a0a0a',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#151515',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 68, 68, 0.3)',
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    gap: 10,
    marginBottom: 24,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ff4444',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    marginBottom: 32,
  },
  adminButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#d4af37',
    marginBottom: 32,
  },
  adminButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 14,
  },
  adminIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0a0a0a',
    borderWidth: 2,
    borderColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminTextContainer: {
    flex: 1,
  },
  adminButtonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#d4af37',
    marginBottom: 4,
  },
  adminButtonSubtitle: {
    fontSize: 13,
    color: '#999',
  },
});
