// src/models/Category.ts

export interface Category {
  id: string; // Уникальный идентификатор (UUID)
  name: string; // Название категории
  color?: string; // Цвет категории (опционально)
  icon?: string; // Иконка категории (например, имя иконки из библиотеки)
}
