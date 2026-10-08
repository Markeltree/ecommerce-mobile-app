import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../../constants/theme';

interface HelpCenterScreenProps {
  onBack: () => void;
  onNavigateToChat: () => void;
}

export const HelpCenterScreen: React.FC<HelpCenterScreenProps> = ({
  onBack,
  onNavigateToChat,
}) => {
  const supportChannels = [
    {
      id: 'chat',
      title: 'Customer Service',
      icon: 'headset-outline' as keyof typeof Ionicons.glyphMap,
      onPress: onNavigateToChat,
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      icon: 'logo-whatsapp' as keyof typeof Ionicons.glyphMap,
      onPress: () =>
        Alert.alert('WhatsApp Support', 'Redirecting to WhatsApp chat (+1 234 567 890)...'),
    },
    {
      id: 'website',
      title: 'Website',
      icon: 'globe-outline' as keyof typeof Ionicons.glyphMap,
      onPress: () =>
        Alert.alert('Official Website', 'Opening https://shopstore-ecommerce.com...'),
    },
    {
      id: 'facebook',
      title: 'Facebook',
      icon: 'logo-facebook' as keyof typeof Ionicons.glyphMap,
      onPress: () =>
        Alert.alert('Facebook', 'Opening Facebook support page...'),
    },
    {
      id: 'twitter',
      title: 'Twitter',
      icon: 'logo-twitter' as keyof typeof Ionicons.glyphMap,
      onPress: () =>
        Alert.alert('Twitter / X', 'Opening @ShopStoreSupport on X...'),
    },
    {
      id: 'instagram',
      title: 'Instagram',
      icon: 'logo-instagram' as keyof typeof Ionicons.glyphMap,
      onPress: () =>
        Alert.alert('Instagram', 'Opening @ShopStoreOfficial on Instagram...'),
    },
  ];

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
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={styles.rightPlaceholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.channelsCard}>
          {supportChannels.map((channel, index) => {
            const isLast = index === supportChannels.length - 1;
            return (
              <TouchableOpacity
                key={channel.id}
                activeOpacity={0.7}
                onPress={channel.onPress}
                style={[styles.channelItem, !isLast && styles.itemDivider]}
              >
                <View style={styles.leftContent}>
                  <View style={styles.iconWrapper}>
                    <Ionicons
                      name={channel.icon}
                      size={20}
                      color={colors.primary}
                    />
                  </View>
                  <Text style={styles.channelTitle}>{channel.title}</Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            );
          })}
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
  channelsCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.card,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    overflow: 'hidden',
  },
  channelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  itemDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  channelTitle: {
    ...typography.label,
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
