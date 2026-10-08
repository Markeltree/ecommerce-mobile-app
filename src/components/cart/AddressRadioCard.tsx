import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../../constants/theme';
import { AddressItem } from '../../types';

export interface AddressRadioCardProps {
  address: AddressItem;
  isSelected?: boolean;
  onSelect: () => void;
  onEdit?: () => void;
  showRadio?: boolean;
}

export const AddressRadioCard: React.FC<AddressRadioCardProps> = ({
  address,
  isSelected = false,
  onSelect,
  onEdit,
  showRadio = true,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onSelect}
      style={[
        styles.card,
        isSelected && styles.cardSelected,
      ]}
    >
      <View style={styles.leftContent}>
        {/* Tag & Default Badge Row */}
        <View style={styles.tagRow}>
          <Text style={styles.labelTitle}>{address.label}</Text>

          {address.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultBadgeText}>Default</Text>
            </View>
          )}
        </View>

        {/* Address text */}
        <Text style={styles.addressText} numberOfLines={2}>
          {address.fullAddress}
        </Text>
      </View>

      <View style={styles.rightActions}>
        {onEdit && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onEdit}
            style={styles.editButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather name="edit-2" size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        )}

        {showRadio && (
          <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
            {isSelected && <View style={styles.radioInner} />}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.button, // 10px
    borderWidth: 1,
    borderColor: colors.borderDefault,
    padding: 16,
    marginBottom: 12,
  },
  cardSelected: {
    borderColor: colors.primary,
  },
  leftContent: {
    flex: 1,
    paddingRight: 12,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  labelTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  defaultBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  defaultBadgeText: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  addressText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 17,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    marginRight: 12,
    padding: 4,
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
});
