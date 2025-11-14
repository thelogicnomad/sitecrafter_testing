import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import PageWrapper from './PageWrapper';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <PageWrapper>
                <Outlet />
            </PageWrapper>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;