import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, spacing } from '../constants/theme';

export interface AuthDividerProps {
  text?: string;
  style?: ViewStyle;
}

export const AuthDivider: React.FC<AuthDividerProps> = ({
  text = 'Or',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.divider,
  },
  text: {
    ...typography.caption,
    color: colors.textSecondary,
    marginHorizontal: 16,
  },
});
