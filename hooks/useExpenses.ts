// src/hooks/useExpenses.ts
import { useState, useEffect, useCallback } from 'react';
import { Expense } from '../models/Expense';
import {
  addExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
} from '../services/expensesService';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const loadedExpenses = await getAllExpenses();
      setExpenses(loadedExpenses);
    } catch (err: any) {
      console.error('Ошибка при загрузке трат:', err);
      setError('Ошибка при загрузке трат.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const addNewExpense = useCallback(async (expense: Omit<Expense, 'id'>) => {
    try {
      const id = await addExpense(expense);
      const newExpense: Expense = { ...expense, id };
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    } catch (err: any) {
      console.error('Ошибка при добавлении траты:', err);
      setError('Ошибка при добавлении траты.');
    }
  }, []);

  const deleteExistingExpense = useCallback(async (id: string) => {
    try {
      await deleteExpense(id);
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id),
      );
    } catch (err: any) {
      console.error('Ошибка при удалении траты:', err);
      setError('Ошибка при удалении траты.');
    }
  }, []);

  const updateExistingExpense = useCallback(
    async (id: string, updatedFields: Partial<Expense>) => {
      try {
        const success = await updateExpense(id, updatedFields);
        if (success) {
          setExpenses((prevExpenses) =>
            prevExpenses.map((expense) =>
              expense.id === id ? { ...expense, ...updatedFields } : expense,
            ),
          );
        } else {
          setError('Трата не найдена.');
        }
      } catch (err: any) {
        console.error('Ошибка при обновлении траты:', err);
        setError('Ошибка при обновлении траты.');
      }
    },
    [],
  );

  const refetch = useCallback(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return {
    expenses,
    isLoading: loading,
    isError: error !== null,
    addNewExpense,
    deleteExistingExpense,
    updateExistingExpense,
    refetch,
  };
};
