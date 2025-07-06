'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Transaction } from '@/lib/types';
import { getCategoryByName } from '@/lib/categories';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { format } from 'date-fns';

interface RecentTransactionsProps {
  transactions: Transaction[];
  onViewAll: () => void;
}

export function RecentTransactions({ transactions, onViewAll }: RecentTransactionsProps) {
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const getIcon = (categoryName: string) => {
    const category = getCategoryByName(categoryName);
    return category.icon;
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
          <p className="text-sm text-gray-500">Your latest financial activities</p>
        </div>
        <Button variant="outline" size="sm" onClick={onViewAll}>
          View All Transactions
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => {
            const category = getCategoryByName(transaction.category);
            const isIncome = transaction.type === 'income';
            
            return (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full`} style={{ backgroundColor: `${category.color}20` }}>
                    {isIncome ? (
                      <ArrowUpIcon className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(transaction.date), 'MMM d, yyyy')} • {transaction.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${isIncome ? 'text-emerald-600' : 'text-red-600'}`}>
                    {isIncome ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {isIncome ? 'Income' : 'Expense'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}