import { Link } from 'react-router-dom';
import SeoMeta from '@/components/shared/SeoMeta';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <SeoMeta title="404: Page Not Found" description="The page you are looking for does not exist.">
      <div className="container-max section-spacing text-center">
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <h2 className="text-4xl font-heading font-bold mt-4">Page Not Found</h2>
        <p className="text-muted-foreground mt-2">Sorry, we couldn't find the page you're looking for.</p>
        <Button asChild className="mt-8">
          <Link to="/">Go back to Homepage</Link>
        </Button>
      </div>
    </SeoMeta>
  );
};

export default NotFoundPage;