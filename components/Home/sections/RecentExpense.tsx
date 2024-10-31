import ExpenseCard from '../ExpenseCard';
import RecentExpenseText from '../RecentExpenseText';

export default function RecentExpense() {
  const expenseName = 'Самокат';
  const expenseAmount = 1500.4;
  const expenseDate = '22 Окт, 15:54';

  return (
    <>
      <RecentExpenseText />
      <ExpenseCard
        expenseName={expenseName}
        expenseAmount={expenseAmount}
        expenseDate={expenseDate}
      />
      <ExpenseCard
        expenseName={expenseName}
        expenseAmount={expenseAmount}
        expenseDate={expenseDate}
      />
      <ExpenseCard
        expenseName={expenseName}
        expenseAmount={expenseAmount}
        expenseDate={expenseDate}
      />
      <ExpenseCard
        expenseName={expenseName}
        expenseAmount={expenseAmount}
        expenseDate={expenseDate}
      />
    </>
  );
}
