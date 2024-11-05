// src/components/RecentExpense/index.tsx
import React, { memo, useMemo, useCallback } from 'react';
import { useExpensesContext } from '@/context/ExpensesContext';
import ExpenseCard from '../cards/ExpenseCard';
import RecentExpenseText from '../texts/RecentExpenseLabel';
import { useCategoriesContext } from '@/context/CategoriesContext';

const RecentExpense = () => {
  const { getLastFourExpenses, deleteExpense } = useExpensesContext();
  const { findCategoryById } = useCategoriesContext();

  console.log('RecentExpense render.');

  const expenses = getLastFourExpenses;
  const expenseCards = useMemo(
    () =>
      expenses.map((expense) => {
        const category = findCategoryById(expense.categoryId);
        const expenseIcon = category ? category.icon : undefined;

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
