import { NavLink } from 'react-router-dom';

    export default function FooterArea() {
      return (
        <footer className="bg-muted text-muted-foreground">
          <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div className="md:col-span-1">
                <NavLink to="/" className="flex items-center gap-2">
                  <img src="/logo.svg" alt="Catalyst logo" className="h-8 w-8" />
                  <span className="font-heading text-xl font-bold text-foreground">Catalyst</span>
                </NavLink>
                <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} Catalyst Inc. All rights reserved.</p>
              </div>
              <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3">
                <div>
                  <h3 className="font-semibold text-foreground">Platform</h3>
                  <ul className="mt-4 space-y-2">
                    <li><NavLink to="/courses" className="hover:text-primary">Courses</NavLink></li>
                    <li><NavLink to="/about" className="hover:text-primary">About Us</NavLink></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Support</h3>
                  <ul className="mt-4 space-y-2">
                    <li><NavLink to="/contact" className="hover:text-primary">Contact</NavLink></li>
                    <li><NavLink to="/faq" className="hover:text-primary">FAQ</NavLink></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Legal</h3>
                  <ul className="mt-4 space-y-2">
                    <li><NavLink to="/terms" className="hover:text-primary">Terms of Service</NavLink></li>
                    <li><NavLink to="/privacy" className="hover:text-primary">Privacy Policy</NavLink></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      );
    }