// src/context/CategoriesProvider.tsx (если вы используете отдельный провайдер)
import React, { createContext, useContext, ReactNode } from 'react';
import useCategories from '@/hooks/useCategories';
import { Category } from '@/models/Category';

interface CategoriesContextProps {
  categories: Category[];
  loading: boolean;
  error: string | null;
  addNewCategory: (category: Omit<Category, 'id'>) => void;
  updateExistingCategory: (
    id: string,
    updatedFields: Partial<Category>,
  ) => void;
  deleteExistingCategory: (id: string) => void;
  refetch: () => void;
  findCategoryById: (id: string) => Category | undefined;
}

const CategoriesContext = createContext<CategoriesContextProps | undefined>(
  undefined,
);

export const CategoriesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  console.log('CategoriesProvider render.');

  const {
    categories,
    loading,
    error,
    addNewCategory,
    updateExistingCategory,
    deleteExistingCategory,
    refetch,
  } = useCategories();

  const findCategoryById = (id: string): Category | undefined => {
    return categories.find((category) => category.id === id);
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        loading,
        error,
        addNewCategory,
        updateExistingCategory,
        deleteExistingCategory,
        refetch,
        findCategoryById,
      }}
    >
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
