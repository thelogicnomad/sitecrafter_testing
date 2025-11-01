import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
    import { Toaster } from '@/components/ui/sonner';
    import HeaderNav from '@/components/layout/HeaderNav';
    import FooterArea from '@/components/layout/FooterArea';
    import HomePage from './pages/HomePage';
    import CourseListingPage from './pages/CourseListingPage';
    import CourseDetailPage from './pages/CourseDetailPage';
    import UserDashboard from './pages/UserDashboard';
    import AboutPage from './pages/AboutPage';
    import ContactPage from './pages/ContactPage';
    import { AnimatePresence } from 'framer-motion';
    import PageTransitionWrapper from './components/layout/PageTransitionWrapper';

    const AppRoutes = () => {
      const location = useLocation();
      return (
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransitionWrapper><HomePage /></PageTransitionWrapper>} />
            <Route path="/courses" element={<PageTransitionWrapper><CourseListingPage /></PageTransitionWrapper>} />
            <Route path="/course/:courseId" element={<PageTransitionWrapper><CourseDetailPage /></PageTransitionWrapper>} />
            <Route path="/dashboard" element={<PageTransitionWrapper><UserDashboard /></PageTransitionWrapper>} />
            <Route path="/about" element={<PageTransitionWrapper><AboutPage /></PageTransitionWrapper>} />
            <Route path="/contact" element={<PageTransitionWrapper><ContactPage /></PageTransitionWrapper>} />
          </Routes>
        </AnimatePresence>
      );
    }

    function App() {
      return (
        <Router>
          <div className="flex min-h-screen flex-col">
            <HeaderNav />
            <main className="flex-grow">
              <AppRoutes />
            </main>
            <FooterArea />
            <Toaster />
          </div>
        </Router>
      );
    }

    export default App;