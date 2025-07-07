'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Budget, Transaction } from '@/lib/types';
import { getCategoryByName, categories } from '@/lib/categories';
import { Plus, Edit } from 'lucide-react';

interface BudgetListProps {
  budgets: Budget[];
  transactions: Transaction[];
  onUpdateBudget: (category: string, amount: number) => void;
  onAddBudget: (budget: Budget) => void;
}

export function BudgetList({ budgets, transactions, onUpdateBudget, onAddBudget }: BudgetListProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [newBudget, setNewBudget] = useState({
    category: '',
    amount: ''
  });

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

  const handleAddBudget = () => {
    if (newBudget.category && newBudget.amount) {
      onAddBudget({
        category: newBudget.category,
        amount: parseFloat(newBudget.amount),
        spent: 0
      });
      setNewBudget({ category: '', amount: '' });
      setIsAddDialogOpen(false);
    }
  };

  const handleUpdateBudget = (category: string, amount: string) => {
    if (amount) {
      onUpdateBudget(category, parseFloat(amount));
      setEditingBudget(null);
    }
  };

  const availableCategories = categories.filter(cat => 
    cat.id !== 'income' && !budgets.some(b => b.category === cat.name)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Budget Management</CardTitle>
            <p className="text-sm text-gray-500">Set and track your monthly spending limits</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Budget
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Budget</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Category</Label>
                  <Select value={newBudget.category} onValueChange={(value) => setNewBudget({ ...newBudget, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCategories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Monthly Budget</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newBudget.amount}
                    onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleAddBudget} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                    Add Budget
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {budgetData.map((budget) => {
              const category = getCategoryByName(budget.category);
              const isOverBudget = budget.spent > budget.amount;
              const isEditing = editingBudget?.category === budget.category;
              
              return (
                <div key={budget.category} className="p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full`} style={{ backgroundColor: `${category.color}20` }}>
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: category.color }} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{budget.category}</h3>
                        <p className="text-sm text-gray-500">Monthly Budget</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isEditing ? (
                        <Input
                          type="number"
                          defaultValue={budget.amount.toString()}
                          className="w-24"
                          onBlur={(e) => handleUpdateBudget(budget.category, e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleUpdateBudget(budget.category, e.currentTarget.value);
                            }
                          }}
                        />
                      ) : (
                        <span className="font-semibold text-gray-900">₹{budget.amount.toLocaleString()}</span>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingBudget(isEditing ? null : budget)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Spent: ₹{budget.spent.toLocaleString()}</span>
                      <span className={isOverBudget ? 'text-red-600' : 'text-gray-600'}>
                        {budget.percentage.toFixed(1)}% of budget
                      </span>
                    </div>
                    <Progress 
                      value={budget.percentage} 
                      className="h-2"
                      style={{ 
                        '--progress-background': isOverBudget ? '#dc2626' : category.color 
                      } as React.CSSProperties}
                    />
                    <div className="flex justify-between text-sm">
                      <span className={isOverBudget ? 'text-red-600' : 'text-emerald-600'}>
                        {isOverBudget ? 
                          `₹${(budget.spent - budget.amount).toLocaleString()} over budget` :
                          `₹${budget.remaining.toLocaleString()} remaining`
                        }
                      </span>
                      <span className="text-gray-500">
                        {Math.max(0, budget.amount - budget.spent) > 0 ? 
                          `${(((budget.amount - budget.spent) / budget.amount) * 100).toFixed(1)}% left` :
                          'Budget exceeded'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}