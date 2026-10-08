import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../../constants/theme';
import { CartItem } from '../../types';

export interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onPress?: () => void;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onUpdateQuantity,
  onRemoveItem,
  onPress,
}) => {
  const { product, size, quantity } = item;
  const imageUri = product.images?.[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80';

  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.85 : 1}
      onPress={onPress}
      style={styles.card}
    >
      {/* Product Thumbnail */}
      <Image
        source={{ uri: imageUri }}
        style={styles.thumbnail}
        resizeMode="cover"
      />

      {/* Product Info & Controls */}
      <View style={styles.content}>
        {/* Top row: Title, Size, and Trash Delete button */}
        <View style={styles.headerRow}>
          <View style={styles.titleColumn}>
            <Text style={styles.title} numberOfLines={1}>
              {product.title}
            </Text>
            <Text style={styles.sizeText}>Size {size}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => onRemoveItem(product.id, size)}
            style={styles.deleteButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather name="trash-2" size={16} color={colors.error} />
          </TouchableOpacity>
        </View>

        {/* Bottom row: Price and Stepper */}
        <View style={styles.footerRow}>
          <Text style={styles.price}>
            ${product.price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
          </Text>

          <View style={styles.stepperContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => onUpdateQuantity(product.id, size, -1)}
              style={styles.stepButton}
            >
              <Feather name="minus" size={12} color={colors.textPrimary} />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => onUpdateQuantity(product.id, size, 1)}
              style={styles.stepButton}
            >
              <Feather name="plus" size={12} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.button, // 10px exact Figma radius
    borderWidth: 1,
    borderColor: colors.borderDefault,
    padding: 14,
    marginBottom: 14,
    alignItems: 'center',
  },
  thumbnail: {
    width: 80,
    height: 78,
    borderRadius: borderRadius.sm, // 4px exact Figma radius
    backgroundColor: colors.imageBg,
  },
  content: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
    minHeight: 78,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleColumn: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  sizeText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textSecondary,
    marginTop: 3,
  },
  deleteButton: {
    padding: 2,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepButton: {
    width: 24,
    height: 22,
    borderRadius: 3,
    borderWidth: 0.8,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textPrimary,
    minWidth: 22,
    textAlign: 'center',
  },
});
