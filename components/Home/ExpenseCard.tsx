import formattingNumber from '@/utils/FormattingNumber';
import { View, Text, StyleSheet, Image } from 'react-native';

interface ExpenseCardProps {
  expenseName: string;
  expenseAmount: number;
  expenseDate: string;
}

export default function ExpenseCard({
  expenseName,
  expenseAmount,
  expenseDate,
}: ExpenseCardProps) {
  const formattedAmount = formattingNumber(expenseAmount);
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Image
          source={require('../../assets/images/circle.png')}
          style={styles.icon}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.expenseName}>{expenseName}</Text>
        <Text style={styles.expenseDate}>{expenseDate}</Text>
      </View>
      <View>
        <Text style={styles.expenseAmount}>- ₽{formattedAmount}</Text>
      </View>
    </View>
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
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginRight: 12,
  },
  icon: {
    width: 44,
    height: 44,
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
