import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Cloud, Activity } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Experiences', path: '/experiences' },
  { name: 'Leaderboard', path: '/leaderboard' },
  { name: 'Community', path: '/community' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Blog', path: '/blog' },
  { name: 'NotFound', path: '/404' },
];

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-[#0D1B2A] p-1.5 rounded-lg transition-transform group-hover:scale-110">
                <Cloud className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#0D1B2A]">
                cloudverse<span className="text-blue-600">-vr</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm font-medium text-slate-600 hover:text-[#0D1B2A] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:block">
            <button className="rounded-full bg-[#0D1B2A] px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-95">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-[#0D1B2A] focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="space-y-1 px-4 pb-6 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0D1B2A]"
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 px-3">
              <button className="w-full rounded-lg bg-[#0D1B2A] py-3 text-center text-sm font-semibold text-white">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};