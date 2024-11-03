import { useExpensesContext } from '@/context/ExpensesContext';
import formattingNumber from '@/utils/formattingNumber';
import { View, Text, StyleSheet, Image } from 'react-native';

interface SpentTodayProps {
  amount: number;
}

export default function SpentToday({ amount }: SpentTodayProps) {
  const { computeTotalExpenses } = useExpensesContext();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>Сегодня потрачено</Text>
          <Text style={styles.amountText}>₽ {computeTotalExpenses}</Text>
        </View>
        <View style={[styles.plusContainer, styles.alignedRight]}>
          <Image
            source={require('../../../assets/images/plus.svg')}
            style={styles.plusIcon}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d9d9d9',
    width: '100%',
    height: 108,
    borderRadius: 16,
    marginVertical: 54,
    paddingHorizontal: 16,
  },
  textContainer: {
    flex: 1,
  },
  amountText: {
    fontSize: 32,
    lineHeight: 36,
    color: '#000',
    fontFamily: 'SFPro-Bold', // Применяем шрифт SF Pro Bold
  },
  labelText: {
    fontSize: 16,
    lineHeight: 20,
    color: '#6f6f6f',
    fontFamily: 'SFPro-Regular', // Применяем шрифт SF Pro Regular
  },
  plusContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  plusIcon: {
    width: 11, // Задаем размер иконки плюсика
    height: 11,
  },
  alignedRight: {
    marginRight: 16, // Позиционирование плюсика на том же уровне, что и текст
  },
});
