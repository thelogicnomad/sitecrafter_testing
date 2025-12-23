import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SplitText } from '@/components/ui/SplitText';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, History, Globe, Heart } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="py-20 md:py-32 bg-slate-900 text-white">
        <Container>
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-accent text-slate-900 font-bold">OUR STORY</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Preserving the <br />
              <span className="text-accent">Soul of Rhythm</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
              TaalVista was founded with a single mission: to make the profound art of Tabla 
              accessible to anyone, anywhere, while maintaining the sanctity of the Guru-Shishya Parampara.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">The TaalVista Philosophy</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <History className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Preserving Heritage</h3>
                    <p className="text-slate-600">We document and teach the nuances of all six major Gharanas, ensuring that regional variations and historical compositions are never lost.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Globe className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Global Accessibility</h3>
                    <p className="text-slate-600">Through high-speed streaming and interactive notation, we bridge the gap between traditional masters in India and students across the globe.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Community Driven</h3>
                    <p className="text-slate-600">Music is a shared experience. Our platform fosters a vibrant community where students can perform, collaborate, and grow together.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop" 
                alt="Academy Studio" 
                className="rounded-2xl shadow-2xl relative z-10"
                crossOrigin="anonymous"
              />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-accent rounded-2xl -z-0" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Core Values */}
      <Section className="bg-slate-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">The principles that guide every lesson we create and every student we mentor.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Authenticity", desc: "No shortcuts. We teach the complete system of Tabla, from technique to theory." },
              { title: "Inclusivity", desc: "Music knows no borders. We welcome students of all backgrounds and ages." },
              { title: "Innovation", desc: "Using AI and modern tech to enhance traditional learning methods." }
            ].map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <CheckCircle2 className="text-accent w-10 h-10 mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default AboutPage;