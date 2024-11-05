import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';

type Props = PropsWithChildren<{}>;

export default function ParallaxScrollView({ children }: Props) {
  console.log('ParallaxScrollView render.');
  const scrollY = useSharedValue(0);
  const theme = useTheme();
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const parallaxStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(scrollY.value, [0, 200], [0, -50], 'clamp'),
      },
      {
        scale: interpolate(scrollY.value, [0, 200], [1, 1.1], 'clamp'),
      },
    ],
  }));

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      style={[styles.scrollView, { backgroundColor: theme.colors.background }]} // Белый фон для всего скролла
      contentContainerStyle={styles.contentContainer} // Минимальная высота для контента
    >
      <Animated.View style={parallaxStyle}>{children}</Animated.View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    minHeight: '100%',
  },
});
