import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../constants/theme';

export interface SocialButtonProps {
  provider: 'google' | 'facebook';
  type?: 'login' | 'signup';
  onPress: () => void;
  style?: ViewStyle;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  type = 'login',
  onPress,
  style,
}) => {
  const isGoogle = provider === 'google';
  const actionText = type === 'signup' ? 'Sign Up with' : 'Login with';
  const label = isGoogle ? `${actionText} Google` : `${actionText} Facebook`;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.base,
        isGoogle ? styles.googleButton : styles.facebookButton,
        style,
      ]}
    >
      <View style={styles.iconContainer}>
        {isGoogle ? (
          <Image
            source={require('../../assets/images/google-icon.png')}
            style={styles.googleIcon}
            resizeMode="contain"
          />
        ) : (
          <Ionicons name="logo-facebook" size={22} color="#FFFFFF" />
        )}
      </View>
      <Text
        style={[
          styles.text,
          isGoogle ? styles.googleText : styles.facebookText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: borderRadius.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 12,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderDefault,
  },
  facebookButton: {
    backgroundColor: colors.facebook,
  },
  iconContainer: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 22,
    height: 22,
  },
  text: {
    ...typography.button,
  },
  googleText: {
    color: colors.textPrimary,
  },
  facebookText: {
    color: '#FFFFFF',
  },
});
