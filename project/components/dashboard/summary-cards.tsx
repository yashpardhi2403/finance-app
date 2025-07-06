'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react';
import { Transaction } from '@/lib/types';

interface SummaryCardsProps {
  transactions: Transaction[];
}

export function SummaryCards({ transactions }: SummaryCardsProps) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((totalBalance / totalIncome) * 100) : 0;

  const cards = [
    {
      title: 'Total Balance',
      value: `₹${totalBalance.toLocaleString()}`,
      change: '+₹1,245.00 from last month',
      icon: Wallet,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Income',
      value: `₹${totalIncome.toLocaleString()}`,
      change: '+12.5% from last month',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Expenses',
      value: `₹${totalExpenses.toLocaleString()}`,
      change: '-3.2% from last month',
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      change: '+4.3% from last month',
      icon: PiggyBank,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${card.bgColor}`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{card.value}</div>
              <p className="text-xs text-gray-500 mt-1">{card.change}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}