import { Transaction, Budget } from './types';

export const STORAGE_KEYS = {
  TRANSACTIONS: 'finance-transactions',
  BUDGETS: 'finance-budgets',
};

export const saveTransactions = (transactions: Transaction[]): void => {
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
};

export const loadTransactions = (): Transaction[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
  return stored ? JSON.parse(stored) : [];
};

export const saveBudgets = (budgets: Budget[]): void => {
  localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
};

export const loadBudgets = (): Budget[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.BUDGETS);
  return stored ? JSON.parse(stored) : [];
};