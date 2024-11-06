import MonthCategoryLabel from './MonthCategoryLabel';
import { ScrollView, StyleSheet, View } from 'react-native';
import MonthCategoryCard from '../cards/MonthCategoryCard';
import { useCategoriesContext } from '@/context/CategoriesContext';
import { memo } from 'react';
import { useStatisticsContext } from '@/context/StatisticsContext';

const cardWidth = 176;
const cardSpacing = 8;

function MonthCategory() {
  console.log('MonthCategory render.');
  const { getCategoryData } = useStatisticsContext();
  const categoryData = getCategoryData('monthly');

  return (
    <View>
      <View>
        <MonthCategoryLabel />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth + cardSpacing}
        decelerationRate="fast"
      >
        {categoryData.map((category, index) => (
          <View style={[styles.cardWrapper, { width: cardWidth }]} key={index}>
            <MonthCategoryCard
              categoryName={category.name}
              categoryTotalExpense={category.totalAmount}
              categoryTotalPurchase={category.totalPurchases}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
export default memo(MonthCategory);
const styles = StyleSheet.create({
  cardWrapper: {
    marginRight: cardSpacing,
  },
});
