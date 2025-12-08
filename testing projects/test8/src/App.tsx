import React from 'react';
    import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
    import { AppLayout } from '@/components/layout/AppLayout';
    import { Toaster } from 'sonner'; // Import Toaster for global toasts

    import HomePage from '@/pages/HomePage';
    import ProductsPage from '@/pages/ProductsPage';
    import ProductDetailPage from '@/pages/ProductDetailPage';
    import AboutPage from '@/pages/AboutPage';
    import ContactPage from '@/pages/ContactPage';
    import UserDashboard from '@/pages/UserDashboard';
    import CartCheckoutPage from '@/pages/CartCheckoutPage';

    function App() {
      return (
        <BrowserRouter>
          <Toaster position="top-right" richColors /> {/* Global Toaster */}
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="product/:id" element={<ProductDetailPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="cart" element={<CartCheckoutPage />} />
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-center p-8 font-poppins">
                  <h1 className="text-6xl font-bold text-[#8A2E4B] mb-4">404</h1>
                  <p className="text-2xl text-gray-700 mb-8">Page Not Found</p>
                  <Link to="/" className="text-[#D9AE73] hover:underline text-lg">Go back to Home</Link>
                </div>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      );
    }

    export default App;