import React from 'react';
import { motion } from 'framer-motion';
import { ProfileCard } from '@/components/features/ProfileCard';
import { GradientText } from '@/components/ui/GradientText';
import { Card } from '@/components/ui/Card';
import { Heart, Globe, Users, Coffee } from 'lucide-react';

const AboutPage = () => {
  const chefs = [
    {
      name: "Jean-Luc Gilded",
      role: "Founder & Master Pâtissier",
      image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&q=80&w=800",
      bio: "With 30 years of experience in Michelin-starred kitchens across Paris, Jean-Luc founded Gilded to bring haute couture pastry to the everyday connoisseur.",
      socials: { instagram: "#", linkedin: "#" }
    },
    {
      name: "Elena Rossi",
      role: "Head Chocolatier",
      image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=800",
      bio: "Elena specializes in single-origin cocoa and rare spice infusions. Her 'Midnight' series has won multiple international chocolate awards.",
      socials: { instagram: "#", twitter: "#" }
    },
    {
      name: "Marc Chen",
      role: "Senior Cake Architect",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=800",
      bio: "Marc bridges the gap between engineering and baking, creating structural marvels that defy gravity while maintaining exquisite flavor.",
      socials: { linkedin: "#" }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Story Section */}
      <section className="relative h-[70vh] flex items-center overflow-hidden bg-[#2D231E]">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover" 
            alt="Bakery background"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
              A Legacy of <br />
              <GradientText colors={["#FC5A30", "#911B44", "#FC5A30"]} animationSpeed={5}>
                Gilded Perfection
              </GradientText>
            </h1>
            <p className="text-xl text-stone-200 leading-relaxed">
              Founded in 1924 on a quiet street in Paris, Gilded Patisserie has spent a century 
              refining the art of the pastry. What began as a small family bakery has evolved 
              into a global standard for luxury confectionery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Heart className="text-[#911B44]" />, title: "Passion", desc: "Every whisk and fold is done with intentionality and love." },
              { icon: <Globe className="text-[#911B44]" />, title: "Heritage", desc: "Honoring French traditions while embracing modern innovation." },
              { icon: <Users className="text-[#911B44]" />, title: "Community", desc: "Supporting local farmers and creating joy for our patrons." },
              { icon: <Coffee className="text-[#911B44]" />, title: "Excellence", desc: "Never settling for anything less than the golden standard." }
            ].map((value, i) => (
              <Card key={i} className="p-8 text-center border-none shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-stone-500 text-sm">{value.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-[#2D231E] mb-4">The Masters Behind the Gold</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Our kitchen is led by award-winning artisans who bring decades of combined 
              expertise to every batch.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {chefs.map((chef, idx) => (
              <motion.div
                key={chef.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
              >
                <ProfileCard {...chef} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-[#2D231E] text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?auto=format&fit=crop&q=80&w=800" 
                alt="Baking Process" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-serif mb-8">The Philosophy of Savoring</h2>
              <div className="space-y-6 text-stone-300">
                <p>
                  We believe that a pastry should be more than just food. It should be a 
                  moment of pause—a sensory experience that engages the eyes, the palate, 
                  and the soul.
                </p>
                <p>
                  That's why we don't mass-produce. Each cake is baked to order, 
                  each macaron is hand-filled, and each piece of gold leaf is 
                  placed with precision.
                </p>
                <blockquote className="border-l-4 border-[#911B44] pl-6 py-2 italic text-white text-xl">
                  "In a world of fast food, we choose the slow, gilded path of excellence."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;