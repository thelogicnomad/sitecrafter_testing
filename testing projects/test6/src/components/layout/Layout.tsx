import React from 'react';
    import { PillNav } from '@/components/ui/PillNav';
    import { Music4 } from 'lucide-react';

    export function Layout({ children }: { children: React.ReactNode }) {
      const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Courses', href: '/courses' },
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' }
      ];

      return (
        <div className="flex flex-col min-h-screen">
          <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl">
            <PillNav
              logo={<Music4 className="h-6 w-6 text-primary-foreground" />}
              logoText="TablaMaster"
              items={navItems}
              baseColor="hsl(var(--primary))"
              pillColor="hsl(var(--background))"
              hoveredPillTextColor="hsl(var(--foreground))"
              pillTextColor="hsl(var(--foreground))"
              activePillTextColor="hsl(var(--primary))"
            />
          </header>
          <main className="flex-grow pt-24">{children}</main>
          <Footer />
        </div>
      );
    }
    
    const Footer = () => {
      return (
        <footer className="bg-muted">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-lg font-heading text-foreground">TablaMaster</h3>
                    <p className="mt-4 text-muted-foreground text-sm">Rhythm, Precision, and Soul.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground">Quick Links</h4>
                    <ul className="mt-4 space-y-2 text-sm">
                        <li><a href="/about" className="text-muted-foreground hover:text-primary">About Us</a></li>
                        <li><a href="/courses" className="text-muted-foreground hover:text-primary">Courses</a></li>
                        <li><a href="/contact" className="text-muted-foreground hover:text-primary">Contact</a></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-foreground">Legal</h4>
                    <ul className="mt-4 space-y-2 text-sm">
                        <li><a href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</a></li>
                        <li><a href="#" className="text-muted-foreground hover:text-primary">Terms of Service</a></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-foreground">Connect</h4>
                    <ul className="mt-4 space-y-2 text-sm">
                        <li><a href="#" className="text-muted-foreground hover:text-primary">Twitter</a></li>
                        <li><a href="#" className="text-muted-foreground hover:text-primary">Facebook</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} TablaMaster. All rights reserved.</p>
            </div>
          </div>
        </footer>
      );
    }