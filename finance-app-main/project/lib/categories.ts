import { Category } from './types';

export const categories: Category[] = [
  { id: 'housing', name: 'Housing', icon: 'Home', color: '#10B981' },
  { id: 'food', name: 'Food', icon: 'UtensilsCrossed', color: '#3B82F6' },
  { id: 'transportation', name: 'Transportation', icon: 'Car', color: '#8B5CF6' },
  { id: 'entertainment', name: 'Entertainment', icon: 'Gamepad2', color: '#F59E0B' },
  { id: 'utilities', name: 'Utilities', icon: 'Zap', color: '#EF4444' },
  { id: 'healthcare', name: 'Healthcare', icon: 'Heart', color: '#EC4899' },
  { id: 'shopping', name: 'Shopping', icon: 'ShoppingBag', color: '#6B7280' },
  { id: 'education', name: 'Education', icon: 'BookOpen', color: '#14B8A6' },
  { id: 'income', name: 'Income', icon: 'TrendingUp', color: '#10B981' },
  { id: 'other', name: 'Other', icon: 'MoreHorizontal', color: '#6B7280' },
];

export const getCategoryByName = (name: string): Category => {
  return categories.find(cat => cat.name.toLowerCase() === name.toLowerCase()) || categories[categories.length - 1];
};

export const getCategoryById = (id: string): Category => {
  return categories.find(cat => cat.id === id) || categories[categories.length - 1];
};