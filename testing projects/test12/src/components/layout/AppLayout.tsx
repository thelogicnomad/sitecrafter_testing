import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

/**
 * AppLayout provides the structural wrapper for all pages.
 * It ensures a consistent header and footer across the application
 * while rendering the nested route content via the Outlet.
 */
const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-gray-200">
      {/* Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 bg-white">
        <Outlet />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default AppLayout;