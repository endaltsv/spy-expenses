// src/models/Expense.ts

export interface Expense {
  id: string; // Уникальный идентификатор (UUID)
  name: string; // Название траты
  amount: number; // Сумма
  dateTime: string; // Дата и время (ISO строка)
  categoryId: string; // ID категории
  comment?: string; // Комментарий (необязательный)
}
