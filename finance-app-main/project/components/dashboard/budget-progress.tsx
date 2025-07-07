'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Budget, Transaction } from '@/lib/types';
import { getCategoryByName } from '@/lib/categories';

interface BudgetProgressProps {
  budgets: Budget[];
  transactions: Transaction[];
}

export function BudgetProgress({ budgets, transactions }: BudgetProgressProps) {
  const calculateSpent = (category: string): number => {
    return transactions
      .filter(t => t.type === 'expense' && t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const budgetData = budgets.map(budget => {
    const spent = calculateSpent(budget.category);
    const percentage = Math.min((spent / budget.amount) * 100, 100);
    const remaining = Math.max(budget.amount - spent, 0);
    
    return {
      ...budget,
      spent,
      percentage,
      remaining
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Budget Progress</CardTitle>
        <p className="text-sm text-gray-500">Your spending against monthly budgets</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {budgetData.map((budget) => {
            const category = getCategoryByName(budget.category);
            const isOverBudget = budget.spent > budget.amount;
            
            return (
              <div key={budget.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1 rounded`} style={{ backgroundColor: `${category.color}20` }}>
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: category.color }} />
                    </div>
                    <span className="font-medium text-gray-900">{budget.category}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    ₹{budget.spent.toLocaleString()} / ₹{budget.amount.toLocaleString()}
                  </span>
                </div>
                <Progress 
                  value={budget.percentage} 
                  className="h-2"
                  style={{ 
                    '--progress-background': isOverBudget ? '#dc2626' : category.color 
                  } as React.CSSProperties}
                />
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isOverBudget ? 'text-red-600' : 'text-emerald-600'}`}>
                    {budget.percentage.toFixed(0)}% used
                  </span>
                  <span className="text-sm text-gray-500">
                    {isOverBudget ? 
                      `₹${(budget.spent - budget.amount).toLocaleString()} over budget` :
                      `₹${budget.remaining.toLocaleString()} remaining`
                    }
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}