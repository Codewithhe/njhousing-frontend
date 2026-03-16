/**
 * Centralized Theme for NJ Housing App
 * All colors, spacing, typography, and shadows defined here
 */

export const COLORS = {
  // Primary brand colors
  primary: '#051138',
  primaryLight: '#1A2F6B',
  primaryDark: '#030B24',

  // Accent colors
  accent: '#6246EA',
  accentLight: '#8B73FF',
  accentSoft: '#EFEFFD',

  // Premium / Gold
  gold: '#D6A534',
  goldLight: '#F5D87A',

  // Status colors
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',

  // Red accent (used in badges)
  redAccent: '#9D011F',

  // Neutrals
  white: '#FFFFFF',
  offWhite: '#FAFBFC',
  background: '#F5F6FA',
  surface: '#FFFFFF',
  border: '#E8ECF2',
  borderLight: '#F0F2F5',
  divider: '#EAEDF3',

  // Text
  textPrimary: '#1A1E25',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textOnPrimary: '#FFFFFF',
  textOnAccent: '#FFFFFF',

  // Grays
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  // Overlays
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(255, 255, 255, 0.6)',

  // Gradient stops
  gradientStart: '#051138',
  gradientMid: '#0A1E5E',
  gradientEnd: '#1A3580',
};

export const GRADIENTS = {
  primary: ['#051138', '#0A1E5E', '#1A3580'],
  primaryDark: ['#051138', '#051138', '#0A1E5E'],
  accent: ['#6246EA', '#8B73FF'],
  gold: ['#D6A534', '#F5D87A'],
  card: ['#FFFFFF', '#FAFBFC'],
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  section: 40,
};

export const FONT_SIZE = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
  xxxl: 28,
  heading: 32,
  hero: 40,
};

export const FONT_FAMILY = {
  regular: 'Poppins-Regular',
  bold: 'Poppins-Bold',
  light: 'Poppins-Light',
  semiBold: 'Poppins-Semi',
};

export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  pill: 100,
  circle: 9999,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  card: {
    shadowColor: '#1A1E25',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
};

export default {
  COLORS,
  GRADIENTS,
  SPACING,
  FONT_SIZE,
  FONT_FAMILY,
  BORDER_RADIUS,
  SHADOWS,
};
