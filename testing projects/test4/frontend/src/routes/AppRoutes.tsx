import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import TransactionsPage from '@/pages/TransactionsPage';
import BudgetsPage from '@/pages/BudgetsPage';
import ReportsPage from '@/pages/ReportsPage';
import SettingsPage from '@/pages/SettingsPage';
import MainLayout from '@/components/layout/MainLayout';
import { Spinner } from '@/components/common/Spinner';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <LocationAwareRoutes />
    </BrowserRouter>
  );
};

const LocationAwareRoutes = () => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-background">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} redirectPath="/login" />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/budgets" element={<BudgetsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        <Route path="*" element={
          <div className="w-screen h-screen flex items-center justify-center">
            <h1>404 Not Found</h1>
          </div>
        } />
      </Routes>
    </AnimatePresence>
  );
};