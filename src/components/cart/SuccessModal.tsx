import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, borderRadius } from '../../constants/theme';

export interface SuccessModalProps {
  visible: boolean;
  title?: string;
  message: string;
  buttonTitle?: string;
  onButtonPress?: () => void;
  onClose?: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  title = 'Congratulations!',
  message,
  buttonTitle = 'Thanks',
  onButtonPress,
  onClose,
}) => {
  const handlePress = onButtonPress || onClose || (() => {});

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handlePress}
    >
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              {/* Green checkmark circle */}
              <View style={styles.iconCircle}>
                <Feather name="check" size={32} color={colors.success} />
              </View>

              {/* Title & Message */}
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>

              {/* Action Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handlePress}
                style={styles.actionButton}
              >
                <Text style={styles.buttonText}>{buttonTitle}</Text>
              </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.modal, // 20px
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#F0FDF4',
    borderWidth: 2,
    borderColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 26,
    lineHeight: 18,
  },
  actionButton: {
    width: '100%',
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.button, // 10px
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textWhite,
  },
});
