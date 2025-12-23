import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { MenuGrid } from '@/components/features/MenuGrid';
import { Card } from '@/components/ui/Card';
import { Star, Flame, Leaf } from 'lucide-react';

const MenuPage = () => {
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const handleImgError = (id: string) => {
    setImgError((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Menu Header */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          {!imgError['menu-bg'] ? (
            <img 
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1600" 
              alt="Culinary background"
              className="w-full h-full object-cover"
              onError={() => handleImgError('menu-bg')}
              crossOrigin="anonymous"
            />
          ) : (
            <div className="w-full h-full bg-slate-800" />
          )}
        </div>
        <Container className="relative z-10 text-center">
          <Badge className="mb-4 bg-[#C5A059] text-white border-none">CURATED EXPERIENCE</Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Our Menu</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A celebration of seasonal ingredients, traditional techniques, and modern culinary vision.
          </p>
        </Container>
      </section>

      {/* Daily Specials / Featured */}
      <Section className="bg-slate-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <Card className="p-0 overflow-hidden border-none shadow-xl bg-white flex flex-col md:flex-row h-full">
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              {!imgError['special-1'] ? (
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800" 
                  alt="Special Dish"
                  className="w-full h-full object-cover"
                  onError={() => handleImgError('special-1')}
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-full h-full bg-slate-200" />
              )}
              <div className="absolute top-4 left-4">
                <Badge className="bg-[#E63946] text-white border-none flex gap-1 items-center">
                  <Flame className="w-3 h-3" /> CHEF'S SPECIAL
                </Badge>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Truffle-Infused Wagyu</h3>
              <p className="text-slate-600 mb-4">Premium A5 wagyu beef served with black truffle shavings, roasted root vegetables, and a red wine reduction.</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-bold text-[#C5A059]">$48</span>
                <div className="flex text-yellow-500"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
              </div>
            </div>
          </Card>

          <Card className="p-0 overflow-hidden border-none shadow-xl bg-white flex flex-col md:flex-row h-full">
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              {!imgError['special-2'] ? (
                <img 
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800" 
                  alt="Special Dish"
                  className="w-full h-full object-cover"
                  onError={() => handleImgError('special-2')}
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-full h-full bg-slate-200" />
              )}
              <div className="absolute top-4 left-4">
                <Badge className="bg-green-600 text-white border-none flex gap-1 items-center">
                  <Leaf className="w-3 h-3" /> SEASONAL FRESH
                </Badge>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Mediterranean Harvest Bowl</h3>
              <p className="text-slate-600 mb-4">Quinoa, roasted chickpeas, avocado, heirloom tomatoes, and a zesty lemon-tahini dressing.</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-bold text-[#C5A059]">$24</span>
                <div className="flex text-yellow-500"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Main Menu Grid */}
      <Section className="bg-white">
        <div className="flex flex-col items-center mb-12">
          <div className="w-20 h-1 bg-[#C5A059] mb-6" />
          <h2 className="text-4xl font-bold text-slate-900 text-center">Explore Our Categories</h2>
        </div>
        <MenuGrid />
      </Section>

      {/* Dietary Info */}
      <Section className="bg-slate-900 py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-[#C5A059]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-6 h-6 text-[#C5A059]" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Plant Based</h4>
              <p className="text-slate-400">Extensive vegetarian and vegan options available across all categories.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-[#C5A059]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-[#C5A059]" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Gluten Conscious</h4>
              <p className="text-slate-400">Many of our dishes can be prepared gluten-free upon request.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-[#C5A059]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flame className="w-6 h-6 text-[#C5A059]" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Local Sourcing</h4>
              <p className="text-slate-400">We partner with local organic farms for 80% of our seasonal produce.</p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default MenuPage;