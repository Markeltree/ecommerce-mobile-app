import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthHeader, InputField, Button } from '../components';
import { colors, spacing } from '../constants/theme';

export interface ForgotPasswordScreenProps {
  onBack?: () => void;
  onSendCode?: (email: string) => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onBack,
  onSendCode,
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSendCode = () => {
    if (!email.trim()) {
      setEmailError('Please enter your email');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSendCode?.(email);
    }, 800);
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
          <View>
            <AuthHeader
              onBack={onBack}
              title="Forgot password"
              subtitle="Enter your email for the verification process. We will send 4 digits code to your email."
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
            </View>
          </View>

          <Button
            title="Send Code"
            onPress={handleSendCode}
            loading={loading}
            style={styles.submitButton}
          />
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
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    justifyContent: 'space-between',
  },
  form: {
    marginTop: spacing.md,
  },
  submitButton: {
    marginTop: spacing.xl,
  },
});
