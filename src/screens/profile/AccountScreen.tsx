import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../../constants/theme';
import { AccountMenuItem, LogoutModal } from '../../components/profile';
import { MOCK_USER_PROFILE } from '../../constants/mockData';

interface AccountScreenProps {
  onLogout: () => void;
  onNavigateToOrders?: () => void;
  onNavigateToDetails?: () => void;
  onNavigateToAddresses?: () => void;
  onNavigateToPayments?: () => void;
  onNavigateToNotifications?: () => void;
  onNavigateToFAQs?: () => void;
  onNavigateToHelpCenter?: () => void;
  onNavigateToSaved?: () => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({
  onLogout,
  onNavigateToOrders,
  onNavigateToDetails,
  onNavigateToAddresses,
  onNavigateToPayments,
  onNavigateToNotifications,
  onNavigateToFAQs,
  onNavigateToHelpCenter,
}) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onNavigateToHelpCenter}
          style={styles.headerIconBtn}
        >
          <Ionicons
            name="headset-outline"
            size={22}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Card */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onNavigateToDetails}
          style={styles.profileCard}
        >
          <Image
            source={{ uri: MOCK_USER_PROFILE.avatar }}
            style={styles.avatar}
          />
          <View style={styles.profileDetails}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>{MOCK_USER_PROFILE.fullName}</Text>
              <Ionicons
                name="checkmark-circle"
                size={16}
                color="#0C9409"
                style={{ marginLeft: 4 }}
              />
            </View>
            <Text style={styles.userEmail}>{MOCK_USER_PROFILE.email}</Text>
            <View style={styles.memberBadge}>
              <Ionicons name="sparkles" size={12} color="#D97706" />
              <Text style={styles.memberText}>Premium Member</Text>
            </View>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <AccountMenuItem
            icon="cube-outline"
            title="My Orders"
            badge="4"
            onPress={onNavigateToOrders || (() => {})}
          />
          <AccountMenuItem
            icon="person-outline"
            title="My Details"
            onPress={onNavigateToDetails || (() => {})}
          />
          <AccountMenuItem
            icon="location-outline"
            title="Address Book"
            onPress={onNavigateToAddresses || (() => {})}
          />
          <AccountMenuItem
            icon="card-outline"
            title="Payment Methods"
            onPress={onNavigateToPayments || (() => {})}
          />
          <AccountMenuItem
            icon="notifications-outline"
            title="Notifications"
            onPress={onNavigateToNotifications || (() => {})}
          />
          <AccountMenuItem
            icon="help-circle-outline"
            title="FAQs"
            onPress={onNavigateToFAQs || (() => {})}
          />
          <AccountMenuItem
            icon="headset-outline"
            title="Help Center"
            onPress={onNavigateToHelpCenter || (() => {})}
            showDivider={false}
          />
        </View>

        {/* Logout Menu Item */}
        <View style={styles.logoutSection}>
          <AccountMenuItem
            icon="log-out-outline"
            title="Logout"
            isDestructive
            showDivider={false}
            onPress={() => setShowLogoutModal(true)}
          />
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          setShowLogoutModal(false);
          onLogout();
        }}
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
    paddingTop: 12,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    ...typography.h2,
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  headerIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: borderRadius.card,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 14,
  },
  profileDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    ...typography.h3,
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  userEmail: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: 6,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4,
  },
  memberText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#D97706',
  },
  menuSection: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.card,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    overflow: 'hidden',
    marginBottom: 16,
  },
  logoutSection: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.card,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    overflow: 'hidden',
  },
});
