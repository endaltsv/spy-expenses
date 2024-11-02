import formattingNumber from '@/utils/FormattingNumber';
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
import { SvgUri } from 'react-native-svg';
import { categoryIcons } from '@/utils/iconPaths';
import { useState } from 'react';

interface ExpenseCardProps {
  expenseName: string;
  expenseAmount: number;
  expenseDate: string;
  expenseCategory: string;
  onDelete: () => void;
}

export default function ExpenseCard({
  expenseName,
  expenseAmount,
  expenseDate,
  expenseCategory,
  onDelete,
}: ExpenseCardProps) {
  if (typeof window === 'undefined') {
    return null;
  }

  const { width } = useWindowDimensions();
  const formattedAmount = formattingNumber(expenseAmount);

  const translateX = useSharedValue(0);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  const swipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      const translation = event.translationX;
      translateX.value = translation;

      // Показываем крестик при свайпе более 20% ширины экрана
      if (translation < -width * 0.2) {
        runOnJS(setShowDeleteIcon)(true);
      } else {
        runOnJS(setShowDeleteIcon)(false);
      }
    })
    .onEnd(() => {
      if (translateX.value < -width * 0.6) {
        // Если свайп более 60%, удаляем карточку
        translateX.value = withTiming(-width, { duration: 200 }, () => {
          runOnJS(onDelete)();
        });
      } else if (showDeleteIcon) {
        // Если свайп меньше 60%, но крестик показан, оставляем карточку на месте крестика
        translateX.value = withSpring(-width * 0.2);
      } else {
        // Возвращаем карточку в исходное положение
        translateX.value = withSpring(0);
      }
    });

  const handleDelete = () => {
    // Удаляем карточку при нажатии на крестик
    translateX.value = withTiming(-width, { duration: 200 }, () => {
      runOnJS(onDelete)();
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const iconUri =
    categoryIcons[expenseCategory] || '../../assets/images/plus.svg';

  return (
    <View style={styles.container}>
      {/* Фоновый слой с крестиком */}
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
      {/* Слой с карточкой */}
      <GestureDetector gesture={swipeGesture}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
              <SvgUri uri={iconUri} width={24} height={24} />
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
}

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
