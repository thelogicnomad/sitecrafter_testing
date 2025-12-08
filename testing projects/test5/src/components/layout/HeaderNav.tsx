import { Link, NavLink } from 'react-router-dom';
import { Cookie, ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Catalog', path: '/catalog' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const HeaderNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  // This is a common pattern to avoid hydration mismatch with persisted state
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(totalItems);
  }, [totalItems]);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-max flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Cookie className="h-7 w-7 text-primary" />
          <span className="font-heading text-xl font-bold text-foreground">Artisan Bakehouse</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground"
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="relative">
            <ShoppingBag className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </div>
          <button className="md:hidden" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-0 inset-x-0 p-2 transition transform origin-top-right z-50 bg-background"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-popover divide-y-2 divide-border">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <Cookie className="h-7 w-7 text-primary" />
                    <span className="font-heading text-xl font-bold">Artisan Bakehouse</span>
                  </Link>
                  <div className="-mr-2">
                    <button
                      onClick={toggleMenu}
                      className="bg-popover rounded-md p-2 inline-flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {navLinks.map((link) => (
                      <NavLink
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            "-m-3 p-3 flex items-center rounded-md hover:bg-secondary text-base font-medium",
                            isActive ? "text-primary" : "text-foreground"
                          )
                        }
                      >
                        {link.name}
                      </NavLink>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default HeaderNav;