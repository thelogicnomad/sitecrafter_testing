import { Account, Budget, Transaction, BudgetCategory, TransactionType } from "@/interfaces/finance";
import { subDays, format } from 'date-fns';

const ACCOUNTS: Account[] = [
  { id: 'acc_1', name: 'Main Checking', type: 'Checking', balance: 8520.50, currency: 'USD' },
  { id: 'acc_2', name: 'High-Yield Savings', type: 'Savings', balance: 25000.00, currency: 'USD' },
  { id: 'acc_3', name: 'Venture Rewards Card', type: 'Credit Card', balance: -1250.75, currency: 'USD' },
  { id: 'acc_4', name: 'Brokerage Account', type: 'Investment', balance: 42350.25, currency: 'USD' }
];

const TRANSACTIONS: Transaction[] = [
  { id: 'tx_1', date: subDays(new Date(), 1).toISOString(), description: "Monthly Salary Deposit", amount: 4500.00, type: 'Income', accountId: 'acc_1', category: 'Salary' },
  { id: 'tx_2', date: subDays(new Date(), 2).toISOString(), description: "Rent Payment - July", amount: -1850.00, type: 'Expense', accountId: 'acc_1', category: 'Housing' },
  { id: 'tx_3', date: subDays(new Date(), 3).toISOString(), description: "Amazon Purchase", amount: -89.99, type: 'Expense', accountId: 'acc_3', category: 'Entertainment' },
  { id: 'tx_4', date: subDays(new Date(), 3).toISOString(), description: "Groceries @ Local Market", amount: -112.88, type: 'Expense', accountId: 'acc_3', category: 'Groceries' },
  { id: 'tx_5', date: subDays(new Date(), 4).toISOString(), description: "Transfer to Savings", amount: -500.00, type: 'Transfer', accountId: 'acc_1', category: 'Investments' },
  { id: 'tx_6', date: subDays(new Date(), 5).toISOString(), description: "Utility Bill: Power Co.", amount: -155.30, type: 'Expense', accountId: 'acc_3', category: 'Utilities' },
  { id: 'tx_7', date: subDays(new Date(), 6).toISOString(), description: "Starbucks Coffee", amount: -6.50, type: 'Expense', accountId: 'acc_3', category: 'Entertainment' },
  { id: 'tx_8', date: subDays(new Date(), 10).toISOString(), description: "Freelance Project Payment", amount: 800.00, type: 'Income', accountId: 'acc_1', category: 'Freelance' },
  { id: 'tx_9', date: subDays(new Date(), 15).toISOString(), description: "Dinner with friends", amount: -75.00, type: 'Expense', accountId: 'acc_3', category: 'Entertainment' },
  { id: 'tx_10', date: subDays(new Date(), 20).toISOString(), description: "Gas fill-up", amount: -55.20, type: 'Expense', accountId: 'acc_3', category: 'Transportation' },
];

const BUDGETS: Budget[] = [
  { id: 'bud_1', category: 'Groceries', monthYear: '2024-07', limit: 600.00, spent: 450.50 },
  { id: 'bud_2', category: 'Housing', monthYear: '2024-07', limit: 2200.00, spent: 2200.00 },
  { id: 'bud_3', category: 'Entertainment', monthYear: '2024-07', limit: 300.00, spent: 295.00 },
  { id: 'bud_4', category: 'Transportation', monthYear: '2024-07', limit: 250.00, spent: 180.10 },
  { id: 'bud_5', category: 'Investments', monthYear: '2024-07', limit: 1000.00, spent: 1000.00 },
];

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const financeApi = {
  getAccounts: async (): Promise<Account[]> => {
    await wait(500);
    return ACCOUNTS;
  },
  getTransactions: async (): Promise<Transaction[]> => {
    await wait(800);
    return TRANSACTIONS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },
  getBudgets: async (): Promise<Budget[]> => {
    await wait(600);
    return BUDGETS;
  },
};