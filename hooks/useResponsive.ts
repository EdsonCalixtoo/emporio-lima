import { useWindowDimensions } from 'react-native';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

export function useResponsive() {
  const { width } = useWindowDimensions();

  const breakpoint: Breakpoint =
    width >= 1536
      ? 'wide'
      : width >= 1024
        ? 'desktop'
        : width >= 768
          ? 'tablet'
          : 'mobile';

  const isMobile = breakpoint === 'mobile';
  const isTablet = breakpoint === 'tablet';
  const isDesktop = breakpoint === 'desktop' || breakpoint === 'wide';
  const isWide = breakpoint === 'wide';

  return {
    width,
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isWide,
  };
}
