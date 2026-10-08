import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../../constants/theme';

export interface PromoCodeInputProps {
  onApplyPromo: (code: string) => boolean | Promise<boolean>;
  onRemovePromo?: () => void;
  appliedPromo?: string | null;
}

export const PromoCodeInput: React.FC<PromoCodeInputProps> = ({
  onApplyPromo,
  onRemovePromo,
  appliedPromo,
}) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApply = async () => {
    if (!code.trim()) return;
    setError(null);
    setLoading(true);

    try {
      const result = await Promise.resolve(onApplyPromo(code.trim()));
      if (!result) {
        setError('Invalid promo code');
      } else {
        setCode('');
      }
    } catch {
      setError('Could not apply code');
    } finally {
      setLoading(false);
    }
  };

  if (appliedPromo) {
    return (
      <View style={styles.appliedContainer}>
        <View style={styles.appliedInfo}>
          <View style={styles.appliedIconCircle}>
            <Feather name="check" size={14} color={colors.success} />
          </View>
          <View style={styles.appliedTextColumn}>
            <Text style={styles.appliedCodeText}>{appliedPromo.toUpperCase()}</Text>
            <Text style={styles.appliedSubtitle}>Promo code applied successfully</Text>
          </View>
        </View>

        {onRemovePromo && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onRemovePromo}
            style={styles.removeButton}
          >
            <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.inputWrapper, !!error && styles.inputError]}>
        <TextInput
          placeholder="Enter promo code"
          placeholderTextColor={colors.textPlaceholder}
          value={code}
          onChangeText={(txt) => {
            setCode(txt);
            if (error) setError(null);
          }}
          autoCapitalize="characters"
          style={styles.input}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleApply}
          disabled={!code.trim() || loading}
          style={[
            styles.addButton,
            !code.trim() && styles.addButtonDisabled,
          ]}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.addButtonText}>Add</Text>
          )}
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderDefault,
    borderRadius: borderRadius.button, // 10px
    paddingLeft: 14,
    paddingRight: 6,
    paddingVertical: 6,
    height: 52,
  },
  inputError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
    paddingVertical: 6,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    height: 38,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#333333',
    opacity: 0.6,
  },
  addButtonText: {
    color: colors.textWhite,
    fontSize: 13,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 11,
    color: colors.error,
    marginTop: 4,
    marginLeft: 4,
  },
  appliedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F6FAF6',
    borderWidth: 1,
    borderColor: '#C8E6C9',
    borderRadius: borderRadius.button,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginVertical: 8,
  },
  appliedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  appliedIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.successBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  appliedTextColumn: {
    flex: 1,
  },
  appliedCodeText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  appliedSubtitle: {
    fontSize: 11,
    color: colors.success,
    marginTop: 1,
  },
  removeButton: {
    padding: 4,
  },
});
