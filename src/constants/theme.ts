/**
 * Figma Design System Tokens (Extracted directly via MCP from node-id=1-2070 / Auth Flow)
 */

export const colors = {
  // Brand / Base
  primary: '#1A1A1A',        // Main dark / button / active color
  primaryDisabled: '#CCCCCC',// Disabled button fill
  background: '#FFFFFF',     // Screen background
  cardBackground: '#FFFFFF', // Container background
  
  // Text Colors
  textPrimary: '#1A1A1A',    // Headlines, labels, inputs
  textSecondary: '#808080',  // Subtitles, descriptive text
  textPlaceholder: '#999999',// Input placeholders
  textMuted: '#B0B0B0',      // Inactive / helper text
  textWhite: '#FFFFFF',      // Button text on dark

  // Borders & Strokes
  borderDefault: '#E6E6E6',  // Normal input / card borders
  borderFocused: '#1A1A1A',  // Focused input border
  borderError: '#ED1010',    // Error input border
  borderSuccess: '#0C9409',  // Success border
  divider: '#E6E6E6',        // "Or" divider line

  // Feedback & State
  error: '#ED1010',
  success: '#0C9409',
  successBg: '#E8F5E9',
  rating: '#FFA902',
  discount: '#ED1010',
  discountBg: '#FEE2E2',

  // UI Element Colors
  pillActive: '#1A1A1A',
  pillInactive: '#F5F5F5',
  pillTextActive: '#FFFFFF',
  pillTextInactive: '#666666',
  imageBg: '#F6F6F6',

  // Social Brand Colors
  facebook: '#1877F2',
  googleBorder: '#E6E6E6',

  // Overlay
  modalOverlay: 'rgba(0, 0, 0, 0.5)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  button: 10,   // Exact Figma button corner radius
  input: 10,    // Exact Figma input corner radius
  card: 16,
  modal: 20,    // Exact Figma success popup corner radius
  full: 9999,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 28,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  label: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 18,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};
