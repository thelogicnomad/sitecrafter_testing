import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import CatalogPage from '@/pages/CatalogPage';
import RecipeDetailPage from '@/pages/RecipeDetailPage';
import ProfilePage from '@/pages/ProfilePage';
import ContactPage from '@/pages/ContactPage';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/common/PageTransition';

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/catalog" element={<PageTransition><CatalogPage /></PageTransition>} />
            <Route path="/recipe/:id" element={<PageTransition><RecipeDetailPage /></PageTransition>} />
            <Route path="/profile" element={<PageTransition><ProfilePage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;