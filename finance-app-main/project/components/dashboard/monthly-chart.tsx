'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Transaction } from '@/lib/types';

interface MonthlyChartProps {
  transactions: Transaction[];
}

export function MonthlyChart({ transactions }: MonthlyChartProps) {
  // Generate data for the last 6 months
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June'
  ];

  const data = months.map(month => {
    // For demo purposes, we'll use sample data
    const baseIncome = Math.floor(Math.random() * 1000) + 3000;
    const baseExpense = Math.floor(Math.random() * 500) + 1800;
    
    return {
      month,
      Income: baseIncome,
      Expenses: baseExpense,
    };
  });

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Financial Overview</CardTitle>
        <p className="text-sm text-gray-500">Your income and expenses for the past 6 months</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip 
              formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
              labelStyle={{ color: '#374151' }}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Bar dataKey="Income" fill="#10B981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}