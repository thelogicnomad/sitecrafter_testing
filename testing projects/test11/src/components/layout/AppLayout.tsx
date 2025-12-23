import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

/**
 * AppLayout component provides the primary structure for the application.
 * It includes a sticky Header, a flexible main content area for route components,
 * and a Footer at the bottom.
 */
const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-[#2d5a88]/20 selection:text-[#2d5a88]">
      {/* Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer Area */}
      <Footer />
    </div>
  );
};

export default AppLayout;