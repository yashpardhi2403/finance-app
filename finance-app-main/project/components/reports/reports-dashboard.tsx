'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Transaction } from '@/lib/types';
import { getCategoryByName } from '@/lib/categories';

interface ReportsDashboardProps {
  transactions: Transaction[];
}

export function ReportsDashboard({ transactions }: ReportsDashboardProps) {
  const [timeRange, setTimeRange] = useState('6months');

  // Generate monthly data
  const monthlyData = [
    { month: 'Jan', Income: 3200, Expenses: 2100 },
    { month: 'Feb', Income: 3500, Expenses: 2250 },
    { month: 'Mar', Income: 3700, Expenses: 2200 },
    { month: 'Apr', Income: 4000, Expenses: 2400 },
    { month: 'May', Income: 4100, Expenses: 1950 },
    { month: 'Jun', Income: 4400, Expenses: 2100 },
  ];

  // Generate category spending data
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const categoryData = expenseTransactions.reduce((acc, transaction) => {
    const category = getCategoryByName(transaction.category);
    const existingCategory = acc.find(item => item.name === category.name);
    
    if (existingCategory) {
      existingCategory.value += transaction.amount;
    } else {
      acc.push({
        name: category.name,
        value: transaction.amount,
        color: category.color
      });
    }
    
    return acc;
  }, [] as Array<{ name: string; value: number; color: string }>);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Reports</CardTitle>
            <p className="text-sm text-gray-500">Analyze your financial data with detailed reports</p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last 1 Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last 1 Year</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Income & Expense</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Total Income</p>
                      <p className="text-2xl font-bold text-emerald-600">₹{totalIncome.toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Total Expenses</p>
                      <p className="text-2xl font-bold text-red-600">₹{totalExpenses.toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Net Savings</p>
                      <p className="text-2xl font-bold text-blue-600">₹{(totalIncome - totalExpenses).toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Income vs Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `₹${value}`} />
                      <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, '']} />
                      <Legend />
                      <Bar dataKey="Income" fill="#10B981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories">
              <Card>
                <CardHeader>
                  <CardTitle>Spending by Category</CardTitle>
                  <p className="text-sm text-gray-500">See where your money is going</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-4">
                      {categoryData.map((category, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: category.color }} />
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">₹{category.value.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">
                              {((category.value / totalExpenses) * 100).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends">
              <Card>
                <CardHeader>
                  <CardTitle>Spending Trends</CardTitle>
                  <p className="text-sm text-gray-500">Track your spending patterns over time</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Monthly Average</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Income</span>
                            <span className="font-semibold text-emerald-600">₹{(totalIncome / 6).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Expenses</span>
                            <span className="font-semibold text-red-600">₹{(totalExpenses / 6).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Savings</span>
                            <span className="font-semibold text-blue-600">₹{((totalIncome - totalExpenses) / 6).toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Savings Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-emerald-600">
                            {totalIncome > 0 ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1) : 0}%
                          </div>
                          <p className="text-sm text-gray-500 mt-1">of your income is saved</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}