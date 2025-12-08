import { Link } from 'react-router-dom';
    import { Music, Twitter, Facebook, Instagram } from 'lucide-react';

    const Footer = () => {
      return (
        <footer className="bg-muted text-muted-foreground">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <Link to="/" className="flex items-center space-x-2">
                  <Music className="h-8 w-8 text-primary" />
                  <span className="text-xl font-bold font-heading text-foreground">TablaMaster</span>
                </Link>
                <p className="text-sm">
                  Mastering the art of rhythm, one beat at a time.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-muted-foreground hover:text-foreground"><Twitter /></a>
                  <a href="#" className="text-muted-foreground hover:text-foreground"><Facebook /></a>
                  <a href="#" className="text-muted-foreground hover:text-foreground"><Instagram /></a>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-4">Explore</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/courses" className="hover:text-foreground">Courses</Link></li>
                  <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
                  <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-4">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-foreground">Blog</a></li>
                  <li><a href="#" className="hover:text-foreground">FAQ</a></li>
                  <li><a href="#" className="hover:text-foreground">Support</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-muted-foreground/20 text-center text-sm">
              <p>&copy; {new Date().getFullYear()} TablaMaster. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      );
    };

    export default Footer;