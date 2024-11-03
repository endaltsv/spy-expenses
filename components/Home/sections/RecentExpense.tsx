// src/components/RecentExpense/index.tsx
import { useExpensesContext } from '@/context/ExpensesContext';
import ExpenseCard from '../ExpenseCard';
import RecentExpenseText from '../RecentExpenseText';
import { useCategoriesContext } from '@/context/CategoriesContext';

export default function RecentExpense() {
  const { getLastFourExpenses, deleteExpense } = useExpensesContext();
  const { findCategoryById } = useCategoriesContext();
  const expenses = getLastFourExpenses();
  console.log('EXPENSES=', expenses);

  return (
    <>
      <RecentExpenseText />
      {expenses.map((expense) => {
        const category = findCategoryById(expense.categoryId);
        const expenseIcon = category ? category.icon : undefined;
        const expenseCategoryName = category ? category.name : 'Без категории';
        console.log(expense.categoryId, category, expenseIcon);
        return (
          <ExpenseCard
            key={expense.id}
            expenseName={expense.name}
            expenseAmount={expense.amount}
            expenseDate={expense.dateTime}
            expenseCategory={expenseCategoryName}
            expenseIcon={expenseIcon}
            onDelete={() => deleteExpense(expense.id)} // Передаем функцию удаления
          />
        );
      })}
    </>
  );
}
