import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../../constants/theme';

interface ReviewModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number, review: string) => void;
  orderTitle?: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  visible,
  onClose,
  onSubmit,
  orderTitle = 'your order',
}) => {
  const [rating, setRating] = useState<number>(5);
  const [review, setReview] = useState<string>('');

  const handleSubmit = () => {
    onSubmit(rating, review);
    setReview('');
    setRating(5);
    onClose();
  };

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
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={styles.modalContent}
            >
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Leave a Review</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={onClose}
                  style={styles.closeBtn}
                >
                  <Ionicons name="close" size={20} color={colors.textPrimary} />
                </TouchableOpacity>
              </View>

              {/* Subtitle & Prompt */}
              <View style={styles.promptSection}>
                <Text style={styles.promptTitle}>How was {orderTitle}?</Text>
                <Text style={styles.promptSubtitle}>
                  Please give your rating and also your review.
                </Text>
              </View>

              {/* Star Rating Selector */}
              <View style={styles.starRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    activeOpacity={0.7}
                    onPress={() => setRating(star)}
                    style={styles.starBtn}
                  >
                    <Ionicons
                      name={star <= rating ? 'star' : 'star-outline'}
                      size={32}
                      color={star <= rating ? '#FFA902' : '#D1D5DB'}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Text Area */}
              <TextInput
                style={styles.textArea}
                multiline
                numberOfLines={4}
                placeholder="Write your review..."
                placeholderTextColor={colors.textPlaceholder}
                value={review}
                onChangeText={setReview}
                textAlignVertical="top"
              />

              {/* Submit Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSubmit}
                style={styles.submitBtn}
              >
                <Text style={styles.submitBtnText}>Submit</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    ...typography.h3,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promptSection: {
    alignItems: 'center',
    marginVertical: 12,
  },
  promptTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  promptSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 16,
  },
  starBtn: {
    padding: 4,
  },
  textArea: {
    borderWidth: 1,
    borderColor: colors.borderDefault,
    borderRadius: borderRadius.input,
    padding: 14,
    fontSize: 14,
    color: colors.textPrimary,
    minHeight: 110,
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
  },
  submitBtn: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.button,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    ...typography.button,
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '700',
  },
});
