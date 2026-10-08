import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography } from '../constants/theme';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';
import { Product } from '../types';

interface SavedItemsScreenProps {
  products: Product[];
  savedProductIds: string[];
  onSelectProduct: (product: Product) => void;
  onToggleSave: (productId: string) => void;
  onExploreProducts: () => void;
}

export const SavedItemsScreen: React.FC<SavedItemsScreenProps> = ({
  products,
  savedProductIds,
  onSelectProduct,
  onToggleSave,
  onExploreProducts,
}) => {
  const savedProducts = products.filter((p) =>
    savedProductIds.includes(p.id)
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Saved Items</Text>
        <Text style={styles.countText}>{savedProducts.length} items</Text>
      </View>

      {savedProducts.length === 0 ? (
        <EmptyState
          iconName="heart-dislike-outline"
          title="Your Wishlist is Empty"
          description="Explore our latest collection and tap the heart icon on items you love to save them here."
          buttonTitle="Start Shopping"
          onButtonPress={onExploreProducts}
        />
      ) : (
        <FlatList
          data={savedProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              isSaved={true}
              onPress={onSelectProduct}
              onToggleSave={onToggleSave}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  title: {
    ...typography.h2,
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  countText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  listContent: {
    paddingTop: 12,
    paddingBottom: 24,
  },
  columnWrapper: {
    paddingHorizontal: 14,
    justifyContent: 'space-between',
  },
});
