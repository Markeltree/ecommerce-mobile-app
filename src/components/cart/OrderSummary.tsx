import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../constants/theme';

export interface OrderSummaryProps {
  subtotal: number;
  vatRate?: number; // default 0.00 or 0.07
  vatAmount?: number;
  shippingFee?: number;
  discount?: number;
  showTitle?: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  vatRate = 0.07,
  vatAmount = 0.0,
  shippingFee = 80,
  discount = 0,
  showTitle = true,
}) => {
  const calculatedVat = vatAmount > 0 ? vatAmount : subtotal > 0 ? subtotal * 0 : 0;
  const total = Math.max(0, subtotal + calculatedVat + (subtotal > 0 ? shippingFee : 0) - discount);

  const formatCurrency = (val: number) => {
    return `$ ${val.toLocaleString('en-US', {
      minimumFractionDigits: val % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <View style={styles.container}>
      {showTitle && <Text style={styles.sectionTitle}>Order Summary</Text>}

      <View style={styles.row}>
        <Text style={styles.label}>Sub-Total</Text>
        <Text style={styles.value}>{formatCurrency(subtotal)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>VAT (7%)</Text>
        <Text style={styles.value}>{formatCurrency(calculatedVat)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Shipping fee</Text>
        <Text style={styles.value}>
          {subtotal > 0 ? formatCurrency(shippingFee) : '$ 0.00'}
        </Text>
      </View>

      {discount > 0 && (
        <View style={styles.row}>
          <Text style={[styles.label, { color: colors.success }]}>Promo Discount</Text>
          <Text style={[styles.value, { color: colors.success }]}>
            -{formatCurrency(discount)}
          </Text>
        </View>
      )}

      <View style={styles.divider} />

      <View style={[styles.row, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  value: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: 12,
  },
  totalRow: {
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
});
