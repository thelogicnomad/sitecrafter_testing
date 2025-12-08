import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/state/cartStore';
import PillNav from '@/components/ui/PillNav';
import { useEffect, useState } from 'react';

const Header = () => {
  const cartItems = useCartStore((state) => state.items);
  const location = useLocation();
  const [activeHref, setActiveHref] = useState(location.pathname);

  useEffect(() => {
    setActiveHref(location.pathname);
  }, [location]);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Catalog', href: '/catalog' },
    { label: 'Profile', href: '/profile' },
    { label: 'Contact', href: '/contact' },
  ];

  const logo = (
    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M54.807 26.6346C54.807 24.5135 53.0761 22.7827 50.955 22.7827C48.8339 22.7827 47.103 24.5135 47.103 26.6346V41.0135C47.103 48.0135 41.513 53.6035 34.513 53.6035H29.487C22.487 53.6035 16.897 48.0135 16.897 41.0135V26.6346C16.897 24.5135 15.1661 22.7827 13.045 22.7827C10.9239 22.7827 9.19301 24.5135 9.19301 26.6346C9.19301 30.6346 9.19301 41.0135 9.19301 41.0135C9.19301 50.7835 17.063 58.6535 26.833 58.6535H37.167C46.937 58.6535 54.807 50.7835 54.807 41.0135V26.6346Z" fill="currentColor"/>
      <path d="M47.103 20.109C47.103 20.109 41.513 10.339 32 10.339C22.487 10.339 16.897 20.109 16.897 20.109H47.103Z" fill="currentColor"/>
      <path d="M32 5.34619C34.121 5.34619 35.8519 3.61531 35.8519 1.49423C35.8519 -0.626847 34.121 -2.35769 32 -2.35769C29.879 -2.35769 28.1481 -0.626847 28.1481 1.49423C28.1481 3.61531 29.879 5.34619 32 5.34619Z" fill="hsl(var(--accent))"/>
    </svg>
  );

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <PillNav
        logo={logo}
        logoAlt="ArtisanBake Co."
        items={navItems}
        activeHref={activeHref}
        baseColor="hsl(var(--primary))"
        pillColor="hsl(var(--accent))"
        pillTextColor="hsl(var(--accent-foreground))"
        hoveredPillTextColor="hsl(var(--primary-foreground))"
      >
        <div className="relative text-primary hover:text-accent transition-colors">
          <ShoppingBag size={24} />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
              {cartItems.length}
            </span>
          )}
        </div>
      </PillNav>
    </header>
  );
};

export default Header;