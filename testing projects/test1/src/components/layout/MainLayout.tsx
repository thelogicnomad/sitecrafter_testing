import React from 'react';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import GhostCursor from '../ui/GhostCursor';
import { Toaster } from 'sonner';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <GhostCursor />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
};

export default MainLayout;