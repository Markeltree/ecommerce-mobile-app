import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../../constants/theme';
import { PaymentCard } from '../../types';

export interface PaymentMethodScreenProps {
  cards: PaymentCard[];
  selectedCardId: string;
  onSelectCard: (card: PaymentCard) => void;
  onAddNewCard: () => void;
  onBack: () => void;
  onApply: (selectedCard: PaymentCard) => void;
}

export const PaymentMethodScreen: React.FC<PaymentMethodScreenProps> = ({
  cards,
  selectedCardId: initialSelectedId,
  onSelectCard,
  onAddNewCard,
  onBack,
  onApply,
}) => {
  const [selectedId, setSelectedId] = useState(initialSelectedId);

  const currentSelectedCard =
    cards.find((c) => c.id === selectedId) || cards[0];

  const handleApply = () => {
    if (currentSelectedCard) {
      onSelectCard(currentSelectedCard);
      onApply(currentSelectedCard);
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

        <Text style={styles.headerTitle}>Payment Method</Text>

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
        <Text style={styles.sectionHeading}>Saved Cards</Text>

        {cards.map((card) => {
          const isSelected = card.id === selectedId;

          return (
            <TouchableOpacity
              key={card.id}
              activeOpacity={0.7}
              onPress={() => setSelectedId(card.id)}
              style={[
                styles.cardItem,
                isSelected && styles.cardItemSelected,
              ]}
            >
              {/* Card Brand Badge */}
              <View style={styles.brandIconContainer}>
                {card.type === 'visa' ? (
                  <Text style={styles.visaBrandText}>VISA</Text>
                ) : (
                  <View style={styles.mcCirclesRow}>
                    <View style={[styles.mcCircle, { backgroundColor: '#EB001B' }]} />
                    <View style={[styles.mcCircle, { backgroundColor: '#F79E1B', marginLeft: -8 }]} />
                  </View>
                )}
              </View>

              {/* Card Number & Default Badge */}
              <View style={styles.cardInfo}>
                <Text style={styles.cardNumberText}>
                  •••• •••• •••• {card.last4}
                </Text>

                {card.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>Default</Text>
                  </View>
                )}
              </View>

              {/* Radio Indicator */}
              <View
                style={[
                  styles.radioOuter,
                  isSelected && styles.radioOuterSelected,
                ]}
              >
                {isSelected && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Add New Card Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onAddNewCard}
          style={styles.addCardButton}
        >
          <Feather name="plus" size={16} color={colors.primary} />
          <Text style={styles.addCardText}>Add New Card</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Sticky Bottom Apply Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleApply}
          style={styles.applyButton}
        >
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 18,
    paddingBottom: 24,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 14,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.button,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
  },
  cardItemSelected: {
    borderColor: colors.primary,
  },
  brandIconContainer: {
    width: 50,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  visaBrandText: {
    fontSize: 13,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#1A1F71',
    letterSpacing: 0.5,
  },
  mcCirclesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mcCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  cardInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardNumberText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  defaultBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 10,
  },
  defaultBadgeText: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  radioOuterSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: borderRadius.button,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.borderDefault,
    backgroundColor: '#FAFAFA',
    marginTop: 6,
    marginBottom: 16,
  },
  addCardText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: 8,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.borderDefault,
    backgroundColor: colors.background,
  },
  applyButton: {
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textWhite,
  },
});
