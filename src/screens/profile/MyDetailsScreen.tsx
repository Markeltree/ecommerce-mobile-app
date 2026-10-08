import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../../constants/theme';
import { MOCK_USER_PROFILE } from '../../constants/mockData';
import { UserProfile } from '../../types';

interface MyDetailsScreenProps {
  onBack: () => void;
  onSaveProfile?: (profile: UserProfile) => void;
}

export const MyDetailsScreen: React.FC<MyDetailsScreenProps> = ({
  onBack,
  onSaveProfile,
}) => {
  const [fullName, setFullName] = useState(MOCK_USER_PROFILE.fullName);
  const [email, setEmail] = useState(MOCK_USER_PROFILE.email);
  const [dob, setDob] = useState(MOCK_USER_PROFILE.dob);
  const [gender, setGender] = useState(MOCK_USER_PROFILE.gender);
  const [phone, setPhone] = useState(MOCK_USER_PROFILE.phone);
  const [showGenderPicker, setShowGenderPicker] = useState(false);

  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

  const handleSave = () => {
    const updated: UserProfile = {
      fullName,
      email,
      dob,
      gender,
      phone,
      countryCode: '+1',
      avatar: MOCK_USER_PROFILE.avatar,
    };
    if (onSaveProfile) {
      onSaveProfile(updated);
    }
    Alert.alert('Profile Updated', 'Your details have been saved successfully!', [
      { text: 'OK', onPress: onBack },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Details</Text>
        <View style={styles.rightPlaceholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter full name"
                placeholderTextColor={colors.textPlaceholder}
              />
            </View>
          </View>

          {/* Email Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter email address"
                placeholderTextColor={colors.textPlaceholder}
              />
            </View>
          </View>

          {/* Date of Birth */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Date of Birth</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={dob}
                onChangeText={setDob}
                placeholder="MM/DD/YYYY"
                placeholderTextColor={colors.textPlaceholder}
              />
              <Ionicons
                name="calendar-outline"
                size={20}
                color={colors.textSecondary}
              />
            </View>
          </View>

          {/* Gender */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Gender</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowGenderPicker(!showGenderPicker)}
              style={styles.inputContainer}
            >
              <Text style={styles.dropdownText}>{gender}</Text>
              <Ionicons
                name={showGenderPicker ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            {showGenderPicker && (
              <View style={styles.dropdownList}>
                {genderOptions.map((opt) => (
                  <TouchableOpacity
                    key={opt}
                    activeOpacity={0.7}
                    onPress={() => {
                      setGender(opt);
                      setShowGenderPicker(false);
                    }}
                    style={[
                      styles.dropdownItem,
                      gender === opt && styles.dropdownItemActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        gender === opt && styles.dropdownItemTextActive,
                      ]}
                    >
                      {opt}
                    </Text>
                    {gender === opt && (
                      <Ionicons
                        name="checkmark"
                        size={16}
                        color={colors.primary}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Phone Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCodeBox}>
                <Text style={styles.flagEmoji}>🇺🇸</Text>
                <Text style={styles.countryCodeText}>+1</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="(234) 456-7890"
                placeholderTextColor={colors.textPlaceholder}
              />
            </View>
          </View>
        </ScrollView>

        {/* Bottom Save Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSave}
            style={styles.saveBtn}
          >
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    paddingTop: 12,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...typography.h2,
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  rightPlaceholder: {
    width: 38,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    ...typography.label,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.borderDefault,
    borderRadius: borderRadius.input,
    paddingHorizontal: 16,
    height: 52,
    backgroundColor: '#FAFAFA',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
  },
  dropdownText: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  dropdownList: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderDefault,
    borderRadius: borderRadius.input,
    marginTop: 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownItemActive: {
    backgroundColor: '#F9FAFB',
  },
  dropdownItemText: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  dropdownItemTextActive: {
    fontWeight: '700',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderDefault,
    borderRadius: borderRadius.input,
    height: 52,
    backgroundColor: '#FAFAFA',
    overflow: 'hidden',
  },
  countryCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: colors.borderDefault,
    gap: 6,
  },
  flagEmoji: {
    fontSize: 18,
  },
  countryCodeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 14,
    fontSize: 15,
    color: colors.textPrimary,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: colors.background,
  },
  saveBtn: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.button,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    ...typography.button,
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '700',
  },
});
