import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OrderItem } from '../../types';
import { colors, borderRadius, typography } from '../../constants/theme';

interface OrderCardProps {
  order: OrderItem;
  onTrackOrder?: (order: OrderItem) => void;
  onLeaveReview?: (order: OrderItem) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onTrackOrder,
  onLeaveReview,
}) => {
  const isCompleted = order.status === 'completed';

  return (
    <View style={styles.card}>
      <View style={styles.contentRow}>
        {/* Product Image */}
        <Image
          source={{ uri: order.image }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Info Column */}
        <View style={styles.detailsColumn}>
          <View style={styles.headerRow}>
            <Text style={styles.title} numberOfLines={1}>
              {order.title}
            </Text>
            {/* Status Badge */}
            <View
              style={[
                styles.statusBadge,
                isCompleted
                  ? styles.statusBadgeCompleted
                  : styles.statusBadgeTransit,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  isCompleted
                    ? styles.statusTextCompleted
                    : styles.statusTextTransit,
                ]}
              >
                {order.statusLabel}
              </Text>
            </View>
          </View>

          {/* Price */}
          <Text style={styles.price}>
            ${order.price.toLocaleString()}
          </Text>

          {/* Bottom Actions Row */}
          <View style={styles.actionRow}>
            {isCompleted ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onLeaveReview && onLeaveReview(order)}
                style={styles.reviewButton}
              >
                <Ionicons name="star" size={14} color="#FFA902" />
                <Text style={styles.reviewButtonText}>Leave Review</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onTrackOrder && onTrackOrder(order)}
                style={styles.trackButton}
              >
                <Text style={styles.trackButtonText}>Track Order</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.card,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  detailsColumn: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
    minHeight: 72,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...typography.label,
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusBadgeTransit: {
    backgroundColor: '#F3F4F6',
  },
  statusBadgeCompleted: {
    backgroundColor: '#E8F5E9',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusTextTransit: {
    color: '#6B7280',
  },
  statusTextCompleted: {
    color: '#0C9409',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginVertical: 4,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 2,
  },
  trackButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
  },
  trackButtonText: {
    color: colors.textWhite,
    fontSize: 12,
    fontWeight: '600',
  },
  reviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    gap: 5,
  },
  reviewButtonText: {
    color: colors.textWhite,
    fontSize: 12,
    fontWeight: '600',
  },
});
