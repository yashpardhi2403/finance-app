'use client';

import { useState, useEffect } from 'react';
import { Budget } from '@/lib/types';
import { loadBudgets, saveBudgets } from '@/lib/storage';
import { sampleBudgets } from '@/lib/sample-data';

export const useBudgets = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loaded = loadBudgets();
    if (loaded.length === 0) {
      setBudgets(sampleBudgets);
      saveBudgets(sampleBudgets);
    } else {
      setBudgets(loaded);
    }
    setLoading(false);
  }, []);

  const updateBudget = (category: string, amount: number) => {
    const updated = budgets.map(b => 
      b.category === category ? { ...b, amount } : b
    );
    setBudgets(updated);
    saveBudgets(updated);
  };

  const addBudget = (budget: Budget) => {
    const updated = [...budgets, budget];
    setBudgets(updated);
    saveBudgets(updated);
  };

  return {
    budgets,
    loading,
    updateBudget,
    addBudget,
  };
};