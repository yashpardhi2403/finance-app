import { Transaction, Budget } from './types';

export const sampleTransactions: Transaction[] = [
  {
    id: '1',
    amount: 4395.00,
    description: 'Salary Deposit',
    category: 'Income',
    date: '2024-01-05',
    type: 'income'
  },
  {
    id: '2',
    amount: 850.00,
    description: 'Rent Payment',
    category: 'Housing',
    date: '2024-01-02',
    type: 'expense'
  },
  {
    id: '3',
    amount: 120.00,
    description: 'Grocery Shopping',
    category: 'Food',
    date: '2024-01-03',
    type: 'expense'
  },
  {
    id: '4',
    amount: 350.00,
    description: 'Freelance Work',
    category: 'Income',
    date: '2024-01-04',
    type: 'income'
  },
  {
    id: '5',
    amount: 45.00,
    description: 'Gas Station',
    category: 'Transportation',
    date: '2024-01-05',
    type: 'expense'
  },
  {
    id: '6',
    amount: 78.50,
    description: 'Online Shopping',
    category: 'Shopping',
    date: '2024-01-06',
    type: 'expense'
  },
  {
    id: '7',
    amount: 65.00,
    description: 'Restaurant Dinner',
    category: 'Food',
    date: '2024-01-07',
    type: 'expense'
  },
  {
    id: '8',
    amount: 25.00,
    description: 'Movie Tickets',
    category: 'Entertainment',
    date: '2024-01-08',
    type: 'expense'
  }
];

export const sampleBudgets: Budget[] = [
  { category: 'Housing', amount: 1000, spent: 850 },
  { category: 'Food', amount: 500, spent: 450 },
  { category: 'Transportation', amount: 400, spent: 300 },
  { category: 'Entertainment', amount: 300, spent: 200 },
  { category: 'Shopping', amount: 200, spent: 150 },
  { category: 'Utilities', amount: 150, spent: 120 },
];