import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { colors, borderRadius } from '../../constants/theme';
import { PaymentMethodType } from '../../types';

export interface PaymentMethodTabsProps {
  selectedMethod: PaymentMethodType;
  onSelectMethod: (method: PaymentMethodType) => void;
}

interface MethodOption {
  id: PaymentMethodType;
  label: string;
  iconName: string;
  iconFamily: 'Ionicons' | 'FontAwesome5';
}

const METHODS: MethodOption[] = [
  {
    id: 'card',
    label: 'Card',
    iconName: 'card-outline',
    iconFamily: 'Ionicons',
  },
  {
    id: 'cash',
    label: 'Cash',
    iconName: 'cash-outline',
    iconFamily: 'Ionicons',
  },
  {
    id: 'apple_pay',
    label: 'Pay',
    iconName: 'apple',
    iconFamily: 'FontAwesome5',
  },
];

export const PaymentMethodTabs: React.FC<PaymentMethodTabsProps> = ({
  selectedMethod,
  onSelectMethod,
}) => {
  return (
    <View style={styles.container}>
      {METHODS.map((method) => {
        const isSelected = selectedMethod === method.id;

        return (
          <TouchableOpacity
            key={method.id}
            activeOpacity={0.7}
            onPress={() => onSelectMethod(method.id)}
            style={[
              styles.tab,
              isSelected ? styles.tabSelected : styles.tabUnselected,
            ]}
          >
            {method.iconFamily === 'Ionicons' ? (
              <Ionicons
                name={method.iconName as any}
                size={16}
                color={isSelected ? colors.textWhite : colors.textPrimary}
                style={styles.icon}
              />
            ) : (
              <FontAwesome5
                name={method.iconName as any}
                size={14}
                color={isSelected ? colors.textWhite : colors.textPrimary}
                style={styles.icon}
              />
            )}
            <Text
              style={[
                styles.label,
                isSelected ? styles.labelSelected : styles.labelUnselected,
              ]}
            >
              {method.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: borderRadius.button, // 10px
    paddingHorizontal: 12,
  },
  tabSelected: {
    backgroundColor: colors.primary,
  },
  tabUnselected: {
    backgroundColor: '#F5F5F5',
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  labelSelected: {
    color: colors.textWhite,
  },
  labelUnselected: {
    color: colors.textPrimary,
  },
});
