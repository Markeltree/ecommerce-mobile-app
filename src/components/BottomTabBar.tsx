import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../constants/theme';
import { TabType } from '../types';

export interface TabItem {
  id: TabType;
  label: string;
  activeIcon: keyof typeof Ionicons.glyphMap;
  inactiveIcon: keyof typeof Ionicons.glyphMap;
  badgeCount?: number;
}

const TABS: TabItem[] = [
  {
    id: 'home',
    label: 'Home',
    activeIcon: 'home',
    inactiveIcon: 'home-outline',
  },
  {
    id: 'search',
    label: 'Search',
    activeIcon: 'search',
    inactiveIcon: 'search-outline',
  },
  {
    id: 'saved',
    label: 'Saved',
    activeIcon: 'heart',
    inactiveIcon: 'heart-outline',
  },
  {
    id: 'cart',
    label: 'Cart',
    activeIcon: 'cart',
    inactiveIcon: 'cart-outline',
  },
  {
    id: 'account',
    label: 'Account',
    activeIcon: 'person',
    inactiveIcon: 'person-outline',
  },
];

interface BottomTabBarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  cartCount?: number;
  savedCount?: number;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onSelectTab,
  cartCount = 0,
  savedCount = 0,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const badgeValue =
            tab.id === 'cart' ? cartCount : tab.id === 'saved' ? savedCount : 0;

          return (
            <TouchableOpacity
              key={tab.id}
              activeOpacity={0.7}
              onPress={() => onSelectTab(tab.id)}
              style={styles.tabButton}
            >
              <View style={styles.iconWrapper}>
                <Ionicons
                  name={isActive ? tab.activeIcon : tab.inactiveIcon}
                  size={24}
                  color={isActive ? colors.primary : colors.textMuted}
                />
                {badgeValue > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {badgeValue > 99 ? '99+' : badgeValue}
                    </Text>
                  </View>
                )}
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  isActive ? styles.activeLabel : styles.inactiveLabel,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.borderDefault,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    paddingTop: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
  activeLabel: {
    color: colors.primary,
    fontWeight: '700',
  },
  inactiveLabel: {
    color: colors.textMuted,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: colors.discount,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: colors.textWhite,
    fontSize: 9,
    fontWeight: '700',
  },
});
