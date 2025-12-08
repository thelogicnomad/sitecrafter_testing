import { NavLink } from 'react-router-dom';
    import { ShoppingBag, Menu, X } from 'lucide-react';
    import { useState } from 'react';
    import { useCartStore } from '@/state/cartStore';
    import { motion, AnimatePresence } from 'framer-motion';

    const navItems = [
      { label: 'Home', href: '/' },
      { label: 'Catalog', href: '/catalog' },
      { label: 'Profile', href: '/profile' },
      { label: 'Contact', href: '/contact' },
    ];

    export default function Header() {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const { totalItems } = useCartStore();

      const mobileMenuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
      };

      return (
        <header className="sticky top-4 z-50 flex justify-center">
          <div className="container px-4">
            <nav className="flex items-center justify-between rounded-full bg-card/80 backdrop-blur-sm p-3 shadow-depth-1 ring-1 ring-black/5">
              <NavLink to="/" className="font-heading text-xl font-bold text-primary">
                ArtisanBake
              </NavLink>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-6">
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors hover:text-primary ${
                        isActive ? 'text-primary' : 'text-foreground/60'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button className="relative rounded-full p-2 hover:bg-muted/50 transition-colors">
                  <ShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                      {totalItems}
                    </span>
                  )}
                </button>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                  <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                    {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </nav>
          </div>
          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="md:hidden absolute top-20 w-[calc(100%-2rem)] bg-card/95 backdrop-blur-sm shadow-depth-1 rounded-2xl p-4"
              >
                <div className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `text-lg font-medium transition-colors p-2 rounded-lg ${
                          isActive ? 'bg-muted text-primary' : 'text-foreground'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      );
    }