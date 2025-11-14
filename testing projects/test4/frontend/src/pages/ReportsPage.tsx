import { Card } from '@/components/common/Card';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const COLORS = ['#2563eb', '#16a34a', '#f97316', '#dc2626', '#d946ef', '#6366f1'];

const spendingData = [
  { name: 'Housing', value: 2200 },
  { name: 'Groceries', value: 550 },
  { name: 'Transportation', value: 280 },
  { name: 'Entertainment', value: 395 },
  { name: 'Utilities', value: 155 },
  { name: 'Investments', value: 1000 },
];

const trendData = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 5000, expense: 4800 },
  { name: 'Apr', income: 4780, expense: 3908 },
  { name: 'May', income: 5890, expense: 4800 },
  { name: 'Jun', income: 4390, expense: 3800 },
];

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-heading">Financial Reports & Analysis</h1>
        <p className="text-muted-foreground">Dive deep into spending habits and historical performance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Spending Breakdown (Last 6 Months)">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {spendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Income vs. Expense Trend">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Legend />
                <Bar dataKey="income" fill="hsl(var(--success))" name="Income" />
                <Bar dataKey="expense" fill="hsl(var(--destructive))" name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;