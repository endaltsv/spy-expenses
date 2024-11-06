import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import Modal from 'react-native-modal';
import Handle from './shared/Handle';
import { useCategoriesContext } from '@/context/CategoriesContext';
import Header from '../ui/Header';
import { useExpensesContext } from '@/context/ExpensesContext';
import MonthCategoryCard from '../cards/MonthCategoryCard';
import moment from 'moment';
import NewCategoryCard from '../cards/NewCategoryCard';

interface ExpenseModalProps {
  visible: boolean;
  onClose: () => void;
}

const AllCategoriesModal = ({ visible, onClose }: ExpenseModalProps) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const { categories } = useCategoriesContext();
  const { expenses } = useExpensesContext();

  const currentMonth = moment().month();
  const currentYear = moment().year();

  const categoryData = useMemo(() => {
    const currentMonthExpenses = expenses.filter((expense) => {
      const expenseDate = moment(expense.dateTime);
      return (
        expenseDate.month() === currentMonth &&
        expenseDate.year() === currentYear
      );
    });

    return categories
      .map((category) => {
        const categoryExpenses = currentMonthExpenses.filter(
          (expense) => expense.categoryId === category.id,
        );

        return {
          ...category,
          totalAmount: categoryExpenses.reduce(
            (sum, expense) => sum + expense.amount,
            0,
          ),
          totalPurchases: categoryExpenses.length,
        };
      })
      .sort((a, b) => b.totalAmount - a.totalAmount);
  }, [categories, expenses, currentMonth, currentYear]);

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 64) / 2; // 72 = (24 padding left + 24 padding right + 16 межкарточный отступ)

  return (
    <Modal
      isVisible={visible}
      style={styles.modalContainer}
      swipeDirection="down"
      onSwipeComplete={onClose}
      swipeThreshold={150}
    >
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Handle />
          <View>
            <Header title="Категории" size={3} />
          </View>
          <View>
            <FlatList
              data={categoryData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <View style={[{ width: cardWidth }]}>
                    <MonthCategoryCard
                      categoryName={item.name}
                      categoryTotalExpense={item.totalAmount}
                      categoryTotalPurchase={item.totalPurchases}
                    />
                  </View>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
              ListFooterComponent={
                <TouchableOpacity>
                  <NewCategoryCard />
                </TouchableOpacity>
              }
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AllCategoriesModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: '95%',
    paddingTop: 54,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
