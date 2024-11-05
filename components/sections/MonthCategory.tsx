import MonthCategoryText from '../texts/MonthCategoryLabel';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import MonthCategoryCard from '../cards/MonthCategoryCard';
import { useCategoriesContext } from '@/context/CategoriesContext';
import { useExpensesContext } from '@/context/ExpensesContext';
import moment from 'moment';
import { useMemo } from 'react';

const { width } = Dimensions.get('window');
const cardWidth = 176;
const cardSpacing = 8;

export default function MonthCategory() {
  const { categories } = useCategoriesContext();
  const { expenses } = useExpensesContext();

  // Get current month and year
  const currentMonth = moment().month();
  const currentYear = moment().year();

  // Filter expenses for the current month
  const currentMonthExpenses = expenses.filter((expense) => {
    const expenseDate = moment(expense.dateTime);
    return (
      expenseDate.month() === currentMonth && expenseDate.year() === currentYear
    );
  });

  // Memoize the category data calculation with sorting
  const categoryData = useMemo(() => {
    return (
      categories
        .map((category) => {
          const categoryExpenses = currentMonthExpenses.filter(
            (expense) => expense.categoryId === category.id,
          );

          const totalAmount = categoryExpenses.reduce(
            (sum, expense) => sum + expense.amount,
            0,
          );

          const totalPurchases = categoryExpenses.length;

          return {
            ...category,
            totalAmount,
            totalPurchases,
          };
        })
        // Sort categories by totalAmount in descending order
        .sort((a, b) => b.totalAmount - a.totalAmount)
    );
  }, [categories, currentMonthExpenses]);

  console.log('MonthCategory render.', categoryData);
  return (
    <View>
      <View>
        <MonthCategoryText />
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

const styles = StyleSheet.create({
  cardWrapper: {
    marginRight: cardSpacing,
  },
});
