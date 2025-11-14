import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'; // Added motion import
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AcademicsPage from './pages/AcademicsPage';
import ProgramDetailPage from './pages/ProgramDetailPage';
import AdmissionsPage from './pages/AdmissionsPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import CampusLifePage from './pages/CampusLifePage';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const AnimatedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation(); // Move inside component
  
  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

// Separate component that uses useLocation
const AppRoutes: React.FC = () => {
  const location = useLocation();
  
  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedRoute><HomePage /></AnimatedRoute>} />
          <Route path="/academics" element={<AnimatedRoute><AcademicsPage /></AnimatedRoute>} />
          <Route path="/academics/programs/:programId" element={<AnimatedRoute><ProgramDetailPage /></AnimatedRoute>} />
          <Route path="/admissions" element={<AnimatedRoute><AdmissionsPage /></AnimatedRoute>} />
          <Route path="/about" element={<AnimatedRoute><AboutPage /></AnimatedRoute>} />
          <Route path="/campus-life" element={<AnimatedRoute><CampusLifePage /></AnimatedRoute>} />
          <Route path="*" element={<AnimatedRoute><NotFoundPage /></AnimatedRoute>} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;