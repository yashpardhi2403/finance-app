'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { MonthlyChart } from '@/components/dashboard/monthly-chart';
import { CategoryChart } from '@/components/dashboard/category-chart';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { BudgetProgress } from '@/components/dashboard/budget-progress';
import { TransactionForm } from '@/components/transactions/transaction-form';
import { TransactionList } from '@/components/transactions/transaction-list';
import { BudgetList } from '@/components/budget/budget-list';
import { ReportsDashboard } from '@/components/reports/reports-dashboard';
import { Button } from '@/components/ui/button';
import { useTransactions } from '@/hooks/useTransactions';
import { useBudgets } from '@/hooks/useBudgets';
import { Plus } from 'lucide-react';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { transactions, loading: transactionsLoading, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const { budgets, loading: budgetsLoading, updateBudget, addBudget } = useBudgets();

  const handleEditTransaction = (transaction: any) => {
    // For now, just log the transaction to edit
    console.log('Edit transaction:', transaction);
  };

  const renderContent = () => {
    if (transactionsLoading || budgetsLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading your financial data...</p>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Finance Dashboard</h1>
                <p className="text-gray-600">Manage your finances and track your spending</p>
              </div>
              <TransactionForm onSubmit={addTransaction} />
            </div>
            
            <SummaryCards transactions={transactions} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <MonthlyChart transactions={transactions} />
              <CategoryChart transactions={transactions} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <RecentTransactions 
                transactions={transactions} 
                onViewAll={() => setCurrentPage('transactions')}
              />
              <BudgetProgress budgets={budgets} transactions={transactions} />
            </div>
          </div>
        );

      case 'transactions':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
                <p className="text-gray-600">View and manage all your financial transactions</p>
              </div>
              <TransactionForm onSubmit={addTransaction} />
            </div>
            
            <TransactionList
              transactions={transactions}
              onEdit={handleEditTransaction}
              onDelete={deleteTransaction}
            />
          </div>
        );

      case 'budgets':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Budgets</h1>
                <p className="text-gray-600">Set and track your monthly spending limits</p>
              </div>
            </div>
            
            <BudgetList
              budgets={budgets}
              transactions={transactions}
              onUpdateBudget={updateBudget}
              onAddBudget={addBudget}
            />
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-6">
            <ReportsDashboard transactions={transactions} />
          </div>
        );

      case 'goals':
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Financial Goals</h1>
              <p className="text-gray-600">Coming soon! Track your savings goals and financial milestones.</p>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile</h1>
              <p className="text-gray-600">Coming soon! Manage your account settings and preferences.</p>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1>
              <p className="text-gray-600">Coming soon! Customize your app experience and preferences.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-8 max-w-7xl">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}