import { Outlet } from 'react-router-dom';
    import Header from './Header';
    import Footer from './Footer';

    const AppLayout = () => {
      return (
        <div className="flex min-h-screen flex-col bg-background font-body text-foreground">
          <Header />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
        </div>
      );
    };

    export default AppLayout;