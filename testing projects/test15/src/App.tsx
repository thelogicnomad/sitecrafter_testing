import { Routes, Route } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import Home from '@/pages/Home';
import Experiences from '@/pages/Experiences';
import Leaderboard from '@/pages/Leaderboard';
import Community from '@/pages/Community';
import Pricing from '@/pages/Pricing';
import Blog from '@/pages/Blog';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/community" element={<Community />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/404" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;