import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Music } from 'lucide-react';

interface NavLink {
  name: string;
  path: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Courses', path: '/courses' },
  { name: 'Instructors', path: '/instructors' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Contact', path: '/contact' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: '404', path: '*' },
];

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-[#2d5a88] rounded-lg group-hover:bg-[#2d5a88]/90 transition-colors">
              <Music className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              taalvista-<span className="text-[#2d5a88]">tabla</span>-academy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-slate-600 hover:text-[#2d5a88] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/dashboard"
              className="bg-[#2d5a88] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#2d5a88]/90 transition-all shadow-md hover:shadow-lg"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-[#2d5a88] hover:bg-slate-100 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1 bg-white border-b border-slate-100">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-slate-600 hover:text-[#2d5a88] hover:bg-slate-50"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 px-3">
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-[#2d5a88] text-white px-4 py-3 rounded-md font-bold shadow-md"
            >
              Student Portal
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};