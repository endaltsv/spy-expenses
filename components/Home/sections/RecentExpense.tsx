// src/components/RecentExpense/index.tsx
import React, { memo, useMemo, useCallback } from 'react';
import { useExpensesContext } from '@/context/ExpensesContext';
import ExpenseCard from '../ExpenseCard';
import RecentExpenseText from '../RecentExpenseText';
import { useCategoriesContext } from '@/context/CategoriesContext';

const RecentExpense = () => {
  const { getLastFourExpenses, deleteExpense } = useExpensesContext();
  const { findCategoryById } = useCategoriesContext();

  console.log('RecentExpense render.');

  // Memoize the expenses data
  const expenses = useMemo(() => getLastFourExpenses(), [getLastFourExpenses]);

  // Memoize the render of ExpenseCards
  const expenseCards = useMemo(
    () =>
      expenses.map((expense) => {
        const category = findCategoryById(expense.categoryId);
        const expenseIcon = category ? category.icon : undefined;
        const expenseCategoryName = category ? category.name : 'Без категории';

        // Memoize the delete handler
        const handleDelete = () => {
          deleteExpense(expense.id);
        };

        return (
          <ExpenseCard
            key={expense.id}
            expenseName={expense.name}
            expenseAmount={expense.amount}
            expenseDate={expense.dateTime}
            expenseCategory={expenseCategoryName}
            expenseIcon={expenseIcon}
            onDelete={handleDelete}
          />
        );
      }),
    [expenses, findCategoryById, deleteExpense],
  );

  return (
    <>
      <RecentExpenseText />
      {expenseCards}
    </>
  );
};

// Export the memoized component
export default memo(RecentExpense);
