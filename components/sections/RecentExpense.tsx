import { memo, useCallback } from 'react';
import { useExpensesContext } from '@/context/ExpensesContext';
import { useCategoriesContext } from '@/context/CategoriesContext';
import ExpenseAnimationCard from '../cards/ExpenseAnimationCard';
import RecentExpenseText from './RecentExpenseLabel';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RecentExpense = () => {
  console.log('RecentExpense render.');

  const { getLastFourExpenses, deleteExpense } = useExpensesContext();
  const { findCategoryById } = useCategoriesContext();

  const handleDelete = useCallback(
    (expenseId: string) => {
      deleteExpense(expenseId);
    },
    [deleteExpense],
  );

  const expenseCards = getLastFourExpenses.map((expense) => {
    const category = findCategoryById(expense.categoryId);
    const expenseIcon = category ? category.icon : undefined;

    return (
      <TouchableOpacity
        key={expense.id}
        onPress={() => console.log(expense.id)}
      >
        <ExpenseAnimationCard
          expenseName={expense.name}
          expenseAmount={expense.amount}
          expenseDate={expense.dateTime}
          expenseIcon={expenseIcon}
          onDelete={() => handleDelete(expense.id)}
        />
      </TouchableOpacity>
    );
  });

  return (
    <>
      <RecentExpenseText />
      {expenseCards}
    </>
  );
};

export default memo(RecentExpense);
