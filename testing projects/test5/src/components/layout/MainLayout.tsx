import { Outlet } from 'react-router-dom';
import HeaderNav from './HeaderNav';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderNav />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;