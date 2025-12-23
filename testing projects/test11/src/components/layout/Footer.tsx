import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  Music 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <Music className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-white tracking-tight">
                taalvista-tabla
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Master the ancient art of Tabla with world-class instructors. From foundational bols to complex compositions, we bring the rhythm of India to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">HomePage</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">AboutPage</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">CoursesPage</Link></li>
              <li><Link to="/instructors" className="hover:text-white transition-colors">InstructorsPage</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">PricingPage</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/contact" className="hover:text-white transition-colors">ContactPage</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">DashboardPage</Link></li>
              <li><Link to="*" className="hover:text-white transition-colors">NotFoundPage</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
                <span>123 Rhythm Lane, Musical District, Pune, Maharashtra 411001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                <span>info@taalvista-tabla.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs">
          <p>© {currentYear} taalvista-tabla-academy. All rights reserved.</p>
          <p>Handcrafted for music lovers worldwide.</p>
        </div>
      </div>
    </footer>
  );
};