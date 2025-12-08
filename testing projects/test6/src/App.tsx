import { BrowserRouter, Routes, Route } from 'react-router-dom';
    import { Toaster } from 'sonner';
    import { Layout } from '@/components/layout/Layout';
    import HomePage from '@/pages/HomePage';
    import CoursesPage from '@/pages/CoursesPage';
    import DashboardPage from '@/pages/DashboardPage';
    import AboutPage from '@/pages/AboutPage';
    import ContactPage from '@/pages/ContactPage';

    function App() {
      return (
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Layout>
          <Toaster richColors position="top-right" />
        </BrowserRouter>
      );
    }
    
    export default App;