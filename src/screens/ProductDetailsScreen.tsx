import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../constants/theme';
import { Button } from '../components/Button';
import { Product } from '../types';

const { width } = Dimensions.get('window');

interface ProductDetailsScreenProps {
  product: Product;
  isSaved?: boolean;
  onBack: () => void;
  onToggleSave: (productId: string) => void;
  onViewReviews: (product: Product) => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
}

export const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  product,
  isSaved = false,
  onBack,
  onToggleSave,
  onViewReviews,
  onAddToCart,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[0] || 'M'
  );
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    );
    if (slide !== activeImageIndex) {
      setActiveImageIndex(slide);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${product.title} on our E-Commerce Store for $${product.price}!`,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddToCartPress = () => {
    onAddToCart(product, selectedSize, quantity);
    setIsAddedToCart(true);
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          style={styles.iconCircle}
        >
          <Ionicons name="arrow-back" size={22} color={colors.primary} />
        </TouchableOpacity>

        <Text style={styles.screenTitle} numberOfLines={1}>
          Details
        </Text>

        <View style={styles.topRightActions}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleShare}
            style={[styles.iconCircle, { marginRight: 8 }]}
          >
            <Ionicons
              name="share-social-outline"
              size={20}
              color={colors.primary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onToggleSave(product.id)}
            style={styles.iconCircle}
          >
            <Ionicons
              name={isSaved ? 'heart' : 'heart-outline'}
              size={22}
              color={isSaved ? colors.error : colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Product Image Carousel */}
        <View style={styles.carouselContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {product.images.map((imgUri, index) => (
              <Image
                key={index}
                source={{ uri: imgUri }}
                style={styles.carouselImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          {/* Discount Badge */}
          {product.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discount}</Text>
            </View>
          )}

          {/* Pagination Indicators */}
          {product.images.length > 1 && (
            <View style={styles.paginationDots}>
              {product.images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    activeImageIndex === index && styles.activeDot,
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        {/* Product Info Section */}
        <View style={styles.detailsContainer}>
          {/* Title and Category */}
          <View style={styles.categoryPill}>
            <Text style={styles.categoryPillText}>
              {product.category.toUpperCase()}
            </Text>
          </View>

          <Text style={styles.productTitle}>{product.title}</Text>

          {/* Rating Summary Link */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onViewReviews(product)}
            style={styles.ratingRow}
          >
            <View style={styles.ratingScorePill}>
              <Ionicons name="star" size={14} color={colors.rating} />
              <Text style={styles.ratingScoreText}>
                {product.rating.toFixed(1)}
              </Text>
            </View>
            <Text style={styles.reviewsLink}>
              {product.reviewsCount} verified reviews
            </Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          {/* Price Row */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>
                ${product.originalPrice.toFixed(2)}
              </Text>
            )}
            {product.discount && (
              <View style={styles.saveBadge}>
                <Text style={styles.saveBadgeText}>
                  Save ${(product.originalPrice! - product.price).toFixed(2)}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.divider} />

          {/* Size Selector */}
          <View style={styles.sectionBlock}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionLabel}>Select Size</Text>
              <Text style={styles.sizeGuideText}>Size Guide</Text>
            </View>
            <View style={styles.sizeOptionsWrap}>
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <TouchableOpacity
                    key={size}
                    activeOpacity={0.8}
                    onPress={() => setSelectedSize(size)}
                    style={[
                      styles.sizeOption,
                      isSelected && styles.sizeOptionSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.sizeOptionText,
                        isSelected && styles.sizeOptionTextSelected,
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Quantity Selector */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionLabel}>Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                style={styles.quantityBtn}
              >
                <Ionicons name="remove" size={18} color={colors.primary} />
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setQuantity((q) => q + 1)}
                style={styles.quantityBtn}
              >
                <Ionicons name="add" size={18} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Description */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionLabel}>Description</Text>
            <Text
              style={styles.descriptionText}
              numberOfLines={isDescriptionExpanded ? undefined : 3}
            >
              {product.description}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              <Text style={styles.readMoreText}>
                {isDescriptionExpanded ? 'Read Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.totalPriceWrap}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalPrice}>
            ${(product.price * quantity).toFixed(2)}
          </Text>
        </View>

        <View style={styles.buttonWrap}>
          <Button
            title={isAddedToCart ? 'Added to Cart ✓' : 'Add to Cart'}
            iconName={isAddedToCart ? 'checkmark-circle' : 'cart-outline'}
            onPress={handleAddToCartPress}
            variant="primary"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  screenTitle: {
    ...typography.h3,
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  topRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: colors.borderDefault,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 110,
  },
  carouselContainer: {
    position: 'relative',
    width: width,
    height: 380,
    backgroundColor: colors.imageBg,
  },
  carouselImage: {
    width: width,
    height: 380,
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: colors.discount,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    color: colors.textWhite,
    fontSize: 12,
    fontWeight: '700',
  },
  paginationDots: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 22,
  },
  detailsContainer: {
    padding: 20,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  categoryPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  productTitle: {
    ...typography.h2,
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    lineHeight: 28,
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingScorePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    gap: 4,
  },
  ratingScoreText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  reviewsLink: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
    textDecorationLine: 'underline',
    marginRight: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  price: {
    ...typography.h2,
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 16,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  saveBadge: {
    backgroundColor: colors.discountBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  saveBadgeText: {
    color: colors.discount,
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 16,
  },
  sectionBlock: {
    marginBottom: 14,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionLabel: {
    ...typography.label,
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  sizeGuideText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  sizeOptionsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sizeOption: {
    minWidth: 48,
    height: 44,
    borderRadius: borderRadius.button,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: colors.borderDefault,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  sizeOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sizeOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  sizeOptionTextSelected: {
    color: colors.textWhite,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    alignSelf: 'flex-start',
    borderRadius: borderRadius.button,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    marginTop: 8,
  },
  quantityBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    minWidth: 32,
    textAlign: 'center',
  },
  descriptionText: {
    ...typography.body,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    marginTop: 6,
  },
  readMoreText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 6,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.borderDefault,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  totalPriceWrap: {
    marginRight: 16,
  },
  totalLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  buttonWrap: {
    flex: 1,
  },
});
