import { View, StyleSheet, ViewStyle } from 'react-native';
import { useResponsive } from '@/hooks/useResponsive';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  maxWidth?: number;
  style?: ViewStyle;
}

export function ResponsiveContainer({
  children,
  maxWidth = 1400,
  style,
}: ResponsiveContainerProps) {
  const { isDesktop } = useResponsive();

  return (
    <View
      style={[
        styles.container,
        isDesktop && { maxWidth, alignSelf: 'center', width: '100%' },
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
