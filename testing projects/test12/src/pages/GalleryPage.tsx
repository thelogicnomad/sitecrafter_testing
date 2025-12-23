import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';

const GalleryPage = () => {
  const [imgError, setImgError] = useState<Record<string, boolean>>({});
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const handleImgError = (id: string) => {
    setImgError((prev) => ({ ...prev, [id]: true }));
  };

  const images = [
    { id: '1', url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800", cat: "Kitchen" },
    { id: '2', url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800", cat: "Ambiance" },
    { id: '3', url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800", cat: "Dishes" },
    { id: '4', url: "https://images.unsplash.com/photo-1550966842-28474676be72?auto=format&fit=crop&q=80&w=800", cat: "Dishes" },
    { id: '5', url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800", cat: "Ambiance" },
    { id: '6', url: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=800", cat: "Kitchen" },
    { id: '7', url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800", cat: "Dishes" },
    { id: '8', url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800", cat: "Dishes" },
    { id: '9', url: "https://images.unsplash.com/photo-1534422298391-e4f8c170db06?auto=format&fit=crop&q=80&w=800", cat: "Kitchen" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-20 bg-slate-900 text-center">
        <Container>
          <Badge className="mb-4 bg-[#C5A059] text-white border-none">VISUAL JOURNEY</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Gallery</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            A glimpse into our kitchen, our plates, and the atmosphere that makes Savory Bistro unique.
          </p>
        </Container>
      </section>

      {/* Gallery Grid */}
      <Section>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer overflow-hidden rounded-xl"
              onClick={() => setSelectedImg(img.url)}
            >
              {!imgError[img.id] ? (
                <img 
                  src={img.url} 
                  alt={`Gallery ${img.id}`}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={() => handleImgError(img.id)}
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-full h-64 bg-slate-200 flex items-center justify-center">Image unavailable</div>
              )}
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-center">
                  <Maximize2 className="w-8 h-8 text-white mx-auto mb-2" />
                  <span className="text-white font-medium uppercase tracking-widest text-sm">{img.cat}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Instagram Feed Mockup */}
      <Section className="bg-slate-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Follow Us @SavoryBistro</h2>
          <p className="text-slate-600">Share your experience with #SavoryMoments</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-square bg-slate-200 rounded-md overflow-hidden">
               <img 
                  src={`https://source.unsplash.com/400x400/?food,dining&sig=${i}`} 
                  alt="Social feed"
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
            </div>
          ))}
        </div>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImg(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-[#C5A059] transition-colors"
              onClick={() => setSelectedImg(null)}
            >
              <X className="w-10 h-10" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={selectedImg} 
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;