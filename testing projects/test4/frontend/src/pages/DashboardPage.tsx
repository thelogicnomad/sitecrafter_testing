import { useAuth } from "@/context/AuthContext";
import { useFinance } from "@/context/FinanceContext";
import { Card } from "@/components/common/Card";
import { format } from "date-fns";
import { ArrowDown, ArrowUp, DollarSign, Wallet } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const DashboardPage = () => {
  const { user } = useAuth();
  const { accounts, transactions } = useFinance();

  const netWorth = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const now = new Date();
  const last30Days = new Date(now.setDate(now.getDate() - 30));
  
  const recentTransactions = transactions.filter(tx => new Date(tx.date) >= last30Days);

  const income = recentTransactions.filter(tx => tx.type === 'Income').reduce((sum, tx) => sum + tx.amount, 0);
  const expense = recentTransactions.filter(tx => tx.type === 'Expense').reduce((sum, tx) => sum + tx.amount, 0);
  const netFlow = income + expense;

  const chartData = [
    { name: 'Jan', income: 4000, expenses: 2400 },
    { name: 'Feb', income: 3000, expenses: 1398 },
    { name: 'Mar', income: 5000, expenses: 4800 },
    { name: 'Apr', income: 4780, expenses: 3908 },
    { name: 'May', income: 5890, expenses: 4800 },
    { name: 'Jun', income: 4390, expenses: 3800 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-heading">Welcome back, {user?.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here is your financial snapshot for {format(new Date(), 'MMMM yyyy')}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
            <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Current Net Worth</p>
                <Wallet className="h-5 w-5 text-muted-foreground"/>
            </div>
            <p className="text-3xl font-bold mt-2">${netWorth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </Card>
        <Card>
            <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Month Net Flow</p>
                <DollarSign className="h-5 w-5 text-muted-foreground"/>
            </div>
            <p className={`text-3xl font-bold mt-2 flex items-center ${netFlow >= 0 ? 'text-success' : 'text-destructive'}`}>
                {netFlow >= 0 ? <ArrowUp className="h-6 w-6 mr-2"/> : <ArrowDown className="h-6 w-6 mr-2"/>}
                ${Math.abs(netFlow).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
        </Card>
        <Card>
            <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Budget Health</p>
                <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center"><p className="text-xs font-bold text-warning">65%</p></div>
            </div>
            <p className="text-3xl font-bold mt-2">65.4% Used</p>
        </Card>
      </div>
      
      <Card title="Monthly Cash Flow Overview">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="hsl(var(--success))" strokeWidth={2} name="Income" />
              <Line type="monotone" dataKey="expenses" stroke="hsl(var(--destructive))" strokeWidth={2} name="Expenses" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      <Card title="Latest Activity">
        <div className="space-y-4">
          {transactions.slice(0, 5).map(tx => (
            <div key={tx.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{tx.description}</p>
                <p className="text-sm text-muted-foreground">{format(new Date(tx.date), 'MMM dd, yyyy')}</p>
              </div>
              <p className={`font-semibold ${tx.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                {tx.amount > 0 ? '+' : ''}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;