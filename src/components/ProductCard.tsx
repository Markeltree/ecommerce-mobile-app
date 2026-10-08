import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../constants/theme';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  onToggleSave?: (productId: string) => void;
  isSaved?: boolean;
  style?: ViewStyle;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onToggleSave,
  isSaved = false,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress(product)}
      style={[styles.card, style]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.images[0] }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Discount Badge */}
        {product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discount}</Text>
          </View>
        )}

        {/* Favorite / Heart Button */}
        {onToggleSave && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onToggleSave(product.id)}
            style={styles.favoriteButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isSaved ? 'heart' : 'heart-outline'}
              size={18}
              color={isSaved ? colors.error : colors.primary}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        {/* Rating row */}
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={13} color={colors.rating} />
          <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
          <Text style={styles.reviewCountText}>({product.reviewsCount})</Text>
        </View>

        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        {/* Price Row */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>
              ${product.originalPrice.toFixed(2)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderDefault,
    flex: 1,
    margin: 6,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 175,
    backgroundColor: colors.imageBg,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: colors.discount,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  discountText: {
    color: colors.textWhite,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoContainer: {
    padding: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: 4,
  },
  reviewCountText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginLeft: 2,
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textPrimary,
    lineHeight: 18,
    marginBottom: 6,
    minHeight: 36,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 12,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
});
