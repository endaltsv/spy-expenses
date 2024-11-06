// CategoryStatisticsContext.tsx

import React, { createContext, useContext, useMemo } from 'react';
import { useCategoriesContext } from '@/context/CategoriesContext';
import { useExpensesContext } from '@/context/ExpensesContext';
import moment from 'moment';

interface CategoryData {
  id: number;
  name: string;
  totalAmount: number;
  totalPurchases: number;
}

type TimePeriod = 'all' | 'monthly' | 'yearly';

interface CategoryStatisticsContextProps {
  getCategoryData: (period: TimePeriod) => CategoryData[];
}

const CategoryStatisticsContext = createContext<
  CategoryStatisticsContextProps | undefined
>(undefined);

export const CategoryStatisticsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  console.log('CategoryStatisticsProvider render.');
  const { categories } = useCategoriesContext();
  const { expenses } = useExpensesContext();

  const getCategoryData = (period: TimePeriod): CategoryData[] => {
    const filterExpensesByPeriod = () => {
      switch (period) {
        case 'monthly': {
          const currentMonth = moment().month();
          const currentYear = moment().year();
          return expenses.filter((expense) => {
            const expenseDate = moment(expense.dateTime);
            return (
              expenseDate.month() === currentMonth &&
              expenseDate.year() === currentYear
            );
          });
        }
        case 'yearly': {
          const currentYear = moment().year();
          return expenses.filter(
            (expense) => moment(expense.dateTime).year() === currentYear,
          );
        }
        case 'all':
        default:
          return expenses;
      }
    };

    const filteredExpenses = filterExpensesByPeriod();

    return categories
      .map((category) => {
        const categoryExpenses = filteredExpenses.filter(
          (expense) => expense.categoryId === category.id,
        );

        return {
          id: category.id,
          name: category.name,
          totalAmount: categoryExpenses.reduce(
            (sum, expense) => sum + expense.amount,
            0,
          ),
          totalPurchases: categoryExpenses.length,
        };
      })
      .sort((a, b) => b.totalAmount - a.totalAmount);
  };

  return (
    <CategoryStatisticsContext.Provider value={{ getCategoryData }}>
      {children}
    </CategoryStatisticsContext.Provider>
  );
};

export const useCategoryStatistics = () => {
  const context = useContext(CategoryStatisticsContext);
  if (context === undefined) {
    throw new Error(
      'useCategoryStatistics must be used within a CategoryStatisticsProvider',
    );
  }
  return context;
};
