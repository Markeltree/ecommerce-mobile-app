import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../constants/theme';
import { Product, ReviewItem } from '../types';
import { MOCK_REVIEWS } from '../constants/mockData';

interface ReviewsScreenProps {
  product: Product;
  onBack: () => void;
}

const RATING_DISTRIBUTION = [
  { star: 5, percentage: 75, count: 96 },
  { star: 4, percentage: 18, count: 23 },
  { star: 3, percentage: 5, count: 6 },
  { star: 2, percentage: 1, count: 2 },
  { star: 1, percentage: 1, count: 1 },
];

const FILTER_TAGS = ['All', '5 Stars', '4 Stars', '3 Stars', 'Positive'];

export const ReviewsScreen: React.FC<ReviewsScreenProps> = ({
  product,
  onBack,
}) => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [reviews, setReviews] = useState<ReviewItem[]>(MOCK_REVIEWS);
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  const handleToggleLike = (id: string) => {
    setLikedReviews((prev) => {
      const isLiked = !!prev[id];
      setReviews((rList) =>
        rList.map((r) =>
          r.id === id ? { ...r, likes: r.likes + (isLiked ? -1 : 1) } : r
        )
      );
      return { ...prev, [id]: !isLiked };
    });
  };

  const filteredReviews = reviews.filter((r) => {
    if (selectedTag === 'All') return true;
    if (selectedTag === '5 Stars') return r.rating === 5;
    if (selectedTag === '4 Stars') return r.rating === 4;
    if (selectedTag === '3 Stars') return r.rating === 3;
    if (selectedTag === 'Positive') return r.rating >= 4;
    return true;
  });

  const renderHeader = () => (
    <View style={styles.breakdownCard}>
      {/* Top Rating Overview */}
      <View style={styles.ratingOverviewRow}>
        <View style={styles.bigScoreBox}>
          <Text style={styles.bigScoreText}>{product.rating.toFixed(1)}</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={
                  star <= Math.floor(product.rating)
                    ? 'star'
                    : star - 0.5 <= product.rating
                    ? 'star-half'
                    : 'star-outline'
                }
                size={16}
                color={colors.rating}
              />
            ))}
          </View>
          <Text style={styles.totalReviewsSub}>
            based on {product.reviewsCount} reviews
          </Text>
        </View>

        {/* 5-bar Distribution Chart */}
        <View style={styles.distributionContainer}>
          {RATING_DISTRIBUTION.map((item) => (
            <View key={item.star} style={styles.barRow}>
              <Text style={styles.barStarText}>{item.star}★</Text>
              <View style={styles.barTrack}>
                <View
                  style={[styles.barFill, { width: `${item.percentage}%` }]}
                />
              </View>
              <Text style={styles.barCountText}>{item.count}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Filter Tags */}
      <View style={styles.filterTagsContainer}>
        {FILTER_TAGS.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <TouchableOpacity
              key={tag}
              activeOpacity={0.75}
              onPress={() => setSelectedTag(tag)}
              style={[styles.tagPill, isSelected && styles.tagPillActive]}
            >
              <Text
                style={[
                  styles.tagText,
                  isSelected ? styles.tagTextActive : styles.tagTextInactive,
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Navigation Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ratings & Reviews</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={filteredReviews}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => {
          const isLiked = !!likedReviews[item.id];
          return (
            <View style={styles.reviewItemCard}>
              <View style={styles.authorRow}>
                <Image
                  source={{ uri: item.avatar }}
                  style={styles.authorAvatar}
                />
                <View style={styles.authorInfo}>
                  <View style={styles.nameBadgeRow}>
                    <Text style={styles.authorName}>{item.author}</Text>
                    <View style={styles.verifiedBadge}>
                      <Ionicons
                        name="checkmark-circle"
                        size={12}
                        color={colors.success}
                      />
                      <Text style={styles.verifiedText}>Verified</Text>
                    </View>
                  </View>
                  <Text style={styles.reviewDate}>{item.date}</Text>
                </View>

                {/* Rating Stars */}
                <View style={styles.reviewStars}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Ionicons
                      key={s}
                      name={s <= item.rating ? 'star' : 'star-outline'}
                      size={14}
                      color={colors.rating}
                    />
                  ))}
                </View>
              </View>

              <Text style={styles.reviewComment}>{item.comment}</Text>

              {/* Helpful footer */}
              <View style={styles.reviewFooter}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleToggleLike(item.id)}
                  style={styles.helpfulBtn}
                >
                  <Ionicons
                    name={isLiked ? 'thumbs-up' : 'thumbs-up-outline'}
                    size={15}
                    color={isLiked ? colors.primary : colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.helpfulText,
                      isLiked && styles.helpfulTextActive,
                    ]}
                  >
                    Helpful ({item.likes})
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderDefault,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderDefault,
  },
  headerTitle: {
    ...typography.h3,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  listContent: {
    paddingBottom: 32,
  },
  breakdownCard: {
    padding: 20,
    borderBottomWidth: 8,
    borderBottomColor: '#F7F7F7',
  },
  ratingOverviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  bigScoreBox: {
    alignItems: 'center',
    paddingRight: 20,
    borderRightWidth: 1,
    borderRightColor: colors.borderDefault,
    minWidth: 110,
  },
  bigScoreText: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.textPrimary,
    lineHeight: 46,
  },
  starsRow: {
    flexDirection: 'row',
    marginVertical: 4,
    gap: 2,
  },
  totalReviewsSub: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  distributionContainer: {
    flex: 1,
    paddingLeft: 16,
    gap: 4,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  barStarText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    width: 24,
  },
  barTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#EAEAEA',
    borderRadius: 3,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  barCountText: {
    fontSize: 11,
    color: colors.textMuted,
    width: 24,
    textAlign: 'right',
  },
  filterTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingTop: 8,
  },
  tagPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: colors.borderDefault,
  },
  tagPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tagTextActive: {
    color: colors.textWhite,
  },
  tagTextInactive: {
    color: colors.textSecondary,
  },
  reviewItemCard: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  authorAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  nameBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  authorName: {
    ...typography.label,
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 2,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.success,
  },
  reviewDate: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewComment: {
    ...typography.body,
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpfulBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  helpfulText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  helpfulTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});
