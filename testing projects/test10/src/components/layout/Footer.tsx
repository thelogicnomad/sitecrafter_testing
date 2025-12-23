import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-white">
              <GraduationCap className="h-8 w-8 text-[#1B4592]" />
              <span className="font-bold text-lg">Karnataka Education Nexus</span>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering the next generation of leaders through quality education and seamless digital integration across Karnataka's premier institutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#1B4592] transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-[#1B4592] transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-[#1B4592] transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-[#1B4592] transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">HomePage</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">Course Catalog</Link></li>
              <li><Link to="/admissions" className="hover:text-white transition-colors">Admissions Guide</Link></li>
              <li><Link to="/faculty" className="hover:text-white transition-colors">Faculty Directory</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Student Dashboard</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/404" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#1B4592] shrink-0" />
                <span>123 Education Lane, Vidhana Soudha Area, Bengaluru, Karnataka 560001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-[#1B4592] shrink-0" />
                <span>+91 80 2222 4444</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-[#1B4592] shrink-0" />
                <span>info@karnataka-nexus.edu.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          <p>© {currentYear} Karnataka Education Nexus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};