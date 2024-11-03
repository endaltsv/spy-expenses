// src/hooks/useExpenses.ts
import { useState, useEffect } from 'react';
import { Expense } from '../models/Expense';
import {
  addExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
} from '../services/expensesService';

const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = () => {
    try {
      const loadedExpenses = getAllExpenses();
      setExpenses(loadedExpenses);
    } catch (err) {
      setError('Ошибка при загрузке трат.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addNewExpense = (expense: Omit<Expense, 'id'>) => {
    try {
      const id = addExpense(expense);
      const newExpense: Expense = { ...expense, id };
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    } catch (err) {
      setError('Ошибка при добавлении траты.');
    }
  };

  const updateExistingExpense = (
    id: string,
    updatedFields: Partial<Expense>,
  ) => {
    try {
      const success = updateExpense(id, updatedFields);
      if (success) {
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id === id ? { ...expense, ...updatedFields } : expense,
          ),
        );
      } else {
        setError('Трата не найдена.');
      }
    } catch (err) {
      setError('Ошибка при обновлении траты.');
    }
  };

  const deleteExistingExpense = (id: string) => {
    try {
      deleteExpense(id);
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id),
      );
    } catch (err) {
      setError('Ошибка при удалении траты.');
    }
  };

  return {
    expenses,
    loading,
    error,
    addNewExpense,
    updateExistingExpense,
    deleteExistingExpense,
    refetch: fetchExpenses,
  };
};

export default useExpenses;
