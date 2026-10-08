import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../../constants/theme';
import { PaymentMethodTabs } from '../../components/cart/PaymentMethodTabs';
import { OrderSummary } from '../../components/cart/OrderSummary';
import { PromoCodeInput } from '../../components/cart/PromoCodeInput';
import { SuccessModal } from '../../components/cart/SuccessModal';
import { CartItem, AddressItem, PaymentCard, PaymentMethodType } from '../../types';

export interface CheckoutScreenProps {
  cartItems: CartItem[];
  selectedAddress: AddressItem;
  selectedCard: PaymentCard;
  onBack: () => void;
  onChangeAddress: () => void;
  onChangePaymentMethod: () => void;
  onOrderPlaced: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  cartItems,
  selectedAddress,
  selectedCard,
  onBack,
  onChangeAddress,
  onChangePaymentMethod,
  onOrderPlaced,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('card');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState<boolean>(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingFee = cartItems.length > 0 ? 80 : 0;
  const vatAmount = 0.0;

  const handleApplyPromo = (code: string) => {
    const upper = code.toUpperCase();
    if (upper === 'DISCOUNT20' || upper === 'SAVE20' || upper === 'PROMO20') {
      setAppliedPromo(upper);
      setDiscountAmount(subtotal * 0.2);
      return true;
    } else if (upper === 'FREESHIP') {
      setAppliedPromo(upper);
      setDiscountAmount(shippingFee);
      return true;
    } else if (upper === 'FASHION50') {
      setAppliedPromo(upper);
      setDiscountAmount(50);
      return true;
    }
    return false;
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setDiscountAmount(0);
  };

  const handlePlaceOrder = () => {
    setIsSuccessModalVisible(true);
  };

  const handleOrderSuccessClose = () => {
    setIsSuccessModalVisible(false);
    onOrderPlaced();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          style={styles.headerButton}
        >
          <Ionicons name="arrow-back" size={22} color={colors.primary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Checkout</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.headerButton}
          onPress={() => {}}
        >
          <Ionicons name="ellipsis-vertical" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Section 1: Delivery Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onChangeAddress}
              style={styles.changeAction}
            >
              <Text style={styles.changeActionText}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardBox}>
            <Text style={styles.addressLabel}>{selectedAddress.label}</Text>
            <Text style={styles.addressText} numberOfLines={2}>
              {selectedAddress.fullAddress}
            </Text>
          </View>
        </View>

        {/* Section 2: Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          <PaymentMethodTabs
            selectedMethod={paymentMethod}
            onSelectMethod={setPaymentMethod}
          />

          {paymentMethod === 'card' && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onChangePaymentMethod}
              style={styles.cardSelectorBox}
            >
              <View style={styles.cardBrandContainer}>
                {selectedCard.type === 'visa' ? (
                  <Text style={styles.visaText}>VISA</Text>
                ) : (
                  <View style={styles.mcCircles}>
                    <View style={[styles.circle, { backgroundColor: '#EB001B' }]} />
                    <View style={[styles.circle, { backgroundColor: '#F79E1B', marginLeft: -6 }]} />
                  </View>
                )}
              </View>

              <Text style={styles.cardDigitsText}>
                •••• •••• •••• {selectedCard.last4}
              </Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onChangePaymentMethod}
                style={styles.editCardBtn}
              >
                <Feather name="edit-2" size={16} color={colors.textSecondary} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}

          {paymentMethod === 'cash' && (
            <View style={styles.methodInfoBox}>
              <Ionicons name="cash-outline" size={20} color={colors.primary} />
              <Text style={styles.methodInfoText}>
                Pay in cash directly upon parcel delivery.
              </Text>
            </View>
          )}

          {paymentMethod === 'apple_pay' && (
            <View style={styles.methodInfoBox}>
              <Ionicons name="logo-apple" size={20} color={colors.primary} />
              <Text style={styles.methodInfoText}>
                Apple Pay authorized on this device.
              </Text>
            </View>
          )}
        </View>

        {/* Section 3: Order Summary */}
        <View style={styles.section}>
          <OrderSummary
            subtotal={subtotal}
            vatAmount={vatAmount}
            shippingFee={shippingFee}
            discount={discountAmount}
            showTitle={true}
          />
        </View>

        {/* Section 4: Promo Code Input */}
        <View style={styles.promoSection}>
          <PromoCodeInput
            onApplyPromo={handleApplyPromo}
            onRemovePromo={handleRemovePromo}
            appliedPromo={appliedPromo}
          />
        </View>
      </ScrollView>

      {/* Sticky Bottom Place Order Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handlePlaceOrder}
          style={styles.placeOrderButton}
        >
          <Text style={styles.placeOrderButtonText}>Place Order</Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <SuccessModal
        visible={isSuccessModalVisible}
        title="Congratulations!"
        message="Your order have been placed."
        buttonTitle="Track Your Order"
        onButtonPress={handleOrderSuccessClose}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  changeAction: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  changeActionText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  cardBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderDefault,
    borderRadius: borderRadius.button,
    padding: 14,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  addressText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 18,
  },
  cardSelectorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderDefault,
    borderRadius: borderRadius.button,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 8,
  },
  cardBrandContainer: {
    width: 44,
    height: 28,
    borderRadius: 4,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  visaText: {
    fontSize: 12,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#1A1F71',
  },
  mcCircles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  cardDigitsText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  editCardBtn: {
    padding: 4,
  },
  methodInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: borderRadius.button,
    padding: 14,
    marginTop: 8,
  },
  methodInfoText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 10,
    flex: 1,
  },
  promoSection: {
    marginTop: -8,
    marginBottom: 10,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.borderDefault,
    backgroundColor: colors.background,
  },
  placeOrderButton: {
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeOrderButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textWhite,
  },
});
