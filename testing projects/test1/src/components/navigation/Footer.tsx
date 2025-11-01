import { Home, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold font-heading text-primary">
                <Home className="w-8 h-8 text-accent" />
                <span>Apex Estates</span>
            </Link>
            <p className="text-muted-foreground text-sm text-gray-400">
              Your partner in finding the perfect property.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/listings" className="hover:text-accent transition-colors">Listings</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
              <li><Link to="/saved" className="hover:text-accent transition-colors">Saved Properties</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>info@apexestates.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Property Lane, Metropolis, CA</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Facebook /></a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Twitter /></a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Instagram /></a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Linkedin /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Apex Estates. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;