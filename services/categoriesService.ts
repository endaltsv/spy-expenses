// src/services/categoriesService.ts
import storage from './storage';
import { Category } from '../models/Category';
import { generateUUID } from '../utils/uuid';
import { DEFAULT_CATEGORIES } from '@/constants/defaultCategories';

const CATEGORIES_INDEX_KEY = 'categories_index';

/**
 * Добавляет новую категорию.
 * @param category Данные категории без ID.
 * @returns ID новой категории.
 */
export const addCategory = async (
  category: Omit<Category, 'id'>,
): Promise<string> => {
  const id = generateUUID();
  const newCategory: Category = { ...category, id };

  // Сохранение самой категории
  await storage.set(`category_${id}`, JSON.stringify(newCategory));

  // Обновление индекса категорий
  const currentIndexString = await storage.getString(CATEGORIES_INDEX_KEY);
  const categoriesIndex: string[] = currentIndexString
    ? JSON.parse(currentIndexString)
    : [];
  categoriesIndex.push(id);
  await storage.set(CATEGORIES_INDEX_KEY, JSON.stringify(categoriesIndex));

  return id;
};

/**
 * Ищет категорию по названию.
 * @param name Название категории.
 * @returns Объект категории или `null`, если не найдена.
 */
export const findCategoryByName = async (
  name: string,
): Promise<Category | null> => {
  const categories = await getAllCategories();
  const normalizedName = name.trim().toLowerCase();
  const category = categories.find(
    (cat) => cat.name.trim().toLowerCase() === normalizedName,
  );
  return category || null;
};

/**
 * Получает все категории.
 * @returns Массив категорий.
 */
export const getAllCategories = async (): Promise<Category[]> => {
  const currentIndexString = await storage.getString(CATEGORIES_INDEX_KEY);
  const categoriesIndex: string[] = currentIndexString
    ? JSON.parse(currentIndexString)
    : [];
  const categories: Category[] = [];

  for (const id of categoriesIndex) {
    const categoryString = await storage.getString(`category_${id}`);
    if (categoryString) {
      const category: Category = JSON.parse(categoryString);
      categories.push(category);
    }
  }

  return categories;
};

/**
 * Обновляет существующую категорию.
 * @param id ID категории.
 * @param updatedFields Обновленные поля.
 * @returns `true` если обновление прошло успешно, иначе `false`.
 */
export const updateCategory = async (
  id: string,
  updatedFields: Partial<Category>,
): Promise<boolean> => {
  const categoryString = await storage.getString(`category_${id}`);
  if (categoryString) {
    const category: Category = JSON.parse(categoryString);
    const updatedCategory: Category = { ...category, ...updatedFields };
    await storage.set(`category_${id}`, JSON.stringify(updatedCategory));
    return true;
  }
  return false;
};

/**
 * Удаляет существующую категорию.
 * @param id ID категории.
 */
export const deleteCategory = async (id: string): Promise<void> => {
  // Удаление самой категории
  await storage.delete(`category_${id}`);

  // Обновление индекса категорий
  const currentIndexString = await storage.getString(CATEGORIES_INDEX_KEY);
  let categoriesIndex: string[] = currentIndexString
    ? JSON.parse(currentIndexString)
    : [];
  categoriesIndex = categoriesIndex.filter((categoryId) => categoryId !== id);
  await storage.set(CATEGORIES_INDEX_KEY, JSON.stringify(categoriesIndex));
};

export const clearAllCategories = async (): Promise<void> => {
  const categories = await getAllCategories();
  for (const category of categories) {
    await storage.delete(`category_${category.id}`);
  }
  await storage.delete(CATEGORIES_INDEX_KEY);
};

export const initializeDefaultCategories = async (): Promise<void> => {
  const currentIndexString = await storage.getString(CATEGORIES_INDEX_KEY);
  const categoriesIndex: string[] = currentIndexString
    ? JSON.parse(currentIndexString)
    : [];
  if (categoriesIndex.length === 0) {
    for (const category of DEFAULT_CATEGORIES) {
      await addCategory(category);
    }
  }
};
