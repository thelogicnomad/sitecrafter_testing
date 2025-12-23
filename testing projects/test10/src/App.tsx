import { Routes, Route } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import HomePage from '@/pages/HomePage';
import CourseCatalogPage from '@/pages/CourseCatalogPage';
import AdmissionsGuidePage from '@/pages/AdmissionsGuidePage';
import FacultyDirectoryPage from '@/pages/FacultyDirectoryPage';
import ContactPage from '@/pages/ContactPage';
import DashboardPage from '@/pages/DashboardPage';
import NotFoundPage from '@/pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CourseCatalogPage />} />
        <Route path="/admissions" element={<AdmissionsGuidePage />} />
        <Route path="/faculty" element={<FacultyDirectoryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;