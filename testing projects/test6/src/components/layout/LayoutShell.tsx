import React from 'react';
    import Header from './Header';
    import Footer from './Footer';
    import { Toaster } from 'sonner';

    interface LayoutShellProps {
      children: React.ReactNode;
    }

    const LayoutShell: React.FC<LayoutShellProps> = ({ children }) => {
      return (
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster position="bottom-right" richColors />
        </div>
      );
    };

    export default LayoutShell;