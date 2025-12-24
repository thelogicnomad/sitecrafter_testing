import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { CursorGlow } from '@/components/features/CursorGlow';
import { ParallaxLayer } from '@/components/features/ParallaxLayer';
import { ArrowRight, Play, Zap, Globe, Shield } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const gradients = [
  'from-indigo-600 to-purple-700',
  'from-cyan-500 to-blue-600',
  'from-rose-500 to-orange-600',
  'from-emerald-500 to-teal-600',
];

const stats = [
  { label: 'Projects Completed', value: '250+', icon: Zap },
  { label: 'Global Clients', value: '120+', icon: Globe },
  { label: 'Awards Won', value: '45', icon: Shield },
];

const featuredWork = [
  { id: 1, title: 'Nebula Motion', category: '3D Animation', color: 'from-purple-500 to-indigo-600' },
  { id: 2, title: 'Cyber-Core UI', category: 'Product Design', color: 'from-blue-500 to-cyan-500' },
  { id: 3, title: 'Ethereal Brand', category: 'Brand Identity', color: 'from-rose-500 to-pink-500' },
];

const Home = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <div className="relative min-h-screen bg-slate-900 overflow-hidden">
      <CursorGlow />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <ParallaxLayer offset={0.1} speed={0.5} className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px]" />
        </ParallaxLayer>

        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tight mb-6">
                Redefining the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Digital Pulse</span>
              </h1>
              <p className="text-lg md:text-2xl text-slate-300 mb-10 leading-relaxed">
                Pixel Studio is a high-end motion and design agency crafting immersive 
                digital experiences for the next generation of brands.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-14 text-lg rounded-full">
                  View Portfolio <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-white/10 px-8 h-14 text-lg rounded-full backdrop-blur-sm">
                  <Play className="mr-2 w-5 h-5 fill-current" /> Watch Reel
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <Section className="bg-slate-800/50 border-y border-slate-700/50 backdrop-blur-md">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {(stats ?? []).map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 mb-4">
                  <stat.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat?.value ?? '0'}</div>
                <div className="text-slate-400 font-medium uppercase tracking-widest text-sm">{stat?.label ?? ''}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured Work */}
      <Section className="bg-slate-900">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Selected Works</h2>
              <p className="text-slate-400 text-lg">A curated selection of our most impactful motion and interactive projects.</p>
            </div>
            <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10">
              Explore All <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(featuredWork ?? []).map((work, idx) => (
              <motion.div
                key={work?.id ?? idx}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <Card className="bg-slate-800 border-slate-700 overflow-hidden rounded-2xl">
                  <div className={cn("h-[400px] bg-gradient-to-br transition-transform duration-500 group-hover:scale-110", work?.color ?? gradients[0])} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 p-8">
                    <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-2 block">{work?.category ?? 'Project'}</span>
                    <h3 className="text-2xl font-bold text-white">{work?.title ?? 'Untitled'}</h3>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        <Container className="relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to start a project?</h2>
          <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto">
            Let's build something extraordinary together. Our team is ready to bring your vision to life.
          </p>
          <Button size="lg" className="bg-white text-indigo-600 hover:bg-slate-100 px-10 h-16 text-xl rounded-full font-bold shadow-xl">
            Contact Us
          </Button>
        </Container>
      </Section>
    </div>
  );
};

export default Home;