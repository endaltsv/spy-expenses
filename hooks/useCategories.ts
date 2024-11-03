// src/hooks/useCategories.ts
import { useState, useEffect } from 'react';
import { Category } from '@/models/Category';
import {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  clearAllCategories,
  initializeDefaultCategories,
} from '@/services/categoriesService';

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = () => {
    setLoading(true);
    try {
      let loadedCategories = getAllCategories();
      if (loadedCategories.length === 0) {
        initializeDefaultCategories();
        loadedCategories = getAllCategories();
      }
      setCategories(loadedCategories);
    } catch (err: any) {
      console.error('Ошибка при загрузке категорий:', err);
      setError('Ошибка при загрузке категорий.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addNewCategory = async (category: Omit<Category, 'id'>) => {
    try {
      const id = await addCategory(category);
      const newCategory: Category = { ...category, id };
      setCategories((prevCategories) => [...prevCategories, newCategory]);
    } catch (err: any) {
      console.error('Ошибка при добавлении категории:', err);
      setError('Ошибка при добавлении категории.');
    }
  };

  const updateExistingCategory = async (
    id: string,
    updatedFields: Partial<Category>,
  ) => {
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
  };

  const deleteExistingCategory = async (id: string) => {
    try {
      await deleteCategory(id);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id),
      );
    } catch (err: any) {
      console.error('Ошибка при удалении категории:', err);
      setError('Ошибка при удалении категории.');
    }
  };

  return {
    categories,
    loading,
    error,
    addNewCategory,
    updateExistingCategory,
    deleteExistingCategory,
    refetch: fetchCategories,
  };
};

export default useCategories;
