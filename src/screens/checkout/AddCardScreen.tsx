import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../../constants/theme';
import { SuccessModal } from '../../components/cart/SuccessModal';
import { PaymentCard } from '../../types';

export interface AddCardScreenProps {
  onBack: () => void;
  onSaveCard: (newCard: PaymentCard) => void;
}

export const AddCardScreen: React.FC<AddCardScreenProps> = ({
  onBack,
  onSaveCard,
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [createdCard, setCreatedCard] = useState<PaymentCard | null>(null);

  // Format card number with spaces (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 16);
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    setCardNumber(formatted);
  };

  // Format expiry date (MM/YY)
  const handleExpiryChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 3) {
      setExpiryDate(`${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`);
    } else {
      setExpiryDate(cleaned);
    }
  };

  // Format CVV (3-4 digits)
  const handleCvvChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 4);
    setSecurityCode(cleaned);
  };

  const rawCardNumber = cardNumber.replace(/\s/g, '');
  const isCardValid = rawCardNumber.length === 16;
  const isExpiryValid = expiryDate.length === 5;
  const isCvvValid = securityCode.length >= 3;
  const isFormValid = isCardValid && isExpiryValid && isCvvValid;

  const cardType: 'visa' | 'mastercard' = rawCardNumber.startsWith('5')
    ? 'mastercard'
    : 'visa';

  const handleAddCard = () => {
    if (!isFormValid) return;

    const newCard: PaymentCard = {
      id: `card-${Date.now()}`,
      type: cardType,
      last4: rawCardNumber.slice(-4),
      cardNumber: `•••• •••• •••• ${rawCardNumber.slice(-4)}`,
      expiry: expiryDate,
      cvv: securityCode,
      cardHolder: 'Card Holder',
      isDefault: false,
    };

    setCreatedCard(newCard);
    setIsSuccessModalVisible(true);
  };

  const handleSuccessClose = () => {
    setIsSuccessModalVisible(false);
    if (createdCard) {
      onSaveCard(createdCard);
    }
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

        <Text style={styles.headerTitle}>New Card</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.headerButton}
          onPress={() => {}}
        >
          <Ionicons name="ellipsis-vertical" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.sectionHeading}>Add Debit or Credit Card</Text>

          {/* Card Number Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Card number</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Enter your card number"
                placeholderTextColor={colors.textPlaceholder}
                value={cardNumber}
                onChangeText={handleCardNumberChange}
                keyboardType="numeric"
                style={styles.textInput}
              />

              {rawCardNumber.length > 0 && (
                <View style={styles.cardBadge}>
                  {cardType === 'visa' ? (
                    <Text style={styles.visaBadgeText}>VISA</Text>
                  ) : (
                    <View style={styles.mcCircles}>
                      <View style={[styles.circle, { backgroundColor: '#EB001B' }]} />
                      <View style={[styles.circle, { backgroundColor: '#F79E1B', marginLeft: -6 }]} />
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>

          {/* Expiry Date & Security Code Row */}
          <View style={styles.rowInputs}>
            {/* Expiry Date */}
            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.inputLabel}>Expiry Date</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="MM/YY"
                  placeholderTextColor={colors.textPlaceholder}
                  value={expiryDate}
                  onChangeText={handleExpiryChange}
                  keyboardType="numeric"
                  maxLength={5}
                  style={styles.textInput}
                />
              </View>
            </View>

            {/* Security Code */}
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
              <Text style={styles.inputLabel}>Security Code</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="CVC"
                  placeholderTextColor={colors.textPlaceholder}
                  value={securityCode}
                  onChangeText={handleCvvChange}
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                  style={styles.textInput}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    Alert.alert(
                      'Security Code',
                      'The 3 or 4 digit code usually located on the back of your card.'
                    )
                  }
                  style={styles.helpIcon}
                >
                  <Ionicons
                    name="help-circle-outline"
                    size={18}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleAddCard}
            disabled={!isFormValid}
            style={[
              styles.addButton,
              !isFormValid && styles.addButtonDisabled,
            ]}
          >
            <Text style={styles.addButtonText}>Add Card</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Success Modal */}
      <SuccessModal
        visible={isSuccessModalVisible}
        title="Congratulations!"
        message="Your new card has been added."
        buttonTitle="Thanks"
        onButtonPress={handleSuccessClose}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardContainer: {
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 24,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    borderRadius: borderRadius.button,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },
  cardBadge: {
    marginLeft: 8,
  },
  visaBadgeText: {
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
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  rowInputs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpIcon: {
    padding: 2,
    marginLeft: 6,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.borderDefault,
    backgroundColor: colors.background,
  },
  addButton: {
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textWhite,
  },
});
