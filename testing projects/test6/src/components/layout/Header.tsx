import PillNav from '@/components/ui/PillNav';
    import { useLocation } from 'react-router-dom';

    const navItems = [
      { label: 'Home', href: '/' },
      { label: 'Courses', href: '/courses' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ];

    const Header = () => {
      const location = useLocation();

      return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4">
            <PillNav
              logo="/favicon.svg"
              logoAlt="TablaMaster Logo"
              items={navItems}
              activeHref={location.pathname}
              ease="power2.out"
              baseColor="hsl(var(--primary-foreground))"
              pillColor="hsl(var(--primary))"
              hoveredPillTextColor="hsl(var(--primary))"
              pillTextColor="hsl(var(--primary-foreground))"
            />
        </header>
      );
    };

    export default Header;