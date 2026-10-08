import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../../constants/theme';
import { OrderItem } from '../../types';

interface TrackOrderScreenProps {
  order: OrderItem;
  onBack: () => void;
}

export const TrackOrderScreen: React.FC<TrackOrderScreenProps> = ({
  order,
  onBack,
}) => {
  const steps = order.trackingSteps || [];

  const handleCallDriver = () => {
    Alert.alert(
      'Calling Driver',
      `Connecting to ${order.driver?.name || 'Driver'} at ${order.driver?.phone || '+1 (234) 567-8901'}...`
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
        <Text style={styles.headerTitle}>Track Order</Text>
        <View style={styles.rightPlaceholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Map Route Preview */}
        <View style={styles.mapContainer}>
          {/* Stylized Vector Map Graphic */}
          <View style={styles.mapBackground}>
            {/* Street Grid Blocks */}
            <View style={[styles.mapBlock, { top: 20, left: 30, width: 80, height: 60 }]} />
            <View style={[styles.mapBlock, { top: 20, right: 30, width: 90, height: 70 }]} />
            <View style={[styles.mapBlock, { bottom: 30, left: 20, width: 110, height: 80 }]} />
            <View style={[styles.mapBlock, { bottom: 20, right: 40, width: 100, height: 65 }]} />

            {/* Route Path Lines */}
            <View style={styles.routeLineHorizontal1} />
            <View style={styles.routeLineVertical} />
            <View style={styles.routeLineHorizontal2} />

            {/* Origin Pin */}
            <View style={styles.originPin}>
              <View style={styles.originInner} />
            </View>

            {/* Delivery Van / Courier Tag */}
            <View style={styles.courierTag}>
              <Text style={styles.courierTagText}>UB</Text>
            </View>

            {/* Destination Pin */}
            <View style={styles.destinationPin}>
              <Ionicons name="location" size={24} color={colors.primary} />
            </View>
          </View>
        </View>

        {/* Order Details Summary */}
        <View style={styles.orderSummaryCard}>
          <Text style={styles.orderNumberText}>{order.orderNumber}</Text>
          <Text style={styles.orderTitleText}>{order.title}</Text>
        </View>

        {/* Order Status Timeline Section */}
        <View style={styles.statusCard}>
          <Text style={styles.statusHeading}>Order Status</Text>

          <View style={styles.timelineContainer}>
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              const isCompleted = step.status === 'completed';
              const isActive = step.status === 'active';

              return (
                <View key={step.id} style={styles.timelineRow}>
                  {/* Indicator Column */}
                  <View style={styles.indicatorColumn}>
                    <View
                      style={[
                        styles.nodeCircle,
                        isCompleted && styles.nodeCompleted,
                        isActive && styles.nodeActive,
                      ]}
                    >
                      {isCompleted && (
                        <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                      )}
                      {isActive && <View style={styles.activeInnerDot} />}
                    </View>
                    {!isLast && (
                      <View
                        style={[
                          styles.verticalConnector,
                          (isCompleted || isActive) && styles.connectorCompleted,
                        ]}
                      />
                    )}
                  </View>

                  {/* Step Content */}
                  <View style={styles.stepContent}>
                    <View style={styles.stepHeader}>
                      <Text
                        style={[
                          styles.stepTitle,
                          isActive && styles.stepTitleActive,
                        ]}
                      >
                        {step.title}
                      </Text>
                      {step.timestamp ? (
                        <Text style={styles.stepTimestamp}>
                          {step.timestamp}
                        </Text>
                      ) : null}
                    </View>
                    <Text style={styles.stepLocation}>{step.location}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Driver Contact Card */}
          {order.driver && (
            <View style={styles.driverCard}>
              <Image
                source={{ uri: order.driver.avatar }}
                style={styles.driverAvatar}
              />
              <View style={styles.driverInfo}>
                <Text style={styles.driverName}>{order.driver.name}</Text>
                <Text style={styles.driverRole}>{order.driver.role}</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleCallDriver}
                style={styles.callButton}
              >
                <Ionicons name="call" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
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
  scrollContent: {
    paddingBottom: 40,
  },
  mapContainer: {
    height: 220,
    backgroundColor: '#EEF2F6',
    position: 'relative',
    overflow: 'hidden',
  },
  mapBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F0F3F6',
  },
  mapBlock: {
    position: 'absolute',
    backgroundColor: '#E2E8F0',
    borderRadius: 8,
  },
  routeLineHorizontal1: {
    position: 'absolute',
    top: 150,
    left: 70,
    width: 120,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  routeLineVertical: {
    position: 'absolute',
    top: 70,
    left: 186,
    width: 4,
    height: 84,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  routeLineHorizontal2: {
    position: 'absolute',
    top: 70,
    left: 186,
    width: 120,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  originPin: {
    position: 'absolute',
    top: 142,
    left: 60,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  originInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  courierTag: {
    position: 'absolute',
    top: 90,
    left: 168,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  courierTagText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  destinationPin: {
    position: 'absolute',
    top: 54,
    left: 300,
  },
  orderSummaryCard: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  orderNumberText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  orderTitleText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 2,
  },
  statusCard: {
    padding: 20,
  },
  statusHeading: {
    ...typography.h3,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 20,
  },
  timelineContainer: {
    marginBottom: 24,
  },
  timelineRow: {
    flexDirection: 'row',
    minHeight: 64,
  },
  indicatorColumn: {
    alignItems: 'center',
    width: 28,
    marginRight: 14,
  },
  nodeCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  nodeCompleted: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  nodeActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  activeInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  verticalConnector: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
  connectorCompleted: {
    backgroundColor: colors.primary,
  },
  stepContent: {
    flex: 1,
    paddingBottom: 20,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  stepTitleActive: {
    color: colors.primary,
  },
  stepTimestamp: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  stepLocation: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: borderRadius.card,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.borderDefault,
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  driverRole: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
