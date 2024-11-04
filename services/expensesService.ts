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
export const addExpense = async (
  expense: Omit<Expense, 'id'>,
): Promise<string> => {
  const id = generateUUID();
  const newExpense: Expense = { ...expense, id };

  // Сохранение самой траты
  await storage.set(`expense_${id}`, JSON.stringify(newExpense));

  // Обновление индекса трат
  const currentIndexString = await storage.getString(EXPENSES_INDEX_KEY);
  const expensesIndex: string[] = currentIndexString
    ? JSON.parse(currentIndexString)
    : [];
  expensesIndex.push(id);
  await storage.set(EXPENSES_INDEX_KEY, JSON.stringify(expensesIndex));

  return id;
};

/**
 * Получает все траты.
 * @returns Массив трат.
 */
export const getAllExpenses = async (): Promise<Expense[]> => {
  const currentIndexString = await storage.getString(EXPENSES_INDEX_KEY);
  const expensesIndex: string[] = currentIndexString
    ? JSON.parse(currentIndexString)
    : [];
  const expenses: Expense[] = [];

  for (const id of expensesIndex) {
    const expenseString = await storage.getString(`expense_${id}`);
    if (expenseString) {
      const expense: Expense = JSON.parse(expenseString);
      expenses.push(expense);
    }
  }

  return expenses;
};

/**
 * Обновляет существующую трату.
 * @param id ID траты.
 * @param updatedFields Обновленные поля.
 * @returns `true` если обновление прошло успешно, иначе `false`.
 */
export const updateExpense = async (
  id: string,
  updatedFields: Partial<Expense>,
): Promise<boolean> => {
  const expenseString = await storage.getString(`expense_${id}`);
  if (expenseString) {
    const expense: Expense = JSON.parse(expenseString);
    const updatedExpense: Expense = { ...expense, ...updatedFields };
    await storage.set(`expense_${id}`, JSON.stringify(updatedExpense));
    return true;
  }
  return false;
};

/**
 * Удаляет существующую трату.
 * @param id ID траты.
 */
export const deleteExpense = async (id: string): Promise<void> => {
  // Удаление самой траты
  await storage.delete(`expense_${id}`);

  // Обновление индекса трат
  const currentIndexString = await storage.getString(EXPENSES_INDEX_KEY);
  let expensesIndex: string[] = currentIndexString
    ? JSON.parse(currentIndexString)
    : [];
  expensesIndex = expensesIndex.filter((expenseId) => expenseId !== id);
  await storage.set(EXPENSES_INDEX_KEY, JSON.stringify(expensesIndex));
};
