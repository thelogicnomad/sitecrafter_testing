import React from 'react';
    import { Outlet, useLocation } from 'react-router-dom';
    import Header from './Header';
    import Footer from './Footer';
    import { useScrollToTop } from '@/hooks/useScrollToTop';
    import { ArrowUp } from 'lucide-react';
    import { AnimatePresence, motion } from 'framer-motion';
    import GhostCursor from '../common/GhostCursor';

    const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
      const { isVisible, scrollToTop } = useScrollToTop();
      
      return (
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <AnimatePresence>
            {isVisible && (
              <motion.button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 bg-au-accent text-au-primary p-3 rounded-full shadow-lg z-50"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Scroll to top"
              >
                <ArrowUp size={24} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      );
    };

    export default Layout;