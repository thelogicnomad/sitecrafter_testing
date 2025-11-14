import React from 'react';
    import { Link } from 'react-router-dom';
    import { Facebook, Twitter, Linkedin } from 'lucide-react';

    const Footer: React.FC = () => {
      const socialLinks = [
        { icon: <Twitter />, href: '#' },
        { icon: <Facebook />, href: '#' },
        { icon: <Linkedin />, href: '#' },
      ];

      return (
        <footer className="bg-au-primary text-au-surface">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <h3 className="text-lg font-bold">Aethelred University</h3>
                <p className="text-sm text-au-text-muted/70 mt-2">123 University Ave,<br/>Aethelburg, AB 12345</p>
                <p className="text-sm text-au-text-muted/70 mt-2">(123) 456-7890</p>
              </div>
              <div>
                <h4 className="font-semibold">Academics</h4>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><Link to="/academics" className="hover:text-au-accent">Programs</Link></li>
                  <li><Link to="#" className="hover:text-au-accent">Research</Link></li>
                  <li><Link to="#" className="hover:text-au-accent">Departments</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Quick Links</h4>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><Link to="/admissions" className="hover:text-au-accent">Admissions</Link></li>
                  <li><Link to="/about" className="hover:text-au-accent">About AU</Link></li>
                  <li><Link to="/campus-life" className="hover:text-au-accent">Campus Life</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Connect</h4>
                <div className="flex space-x-4 mt-4">
                  {socialLinks.map((link, index) => (
                    <a key={index} href={link.href} className="hover:text-au-accent">
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-12 border-t border-au-text-muted/30 pt-8 text-center text-sm text-au-text-muted/70">
              <p>&copy; {new Date().getFullYear()} Aethelred University. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      );
    };

    export default Footer;