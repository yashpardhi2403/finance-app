'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Transaction } from '@/lib/types';
import { getCategoryByName } from '@/lib/categories';

interface CategoryChartProps {
  transactions: Transaction[];
}

export function CategoryChart({ transactions }: CategoryChartProps) {
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

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Expenses by Category</CardTitle>
        <p className="text-sm text-gray-500">Where your money is going this month</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              wrapperStyle={{ paddingTop: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}