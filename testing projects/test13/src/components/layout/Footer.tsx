import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Github, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="w-6 h-6 text-[#7B68BE]" />
              <span className="text-white font-bold text-lg">mindful-breaks</span>
            </div>
            <p className="text-sm leading-relaxed">
              Cultivating mental clarity and wellness through guided micro-breaks and mindfulness sessions tailored for the modern professional.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#7B68BE] transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-[#7B68BE] transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-[#7B68BE] transition-colors"><Github size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-[#7B68BE] transition-colors">Home</Link></li>
              <li><Link to="/sessions" className="hover:text-[#7B68BE] transition-colors">Sessions</Link></li>
              <li><Link to="/pricing" className="hover:text-[#7B68BE] transition-colors">Pricing</Link></li>
              <li><Link to="/about" className="hover:text-[#7B68BE] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#7B68BE] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#7B68BE] shrink-0" />
                <span>123 Mindfulness Way, San Francisco, CA 94103</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-[#7B68BE] shrink-0" />
                <span>+1 (555) 000-0000</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-[#7B68BE] shrink-0" />
                <span>hello@mindful-breaks.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Stay Updated</h3>
            <p className="text-sm mb-4">Join our newsletter for weekly mindfulness tips.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-slate-800 border-none rounded-l-md px-4 py-2 text-sm focus:ring-2 focus:ring-[#7B68BE] w-full"
              />
              <button 
                type="submit" 
                className="bg-[#7B68BE] text-white px-4 py-2 rounded-r-md hover:bg-[#6a59a8] transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© {currentYear} mindful-breaks-landing. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};