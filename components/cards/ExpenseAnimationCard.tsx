import { memo, useState, useMemo, useCallback } from 'react';
import formattingNumber from '@/utils/formattingNumber';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import formattingDate from '@/utils/formattingDate';

interface ExpenseCardProps {
  expenseName: string;
  expenseAmount: number;
  expenseDate: string;
  expenseIcon: string | undefined;
  onDelete: () => void;
}

const ExpenseAnimationCard = ({
  expenseName,
  expenseAmount,
  expenseDate,
  expenseIcon,
  onDelete,
}: ExpenseCardProps) => {
  console.log('ExpenseAnimationCard render.');
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const formattedAmount = useMemo(
    () => formattingNumber(expenseAmount),
    [expenseAmount],
  );
  const formattedDate = useMemo(
    () => formattingDate(expenseDate),
    [expenseDate],
  );

  const translateX = useSharedValue(0);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  const swipeGesture = useMemo(
    () =>
      Gesture.Pan()
        .onUpdate((event) => {
          const translation = event.translationX;
          translateX.value = translation;
          if (translation < -width * 0.2) {
            runOnJS(setShowDeleteIcon)(true);
          } else {
            runOnJS(setShowDeleteIcon)(false);
          }
        })
        .onEnd(() => {
          if (translateX.value < -width * 0.6) {
            translateX.value = withTiming(-width, { duration: 200 }, () => {
              runOnJS(onDelete)();
            });
          } else if (showDeleteIcon) {
            translateX.value = withSpring(-width * 0.2);
          } else {
            translateX.value = withSpring(0);
          }
        }),
    [translateX, width, showDeleteIcon, onDelete],
  );

  const handleDelete = useCallback(() => {
    translateX.value = withTiming(-width, { duration: 200 }, () => {
      runOnJS(onDelete)();
    });
  }, [translateX, width, onDelete]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      {showDeleteIcon && (
        <View style={[styles.deleteBackground]}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            activeOpacity={0.7}
          >
            <Text style={styles.deleteButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
      <GestureDetector gesture={swipeGesture}>
        <Animated.View
          style={[
            styles.card,
            animatedStyle,
            { backgroundColor: theme.colors.secondary },
          ]}
        >
          <View style={styles.iconContainer}>
            <View
              style={[
                styles.iconBackground,
                { backgroundColor: theme.colors.primary },
              ]}
            >
              {expenseIcon && (
                <MaterialCommunityIcons name={expenseIcon} size={24} />
              )}
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.expenseName, { color: theme.colors.text }]}>
              {expenseName}
            </Text>
            <Text style={[styles.expenseDate]}>{formattedDate}</Text>
          </View>
          <View>
            <Text style={[styles.expenseAmount, { color: theme.colors.text }]}>
              - ₽{formattedAmount}
            </Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default memo(ExpenseAnimationCard);

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 4,
  },
  deleteBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 14,
    backgroundColor: '#ffdddd',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
  },
  deleteButtonText: {
    fontSize: 24,
    color: '#ff4d4d',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 72,
    borderRadius: 14,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconBackground: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  expenseName: {
    fontFamily: 'SFPro-Regular',
    fontSize: 16,
    lineHeight: 20,
  },
  expenseDate: {
    fontFamily: 'SFPro-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: '#6f6f6f',
  },
  expenseAmount: {
    fontFamily: 'SFPro-Bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#000',
  },
});
