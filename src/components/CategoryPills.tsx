import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors, borderRadius, typography } from '../constants/theme';
import { Category } from '../types';

interface CategoryPillsProps {
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  style?: ViewStyle;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
  style,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.container, style]}
    >
      {categories.map((category) => {
        const isSelected = selectedCategoryId === category.id;
        return (
          <TouchableOpacity
            key={category.id}
            activeOpacity={0.75}
            onPress={() => onSelectCategory(category.id)}
            style={[styles.pill, isSelected && styles.pillActive]}
          >
            <Text
              style={[
                styles.pillText,
                isSelected ? styles.pillTextActive : styles.pillTextInactive,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    flexDirection: 'row',
  },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: borderRadius.full,
    backgroundColor: colors.pillInactive,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillActive: {
    backgroundColor: colors.pillActive,
    borderColor: colors.pillActive,
  },
  pillText: {
    ...typography.caption,
    fontSize: 13,
    fontWeight: '600',
  },
  pillTextActive: {
    color: colors.pillTextActive,
  },
  pillTextInactive: {
    color: colors.pillTextInactive,
  },
});
