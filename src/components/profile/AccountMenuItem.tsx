import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../../constants/theme';

interface AccountMenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
  isDestructive?: boolean;
  badge?: string;
  showDivider?: boolean;
}

export const AccountMenuItem: React.FC<AccountMenuItemProps> = ({
  icon,
  title,
  onPress,
  isDestructive = false,
  badge,
  showDivider = true,
}) => {
  const itemColor = isDestructive ? colors.error : colors.textPrimary;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.container, showDivider && styles.divider]}
    >
      <View style={styles.leftContent}>
        <View
          style={[
            styles.iconWrapper,
            isDestructive && styles.iconWrapperDestructive,
          ]}
        >
          <Ionicons name={icon} size={20} color={itemColor} />
        </View>
        <Text
          style={[
            styles.title,
            isDestructive && styles.titleDestructive,
          ]}
        >
          {title}
        </Text>
      </View>

      <View style={styles.rightContent}>
        {badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
        {!isDestructive && (
          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.textSecondary}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: colors.cardBackground,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
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
  iconWrapperDestructive: {
    backgroundColor: '#FEE2E2',
  },
  title: {
    ...typography.label,
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  titleDestructive: {
    color: colors.error,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    color: colors.textWhite,
    fontSize: 11,
    fontWeight: '700',
  },
});
