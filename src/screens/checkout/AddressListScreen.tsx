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
import { AddressRadioCard } from '../../components/cart/AddressRadioCard';
import { AddressItem } from '../../types';

export interface AddressListScreenProps {
  addresses: AddressItem[];
  selectedAddressId: string;
  onSelectAddress: (address: AddressItem) => void;
  onAddNewAddress: () => void;
  onEditAddress?: (address: AddressItem) => void;
  onBack: () => void;
  onApply: (selectedAddress: AddressItem) => void;
}

export const AddressListScreen: React.FC<AddressListScreenProps> = ({
  addresses,
  selectedAddressId: initialSelectedId,
  onSelectAddress,
  onAddNewAddress,
  onEditAddress,
  onBack,
  onApply,
}) => {
  const [selectedId, setSelectedId] = useState(initialSelectedId);

  const currentSelectedAddress =
    addresses.find((a) => a.id === selectedId) || addresses[0];

  const handleApply = () => {
    if (currentSelectedAddress) {
      onSelectAddress(currentSelectedAddress);
      onApply(currentSelectedAddress);
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

        <Text style={styles.headerTitle}>Address</Text>

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
        <Text style={styles.sectionHeading}>Saved Address</Text>

        {addresses.map((address) => (
          <AddressRadioCard
            key={address.id}
            address={address}
            isSelected={address.id === selectedId}
            onSelect={() => setSelectedId(address.id)}
            onEdit={onEditAddress ? () => onEditAddress(address) : undefined}
          />
        ))}

        {/* Add New Address Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onAddNewAddress}
          style={styles.addAddressButton}
        >
          <Feather name="plus" size={16} color={colors.primary} />
          <Text style={styles.addAddressText}>Add New Address</Text>
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
  addAddressButton: {
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
  addAddressText: {
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
