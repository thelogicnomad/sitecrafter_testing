import { useMemo, useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Plus } from 'lucide-react';
import { Transaction } from '@/interfaces/finance';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const TransactionsPage = () => {
    const { transactions, accounts } = useFinance();
    const [searchTerm, setSearchTerm] = useState('');

    const accountMap = useMemo(() => new Map(accounts.map(acc => [acc.id, acc.name])), [accounts]);

    const filteredTransactions = useMemo(() => {
        return transactions.filter(tx => 
            tx.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [transactions, searchTerm]);

    const renderTransactionRow = (tx: Transaction) => (
        <tr key={tx.id} className="border-b border-border last:border-b-0 hover:bg-muted/50">
            <td className="p-4">{format(new Date(tx.date), 'MMM dd, yyyy')}</td>
            <td className="p-4">{accountMap.get(tx.accountId) || 'Unknown'}</td>
            <td className="p-4">{tx.description}</td>
            <td className="p-4 text-center">{tx.category}</td>
            <td className="p-4 text-center">
                <span className={cn('px-2 py-1 text-xs rounded-full', {
                    'bg-success/20 text-success': tx.type === 'Income',
                    'bg-destructive/20 text-destructive': tx.type === 'Expense',
                    'bg-primary/20 text-primary': tx.type === 'Transfer',
                })}>{tx.type}</span>
            </td>
            <td className={`p-4 text-right font-medium ${tx.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                {tx.amount > 0 ? '+' : ''}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
        </tr>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-heading">Transaction Ledger</h1>
                    <p className="text-muted-foreground">Filter and manage every inflow and outflow.</p>
                </div>
                <Button iconLeft={<Plus className="h-4 w-4" />}>New Transaction</Button>
            </div>
            
            <Card>
                <div className="p-4 border-b border-border">
                    <Input 
                        placeholder="Search by description..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-left text-muted-foreground bg-muted/50">
                            <tr>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Account</th>
                                <th className="p-4 font-medium">Description</th>
                                <th className="p-4 font-medium text-center">Category</th>
                                <th className="p-4 font-medium text-center">Type</th>
                                <th className="p-4 font-medium text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map(renderTransactionRow)}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default TransactionsPage;