import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { colors, typography } from '../../constants/theme';

interface SettingToggleItemProps {
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
  description?: string;
  showDivider?: boolean;
}

export const SettingToggleItem: React.FC<SettingToggleItemProps> = ({
  label,
  value,
  onValueChange,
  description,
  showDivider = true,
}) => {
  return (
    <View style={[styles.container, showDivider && styles.divider]}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#E5E7EB', true: colors.primary }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#E5E7EB"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
  },
  label: {
    ...typography.label,
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  description: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
