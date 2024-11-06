import { memo, PropsWithChildren, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';

type Props = PropsWithChildren<{}>;

function ParallaxScrollView({ children }: Props) {
  console.log('ParallaxScrollView render.');
  const theme = useTheme();
  const scrollY = useSharedValue(0);

  // Memoize scroll handler to prevent re-creation on every render
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // Memoize parallax style calculation
  const parallaxStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: interpolate(scrollY.value, [0, 200], [0, -50], 'clamp'),
        },
        {
          scale: interpolate(scrollY.value, [0, 200], [1, 1.1], 'clamp'),
        },
      ],
    }),
    [scrollY],
  );

  // Memoize styles based on theme
  const scrollViewStyle = useCallback(
    () => [styles.scrollView, { backgroundColor: theme.colors.background }],
    [theme.colors.background],
  );

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      style={scrollViewStyle()}
      contentContainerStyle={styles.contentContainer}
    >
      <Animated.View style={parallaxStyle}>{children}</Animated.View>
    </Animated.ScrollView>
  );
}

export default memo(ParallaxScrollView);

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    minHeight: '100%',
  },
});
