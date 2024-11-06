// src/context/ExpensesContext.tsx
import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import { Expense } from '../models/Expense';
import useExpenses from '../hooks/useExpenses';
import formattingNumber from '@/utils/formattingNumber';
import { findCategoryByName } from '@/services/categoriesService';

interface ExpensesContextProps {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  getLastFourExpenses: Expense[];
  getCategoryIdByName: (name: string) => string | null;
  computeTotalExpenses: string;
}

const ExpensesContext = createContext<ExpensesContextProps | undefined>(
  undefined,
);

export const ExpensesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  console.log('ExpensesProvider render.');

  const { expenses, addNewExpense, deleteExistingExpense } = useExpenses();

  // Функция для вычисления общей суммы расходов
  const computeTotalExpenses = useMemo(() => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    return formattingNumber(total);
  }, [expenses]);

  const getLastFourExpenses = useMemo(() => {
    return expenses
      .slice()
      .sort(
        (a, b) =>
          new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime(),
      )
      .slice(0, 4);
  }, [expenses]);

  const getCategoryIdByName = useCallback((name: string): string | null => {
    const category = findCategoryByName(name);
    return category ? category.id : null;
  }, []);

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        getLastFourExpenses,
        addExpense: addNewExpense,
        deleteExpense: deleteExistingExpense,
        getCategoryIdByName,
        computeTotalExpenses,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpensesContext = (): ExpensesContextProps => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error(
      'useExpensesContext must be used within an ExpensesProvider',
    );
  }
  return context;
};
