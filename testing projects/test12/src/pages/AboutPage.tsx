import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Heart, Award, Users, Coffee } from 'lucide-react';

const AboutPage = () => {
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const handleImgError = (id: string) => {
    setImgError((prev) => ({ ...prev, [id]: true }));
  };

  const chefs = [
    {
      name: "Marcus Sterling",
      role: "Executive Chef",
      bio: "With over 20 years of experience in Michelin-starred kitchens across Europe.",
      img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Elena Rossi",
      role: "Pastry Chef",
      bio: "Master of delicate flavors and artistic dessert presentations.",
      img: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Julian Chen",
      role: "Sous Chef",
      bio: "Expert in fusion techniques and seasonal ingredient sourcing.",
      img: "https://images.unsplash.com/photo-1577214495773-5146527a76d3?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Our Story */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge className="mb-4 bg-slate-100 text-[#C5A059] border-none">OUR PHILOSOPHY</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8">Crafting Memories Through Flavor</h1>
            <p className="text-slate-700 text-lg mb-6 leading-relaxed">
              At Savory Bistro, we believe that dining is more than just a meal—it's a sensory journey. Founded in 1998 by the Sterling family, our vision was to create a sanctuary where culinary excellence meets genuine hospitality.
            </p>
            <p className="text-slate-700 text-lg mb-8 leading-relaxed">
              Every dish that leaves our kitchen is a testament to our commitment to quality. We work closely with local farmers, foragers, and fishermen to ensure that only the freshest, most ethical ingredients reach your plate.
            </p>
            <div className="grid grid-cols-2 gap-8 py-6 border-t border-slate-100">
              <div>
                <p className="text-3xl font-bold text-[#C5A059]">100%</p>
                <p className="text-slate-500 text-sm uppercase tracking-wide">Organic Produce</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#C5A059]">15k+</p>
                <p className="text-slate-500 text-sm uppercase tracking-wide">Happy Diners Yearly</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              {!imgError['about-main'] ? (
                <img 
                  src="https://images.unsplash.com/photo-1550966842-28474676be72?auto=format&fit=crop&q=80&w=1000" 
                  alt="Bistro Interior"
                  className="w-full h-full object-cover"
                  onError={() => handleImgError('about-main')}
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-full h-full bg-slate-200" />
              )}
            </div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#C5A059] rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-slate-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">What Defines Us</h2>
          <div className="w-24 h-1 bg-[#C5A059] mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Heart className="w-8 h-8" />, title: "Passion", text: "We put our heart into every recipe and interaction." },
            { icon: <Award className="w-8 h-8" />, title: "Quality", text: "Uncompromising standards for ingredients and service." },
            { icon: <Users className="w-8 h-8" />, title: "Community", text: "Supporting local producers and creating jobs." },
            { icon: <Coffee className="w-8 h-8" />, title: "Comfort", text: "An atmosphere that feels like a home away from home." }
          ].map((value, i) => (
            <Card key={i} className="p-8 text-center border-none shadow-md hover:shadow-xl transition-shadow bg-white">
              <div className="text-[#C5A059] mb-4 flex justify-center">{value.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h3>
              <p className="text-slate-600">{value.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Chef Profiles */}
      <Section>
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-slate-100 text-slate-900 border-none">THE TEAM</Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Meet Our Artisans</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {chefs.map((chef, idx) => (
            <Card key={idx} className="overflow-hidden border-none shadow-lg group bg-white">
              <div className="aspect-[3/4] overflow-hidden relative">
                {!imgError[`chef-${idx}`] ? (
                  <img 
                    src={chef.img} 
                    alt={chef.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={() => handleImgError(`chef-${idx}`)}
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{chef.name}</h3>
                <p className="text-[#C5A059] font-medium mb-3">{chef.role}</p>
                <p className="text-slate-600 text-sm">{chef.bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default AboutPage;