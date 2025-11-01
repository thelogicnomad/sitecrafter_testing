import { Link } from 'react-router-dom';
    import { Mail, Phone, MapPin } from 'lucide-react';

    const Footer = () => {
      return (
        <footer className="bg-accent text-accent-foreground">
          <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="md:col-span-1">
                <Link to="/" className="flex items-center gap-2">
                    <img src="/favicon.svg" alt="Sweet Delights Logo" className="h-8 w-8" />
                    <span className="font-heading text-2xl font-bold text-secondary">Sweet Delights</span>
                </Link>
                <p className="mt-4 text-muted-foreground">Crafting happiness, one bite at a time. All our products are made with love from the finest ingredients.</p>
              </div>
              <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-secondary">Quick Links</h3>
                  <ul className="mt-4 space-y-2">
                    <li><Link to="/shop" className="hover:text-primary">Shop</Link></li>
                    <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
                    <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-secondary">Legal</h3>
                  <ul className="mt-4 space-y-2">
                    <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-primary">Refund Policy</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-secondary">Contact</h3>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-center gap-2"><MapPin size={16} /> 123 Pastry Lane, Bakeville</li>
                    <li className="flex items-center gap-2"><Phone size={16} /> (123) 456-7890</li>
                    <li className="flex items-center gap-2"><Mail size={16} /> hello@sweetdelights.com</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Sweet Delights Bakery. All rights reserved.</p>
            </div>
          </div>
        </footer>
      );
    };

    export default Footer;