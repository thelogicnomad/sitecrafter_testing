import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { ShinyText } from '@/components/ui/ShinyText';
import { Card } from '@/components/ui/Card';
import { Star, ShoppingBag, Heart, Share2, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);

  const tabs = [
    {
      id: 'ingredients',
      label: 'Ingredients',
      content: (
        <div className="space-y-4 text-stone-600">
          <p>We believe in transparency. This creation contains:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>72% Single-origin Valrhona Dark Chocolate</li>
            <li>Organic AOP Charentes-Poitou Butter</li>
            <li>Hand-harvested Fleur de Sel from Guérande</li>
            <li>Madagascar Bourbon Vanilla Beans</li>
            <li>Farm-fresh organic eggs and flour</li>
          </ul>
          <p className="text-sm italic mt-4 text-[#911B44]">Allergy Warning: Contains nuts, dairy, and gluten.</p>
        </div>
      )
    },
    {
      id: 'story',
      label: 'The Story',
      content: (
        <div className="text-stone-600 leading-relaxed">
          <p>The Midnight Velvet was inspired by the night sky over the Seine. Our Master Chef wanted to capture the deep, velvety darkness of the river, accented by the shimmering lights of the Eiffel Tower, represented here by genuine 24k edible gold leaf.</p>
          <p className="mt-4">Developed over six months of rigorous testing, this cake represents the pinnacle of our "Gilded" philosophy.</p>
        </div>
      )
    },
    {
      id: 'shipping',
      label: 'Delivery Info',
      content: (
        <div className="space-y-4 text-stone-600">
          <p>To maintain peak freshness, we handle our own deliveries within a 50-mile radius of our boutiques.</p>
          <div className="flex items-center gap-3 text-sm">
            <Truck size={18} className="text-[#911B44]" />
            <span>Temperature-controlled courier service.</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <ShieldCheck size={18} className="text-[#911B44]" />
            <span>Guaranteed arrival in pristine condition.</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-2xl overflow-hidden bg-stone-100 shadow-inner"
            >
              <img 
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1200" 
                alt="The Midnight Velvet" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-[#911B44] transition-all">
                  <img 
                    src={`https://picsum.photos/seed/cake-detail-${i}/300/300`} 
                    alt="Detail view" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-[#911B44]">Bestseller</Badge>
              <div className="flex items-center text-amber-500">
                <Star size={16} fill="currentColor" />
                <span className="ml-1 text-sm font-bold text-stone-900">4.9 (128 reviews)</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif text-[#2D231E] mb-2">The Midnight Velvet</h1>
            <p className="text-2xl font-light text-[#911B44] mb-6">$85.00</p>
            
            <p className="text-stone-600 mb-8 text-lg leading-relaxed">
              Our signature masterpiece. A rich, dark cocoa sponge layered with silky raspberry reduction 
              and enrobed in a mirror-glaze ganache, finished with genuine 24k gold leaf.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="flex border rounded-lg overflow-hidden">
                  <button 
                    className="px-4 py-2 hover:bg-stone-100"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  > - </button>
                  <span className="px-6 py-2 border-x flex items-center">{quantity}</span>
                  <button 
                    className="px-4 py-2 hover:bg-stone-100"
                    onClick={() => setQuantity(quantity + 1)}
                  > + </button>
                </div>
                <Button className="flex-1 bg-[#2D231E] hover:bg-[#1a1512] text-white h-12 gap-2">
                  <ShoppingBag size={18} /> Add to Cart
                </Button>
                <Button variant="outline" className="h-12 w-12 p-0">
                  <Heart size={18} />
                </Button>
              </div>
              <Button variant="outline" className="w-full gap-2 text-stone-600">
                <Share2 size={18} /> Share with Friends
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t pt-8">
              <div className="text-center">
                <div className="flex justify-center mb-2 text-[#911B44]"><Truck size={24} /></div>
                <p className="text-xs font-bold uppercase tracking-wider">Local Delivery</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2 text-[#911B44]"><ShieldCheck size={24} /></div>
                <p className="text-xs font-bold uppercase tracking-wider">Secure Pay</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2 text-[#911B44]"><RotateCcw size={24} /></div>
                <p className="text-xs font-bold uppercase tracking-wider">Freshness Gtd.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs */}
        <div className="max-w-4xl mx-auto">
          <Tabs tabs={tabs} />
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <h2 className="text-3xl font-serif text-[#2D231E] mb-8 text-center">You May Also Exquisite</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="group cursor-pointer border-none bg-stone-50 overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/related-${i}/400/500`} 
                    alt="Related product" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <h4 className="font-serif text-[#2D231E]">Gilded Collection Item</h4>
                  <p className="text-[#911B44] font-bold">$45.00</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;