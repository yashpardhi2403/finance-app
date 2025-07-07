'use client';

import { useState, useEffect } from 'react';
import { Transaction } from '@/lib/types';
import { loadTransactions, saveTransactions } from '@/lib/storage';
import { sampleTransactions } from '@/lib/sample-data';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loaded = loadTransactions();
    if (loaded.length === 0) {
      setTransactions(sampleTransactions);
      saveTransactions(sampleTransactions);
    } else {
      setTransactions(loaded);
    }
    setLoading(false);
  }, []);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    const updated = [...transactions, newTransaction];
    setTransactions(updated);
    saveTransactions(updated);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    const updated = transactions.map(t => 
      t.id === id ? { ...t, ...updates } : t
    );
    setTransactions(updated);
    saveTransactions(updated);
  };

  const deleteTransaction = (id: string) => {
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    saveTransactions(updated);
  };

  return {
    transactions,
    loading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
};