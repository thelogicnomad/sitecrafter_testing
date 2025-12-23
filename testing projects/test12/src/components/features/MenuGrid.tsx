import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// CHANGED: Removed unused imports (Container, Badge, cn)

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'starters' | 'mains' | 'desserts' | 'cocktails';
  image: string;
  isChefSpecial?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Truffle Burrata',
    description: 'Fresh burrata, black truffle oil, heirloom tomatoes, and aged balsamic glaze.',
    price: '$18',
    category: 'starters',
    image: 'https://picsum.photos/800/600?random=1',
    isChefSpecial: true,
  },
  {
    id: '2',
    name: 'Wagyu Ribeye',
    description: 'Grade A5 Wagyu, roasted bone marrow, garlic mash, and red wine reduction.',
    price: '$65',
    category: 'mains',
    image: 'https://picsum.photos/800/600?random=2',
    isChefSpecial: true,
  },
  {
    id: '3',
    name: 'Pan-Seared Scallops',
    description: 'Jumbo scallops, pea purée, crispy pancetta, and lemon butter sauce.',
    price: '$32',
    category: 'mains',
    image: 'https://picsum.photos/800/600?random=3',
  },
  {
    id: '4',
    name: 'Gold Leaf Soufflé',
    description: 'Dark chocolate soufflé with edible gold leaf and Tahitian vanilla bean gelato.',
    price: '$22',
    category: 'desserts',
    image: 'https://picsum.photos/800/600?random=4',
  },
  {
    id: '5',
    name: 'Smoked Old Fashioned',
    description: 'Bourbon, maple syrup, bitters, smoked with cherry wood chips.',
    price: '$16',
    category: 'cocktails',
    image: 'https://picsum.photos/800/600?random=5',
  },
  {
    id: '6',
    name: 'Wild Mushroom Risotto',
    description: 'Arborio rice, porcini mushrooms, parmesan crisp, and fresh herbs.',
    price: '$28',
    category: 'mains',
    image: 'https://picsum.photos/800/600?random=6',
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'starters', label: 'Starters' },
  { id: 'mains', label: 'Mains' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'cocktails', label: 'Cocktails' },
];

export const MenuGrid = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = activeCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-2">Fine Dining Menu</h1>
          <p className="text-zinc-600">Curated culinary experiences</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-200 ${activeCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

const MenuItemCard = ({ item }: { item: MenuItem }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-lg overflow-hidden border border-zinc-200 hover:border-amber-600/30 hover:shadow-xl transition-all duration-500"
    >
      <div className="relative h-64 overflow-hidden bg-zinc-100">
        {!imgError ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-zinc-400">Image Unavailable</span>
          </div>
        )}
        {item.isChefSpecial && (
          <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            Chef's Special
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-zinc-900 group-hover:text-amber-600 transition-colors duration-300">
            {item.name}
          </h3>
          <span className="text-lg font-bold text-amber-600">{item.price}</span>
        </div>
        <p className="text-zinc-600 text-sm leading-relaxed italic">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};