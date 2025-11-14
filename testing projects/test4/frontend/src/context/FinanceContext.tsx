import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Account, Transaction, Budget } from '@/interfaces/finance';
import { financeApi } from '@/api/financeApi';

interface FinanceState {
  accounts: Account[];
  transactions: Transaction[];
  budgets: Budget[];
  isLoading: boolean;
  error: string | null;
  refetchData: () => void;
}

const FinanceContext = createContext<FinanceState | undefined>(undefined);

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInitialData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [accs, txs, buds] = await Promise.all([
        financeApi.getAccounts(),
        financeApi.getTransactions(),
        financeApi.getBudgets(),
      ]);
      setAccounts(accs);
      setTransactions(txs);
      setBudgets(buds);
    } catch (err) {
      setError('Failed to fetch financial data.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);
  
  const refetchData = () => fetchInitialData();

  return (
    <FinanceContext.Provider value={{ accounts, transactions, budgets, isLoading, error, refetchData }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};