import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Monitor,
  ArrowRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-white p-1.5 rounded">
                <Monitor className="w-5 h-5 text-[#0A0E27]" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                pixel-studio-agency
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Crafting digital excellence through innovative design and cutting-edge technology. Your vision, our pixels.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Navigation</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-white transition-colors flex items-center group"><ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-all" /> Home</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors flex items-center group"><ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-all" /> Portfolio</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors flex items-center group"><ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-all" /> Services</Link></li>
              <li><Link to="/process" className="hover:text-white transition-colors flex items-center group"><ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-all" /> Process</Link></li>
              <li><Link to="/team" className="hover:text-white transition-colors flex items-center group"><ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-all" /> Team</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-slate-500 shrink-0" />
                <span className="text-sm">123 Pixel Plaza, Digital District,<br />San Francisco, CA 94103</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-slate-500 shrink-0" />
                <span className="text-sm">+1 (555) 000-PIXL</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-slate-500 shrink-0" />
                <span className="text-sm">hello@pixel-studio.agency</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Stay Updated</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter for the latest digital insights.</p>
            <form className="flex flex-col space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-slate-800 border-none rounded px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs">
            © {currentYear} pixel-studio-agency. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs">
            <Link to="/404" className="hover:text-white">Privacy Policy</Link>
            <Link to="/404" className="hover:text-white">Terms of Service</Link>
            <Link to="/404" className="hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};