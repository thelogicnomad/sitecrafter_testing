import { NavLink } from 'react-router-dom';
    import { Github, Twitter, Instagram } from 'lucide-react';

    export default function Footer() {
      return (
        <footer className="bg-primary-light text-primary-foreground/80 mt-20">
          <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-heading text-xl text-primary-foreground font-bold">ArtisanBake</h3>
                <p className="mt-2 text-sm">Handcrafted elegance, baked for your moment.</p>
                <div className="flex mt-4 space-x-4">
                  <a href="#" className="hover:text-primary-foreground"><Github size={20} /></a>
                  <a href="#" className="hover:text-primary-foreground"><Twitter size={20} /></a>
                  <a href="#" className="hover:text-primary-foreground"><Instagram size={20} /></a>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-primary-foreground">Quick Links</h4>
                <ul className="mt-2 space-y-2">
                  <li><NavLink to="/catalog" className="hover:text-primary-foreground text-sm">Catalog</NavLink></li>
                  <li><NavLink to="/profile" className="hover:text-primary-foreground text-sm">My Account</NavLink></li>
                  <li><NavLink to="/contact" className="hover:text-primary-foreground text-sm">Contact Us</NavLink></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-primary-foreground">Support</h4>
                <ul className="mt-2 space-y-2">
                  <li><a href="#" className="hover:text-primary-foreground text-sm">FAQ</a></li>
                  <li><a href="#" className="hover:text-primary-foreground text-sm">Shipping Policy</a></li>
                  <li><a href="#" className="hover:text-primary-foreground text-sm">Terms of Service</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-primary-foreground">Newsletter</h4>
                <p className="mt-2 text-sm">Subscribe for exclusive offers and new recipes.</p>
                <form className="mt-4 flex">
                  <input type="email" placeholder="Your email" className="w-full rounded-l-md border-none px-3 py-2 text-sm bg-primary text-primary-foreground focus:ring-accent" />
                  <button className="bg-accent text-accent-foreground px-4 rounded-r-md text-sm font-semibold">Sign Up</button>
                </form>
              </div>
            </div>
            <div className="mt-8 border-t border-primary-foreground/20 pt-8 text-center text-sm">
              <p>&copy; {new Date().getFullYear()} ArtisanBake Co. All rights reserved.</p>
            </div>
          </div>
        </footer>
      );
    }