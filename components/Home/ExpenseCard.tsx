import formattingNumber from '@/utils/FormattingNumber';
import { View, Text, StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { SvgUri } from 'react-native-svg'; // Импортируем SVG компонент
import { categoryIcons } from '@/utils/iconPaths'; // Импортируем объект с путями иконок

interface ExpenseCardProps {
  expenseName: string;
  expenseAmount: number;
  expenseDate: string;
  expenseCategory: string;
}

export default function ExpenseCard({
  expenseName,
  expenseAmount,
  expenseDate,
  expenseCategory,
}: ExpenseCardProps) {
  const formattedAmount = formattingNumber(expenseAmount);

  const translateX = useSharedValue(0);
  const backgroundColor = useSharedValue('#ededed');

  const swipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX < 0) {
        translateX.value = event.translationX;
        if (event.translationX < -70) {
          backgroundColor.value = '#ff4d4d';
        } else {
          backgroundColor.value = '#ededed';
        }
      }
    })
    .onEnd(() => {
      translateX.value = withSpring(0);
      backgroundColor.value = '#ededed';
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    backgroundColor: backgroundColor.value,
  }));

  console.log(expenseCategory);
  const iconUri =
    categoryIcons[expenseCategory] || '../../assets/images/plus.svg';

  console.log(iconUri);
  return (
    <GestureDetector gesture={swipeGesture}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <SvgUri
              uri={iconUri} // Укажи URL на иконку или используй локальный SVG
              width={24}
              height={24}
            />
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
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ededed',
    paddingHorizontal: 16,
    borderRadius: 14,
    marginVertical: 8,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconBackground: {
    width: 44,
    height: 44,
    borderRadius: 22, // делаем круг
    backgroundColor: '#ffffff', // белый цвет
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingVertical: 16,
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
