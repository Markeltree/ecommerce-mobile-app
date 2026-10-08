import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AuthHeader,
  InputField,
  Button,
  AuthDivider,
  SocialButton,
} from '../components';
import { colors, typography, spacing } from '../constants/theme';

export interface LoginScreenProps {
  onNavigateToSignUp?: () => void;
  onNavigateToForgotPassword?: () => void;
  onLoginSuccess?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigateToSignUp,
  onNavigateToForgotPassword,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Please enter your email');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Please enter your password');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess?.();
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <AuthHeader
            title="Login to your account"
            subtitle="It’s great to see you again."
            containerStyle={styles.header}
          />

          <View style={styles.form}>
            <InputField
              label="Email"
              placeholder="Enter your email address"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError('');
              }}
              error={emailError}
            />

            <InputField
              label="Password"
              placeholder="Enter your password"
              isPassword
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) setPasswordError('');
              }}
              error={passwordError}
            />

            <View style={styles.forgotPasswordRow}>
              <Text style={styles.forgotText}>Forgot your password? </Text>
              <TouchableOpacity
                onPress={onNavigateToForgotPassword}
                activeOpacity={0.7}
              >
                <Text style={styles.forgotLink}>Reset your password</Text>
              </TouchableOpacity>
            </View>

            <Button
              title="Login"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />

            <AuthDivider text="Or" />

            <SocialButton
              provider="google"
              type="login"
              onPress={() => console.log('Google login')}
            />

            <SocialButton
              provider="facebook"
              type="login"
              onPress={() => console.log('Facebook login')}
            />
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Don’t have an account? </Text>
            <TouchableOpacity
              onPress={onNavigateToSignUp}
              activeOpacity={0.7}
            >
              <Text style={styles.footerLink}>Join</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  form: {
    width: '100%',
  },
  forgotPasswordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    marginTop: 2,
  },
  forgotText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  forgotLink: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  loginButton: {
    marginTop: 4,
    marginBottom: 4,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
    paddingBottom: spacing.sm,
  },
  footerText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  footerLink: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
