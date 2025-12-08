import React from 'react';
    import { Link } from 'react-router-dom';
    import { Facebook, Instagram, Twitter } from 'lucide-react';

    const navLinks = [
      { name: 'Home', path: '/' },
      { name: 'Products', path: '/products' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'Cart', path: '/cart' },
    ];

    export function Footer() {
      const currentYear = new Date().getFullYear();

      return (
        <footer className="bg-[#8A2E4B] text-white py-12 px-6 font-inter">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-white/20 pb-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-[#D9AE73]">ArtisanBake Collective</h3>
              <p className="text-sm leading-relaxed max-w-sm">
                Crafting exquisite handcrafted cakes and pastries with passion and precision.
                Experience luxury in every bite.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-[#D9AE73]">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-white hover:text-[#D9AE73] transition-colors duration-300 text-base"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-[#D9AE73]">Connect With Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-white hover:text-[#D9AE73] transition-colors duration-300"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-white hover:text-[#D9AE73] transition-colors duration-300"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="text-white hover:text-[#D9AE73] transition-colors duration-300"
                >
                  <Twitter size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-white/80">
            &copy; {currentYear} ArtisanBake Collective. All rights reserved.
          </div>
        </footer>
      );
    }