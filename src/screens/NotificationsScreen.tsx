import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../constants/theme';
import { EmptyState } from '../components/EmptyState';
import { NotificationItem } from '../types';

interface NotificationsScreenProps {
  notifications: NotificationItem[];
  onBack: () => void;
  onClearAll?: () => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications: initialNotifications,
  onBack,
}) => {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationPress = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Group notifications by dateGroup
  const sections = [
    {
      title: 'Today',
      data: notifications.filter((n) => n.dateGroup === 'Today'),
    },
    {
      title: 'Yesterday',
      data: notifications.filter((n) => n.dateGroup === 'Yesterday'),
    },
    {
      title: 'Earlier',
      data: notifications.filter((n) => n.dateGroup === 'Earlier'),
    },
  ].filter((section) => section.data.length > 0);

  const hasUnread = notifications.some((n) => !n.read);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} color={colors.primary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notifications</Text>

        {notifications.length > 0 && hasUnread ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleMarkAllAsRead}
            style={styles.actionButton}
          >
            <Text style={styles.actionText}>Read All</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.headerPlaceholder} />
        )}
      </View>

      {notifications.length === 0 ? (
        <EmptyState
          iconName="notifications-off-outline"
          title="No Notifications Yet"
          description="We'll notify you as soon as there are special offers, discounts or updates on your orders."
          buttonTitle="Explore Home"
          onButtonPress={onBack}
        />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{title}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => handleNotificationPress(item.id)}
              style={[
                styles.notificationCard,
                !item.read && styles.unreadNotificationCard,
              ]}
            >
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: item.iconBg || '#F5F5F5' },
                ]}
              >
                <Ionicons
                  name={item.iconName}
                  size={22}
                  color={colors.primary}
                />
              </View>

              <View style={styles.contentWrapper}>
                <View style={styles.titleRow}>
                  <Text
                    style={[
                      styles.notificationTitle,
                      !item.read && styles.unreadTitle,
                    ]}
                  >
                    {item.title}
                  </Text>
                  {!item.read && <View style={styles.unreadDot} />}
                </View>

                <Text style={styles.messageText} numberOfLines={2}>
                  {item.message}
                </Text>

                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
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
    borderBottomColor: colors.borderDefault,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderDefault,
  },
  headerTitle: {
    ...typography.h3,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  actionButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  headerPlaceholder: {
    width: 40,
  },
  listContent: {
    paddingBottom: 24,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 8,
    backgroundColor: colors.background,
  },
  sectionTitle: {
    ...typography.label,
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  notificationCard: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    backgroundColor: colors.background,
  },
  unreadNotificationCard: {
    backgroundColor: '#FAFAFA',
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  notificationTitle: {
    ...typography.label,
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
  },
  unreadTitle: {
    fontWeight: '700',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.discount,
    marginLeft: 6,
  },
  messageText: {
    ...typography.body,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 6,
  },
  timeText: {
    fontSize: 11,
    color: colors.textMuted,
  },
});
