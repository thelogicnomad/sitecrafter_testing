import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Section } from '@/components/ui/Container';
import { ExperienceCard } from '@/components/features/ExperienceCard';
import { IntensitySlider } from '@/components/features/IntensitySlider';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const ALL_EXPERIENCES = [
  { id: 1, title: 'Neon Velocity', category: 'Cardio', intensity: 80, imageUrl: 'https://images.unsplash.com/photo-1710458885608-bb98562e2e4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDczNjF8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwY3ljbGluZyUyMHR1bm5lbHxlbnwwfHx8fDE3NjY1ODQ0NDV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 2, title: 'Cyber Strike', category: 'Boxing', intensity: 95, imageUrl: 'https://images.unsplash.com/photo-1758521960439-3bbdec895cca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDczNjF8MHwxfHNlYXJjaHwxfHx2ciUyMGJveGluZyUyMHB1bmNofGVufDB8fHx8MTc2NjU4NDQ0MHww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 3, title: 'Zen Garden', category: 'Yoga', intensity: 20, imageUrl: 'https://images.unsplash.com/photo-1627994919095-ce6bd08c03c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDczNjF8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjB5b2dhJTIwZ2FyZGVufGVufDB8fHx8MTc2NjU4NDQ0N3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 4, title: 'Synthwave Run', category: 'Cardio', intensity: 65, imageUrl: 'https://images.unsplash.com/photo-1735920865508-85a11c743eb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDczNjF8MHwxfHNlYXJjaHwxfHxzeW50aHdhdmUlMjBtb3VudGFpbiUyMHJ1bnxlbnwwfHx8fDE3NjY1ODQ0NDB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 5, title: 'Rhythm Pulse', category: 'Dance', intensity: 75, imageUrl: 'https://images.unsplash.com/photo-1729244244710-58f3d3bdb5e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDczNjF8MHwxfHNlYXJjaHwxfHxyaHl0aG0lMjBkYW5jZSUyMHdvcmtvdXR8ZW58MHx8fHwxNzY2NTg0NDQzfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 6, title: 'Shadow Boxer', category: 'Boxing', intensity: 85, imageUrl: 'https://images.unsplash.com/photo-1716367840407-f9414a84b325?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDczNjF8MHwxfHNlYXJjaHwxfHx2ciUyMHdvcmtvdXQlMjBzd2VhdHxlbnwwfHx8fDE3NjY1ODQ0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
];

const categories = ['All', 'Cardio', 'Boxing', 'Yoga', 'Dance', 'Strength'];

const Experiences = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [intensity, setIntensity] = useState(50);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExperiences = (ALL_EXPERIENCES ?? []).filter(exp => {
    const matchesCategory = selectedCategory === 'All' || exp.category === selectedCategory;
    const matchesIntensity = Math.abs(exp.intensity - intensity) <= 30;
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesIntensity && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <section className="bg-slate-900 py-16 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Experience Browser</h1>
            <p className="text-slate-400 text-lg">
              Customize your workout by selecting your preferred environment and intensity level.
            </p>
          </div>
        </Container>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-slate-200 shadow-sm">
        <Container className="py-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search worlds..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto no-scrollbar">
              <Filter className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
              {(categories ?? []).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                    selectedCategory === cat 
                      ? "bg-indigo-600 text-white" 
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900">Intensity Level</h3>
              </div>
              <IntensitySlider 
                value={intensity} 
                onChange={setIntensity} 
              />
              <div className="mt-4 flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>Relaxed</span>
                <span>Extreme</span>
              </div>
            </div>

            <div className="p-6 bg-indigo-900 rounded-2xl text-white">
              <h4 className="font-bold mb-2">Daily Challenge</h4>
              <p className="text-indigo-200 text-sm mb-4">Complete "Neon Velocity" on High Intensity to earn the 'Speed Demon' badge.</p>
              <Badge className="bg-white/20 text-white border-transparent">250 XP Bonus</Badge>
            </div>
          </aside>

          {/* Experience Grid */}
          <main className="lg:col-span-3">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-slate-900">
                {filteredExperiences.length} Environments Found
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {(filteredExperiences ?? []).map((exp) => (
                  <motion.div
                    key={exp?.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ExperienceCard 
                      title={exp?.title ?? 'World'}
                      category={exp?.category ?? 'General'}
                      intensity={exp?.intensity > 70 ? 'High' : exp?.intensity > 40 ? 'Medium' : 'Low'}
                      imageUrl={exp?.imageUrl}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredExperiences.length === 0 && (
              <div className="text-center py-20 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200">
                <div className="mx-auto w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No results found</h3>
                <p className="text-slate-500">Try adjusting your filters or search query.</p>
              </div>
            )}
          </main>
        </div>
      </Container>
    </div>
  );
};

export default Experiences;