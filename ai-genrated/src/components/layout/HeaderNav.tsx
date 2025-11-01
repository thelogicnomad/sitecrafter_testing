import { NavLink, useLocation } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { cn } from '@/lib/utils';
    import { Button } from '@/components/ui/Button';

    const navItems = [
      { href: '/', label: 'Home' },
      { href: '/courses', label: 'Courses' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/dashboard', label: 'Dashboard' },
    ];

    export default function HeaderNav() {
      const location = useLocation();
      const activePath = location.pathname;

      return (
        <header className="sticky top-4 z-50 mx-auto max-w-5xl">
          <nav className="relative mx-4 flex items-center justify-between rounded-full bg-background/70 p-2 shadow-lg backdrop-blur-md">
            <NavLink to="/" className="flex items-center gap-2 pl-4">
              <img src="/logo.svg" alt="Catalyst logo" className="h-8 w-8" />
              <span className="font-heading text-xl font-bold text-foreground">Catalyst</span>
            </NavLink>
            <div className="hidden items-center gap-2 md:flex">
              {navItems.map((item) => (
                <NavLink key={item.href} to={item.href} className="relative rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary">
                  {item.label}
                  {activePath === item.href && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                      layoutId="catalyst-focus-bar"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </NavLink>
              ))}
            </div>
            <Button className="mr-2" variant="secondary">Sign In</Button>
          </nav>
        </header>
      );
    }