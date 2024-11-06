// src/context/CategoriesContext.tsx
import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { useCategories } from '../hooks/useCategories';
import { Category } from '../models/Category';
import { UserSettings } from '../models/UserSettings';

interface CategoriesContextProps {
  categories: Category[];
  loading: boolean;
  error: string | null;
  addNewCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateExistingCategory: (
    id: string,
    updatedFields: Partial<Category>,
  ) => Promise<void>;
  deleteExistingCategory: (id: string) => Promise<void>;
  refetch: () => void;
  findCategoryById: (id: string) => Category | undefined;

  // Settings
  settings: UserSettings;
  settingsLoading: boolean;
  settingsError: string | null;
  updateSettings: (updatedSettings: Partial<UserSettings>) => Promise<void>;
}

const CategoriesContext = createContext<CategoriesContextProps | undefined>(
  undefined,
);

export const CategoriesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    categories,
    isLoading: loading,
    isError,
    addNewCategory,
    updateExistingCategory,
    deleteExistingCategory,
    refetch,
    findCategoryById,
  } = useCategories();

  const contextValue = useMemo(
    () => ({
      categories,
      loading,
      error: isError ? 'Ошибка при загрузке категорий.' : null,
      addNewCategory,
      updateExistingCategory,
      deleteExistingCategory,
      refetch,
      findCategoryById,
    }),
    [
      categories,
      loading,
      isError,
      addNewCategory,
      updateExistingCategory,
      deleteExistingCategory,
      refetch,
      findCategoryById,
    ],
  );

  return (
    <CategoriesContext.Provider value={contextValue}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategoriesContext = (): CategoriesContextProps => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error(
      'useCategoriesContext must be used within a CategoriesProvider',
    );
  }
  return context;
};
