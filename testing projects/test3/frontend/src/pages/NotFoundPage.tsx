import React from 'react';
    import { Link } from 'react-router-dom';
    import Button from '@/components/common/Button';
    import { usePageTitle } from '@/hooks/usePageTitle';

    const NotFoundPage: React.FC = () => {
        usePageTitle('Page Not Found');
      return (
        <div className="flex items-center justify-center min-h-[calc(100vh-160px)] text-center">
          <div>
            <h1 className="text-9xl font-bold text-au-accent">404</h1>
            <h2 className="mt-4 text-3xl font-bold text-au-primary">Page Not Found</h2>
            <p className="mt-2 text-au-text-muted">
              Sorry, the page you are looking for does not exist.
            </p>
            <div className="mt-6">
              <Link to="/">
                <Button variant="primary" size="large">Go to Homepage</Button>
              </Link>
            </div>
          </div>
        </div>
      );
    };

    export default NotFoundPage;