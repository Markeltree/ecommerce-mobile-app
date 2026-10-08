import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../../constants/theme';
import { SettingToggleItem } from '../../components/profile';

interface NotificationSettingsScreenProps {
  onBack: () => void;
}

export const NotificationSettingsScreen: React.FC<
  NotificationSettingsScreenProps
> = ({ onBack }) => {
  const [settings, setSettings] = useState({
    general: true,
    sound: true,
    vibrate: false,
    specialOffers: true,
    promoDiscounts: false,
    payments: true,
    cashbacks: false,
    appUpdates: true,
    newService: false,
    newTips: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
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
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.rightPlaceholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.settingsCard}>
          <SettingToggleItem
            label="General Notifications"
            value={settings.general}
            onValueChange={() => toggleSetting('general')}
          />
          <SettingToggleItem
            label="Sound"
            value={settings.sound}
            onValueChange={() => toggleSetting('sound')}
          />
          <SettingToggleItem
            label="Vibrate"
            value={settings.vibrate}
            onValueChange={() => toggleSetting('vibrate')}
          />
          <SettingToggleItem
            label="Special Offers"
            value={settings.specialOffers}
            onValueChange={() => toggleSetting('specialOffers')}
          />
          <SettingToggleItem
            label="Promo & Discounts"
            value={settings.promoDiscounts}
            onValueChange={() => toggleSetting('promoDiscounts')}
          />
          <SettingToggleItem
            label="Payments"
            value={settings.payments}
            onValueChange={() => toggleSetting('payments')}
          />
          <SettingToggleItem
            label="Cashbacks"
            value={settings.cashbacks}
            onValueChange={() => toggleSetting('cashbacks')}
          />
          <SettingToggleItem
            label="App Updates"
            value={settings.appUpdates}
            onValueChange={() => toggleSetting('appUpdates')}
          />
          <SettingToggleItem
            label="New Service Available"
            value={settings.newService}
            onValueChange={() => toggleSetting('newService')}
          />
          <SettingToggleItem
            label="New Tips Available"
            value={settings.newTips}
            onValueChange={() => toggleSetting('newTips')}
            showDivider={false}
          />
        </View>
      </ScrollView>
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
  settingsCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.borderDefault,
  },
});
