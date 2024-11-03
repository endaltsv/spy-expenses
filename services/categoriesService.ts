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
export const addCategory = (category: Omit<Category, 'id'>): string => {
  const id = generateUUID();
  const newCategory: Category = { ...category, id };

  // Сохранение самой категории
  storage.set(`category_${id}`, JSON.stringify(newCategory));

  // Обновление индекса категорий
  const currentIndexString = storage.getString(CATEGORIES_INDEX_KEY);
  const categoriesIndex: string[] = currentIndexString
    ? JSON.parse(currentIndexString)
    : [];
  categoriesIndex.push(id);
  storage.set(CATEGORIES_INDEX_KEY, JSON.stringify(categoriesIndex));

  return id;
};

/**
 * Ищет категорию по названию.
 * @param name Название категории.
 * @returns Объект категории или `null`, если не найдена.
 */
export const findCategoryByName = (name: string): Category | null => {
  const categories = getAllCategories();
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
export const getAllCategories = (): Category[] => {
  const currentIndexString = storage.getString(CATEGORIES_INDEX_KEY);
  const categoriesIndex: string[] = currentIndexString
    ? JSON.parse(currentIndexString)
    : [];
  const categories: Category[] = categoriesIndex
    .map((id) => {
      const categoryString = storage.getString(`category_${id}`);
      return categoryString ? JSON.parse(categoryString) : null;
    })
    .filter((category): category is Category => category !== null);

  return categories;
};

/**
 * Обновляет существующую категорию.
 * @param id ID категории.
 * @param updatedFields Обновленные поля.
 * @returns `true` если обновление прошло успешно, иначе `false`.
 */
export const updateCategory = (
  id: string,
  updatedFields: Partial<Category>,
): boolean => {
  const categoryString = storage.getString(`category_${id}`);
  if (categoryString) {
    const category: Category = JSON.parse(categoryString);
    const updatedCategory: Category = { ...category, ...updatedFields };
    storage.set(`category_${id}`, JSON.stringify(updatedCategory));
    return true;
  }
  return false;
};

/**
 * Удаляет существующую категорию.
 * @param id ID категории.
 */
export const deleteCategory = (id: string): void => {
  // Удаление самой категории
  storage.delete(`category_${id}`);

  // Обновление индекса категорий
  const currentIndexString = storage.getString(CATEGORIES_INDEX_KEY);
  let categoriesIndex: string[] = currentIndexString
    ? JSON.parse(currentIndexString)
    : [];
  categoriesIndex = categoriesIndex.filter((categoryId) => categoryId !== id);
  storage.set(CATEGORIES_INDEX_KEY, JSON.stringify(categoriesIndex));
};

export const clearAllCategories = (): void => {
  const categories = getAllCategories();
  categories.forEach((category) => {
    storage.delete(`category_${category.id}`);
  });
  storage.delete(CATEGORIES_INDEX_KEY);
};

export const initializeDefaultCategories = (): void => {
  const currentIndexString = storage.getString(CATEGORIES_INDEX_KEY);
  const categoriesIndex: string[] = currentIndexString
    ? JSON.parse(currentIndexString)
    : [];
  if (categoriesIndex.length === 0) {
    DEFAULT_CATEGORIES.forEach((category) => {
      addCategory(category);
    });
  }
};
