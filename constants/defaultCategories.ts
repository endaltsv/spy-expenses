// src/constants/defaultCategories.ts
import { Category } from '../models/Category';

export const DEFAULT_CATEGORIES: Omit<Category, 'id'>[] = [
  {
    name: 'Еда',
    icon: 'food', // Название иконки из MaterialCommunityIcons
    color: '#FF6347',
  },
  {
    name: 'Транспорт',
    icon: 'bus',
    color: '#1E90FF',
  },
  {
    name: 'Шоппинг',
    icon: 'shopping',
    color: '#32CD32',
  },
  {
    name: 'Развлечения',
    icon: 'gamepad-variant',
    color: '#FFD700',
  },
];
