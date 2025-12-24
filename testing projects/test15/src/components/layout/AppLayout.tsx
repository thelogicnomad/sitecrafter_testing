import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

/**
 * AppLayout component provides the primary shell for the application.
 * It includes the sticky Header, a flexible main content area for route components,
 * and the Footer.
 */
const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* 
          Outlet renders the child route components. 
          The w-full and max-w-7xl classes ensure consistent content alignment,
          though individual pages can override layout with their own containers.
        */}
        <div className="flex-1">
          <Outlet />
        </div>
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
};

export default AppLayout;