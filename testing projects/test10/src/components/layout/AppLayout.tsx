import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

/**
 * AppLayout Component
 * Provides the main structural wrapper for the application including
 * Global Header, Footer, and the main content area for nested routes.
 */
const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-[#1B4592]/10 selection:text-[#1B4592]">
      {/* Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default AppLayout;