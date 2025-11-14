export type TransactionType = 'Income' | 'Expense' | 'Transfer';
export type BudgetCategory = 'Groceries' | 'Housing' | 'Transportation' | 'Entertainment' | 'Investments' | 'Utilities' | 'Salary' | 'Freelance';

export interface Account {
  id: string;
  name: string;
  type: 'Checking' | 'Savings' | 'Credit Card' | 'Investment';
  balance: number;
  currency: 'USD' | 'EUR';
}

export interface Transaction {
  id: string;
  date: string; // ISO Date String
  description: string;
  amount: number; // Positive for Income, Negative for Expense
  type: TransactionType;
  accountId: string;
  category: BudgetCategory;
}

export interface Budget {
  id: string;
  category: BudgetCategory;
  monthYear: string; // e.g., "2024-07"
  limit: number;
  spent: number; // Calculated aggregate from transactions
}

export interface ReportData {
  period: string;
  totalIncome: number;
  totalExpense: number;
  netFlow: number;
  categoryBreakdown: { category: BudgetCategory; amount: number }[];
}