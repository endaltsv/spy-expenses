import { View, Text, StyleSheet, Image } from 'react-native';

interface MonthCategoryCardProps {
  categoryName: string;
  categoryTotalExpense: number;
  categoryTotalPurchase: number;
}

export default function MonthCategoryCard({
  categoryName,
  categoryTotalExpense,
  categoryTotalPurchase,
}: MonthCategoryCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Image
          source={require('../../assets/images/circle.png')}
          style={styles.icon}
        />
      </View>
      <Text style={styles.categoryName}>{categoryName}</Text>
      <Text style={styles.categoryTotalExpense}>
        ₽ {categoryTotalExpense.toFixed(2)}
      </Text>
      <Text style={styles.categoryTotalPurchase}>
        {categoryTotalPurchase} покупок
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#ededed', // светло-серый фон для карточки
    borderRadius: 16,
  },
  iconContainer: {
    width: 44,
    height: 44,
    backgroundColor: '#ffffff', // фон для иконки
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 44,
    height: 44,
  },
  categoryName: {
    fontFamily: 'SFPro-Medium',
    fontSize: 16,
    lineHeight: 20,
    color: '#6f6f6f',
    marginBottom: 26,
  },
  categoryTotalExpense: {
    fontSize: 18,
    lineHeight: 20,
    fontFamily: 'SFPro-Bold',
    color: '#000',
    marginBottom: 2,
  },
  categoryTotalPurchase: {
    fontSize: 14,
    lineHeight: 16,
    color: '#6f6f6f',
    fontFamily: 'SFPro-Regular',
  },
});
