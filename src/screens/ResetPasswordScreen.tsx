import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthHeader, InputField, Button, SuccessModal } from '../components';
import { colors, spacing } from '../constants/theme';

export interface ResetPasswordScreenProps {
  onBack?: () => void;
  onNavigateToLogin?: () => void;
}

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  onBack,
  onNavigateToLogin,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleResetPassword = () => {
    let isValid = true;
    setPasswordError('');
    setConfirmError('');

    if (!password) {
      setPasswordError('Please enter a new password');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmError('Please confirm your new password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmError('Passwords do not match');
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuccessModal(true);
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
              title="Reset Password"
              subtitle="Set the new password for your account so you can login and access all features."
            />

            <View style={styles.form}>
              <InputField
                label="Password"
                placeholder="Enter new password"
                isPassword
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) setPasswordError('');
                }}
                error={passwordError}
              />

              <InputField
                label="Confirm Password"
                placeholder="Confirm new password"
                isPassword
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (confirmError) setConfirmError('');
                }}
                error={confirmError}
              />
            </View>
          </View>

          <Button
            title="Continue"
            onPress={handleResetPassword}
            loading={loading}
            style={styles.submitButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <SuccessModal
        visible={showSuccessModal}
        title="Password Changed!"
        message="Your can now use your new password to login to your account."
        buttonTitle="Login"
        onClose={() => {
          setShowSuccessModal(false);
          onNavigateToLogin?.();
        }}
      />
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
