import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Receipt, PiggyBank, BarChart, Settings, Bot } from 'lucide-react';

const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/transactions', label: 'Transactions', icon: Receipt },
    { href: '/budgets', label: 'Budgets', icon: PiggyBank },
    { href: '/reports', label: 'Reports', icon: BarChart },
    { href: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = () => {
    return (
        <aside className="w-64 flex-shrink-0 bg-card border-r border-border flex flex-col">
            <div className="h-16 flex items-center justify-center border-b border-border">
                <div className="flex items-center gap-2">
                    <img src="/logo.svg" alt="Nexus Finance Logo" className="h-8 w-8" />
                    <h1 className="text-xl font-bold font-heading text-foreground">Nexus Finance</h1>
                </div>
            </div>
            <nav className="flex-1 px-4 py-6">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <NavLink
                                to={item.href}
                                end
                                className={({ isActive }) =>
                                    cn(
                                        "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors",
                                        isActive
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    )
                                }
                            >
                                <item.icon className="h-5 w-5" />
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className='p-4 border-t border-border'>
                <div className='bg-muted p-4 rounded-lg flex flex-col items-center text-center'>
                    <Bot className='h-8 w-8 text-primary mb-2'/>
                    <h3 className='font-semibold text-foreground'>AI Assistant</h3>
                    <p className='text-xs text-muted-foreground mb-3'>Get smart insights and financial advice.</p>
                    <button className='w-full text-sm bg-primary/20 text-primary py-1.5 rounded-md hover:bg-primary/30 transition-colors'>Upgrade</button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;