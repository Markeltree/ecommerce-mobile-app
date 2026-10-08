import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/theme';

export interface SplashScreenProps {
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish?.();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Background ambient curved accents */}
        <View style={styles.ambientCircle1} />
        <View style={styles.ambientCircle2} />

        {/* Center Geometric Brand Logo (Extracted from Figma 1:2070) */}
        <View style={styles.logoWrapper}>
          <View style={styles.logoCrossVertical} />
          <View style={styles.logoCrossHorizontal} />
          {/* Stylized rounded curve on bottom right */}
          <View style={styles.logoCurveCutout} />
        </View>

        {/* Bottom Circular Spinner */}
        <View style={styles.bottomContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  ambientCircle1: {
    position: 'absolute',
    top: -120,
    left: -150,
    width: 480,
    height: 480,
    borderRadius: 240,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  ambientCircle2: {
    position: 'absolute',
    top: -80,
    left: -100,
    width: 420,
    height: 420,
    borderRadius: 210,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  logoWrapper: {
    width: 110,
    height: 110,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCrossVertical: {
    position: 'absolute',
    width: 42,
    height: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
  },
  logoCrossHorizontal: {
    position: 'absolute',
    width: 110,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
  },
  logoCurveCutout: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 34,
    height: 34,
    backgroundColor: '#191919',
    borderTopLeftRadius: 34,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
