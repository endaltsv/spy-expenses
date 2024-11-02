import ExpenseCard from '../ExpenseCard';
import RecentExpenseText from '../RecentExpenseText';
import { useState } from 'react';

export default function RecentExpense() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      name: 'Яндекс лавка',
      amount: 1500.4,
      date: '22 Окт, 15:54',
      category: 'food',
    },
    {
      id: 2,
      name: 'Автобус',
      amount: 64,
      date: '23 Окт, 18:30',
      category: 'transport',
    },
    {
      id: 3,
      name: 'ZARA',
      amount: 4999,
      date: '24 Окт, 18:30',
      category: 'shopping',
    },
    {
      id: 4,
      name: 'Бургер Кинг',
      amount: 4999,
      date: '24 Окт, 18:30',
      category: 'food',
    },
  ]);

  // Функция для удаления элемента из массива
  const handleDelete = (id: number) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id),
    );
  };

  return (
    <>
      <RecentExpenseText />
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense.id}
          expenseName={expense.name}
          expenseAmount={expense.amount}
          expenseDate={expense.date}
          expenseCategory={expense.category}
          onDelete={() => handleDelete(expense.id)} // Передаем onDelete в каждый ExpenseCard
        />
      ))}
    </>
  );
}
