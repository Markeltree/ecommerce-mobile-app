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
import { AuthHeader, OtpInput, Button } from '../components';
import { colors, typography, spacing } from '../constants/theme';

export interface VerificationCodeScreenProps {
  email?: string;
  onBack?: () => void;
  onVerifySuccess?: () => void;
  onResendCode?: () => void;
}

export const VerificationCodeScreen: React.FC<VerificationCodeScreenProps> = ({
  email = 'cody.fisher45@example.com',
  onBack,
  onVerifySuccess,
  onResendCode,
}) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState('');

  const handleVerify = () => {
    if (code.length < 4) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onVerifySuccess?.();
    }, 800);
  };

  const handleResend = () => {
    setResendStatus('Code resent successfully!');
    onResendCode?.();
    setTimeout(() => setResendStatus(''), 3000);
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
              title="Enter 4 Digit Code"
              subtitle={`Enter 4 digit code that you receive on your email (${email}).`}
            />

            <OtpInput length={4} onOtpChange={setCode} />

            <View style={styles.resendRow}>
              <Text style={styles.resendText}>Email not received? </Text>
              <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                <Text style={styles.resendLink}>Resend code</Text>
              </TouchableOpacity>
            </View>

            {!!resendStatus && (
              <Text style={styles.resendSuccessText}>{resendStatus}</Text>
            )}
          </View>

          <Button
            title="Continue"
            onPress={handleVerify}
            disabled={code.length < 4}
            loading={loading}
            style={styles.continueButton}
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
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  resendText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  resendLink: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  resendSuccessText: {
    ...typography.caption,
    color: colors.success,
    textAlign: 'center',
    marginTop: 8,
  },
  continueButton: {
    marginTop: spacing.xl,
  },
});
