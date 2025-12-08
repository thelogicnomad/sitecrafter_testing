import { Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'Github' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const footerLinks = [
    { title: 'Shop', links: ['Catalog', 'Wedding Cakes', 'Seasonal Specials'] },
    { title: 'About Us', links: ['Our Story', 'Baking Process', 'Careers'] },
    { title: 'Support', links: ['Contact Us', 'FAQ', 'Delivery Information'] },
  ];

  return (
    <footer className="bg-primary-light text-primary-foreground/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-display font-bold text-primary-foreground">ArtisanBake Co.</h3>
            <p className="mt-4 text-sm">Handcrafted elegance, baked for your moment.</p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} className="hover:text-primary-foreground transition-colors" aria-label={social.label}>
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-primary-foreground">{section.title}</h4>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-primary-foreground transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 border-t border-primary-foreground/20 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ArtisanBake Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;