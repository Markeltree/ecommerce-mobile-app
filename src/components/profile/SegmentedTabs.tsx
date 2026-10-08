import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, borderRadius, typography } from '../../constants/theme';

interface SegmentedTabsProps {
  tabs: string[];
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const SegmentedTabs: React.FC<SegmentedTabsProps> = ({
  tabs,
  activeTab,
  onSelectTab,
}) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <TouchableOpacity
            key={tab}
            activeOpacity={0.8}
            onPress={() => onSelectTab(tab)}
            style={[styles.tabButton, isActive && styles.activeTabButton]}
          >
            <Text
              style={[
                styles.tabText,
                isActive ? styles.activeTabText : styles.inactiveTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  activeTabButton: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    ...typography.button,
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  inactiveTabText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
});
