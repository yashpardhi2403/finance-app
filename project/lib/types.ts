export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

export interface Budget {
  category: string;
  amount: number;
  spent: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface FinancialSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  savingsRate: number;
  monthlyChange: {
    balance: number;
    income: number;
    expenses: number;
    savingsRate: number;
  };
}