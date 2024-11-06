// src/hooks/useCategories.ts
import { useState, useEffect, useCallback } from 'react';
import { Category } from '../models/Category';
import {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  initializeDefaultCategories,
} from '../services/categoriesService';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      let loadedCategories = await getAllCategories();
      if (loadedCategories.length === 0) {
        await initializeDefaultCategories();
        loadedCategories = await getAllCategories();
      }
      setCategories(loadedCategories);
    } catch (err: any) {
      console.error('Ошибка при загрузке категорий:', err);
      setError('Ошибка при загрузке категорий.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const addNewCategory = useCallback(async (category: Omit<Category, 'id'>) => {
    try {
      const id = await addCategory(category);
      const newCategory: Category = { ...category, id };
      setCategories((prevCategories) => [...prevCategories, newCategory]);
    } catch (err: any) {
      console.error('Ошибка при добавлении категории:', err);
      setError('Ошибка при добавлении категории.');
    }
  }, []);

  const updateExistingCategory = useCallback(
    async (id: string, updatedFields: Partial<Category>) => {
      try {
        const success = await updateCategory(id, updatedFields);
        if (success) {
          setCategories((prevCategories) =>
            prevCategories.map((category) =>
              category.id === id ? { ...category, ...updatedFields } : category,
            ),
          );
        } else {
          setError('Категория не найдена.');
        }
      } catch (err: any) {
        console.error('Ошибка при обновлении категории:', err);
        setError('Ошибка при обновлении категории.');
      }
    },
    [],
  );

  const deleteExistingCategory = useCallback(async (id: string) => {
    try {
      await deleteCategory(id);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id),
      );
    } catch (err: any) {
      console.error('Ошибка при удалении категории:', err);
      setError('Ошибка при удалении категории.');
    }
  }, []);

  const findCategoryById = useCallback(
    (id: string): Category | undefined => {
      return categories.find((category) => category.id === id);
    },
    [categories],
  );

  const refetch = useCallback(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    isLoading: loading,
    isError: error !== null,
    addNewCategory,
    updateExistingCategory,
    deleteExistingCategory,
    refetch,
    findCategoryById,
  };
};
