import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { colors, borderRadius, typography } from '../constants/theme';

export interface OtpInputProps {
  length?: number;
  onOtpChange: (otp: string) => void;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 4,
  onOtpChange,
}) => {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const inputs = useRef<TextInput[]>([]);

  const handleChangeText = (text: string, index: number) => {
    const newDigits = [...digits];
    newDigits[index] = text.slice(-1);
    setDigits(newDigits);
    onOtpChange(newDigits.join(''));

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <View
            key={index}
            style={[
              styles.box,
              focusedIndex === index && styles.boxFocused,
              !!digits[index] && styles.boxFilled,
            ]}
          >
            <TextInput
              ref={(ref) => {
                if (ref) inputs.current[index] = ref;
              }}
              style={styles.input}
              keyboardType="number-pad"
              maxLength={1}
              value={digits[index]}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(-1)}
              textAlign="center"
              selectTextOnFocus
            />
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 24,
  },
  box: {
    width: 68,
    height: 68,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    borderRadius: borderRadius.input,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
  },
  boxFocused: {
    borderColor: colors.borderFocused,
    borderWidth: 1.5,
  },
  boxFilled: {
    borderColor: colors.primary,
  },
  input: {
    ...typography.h2,
    fontSize: 24,
    color: colors.textPrimary,
    width: '100%',
    height: '100%',
  },
});
