import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

const HomePage = lazy(() => import('@/pages/HomePage'));
const CatalogPage = lazy(() => import('@/pages/CatalogPage'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'));

const ContactPage = lazy(() => import('@/pages/ContactPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Suspense fallback={<LoadingSpinner />}><HomePage /></Suspense>} />
          <Route path="catalog" element={<Suspense fallback={<LoadingSpinner />}><CatalogPage /></Suspense>} />
          <Route path="product/:id" element={<Suspense fallback={<LoadingSpinner />}><ProductDetailPage /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<LoadingSpinner />}><ContactPage /></Suspense>} />
          <Route path="profile" element={<Suspense fallback={<LoadingSpinner />}><ProfilePage /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<LoadingSpinner />}><NotFoundPage /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;