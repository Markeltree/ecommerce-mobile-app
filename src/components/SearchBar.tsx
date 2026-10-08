import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../constants/theme';

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  onPress?: () => void; // If editable is false, tap triggers onPress
  editable?: boolean;
  onFilterPress?: () => void;
  onVoicePress?: () => void;
  hasActiveFilters?: boolean;
  autoFocus?: boolean;
  style?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value = '',
  onChangeText,
  onSubmit,
  placeholder = 'Search clothes, shoes, bags...',
  onPress,
  editable = true,
  onFilterPress,
  onVoicePress,
  hasActiveFilters = false,
  autoFocus = false,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        activeOpacity={editable ? 1 : 0.8}
        onPress={!editable ? onPress : undefined}
        style={styles.inputWrapper}
      >
        <Ionicons
          name="search-outline"
          size={20}
          color={colors.textSecondary}
          style={styles.searchIcon}
        />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          placeholder={placeholder}
          placeholderTextColor={colors.textPlaceholder}
          editable={editable}
          autoFocus={autoFocus}
          returnKeyType="search"
          style={styles.input}
          pointerEvents={editable ? 'auto' : 'none'}
        />

        {value.length > 0 && editable && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onChangeText?.('')}
            style={styles.iconButton}
          >
            <Ionicons
              name="close-circle"
              size={18}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onVoicePress || (() => alert('Voice search activated...'))}
          style={styles.iconButton}
        >
          <Ionicons name="mic-outline" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </TouchableOpacity>

      {onFilterPress && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onFilterPress}
          style={[
            styles.filterButton,
            hasActiveFilters && styles.filterButtonActive,
          ]}
        >
          <Ionicons
            name="options-outline"
            size={20}
            color={hasActiveFilters ? colors.textWhite : colors.primary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  inputWrapper: {
    flex: 1,
    height: 48,
    backgroundColor: '#F7F7F7',
    borderRadius: borderRadius.input,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    ...typography.body,
    fontSize: 14,
    color: colors.textPrimary,
    height: '100%',
    padding: 0,
  },
  iconButton: {
    padding: 4,
    marginLeft: 4,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#F7F7F7',
    borderRadius: borderRadius.input,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});
