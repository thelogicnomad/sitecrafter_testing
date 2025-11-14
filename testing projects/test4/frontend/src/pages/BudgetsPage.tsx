import { useFinance } from '@/context/FinanceContext';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Plus } from 'lucide-react';

const BudgetCard = ({ category, limit, spent }: { category: string, limit: number, spent: number }) => {
    const percentage = Math.min((spent / limit) * 100, 100);
    const isOver = spent > limit;
    const remaining = limit - spent;

    let progressBarColor = 'bg-primary';
    if (percentage > 90 || isOver) progressBarColor = 'bg-destructive';
    else if (percentage > 75) progressBarColor = 'bg-warning';

    return (
        <Card>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold font-heading">{category}</h3>
                    <p className="text-sm text-muted-foreground">${limit.toLocaleString()} Limit</p>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
            </div>
            <div className="mt-4">
                <div className="w-full bg-muted rounded-full h-2.5">
                    <div className={`${progressBarColor} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                    <p>Spent: <span className="font-semibold">${spent.toLocaleString()}</span></p>
                    <p className={remaining < 0 ? 'text-destructive' : 'text-muted-foreground'}>
                        {remaining >= 0 ? `$${remaining.toLocaleString()} Remaining` : `Overspent by $${Math.abs(remaining).toLocaleString()}`}
                    </p>
                </div>
            </div>
        </Card>
    );
};


const BudgetsPage = () => {
    const { budgets } = useFinance();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-heading">Monthly Budget Allocation</h1>
                    <p className="text-muted-foreground">Set realistic limits to control spending for July 2024.</p>
                </div>
                <Button iconLeft={<Plus className="h-4 w-4" />}>New Budget</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {budgets.map(budget => (
                    <BudgetCard key={budget.id} category={budget.category} limit={budget.limit} spent={budget.spent} />
                ))}
            </div>
        </div>
    );
};

export default BudgetsPage;