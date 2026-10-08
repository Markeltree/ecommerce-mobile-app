import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../constants/theme';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { CategoryPills } from '../components/CategoryPills';
import { Product } from '../types';
import { CATEGORIES } from '../constants/mockData';

interface HomeScreenProps {
  products: Product[];
  savedProductIds: string[];
  unreadNotificationCount?: number;
  onSelectProduct: (product: Product) => void;
  onToggleSave: (productId: string) => void;
  onOpenNotifications: () => void;
  onOpenSearch: () => void;
  onSelectCategory?: (categoryId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  products,
  savedProductIds,
  unreadNotificationCount = 2,
  onSelectProduct,
  onToggleSave,
  onOpenNotifications,
  onOpenSearch,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.greetingText}>Welcome Back 👋</Text>
          <Text style={styles.discoverTitle}>Discover</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onOpenNotifications}
          style={styles.notificationButton}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color={colors.primary}
          />
          {unreadNotificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>
                {unreadNotificationCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar (Tappable on Home) */}
      <View style={styles.searchSection}>
        <SearchBar
          editable={false}
          onPress={onOpenSearch}
          placeholder="Search clothes, shoes, accessories..."
        />
      </View>

      {/* Category Pills */}
      <View style={styles.categoriesWrapper}>
        <CategoryPills
          categories={CATEGORIES}
          selectedCategoryId={selectedCategory}
          onSelectCategory={setSelectedCategory}
          style={styles.categoryPills}
        />
      </View>

      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === 'all'
            ? 'Featured Products'
            : `${CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'Products'}`}
        </Text>
        <Text style={styles.itemCountText}>
          {filteredProducts.length} items
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            isSaved={savedProductIds.includes(item.id)}
            onPress={onSelectProduct}
            onToggleSave={onToggleSave}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: 24,
  },
  headerContainer: {
    backgroundColor: colors.background,
    paddingBottom: 8,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  greetingText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  discoverTitle: {
    ...typography.h1,
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: colors.borderDefault,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: colors.discount,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: colors.background,
  },
  notificationBadgeText: {
    color: colors.textWhite,
    fontSize: 10,
    fontWeight: '700',
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  categoriesWrapper: {
    marginBottom: 4,
  },
  categoryPills: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  sectionTitle: {
    ...typography.h3,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  itemCountText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  columnWrapper: {
    paddingHorizontal: 14,
    justifyContent: 'space-between',
  },
});
