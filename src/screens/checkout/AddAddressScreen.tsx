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
  Dimensions,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../../constants/theme';
import { SuccessModal } from '../../components/cart/SuccessModal';
import { AddressItem } from '../../types';

export interface AddAddressScreenProps {
  onBack: () => void;
  onSaveAddress: (newAddress: AddressItem) => void;
}

const NICKNAME_OPTIONS = ['Home', 'Office', 'Apartment', 'Parents House', 'Other'];
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const AddAddressScreen: React.FC<AddAddressScreenProps> = ({
  onBack,
  onSaveAddress,
}) => {
  const [nickname, setNickname] = useState<string>('');
  const [fullAddress, setFullAddress] = useState<string>('');
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState<boolean>(false);
  const [createdAddress, setCreatedAddress] = useState<AddressItem | null>(null);

  const isFormValid = nickname.trim().length > 0 && fullAddress.trim().length > 5;

  const handleAdd = () => {
    if (!isFormValid) return;

    const newAddress: AddressItem = {
      id: `addr-${Date.now()}`,
      label: nickname,
      fullAddress: fullAddress.trim(),
      isDefault,
    };

    setCreatedAddress(newAddress);
    setIsSuccessModalVisible(true);
  };

  const handleSuccessClose = () => {
    setIsSuccessModalVisible(false);
    if (createdAddress) {
      onSaveAddress(createdAddress);
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

        <Text style={styles.headerTitle}>New Address</Text>

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
          {/* Map Preview Illustration */}
          <View style={styles.mapContainer}>
            {/* Map Roads & Blocks Mock */}
            <View style={styles.mapGrid}>
              <View style={styles.mapRoadH1} />
              <View style={styles.mapRoadH2} />
              <View style={styles.mapRoadV1} />
              <View style={styles.mapRoadV2} />
              <View style={styles.mapBlock1} />
              <View style={styles.mapBlock2} />
              <View style={styles.mapBlock3} />
            </View>

            {/* Centered Map Pin */}
            <View style={styles.pinWrapper}>
              <View style={styles.pinOuter}>
                <Ionicons name="location-sharp" size={26} color="#1A1A1A" />
              </View>
              <View style={styles.pinShadow} />
            </View>
          </View>

          {/* Bottom Sheet Styled Form */}
          <View style={styles.formCard}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>Address</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onBack}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>

            {/* Address Nickname Selector */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Address Nickname</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsPickerVisible(true)}
                style={styles.pickerTrigger}
              >
                <Text
                  style={[
                    styles.pickerTriggerText,
                    !nickname && styles.placeholderText,
                  ]}
                >
                  {nickname || 'Choose One'}
                </Text>
                <Feather name="chevron-down" size={18} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Full Address Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Address</Text>
              <View style={styles.textInputWrapper}>
                <TextInput
                  placeholder="Enter your full address..."
                  placeholderTextColor={colors.textPlaceholder}
                  value={fullAddress}
                  onChangeText={setFullAddress}
                  multiline
                  numberOfLines={3}
                  style={styles.textInput}
                />
              </View>
            </View>

            {/* Make default address checkbox */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsDefault(!isDefault)}
              style={styles.checkboxRow}
            >
              <View
                style={[
                  styles.checkbox,
                  isDefault && styles.checkboxChecked,
                ]}
              >
                {isDefault && (
                  <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>
                Make this as default address
              </Text>
            </TouchableOpacity>

            {/* Add Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleAdd}
              disabled={!isFormValid}
              style={[
                styles.addButton,
                !isFormValid && styles.addButtonDisabled,
              ]}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Nickname Picker Modal */}
      <Modal
        visible={isPickerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsPickerVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsPickerVisible(false)}
        >
          <View style={styles.pickerModalContent}>
            <Text style={styles.pickerModalTitle}>Select Address Nickname</Text>
            {NICKNAME_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt}
                activeOpacity={0.7}
                onPress={() => {
                  setNickname(opt);
                  setIsPickerVisible(false);
                }}
                style={[
                  styles.pickerOption,
                  nickname === opt && styles.pickerOptionSelected,
                ]}
              >
                <Text
                  style={[
                    styles.pickerOptionText,
                    nickname === opt && styles.pickerOptionTextSelected,
                  ]}
                >
                  {opt}
                </Text>
                {nickname === opt && (
                  <Ionicons name="checkmark" size={18} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Success Modal */}
      <SuccessModal
        visible={isSuccessModalVisible}
        title="Congratulations!"
        message="Your new address has been added."
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
    backgroundColor: '#FFFFFF',
    zIndex: 10,
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
    flexGrow: 1,
  },
  mapContainer: {
    height: 220,
    backgroundColor: '#EBEFF2',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapGrid: {
    ...StyleSheet.absoluteFill,
  },
  mapRoadH1: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: '#FFFFFF',
  },
  mapRoadH2: {
    position: 'absolute',
    top: 140,
    left: 0,
    right: 0,
    height: 24,
    backgroundColor: '#FFFFFF',
  },
  mapRoadV1: {
    position: 'absolute',
    left: 80,
    top: 0,
    bottom: 0,
    width: 22,
    backgroundColor: '#FFFFFF',
  },
  mapRoadV2: {
    position: 'absolute',
    right: 90,
    top: 0,
    bottom: 0,
    width: 20,
    backgroundColor: '#FFFFFF',
  },
  mapBlock1: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 50,
    height: 35,
    backgroundColor: '#E2E8EC',
    borderRadius: 4,
  },
  mapBlock2: {
    position: 'absolute',
    top: 90,
    left: 120,
    width: 140,
    height: 40,
    backgroundColor: '#E2E8EC',
    borderRadius: 4,
  },
  mapBlock3: {
    position: 'absolute',
    bottom: 15,
    right: 20,
    width: 55,
    height: 35,
    backgroundColor: '#E2E8EC',
    borderRadius: 4,
  },
  pinWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinOuter: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  pinShadow: {
    width: 18,
    height: 6,
    borderRadius: 9,
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginTop: 4,
  },
  formCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  closeButton: {
    padding: 4,
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
  pickerTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    borderRadius: borderRadius.button,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
  },
  pickerTriggerText: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  placeholderText: {
    color: colors.textPlaceholder,
    fontWeight: '400',
  },
  textInputWrapper: {
    borderWidth: 1,
    borderColor: colors.borderDefault,
    borderRadius: borderRadius.button,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    fontSize: 14,
    color: colors.textPrimary,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  addButton: {
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.button,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  addButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textWhite,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  pickerModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 36,
  },
  pickerModalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  pickerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  pickerOptionSelected: {
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  pickerOptionText: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  pickerOptionTextSelected: {
    fontWeight: '700',
  },
});
