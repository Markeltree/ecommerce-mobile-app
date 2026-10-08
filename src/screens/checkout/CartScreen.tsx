import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../../constants/theme';
import { CartItemCard } from '../../components/cart/CartItemCard';
import { OrderSummary } from '../../components/cart/OrderSummary';
import { EmptyState } from '../../components/EmptyState';
import { CartItem, Product } from '../../types';

export interface CartScreenProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onExploreProducts: () => void;
  onCheckout?: () => void;
  onBack?: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onExploreProducts,
  onCheckout,
  onBack,
  onSelectProduct,
}) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const vatAmount = 0.0;
  const shippingFee = cartItems.length > 0 ? 80 : 0;
  const total = subtotal + vatAmount + shippingFee;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Top Header */}
      <View style={styles.header}>
        {onBack ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            style={styles.headerButton}
          >
            <Ionicons name="arrow-back" size={22} color={colors.primary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.headerPlaceholder} />
        )}

        <Text style={styles.headerTitle}>My Cart</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.headerButton}
          onPress={() => {}}
        >
          <Ionicons name="ellipsis-vertical" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <EmptyState
            iconName="cart-outline"
            title="Your Cart is Empty!"
            description="When you add products, they'll appear here."
            buttonTitle="Start Shopping"
            onButtonPress={onExploreProducts}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => `${item.product.id}-${item.size}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <CartItemCard
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveItem={onRemoveItem}
                onPress={() => onSelectProduct && onSelectProduct(item.product)}
              />
            )}
            ListFooterComponent={
              <View style={styles.summarySection}>
                <OrderSummary
                  subtotal={subtotal}
                  vatAmount={vatAmount}
                  shippingFee={shippingFee}
                  showTitle={false}
                />
              </View>
            }
          />

          {/* Sticky Checkout Button Footer */}
          <View style={styles.footer}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onCheckout}
              style={styles.checkoutButton}
            >
              <Text style={styles.checkoutButtonText}>Go To Checkout</Text>
              <Feather
                name="arrow-right"
                size={18}
                color={colors.textWhite}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  headerButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerPlaceholder: {
    width: 36,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  summarySection: {
    marginTop: 10,
    paddingTop: 10,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.borderDefault,
    backgroundColor: colors.background,
  },
  checkoutButton: {
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.button, // 10px
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textWhite,
  },
  arrowIcon: {
    marginLeft: 8,
  },
});
