import { useState, useEffect } from 'react';
    import { Link, useLocation } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Menu, X, ChevronDown } from 'lucide-react';
    import Button from '../common/Button';
    import { cn } from '@/lib/utils';
    import { NavigationItem } from '@/types';
    import AULogo from '/favicon.svg'

    const NAV_ITEMS: NavigationItem[] = [
        {
            label: 'Academics', href: '/academics', isDropdown: true, subItems: [
                { label: 'Programs', href: '/academics' },
                { label: 'Research', href: '/academics' },
            ]
        },
        { label: 'Admissions', href: '/admissions' },
        { label: 'About AU', href: '/about' },
        { label: 'Campus Life', href: '/campus-life' },
    ];

    const Header = () => {
        const [isScrolled, setIsScrolled] = useState(false);
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const location = useLocation();

        useEffect(() => {
            const handleScroll = () => {
                setIsScrolled(window.scrollY > 10);
            };
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }, []);

        useEffect(() => {
            setIsMenuOpen(false);
        }, [location.pathname]);

        return (
            <header className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "bg-au-surface/80 backdrop-blur-sm shadow-nav" : "bg-transparent"
            )}>
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <Link to="/" className="flex items-center gap-2">
                           <img src={AULogo} alt="Aethelred University Logo" className="h-10 w-10"/>
                            <span className="font-serif text-xl font-bold text-au-primary">Aethelred University</span>
                        </Link>
                        
                        <nav className="hidden lg:flex items-center space-x-8">
                            {NAV_ITEMS.map((item) => <NavItem key={item.label} item={item} />)}
                        </nav>
                        
                        <div className="hidden lg:block">
                            <Button variant="secondary" size="medium">Apply Now</Button>
                        </div>

                        <div className="lg:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                                <Menu className="h-6 w-6 text-au-primary" />
                            </button>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {isMenuOpen && <MobileMenu closeMenu={() => setIsMenuOpen(false)} />}
                </AnimatePresence>
            </header>
        );
    };

    const NavItem = ({ item }: { item: NavigationItem }) => {
        const [isOpen, setIsOpen] = useState(false);
        const location = useLocation();
        const isActive = location.pathname.startsWith(item.href);

        if (item.isDropdown) {
            return (
                <div 
                    className="relative"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                >
                    <button className={cn(
                        "flex items-center space-x-1 font-semibold text-au-primary hover:text-au-accent transition-colors",
                        isActive && "text-au-accent"
                    )}>
                        <span>{item.label}</span>
                        <ChevronDown className="h-4 w-4" />
                    </button>
                    <AnimatePresence>
                        {isOpen && item.subItems && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 mt-2 w-48 bg-au-surface rounded-lg shadow-lg p-2"
                            >
                                {item.subItems.map(subItem => (
                                    <Link key={subItem.label} to={subItem.href} className="block px-4 py-2 text-sm text-au-primary hover:bg-au-bg-light rounded">
                                        {subItem.label}
                                    </Link>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            );
        }

        return (
            <Link to={item.href} className={cn(
                "font-semibold text-au-primary hover:text-au-accent transition-colors",
                isActive && "text-au-accent"
            )}>
                {item.label}
            </Link>
        );
    };

    const MobileMenu = ({ closeMenu }: { closeMenu: () => void }) => {
        return (
            <motion.div
                initial={{ opacity: 0, y: "-100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "-100%" }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed inset-0 bg-au-surface z-50 lg:hidden"
            >
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex items-center justify-between h-20">
                        <Link to="/" className="flex items-center gap-2">
                             <img src={AULogo} alt="Aethelred University Logo" className="h-10 w-10"/>
                            <span className="font-serif text-xl font-bold text-au-primary">Aethelred University</span>
                        </Link>
                        <button onClick={closeMenu} aria-label="Close menu">
                            <X className="h-6 w-6 text-au-primary" />
                        </button>
                    </div>
                    <nav className="flex flex-col items-center justify-center h-[calc(100vh-80px)] space-y-8 text-2xl font-semibold">
                        {NAV_ITEMS.map((item) => (
                            <Link key={item.label} to={item.href} className="text-au-primary hover:text-au-accent transition-colors">
                                {item.label}
                            </Link>
                        ))}
                        <Button variant="secondary" size="large">Apply Now</Button>
                    </nav>
                </div>
            </motion.div>
        );
    };

    export default Header;