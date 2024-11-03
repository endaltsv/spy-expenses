// src/services/expensesService.ts
import storage from './storage';
import { Expense } from '../models/Expense';
import { generateUUID } from '../utils/uuid';

const EXPENSES_INDEX_KEY = 'expenses_index';

/**
 * Добавляет новую трату.
 * @param expense Данные траты без ID.
 * @returns ID новой траты.
 */
export const addExpense = (expense: Omit<Expense, 'id'>): string => {
  const id = generateUUID();
  const newExpense: Expense = { ...expense, id };

  // Сохранение самой траты
  storage.set(`expense_${id}`, JSON.stringify(newExpense));

  // Обновление индекса трат
  const currentIndexString = storage.getString(EXPENSES_INDEX_KEY);
  const expensesIndex: string[] = currentIndexString
    ? JSON.parse(currentIndexString)
    : [];
  expensesIndex.push(id);
  storage.set(EXPENSES_INDEX_KEY, JSON.stringify(expensesIndex));

  return id;
};

/**
 * Получает все траты.
 * @returns Массив трат.
 */
export const getAllExpenses = (): Expense[] => {
  const currentIndexString = storage.getString(EXPENSES_INDEX_KEY);
  const expensesIndex: string[] = currentIndexString
    ? JSON.parse(currentIndexString)
    : [];
  const expenses: Expense[] = expensesIndex
    .map((id) => {
      const expenseString = storage.getString(`expense_${id}`);
      return expenseString ? JSON.parse(expenseString) : null;
    })
    .filter((expense): expense is Expense => expense !== null);

  return expenses;
};

/**
 * Обновляет существующую трату.
 * @param id ID траты.
 * @param updatedFields Обновленные поля.
 * @returns `true` если обновление прошло успешно, иначе `false`.
 */
export const updateExpense = (
  id: string,
  updatedFields: Partial<Expense>,
): boolean => {
  const expenseString = storage.getString(`expense_${id}`);
  if (expenseString) {
    const expense: Expense = JSON.parse(expenseString);
    const updatedExpense: Expense = { ...expense, ...updatedFields };
    storage.set(`expense_${id}`, JSON.stringify(updatedExpense));
    return true;
  }
  return false;
};

/**
 * Удаляет существующую трату.
 * @param id ID траты.
 */
export const deleteExpense = (id: string): void => {
  // Удаление самой траты
  storage.delete(`expense_${id}`);

  // Обновление индекса трат
  const currentIndexString = storage.getString(EXPENSES_INDEX_KEY);
  let expensesIndex: string[] = currentIndexString
    ? JSON.parse(currentIndexString)
    : [];
  expensesIndex = expensesIndex.filter((expenseId) => expenseId !== id);
  storage.set(EXPENSES_INDEX_KEY, JSON.stringify(expensesIndex));
};
