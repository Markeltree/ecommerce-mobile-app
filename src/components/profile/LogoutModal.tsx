import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../../constants/theme';

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.dialogCard}>
              {/* Red Warning Circle Icon */}
              <View style={styles.iconCircle}>
                <Ionicons
                  name="alert-circle-outline"
                  size={44}
                  color={colors.error}
                />
              </View>

              {/* Title & Message */}
              <Text style={styles.title}>Logout?</Text>
              <Text style={styles.message}>
                Are you sure you want to log out?
              </Text>

              {/* Action Buttons */}
              <View style={styles.buttonStack}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onConfirm}
                  style={styles.logoutBtn}
                >
                  <Text style={styles.logoutBtnText}>Yes, Logout</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onClose}
                  style={styles.cancelBtn}
                >
                  <Text style={styles.cancelBtnText}>No, Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  dialogCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.modal,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    ...typography.h2,
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    ...typography.body,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonStack: {
    width: '100%',
    gap: 12,
  },
  logoutBtn: {
    backgroundColor: colors.error,
    borderRadius: borderRadius.button,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutBtnText: {
    ...typography.button,
    color: colors.textWhite,
    fontSize: 15,
    fontWeight: '700',
  },
  cancelBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderDefault,
    borderRadius: borderRadius.button,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    ...typography.button,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
});
