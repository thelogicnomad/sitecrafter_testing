import PageTransition from "@/components/common/PageTransition";
    import { Button } from "@/components/common/Button";
    import { NavLink } from "react-router-dom";

    export default function NotFoundPage() {
      return (
        <PageTransition>
          <div className="min-h-[70vh] flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-6xl font-heading font-bold text-primary sm:text-8xl">404</h1>
              <p className="mt-4 text-2xl font-semibold text-foreground">Page Not Found</p>
              <p className="mt-2 text-lg text-foreground/70">
                Sorry, we couldn't find the page you're looking for.
              </p>
              <div className="mt-8">
                <Button asChild size="lg">
                  <NavLink to="/">Go back home</NavLink>
                </Button>
              </div>
            </div>
          </div>
        </PageTransition>
      );
    }