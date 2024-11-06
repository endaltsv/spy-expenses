import ParallaxScrollView from '@/components/ParallaxScrollView';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components/native';
import LottieView from 'lottie-react-native';
import React, { lazy, Suspense } from 'react';

const MonthCategory = lazy(() => import('@/components/sections/MonthCategory'));
const RecentExpense = lazy(() => import('@/components/sections/RecentExpense'));
const SpentToday = lazy(() => import('@/components/sections/SpentToday'));
export default function HomeScreen() {
  console.log('HomeScreen(index) render.');

  const theme = useTheme();

  return (
    <Suspense fallback={<LoadingAnimation />}>
      <ParallaxScrollView>
        <View
          style={[
            styles.container,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <View style={styles.mainContainer}>
            <SpentToday />
            <RecentExpense />
            <MonthCategory />
          </View>
        </View>
      </ParallaxScrollView>
    </Suspense>
  );
}

function LoadingAnimation() {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.loadingContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <LottieView
        source={require('@/assets/animations/loading2.json')}
        autoPlay
        loop
        style={[styles.lottieAnimation]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    paddingBottom: '30%',
  },
  mainContainer: {
    paddingHorizontal: '5%',
  },
  monthContainer: {
    paddingHorizontal: '5%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // прозрачный фон
  },
  lottieAnimation: {
    width: 200,
    height: 200,
  },
});
