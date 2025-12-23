import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, UtensilsCrossed } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand and Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <UtensilsCrossed className="h-6 w-6 text-gray-300" />
              <span className="text-xl font-bold tracking-tight">savory-bistro-web</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience the art of fine dining. We bring together fresh local ingredients and 
              culinary passion to create unforgettable moments.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Explore</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">HomePage</Link></li>
              <li><Link to="/menu" className="text-gray-400 hover:text-white transition-colors text-sm">MenuPage</Link></li>
              <li><Link to="/book-a-table" className="text-gray-400 hover:text-white transition-colors text-sm">ReservationPage</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-white transition-colors text-sm">GalleryPage</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">AboutPage</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-gray-400">
                <MapPin className="h-5 w-5 flex-shrink-0 text-gray-300" />
                <span>123 Culinary Avenue, Gourmet District, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <Phone className="h-5 w-5 flex-shrink-0 text-gray-300" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <Mail className="h-5 w-5 flex-shrink-0 text-gray-300" />
                <span>hello@savory-bistro.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Opening Hours</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex justify-between">
                <span>Mon - Thu:</span>
                <span>11:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Fri - Sat:</span>
                <span>11:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between text-white font-medium">
                <span>Sunday:</span>
                <span>10:00 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>© {currentYear} savory-bistro-web. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};