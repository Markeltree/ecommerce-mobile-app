import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components';
import { colors, spacing } from '../constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface OnboardingScreenProps {
  onGetStarted: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onGetStarted,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Ambient background curve lines */}
        <View style={styles.curveContainer} pointerEvents="none">
          <View style={styles.curve1} />
          <View style={styles.curve2} />
          <View style={styles.curve3} />
        </View>

        {/* Model Hero Image */}
        <View style={styles.imageWrapper} pointerEvents="none">
          <Image
            source={require('../../assets/images/onboarding_hero.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        {/* Big Bold Headline */}
        <View style={styles.header}>
          <Text style={styles.titleLine}>Define</Text>
          <Text style={styles.titleLine}>yourself in</Text>
          <Text style={styles.titleLine}>your unique</Text>
          <Text style={styles.titleLine}>way.</Text>
        </View>

        {/* Bottom CTA Button */}
        <View style={styles.footer}>
          <Button
            title="Get Started"
            showArrow
            onPress={onGetStarted}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
    paddingBottom: spacing.lg,
    position: 'relative',
    overflow: 'hidden',
  },
  curveContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  curve1: {
    position: 'absolute',
    top: 180,
    left: -120,
    width: 600,
    height: 600,
    borderRadius: 300,
    borderWidth: 1.5,
    borderColor: '#EFEFEF',
  },
  curve2: {
    position: 'absolute',
    top: 240,
    left: -140,
    width: 660,
    height: 660,
    borderRadius: 330,
    borderWidth: 1.5,
    borderColor: '#EAEAEA',
  },
  curve3: {
    position: 'absolute',
    top: 300,
    left: -160,
    width: 720,
    height: 720,
    borderRadius: 360,
    borderWidth: 1.5,
    borderColor: '#F2F2F2',
  },
  imageWrapper: {
    position: 'absolute',
    right: -20,
    bottom: 70,
    width: SCREEN_WIDTH * 0.88,
    height: SCREEN_HEIGHT * 0.72,
    zIndex: 1,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  header: {
    marginTop: spacing.md,
    zIndex: 2,
  },
  titleLine: {
    fontSize: 46,
    fontWeight: '800',
    color: colors.textPrimary,
    lineHeight: 48,
    letterSpacing: -1.8,
  },
  footer: {
    width: '100%',
    paddingTop: spacing.sm,
    zIndex: 3,
  },
  button: {
    height: 54,
  },
});
