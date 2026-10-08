import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../constants/theme';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';
import { Product, FilterOptions } from '../types';
import { CATEGORIES, MOCK_RECENT_SEARCHES } from '../constants/mockData';

interface SearchScreenProps {
  products: Product[];
  savedProductIds: string[];
  onSelectProduct: (product: Product) => void;
  onToggleSave: (productId: string) => void;
  onBack?: () => void;
}

const DEFAULT_FILTERS: FilterOptions = {
  sortBy: 'relevance',
  minPrice: 0,
  maxPrice: 200,
  selectedSize: 'All',
  selectedCategory: 'all',
};

const SORT_OPTIONS: { label: string; value: FilterOptions['sortBy'] }[] = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Popularity', value: 'popular' },
  { label: 'Price: Low to High', value: 'price_low' },
  { label: 'Price: High to Low', value: 'price_high' },
  { label: 'Customer Rating', value: 'rating' },
];

const SIZES = ['All', 'S', 'M', 'L', 'XL', '30', '32', '34'];
const PRICE_PRESETS = [
  { label: 'Under $50', max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $150', min: 100, max: 150 },
  { label: '$150+', min: 150, max: 500 },
];

export const SearchScreen: React.FC<SearchScreenProps> = ({
  products,
  savedProductIds,
  onSelectProduct,
  onToggleSave,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(
    MOCK_RECENT_SEARCHES
  );
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [activeFilters, setActiveFilters] =
    useState<FilterOptions>(DEFAULT_FILTERS);
  const [tempFilters, setTempFilters] =
    useState<FilterOptions>(DEFAULT_FILTERS);

  const hasActiveFilters =
    activeFilters.sortBy !== 'relevance' ||
    activeFilters.selectedSize !== 'All' ||
    activeFilters.selectedCategory !== 'all' ||
    activeFilters.maxPrice !== 200 ||
    activeFilters.minPrice !== 0;

  const handleSearchSubmit = (query: string) => {
    const trimmed = query.trim();
    if (trimmed && !recentSearches.includes(trimmed)) {
      setRecentSearches((prev) => [trimmed, ...prev.slice(0, 7)]);
    }
  };

  const handleRemoveRecentSearch = (itemToRemove: string) => {
    setRecentSearches((prev) => prev.filter((item) => item !== itemToRemove));
  };

  const handleClearAllRecent = () => {
    setRecentSearches([]);
  };

  const openFilterModal = () => {
    setTempFilters({ ...activeFilters });
    setIsFilterModalVisible(true);
  };

  const applyFilters = () => {
    setActiveFilters({ ...tempFilters });
    setIsFilterModalVisible(false);
  };

  const resetFilters = () => {
    setTempFilters(DEFAULT_FILTERS);
    setActiveFilters(DEFAULT_FILTERS);
    setIsFilterModalVisible(false);
  };

  // Filter and Sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      // Text match
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query);

      // Category filter
      const matchesCategory =
        activeFilters.selectedCategory === 'all' ||
        p.category === activeFilters.selectedCategory;

      // Price filter
      const matchesPrice =
        p.price >= activeFilters.minPrice && p.price <= activeFilters.maxPrice;

      // Size filter
      const matchesSize =
        activeFilters.selectedSize === 'All' ||
        p.sizes.includes(activeFilters.selectedSize);

      return matchesQuery && matchesCategory && matchesPrice && matchesSize;
    });

    // Sorting
    if (activeFilters.sortBy === 'price_low') {
      result.sort((a, b) => a.price - b.price);
    } else if (activeFilters.sortBy === 'price_high') {
      result.sort((a, b) => b.price - a.price);
    } else if (activeFilters.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (activeFilters.sortBy === 'popular') {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [products, searchQuery, activeFilters]);

  const isQueryEmpty = searchQuery.trim().length === 0;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Top Search Input Bar */}
      <View style={styles.searchHeader}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmit={() => handleSearchSubmit(searchQuery)}
          placeholder="Search products, brands..."
          onFilterPress={openFilterModal}
          hasActiveFilters={hasActiveFilters}
          autoFocus={false}
        />
      </View>

      {/* Main Content */}
      {isQueryEmpty ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {/* Recent Searches Header */}
          {recentSearches.length > 0 && (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleClearAllRecent}
              >
                <Text style={styles.clearAllText}>Clear All</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Recent Search Chips */}
          <View style={styles.chipsContainer}>
            {recentSearches.map((item) => (
              <View key={item} style={styles.searchChip}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setSearchQuery(item)}
                  style={styles.chipTextWrapper}
                >
                  <Ionicons
                    name="time-outline"
                    size={14}
                    color={colors.textSecondary}
                    style={styles.chipIcon}
                  />
                  <Text style={styles.chipText}>{item}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleRemoveRecentSearch(item)}
                  style={styles.chipRemove}
                >
                  <Ionicons
                    name="close"
                    size={14}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Popular Categories */}
          <View style={[styles.sectionHeader, { marginTop: 24 }]}>
            <Text style={styles.sectionTitle}>Popular Categories</Text>
          </View>
          <View style={styles.chipsContainer}>
            {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
              <TouchableOpacity
                key={cat.id}
                activeOpacity={0.7}
                onPress={() => setSearchQuery(cat.name)}
                style={styles.categoryChip}
              >
                <Ionicons
                  name="trending-up-outline"
                  size={14}
                  color={colors.primary}
                  style={styles.chipIcon}
                />
                <Text style={styles.categoryChipText}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : filteredProducts.length === 0 ? (
        /* Empty State */
        <EmptyState
          iconName="search-outline"
          title="No Results Found!"
          description={`We couldn't find any items matching "${searchQuery}". Try checking your spelling or clearing filters.`}
          buttonTitle="Clear Search"
          onButtonPress={() => {
            setSearchQuery('');
            resetFilters();
          }}
        />
      ) : (
        /* Search Results Grid */
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.resultsListContent}
          columnWrapperStyle={styles.columnWrapper}
          ListHeaderComponent={
            <View style={styles.resultsInfoRow}>
              <Text style={styles.resultsCountText}>
                Found{' '}
                <Text style={styles.boldText}>{filteredProducts.length}</Text>{' '}
                results for "{searchQuery}"
              </Text>
              {hasActiveFilters && (
                <TouchableOpacity activeOpacity={0.7} onPress={resetFilters}>
                  <Text style={styles.resetFiltersText}>Reset Filters</Text>
                </TouchableOpacity>
              )}
            </View>
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
      )}

      {/* Filter Bottom Sheet / Modal */}
      <Modal
        visible={isFilterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsFilterModalVisible(false)}
              >
                <Ionicons name="close" size={24} color={colors.primary} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Filter & Sort</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={resetFilters}>
                <Text style={styles.resetModalText}>Reset</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalScrollContent}
            >
              {/* Sort By */}
              <Text style={styles.filterSectionTitle}>Sort By</Text>
              <View style={styles.optionsWrap}>
                {SORT_OPTIONS.map((opt) => {
                  const isSelected = tempFilters.sortBy === opt.value;
                  return (
                    <TouchableOpacity
                      key={opt.value}
                      activeOpacity={0.75}
                      onPress={() =>
                        setTempFilters((prev) => ({
                          ...prev,
                          sortBy: opt.value,
                        }))
                      }
                      style={[
                        styles.filterOptionPill,
                        isSelected && styles.filterOptionPillActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.filterOptionText,
                          isSelected && styles.filterOptionTextActive,
                        ]}
                      >
                        {opt.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Category */}
              <Text style={styles.filterSectionTitle}>Category</Text>
              <View style={styles.optionsWrap}>
                {CATEGORIES.map((cat) => {
                  const isSelected = tempFilters.selectedCategory === cat.id;
                  return (
                    <TouchableOpacity
                      key={cat.id}
                      activeOpacity={0.75}
                      onPress={() =>
                        setTempFilters((prev) => ({
                          ...prev,
                          selectedCategory: cat.id,
                        }))
                      }
                      style={[
                        styles.filterOptionPill,
                        isSelected && styles.filterOptionPillActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.filterOptionText,
                          isSelected && styles.filterOptionTextActive,
                        ]}
                      >
                        {cat.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Price Range Presets */}
              <Text style={styles.filterSectionTitle}>Price Range</Text>
              <View style={styles.optionsWrap}>
                {PRICE_PRESETS.map((p, idx) => {
                  const isSelected =
                    (p.min === undefined || tempFilters.minPrice === p.min) &&
                    tempFilters.maxPrice === p.max;
                  return (
                    <TouchableOpacity
                      key={idx}
                      activeOpacity={0.75}
                      onPress={() =>
                        setTempFilters((prev) => ({
                          ...prev,
                          minPrice: p.min || 0,
                          maxPrice: p.max,
                        }))
                      }
                      style={[
                        styles.filterOptionPill,
                        isSelected && styles.filterOptionPillActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.filterOptionText,
                          isSelected && styles.filterOptionTextActive,
                        ]}
                      >
                        {p.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Sizes */}
              <Text style={styles.filterSectionTitle}>Size</Text>
              <View style={styles.optionsWrap}>
                {SIZES.map((size) => {
                  const isSelected = tempFilters.selectedSize === size;
                  return (
                    <TouchableOpacity
                      key={size}
                      activeOpacity={0.75}
                      onPress={() =>
                        setTempFilters((prev) => ({
                          ...prev,
                          selectedSize: size,
                        }))
                      }
                      style={[
                        styles.sizePill,
                        isSelected && styles.filterOptionPillActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.filterOptionText,
                          isSelected && styles.filterOptionTextActive,
                        ]}
                      >
                        {size}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>

            {/* Apply Button */}
            <View style={styles.modalFooter}>
              <Button
                title="Apply Filters"
                onPress={applyFilters}
                variant="primary"
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchHeader: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    ...typography.label,
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  clearAllText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  searchChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingLeft: 12,
    paddingRight: 6,
    paddingVertical: 7,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.borderDefault,
  },
  chipTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipIcon: {
    marginRight: 6,
  },
  chipText: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textPrimary,
  },
  chipRemove: {
    marginLeft: 6,
    padding: 2,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderDefault,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
  },
  categoryChipText: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  resultsListContent: {
    paddingBottom: 24,
  },
  columnWrapper: {
    paddingHorizontal: 14,
    justifyContent: 'space-between',
  },
  resultsInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  resultsCountText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
  },
  boldText: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  resetFiltersText: {
    ...typography.caption,
    color: colors.discount,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.modalOverlay,
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    paddingBottom: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderDefault,
  },
  modalTitle: {
    ...typography.h3,
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  resetModalText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  modalScrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  filterSectionTitle: {
    ...typography.label,
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 14,
    marginBottom: 10,
  },
  optionsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOptionPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: colors.borderDefault,
  },
  sizePill: {
    minWidth: 44,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: colors.borderDefault,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  filterOptionPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterOptionText: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  filterOptionTextActive: {
    color: colors.textWhite,
    fontWeight: '600',
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
});
