import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
    import { AnimatePresence } from 'framer-motion';
    import AppLayout from '@/components/layout/AppLayout';
    import HomePage from '@/pages/HomePage';
    import ShopPage from '@/pages/ShopPage';
    import AboutPage from '@/pages/AboutPage';
    import ContactPage from '@/pages/ContactPage';
    import CartPage from '@/pages/CartPage';

    const AnimatedRoutes = () => {
      const location = useLocation();
      return (
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Route>
          </Routes>
        </AnimatePresence>
      );
    };

    const AppRouter = () => (
      <Router>
        <AnimatedRoutes />
      </Router>
    );

    export default AppRouter;