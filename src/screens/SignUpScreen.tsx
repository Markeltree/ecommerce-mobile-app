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

export interface SignUpScreenProps {
  onNavigateToLogin?: () => void;
  onSignUpSuccess?: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onNavigateToLogin,
  onSignUpSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignUp = () => {
    let isValid = true;
    setFullNameError('');
    setEmailError('');
    setPasswordError('');

    if (!fullName.trim()) {
      setFullNameError('Please enter your full name');
      isValid = false;
    }

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
      onSignUpSuccess?.();
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
            title="Create an account"
            subtitle="Let’s create your account."
            containerStyle={styles.header}
          />

          <View style={styles.form}>
            <InputField
              label="Full Name"
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                if (fullNameError) setFullNameError('');
              }}
              error={fullNameError}
            />

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

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By signing up you agree to our{' '}
                <Text style={styles.termsLink}>Terms</Text>,{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>, and{' '}
                <Text style={styles.termsLink}>Cookie Use</Text>
              </Text>
            </View>

            <Button
              title="Create an Account"
              onPress={handleSignUp}
              loading={loading}
              style={styles.signUpButton}
            />

            <AuthDivider text="Or" />

            <SocialButton
              provider="google"
              type="signup"
              onPress={() => console.log('Google signup')}
            />

            <SocialButton
              provider="facebook"
              type="signup"
              onPress={() => console.log('Facebook signup')}
            />
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={onNavigateToLogin}
              activeOpacity={0.7}
            >
              <Text style={styles.footerLink}>Log In</Text>
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
    marginBottom: spacing.md,
  },
  form: {
    width: '100%',
  },
  termsContainer: {
    marginBottom: spacing.lg,
    marginTop: 2,
  },
  termsText: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  termsLink: {
    color: colors.textPrimary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  signUpButton: {
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
