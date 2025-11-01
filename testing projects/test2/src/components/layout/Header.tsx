import { Link } from 'react-router-dom';
    import PillNav from '@/components/ui/PillNav';
    import useCartStore from '@/store/cartStore';
    import { ShoppingBag } from 'lucide-react';
    import ClickSpark from '@/components/ui/ClickSpark';

    const navItems = [
      { label: 'Home', href: '/' },
      { label: 'Shop', href: '/shop' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ];

    const Header = () => {
      const { items } = useCartStore();
      const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

      return (
        <header className="sticky top-4 z-50 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between rounded-full bg-background/80 p-2 shadow-md backdrop-blur-sm">
            <Link to="/" className="ml-4 flex items-center gap-2">
                <img src="/favicon.svg" alt="Sweet Delights Logo" className="h-8 w-8" />
                <span className="font-heading text-xl font-bold text-secondary">Sweet Delights</span>
            </Link>
            <PillNav items={navItems} baseColor="hsl(220 10% 20%)" pillColor="hsl(330 50% 65%)" hoveredPillTextColor="hsl(30 20% 98%)" pillTextColor="hsl(30 20% 98%)" />
            <ClickSpark>
                <Link to="/cart" className="relative mr-4 rounded-full p-2 transition-colors hover:bg-accent">
                    <ShoppingBag className="h-6 w-6 text-secondary" />
                    {cartItemCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                            {cartItemCount}
                        </span>
                    )}
                </Link>
            </ClickSpark>
          </div>
        </header>
      );
    };

    export default Header;