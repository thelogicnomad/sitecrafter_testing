import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Cake } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <Cake className="h-6 w-6 text-[#911B44]" />
              <span className="text-lg font-bold">gilded-patisserie</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Crafting exquisite artisanal desserts and custom cakes for your most precious moments. Every bite is a touch of luxury.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#911B44] transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-[#911B44] transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-[#911B44] transition-colors"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/cakes" className="hover:text-white transition-colors">Cakes & Pastries</Link></li>
              <li><Link to="/customize" className="hover:text-white transition-colors">Custom Orders</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="*" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="*" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link to="*" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="*" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#911B44] shrink-0" />
                <span>123 Patisserie Lane, Sugar District, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#911B44] shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#911B44] shrink-0" />
                <span>hello@gilded-patisserie.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          <p>© {currentYear} gilded-patisserie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};