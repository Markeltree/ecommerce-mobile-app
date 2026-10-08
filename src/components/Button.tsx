import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../constants/theme';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'disabled';
  disabled?: boolean;
  loading?: boolean;
  showArrow?: boolean;
  iconName?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  showArrow = false,
  iconName,
  style,
  textStyle,
}) => {
  const isActuallyDisabled = disabled || loading || variant === 'disabled';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isActuallyDisabled}
      style={[
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'outline' && styles.outline,
        isActuallyDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? colors.primary : colors.textWhite}
        />
      ) : (
        <View style={styles.contentRow}>
          {iconName && (
            <Ionicons
              name={iconName}
              size={20}
              color={variant === 'outline' ? colors.primary : colors.textWhite}
              style={styles.leftIcon}
            />
          )}
          <Text
            style={[
              styles.text,
              variant === 'outline' && styles.outlineText,
              variant === 'secondary' && styles.secondaryText,
              isActuallyDisabled && styles.disabledText,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {showArrow && (
            <Ionicons
              name="arrow-forward"
              size={18}
              color={colors.textWhite}
              style={styles.arrowIcon}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: borderRadius.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: '#F5F5F5',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.borderDefault,
  },
  disabled: {
    backgroundColor: colors.primaryDisabled,
  },
  text: {
    ...typography.button,
    color: colors.textWhite,
    textAlign: 'center',
  },
  outlineText: {
    color: colors.primary,
  },
  secondaryText: {
    color: colors.primary,
  },
  disabledText: {
    color: colors.textWhite,
  },
  leftIcon: {
    marginRight: 8,
  },
  arrowIcon: {
    marginLeft: 10,
  },
});
