// src/context/ExpensesContext.tsx
import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import { useExpenses } from '../hooks/useExpenses';
import { Expense } from '../models/Expense';
import formattingNumber from '../utils/formattingNumber';
import { findCategoryByName } from '../services/categoriesService';

interface ExpensesContextProps {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
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
  const {
    expenses,
    isLoading,
    isError,
    addNewExpense,
    deleteExistingExpense,
    refetch,
  } = useExpenses();

  const computeTotalExpenses = useMemo(() => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    return formattingNumber(total);
  }, [expenses]);

  const getLastFourExpenses = useMemo(() => {
    return [...expenses]
      .sort(
        (a, b) =>
          new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime(),
      )
      .slice(0, 4);
  }, [expenses]);

  const getCategoryIdByName = useCallback((name: string): string | null => {
    // Поскольку findCategoryByName теперь асинхронная, изменим логику
    // Для синхронного доступа используйте уже загруженные категории из контекста
    // Здесь предполагается, что категории уже загружены и доступны
    // Если нет, необходимо изменить этот подход
    return null; // Реализуйте соответствующим образом
  }, []);

  const contextValue = useMemo(
    () => ({
      expenses,
      addExpense: addNewExpense,
      deleteExpense: deleteExistingExpense,
      getLastFourExpenses,
      getCategoryIdByName,
      computeTotalExpenses,
    }),
    [
      expenses,
      addNewExpense,
      deleteExistingExpense,
      getLastFourExpenses,
      computeTotalExpenses,
    ],
  );

  return (
    <ExpensesContext.Provider value={contextValue}>
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
