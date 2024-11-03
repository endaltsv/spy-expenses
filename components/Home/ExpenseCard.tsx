import React, { memo, useState, useMemo, useCallback } from 'react';
import formattingNumber from '@/utils/formattingNumber';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Image,
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

interface ExpenseCardProps {
  expenseName: string;
  expenseAmount: number;
  expenseDate: string;
  expenseCategory: string;
  expenseIcon: string | undefined;
  onDelete: () => void;
}

const ExpenseCard = ({
  expenseName,
  expenseAmount,
  expenseDate,
  expenseCategory,
  expenseIcon,
  onDelete,
}: ExpenseCardProps) => {
  console.log('ExpenseCard render.');

  const { width } = useWindowDimensions();
  const formattedAmount = useMemo(
    () => formattingNumber(expenseAmount),
    [expenseAmount],
  );

  const translateX = useSharedValue(0);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  // Memoize the gesture handler
  const swipeGesture = useMemo(
    () =>
      Gesture.Pan()
        .onUpdate((event) => {
          const translation = event.translationX;
          translateX.value = translation;

          // Show delete icon when swiped more than 20% of the screen width
          if (translation < -width * 0.2) {
            runOnJS(setShowDeleteIcon)(true);
          } else {
            runOnJS(setShowDeleteIcon)(false);
          }
        })
        .onEnd(() => {
          if (translateX.value < -width * 0.6) {
            // If swipe is more than 60%, delete the card
            translateX.value = withTiming(-width, { duration: 200 }, () => {
              runOnJS(onDelete)();
            });
          } else if (showDeleteIcon) {
            // If swipe is less than 60% but delete icon is shown, keep the card at delete icon position
            translateX.value = withSpring(-width * 0.2);
          } else {
            // Return the card to its original position
            translateX.value = withSpring(0);
          }
        }),
    [translateX, width, showDeleteIcon, onDelete],
  );

  // Memoize the delete handler
  const handleDelete = useCallback(() => {
    // Delete the card when the delete icon is pressed
    translateX.value = withTiming(-width, { duration: 200 }, () => {
      runOnJS(onDelete)();
    });
  }, [translateX, width, onDelete]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Background layer with delete icon */}
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
      {/* Card layer */}
      <GestureDetector gesture={swipeGesture}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
              {expenseIcon && (
                <MaterialCommunityIcons name={expenseIcon} size={24} />
              )}
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.expenseName}>{expenseName}</Text>
            <Text style={styles.expenseDate}>{expenseDate}</Text>
          </View>
          <View>
            <Text style={styles.expenseAmount}>- ₽{formattedAmount}</Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

// Export the memoized component
export default memo(ExpenseCard);

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
    backgroundColor: '#ededed',
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
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Style for Image component (PNG/JPG)
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
  },
  expenseName: {
    fontFamily: 'SFPro-Bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#000',
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
