import React, { useState } from 'react';
    import { Link } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence
    import { Menu, X } from 'lucide-react';
    import { cn } from '@/lib/utils';

    const navLinks = [
      { name: 'Home', path: '/' },
      { name: 'Products', path: '/products' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'Cart', path: '/cart' },
    ];

    export function Header() {
      const [isOpen, setIsOpen] = useState(false);

      const toggleMenu = () => {
        setIsOpen(!isOpen);
      };

      const menuVariants = {
        hidden: { opacity: 0, x: "100%" },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
        exit: { opacity: 0, x: "100%", transition: { duration: 0.3, ease: "easeIn" } },
      };

      return (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
          className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm py-4 px-6 font-poppins"
        >
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-[#8A2E4B] hover:text-[#D9AE73] transition-colors duration-300">
              ArtisanBake Collective
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-700 hover:text-[#8A2E4B] text-lg font-medium transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8A2E4B] group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-700" onClick={toggleMenu} aria-label="Toggle navigation">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={menuVariants}
                  className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-8 md:hidden"
                >
                  <button className="absolute top-6 right-6 text-gray-700" onClick={toggleMenu} aria-label="Close navigation">
                    <X size={32} />
                  </button>
                  <nav className="flex flex-col space-y-8 text-center">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={toggleMenu}
                        className="text-3xl font-semibold text-gray-800 hover:text-[#8A2E4B] transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      );
    }