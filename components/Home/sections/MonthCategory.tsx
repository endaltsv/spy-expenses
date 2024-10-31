import MonthCategoryText from '../MonthCategoryText';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import MonthCategoryCard from '../MonthCategoryCard';

const { width } = Dimensions.get('window');
const cardWidth = 176;
const cardSpacing = 8;

export default function MonthCategory() {
  const categories = [
    { name: 'Развлечения', totalExpense: 10000, totalPurchase: 143 },
    { name: 'Продукты', totalExpense: 5000, totalPurchase: 53 },
    { name: 'Транспорт', totalExpense: 3000, totalPurchase: 30 },
    { name: 'Одежда', totalExpense: 4000, totalPurchase: 45 },
  ];

  return (
    <View>
      <View>
        <MonthCategoryText />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth + cardSpacing} // Соответствует ширине карточки + отступ
        decelerationRate="fast"
      >
        {categories.map((category, index) => (
          <View style={[styles.cardWrapper, { width: cardWidth }]} key={index}>
            <MonthCategoryCard
              categoryName={category.name}
              categoryTotalExpense={category.totalExpense}
              categoryTotalPurchase={category.totalPurchase}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginRight: cardSpacing,
  },
});
