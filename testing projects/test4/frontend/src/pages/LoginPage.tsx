import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import PageWrapper from '@/components/layout/PageWrapper';

const LoginPage = () => {
    const [email, setEmail] = useState('demo@nexus.com');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const success = await login(email, password);
        if (success) {
            navigate('/');
        } else {
            setError('Invalid email or password.');
        }
    };

    return (
        <PageWrapper>
            <div className="min-h-screen flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold font-heading">Nexus Finance</h1>
                        <p className="text-muted-foreground mt-2">Securely track your financial future.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        {error && <p className="text-sm text-destructive">{error}</p>}
                        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                            Sign In
                        </Button>
                    </form>
                </Card>
            </div>
        </PageWrapper>
    );
};

export default LoginPage;