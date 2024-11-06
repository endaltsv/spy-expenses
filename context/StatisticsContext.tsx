// src/context/StatisticsContext.tsx
import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import moment from 'moment';
import { useCategoriesContext } from './CategoriesContext';
import { useExpensesContext } from './ExpensesContext';
import { Category } from '../models/Category';
import { Expense } from '../models/Expense';

interface CategoryData {
  id: string;
  name: string;
  totalAmount: number;
  totalPurchases: number;
}

type TimePeriod = 'all' | 'monthly' | 'yearly';

interface StatisticsContextProps {
  getCategoryData: (period: TimePeriod) => CategoryData[];
}

const StatisticsContext = createContext<StatisticsContextProps | undefined>(
  undefined,
);

export const StatisticsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { categories } = useCategoriesContext();
  const { expenses } = useExpensesContext();

  const getCategoryData = useMemo(
    () =>
      (period: TimePeriod): CategoryData[] => {
        const filterExpensesByPeriod = (): Expense[] => {
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
      },
    [categories, expenses],
  );

  const contextValue = useMemo(
    () => ({
      getCategoryData,
    }),
    [getCategoryData],
  );

  return (
    <StatisticsContext.Provider value={contextValue}>
      {children}
    </StatisticsContext.Provider>
  );
};

export const useStatisticsContext = (): StatisticsContextProps => {
  const context = useContext(StatisticsContext);
  if (!context) {
    throw new Error(
      'useStatisticsContext must be used within a StatisticsProvider',
    );
  }
  return context;
};
