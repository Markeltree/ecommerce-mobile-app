import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../../constants/theme';
import { OrderCard, SegmentedTabs, ReviewModal } from '../../components/profile';
import { OrderItem } from '../../types';
import { MOCK_ORDERS } from '../../constants/mockData';

interface MyOrdersScreenProps {
  onBack: () => void;
  onTrackOrder: (order: OrderItem) => void;
}

export const MyOrdersScreen: React.FC<MyOrdersScreenProps> = ({
  onBack,
  onTrackOrder,
}) => {
  const [activeTab, setActiveTab] = useState<'Ongoing' | 'Completed'>('Ongoing');
  const [orders, setOrders] = useState<OrderItem[]>(MOCK_ORDERS);
  const [selectedReviewOrder, setSelectedReviewOrder] = useState<OrderItem | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const ongoingOrders = orders.filter((o) => o.status === 'in_transit');
  const completedOrders = orders.filter((o) => o.status === 'completed');

  const currentList = activeTab === 'Ongoing' ? ongoingOrders : completedOrders;

  const handleOpenReview = (order: OrderItem) => {
    setSelectedReviewOrder(order);
    setShowReviewModal(true);
  };

  const handleSubmitReview = (rating: number, review: string) => {
    Alert.alert(
      'Review Submitted!',
      `Thank you for giving ${rating} stars! Your feedback helps us improve.`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={styles.rightPlaceholder} />
      </View>

      <View style={styles.content}>
        {/* Segmented Tabs */}
        <SegmentedTabs
          tabs={['Ongoing', 'Completed']}
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab as 'Ongoing' | 'Completed')}
        />

        {/* Orders List or Empty State */}
        {currentList.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons
                name="cube-outline"
                size={48}
                color={colors.textSecondary}
              />
            </View>
            <Text style={styles.emptyTitle}>
              No {activeTab} Orders!
            </Text>
            <Text style={styles.emptySubtitle}>
              You don't have any {activeTab.toLowerCase()} orders at this time.
            </Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollList}
          >
            {currentList.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onTrackOrder={onTrackOrder}
                onLeaveReview={handleOpenReview}
              />
            ))}
          </ScrollView>
        )}
      </View>

      {/* Review Modal */}
      <ReviewModal
        visible={showReviewModal}
        orderTitle={selectedReviewOrder?.title}
        onClose={() => {
          setShowReviewModal(false);
          setSelectedReviewOrder(null);
        }}
        onSubmit={handleSubmitReview}
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
    paddingTop: 12,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...typography.h2,
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  rightPlaceholder: {
    width: 38,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  scrollList: {
    paddingBottom: 32,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    marginTop: 60,
  },
  emptyIconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    ...typography.h2,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...typography.body,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
