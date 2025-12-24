import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Container, Section } from '@/components/ui/Container';
import { ExperienceCard } from '@/components/features/ExperienceCard';
import { StatsDashboard } from '@/components/features/StatsDashboard';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, Zap, Trophy, Users, Play } from 'lucide-react';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const HERO_IMAGE = "https://images.unsplash.com/photo-1758523670550-223a01cd7764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDczNjF8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdnIlMjBoZWFkc2V0fGVufDB8fHx8MTc2NjU4NDQzN3ww&ixlib=rb-4.1.0&q=80&w=1080";

const featuredExperiences = [
  {
    id: 'exp-1',
    title: 'Neon Velocity',
    category: 'Cardio',
    intensity: 'High',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1710458885608-bb98562e2e4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDczNjF8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwY3ljbGluZyUyMHR1bm5lbHxlbnwwfHx8fDE3NjY1ODQ0NDV8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'exp-2',
    title: 'Cyber Strike',
    category: 'Boxing',
    intensity: 'Extreme',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1758521960439-3bbdec895cca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDczNjF8MHwxfHNlYXJjaHwxfHx2ciUyMGJveGluZyUyMHB1bmNofGVufDB8fHx8MTc2NjU4NDQ0MHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'exp-3',
    title: 'Zen Garden',
    category: 'Yoga',
    intensity: 'Low',
    rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1627994919095-ce6bd08c03c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDczNjF8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjB5b2dhJTIwZ2FyZGVufGVufDB8fHx8MTc2NjU4NDQ0N3ww&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src={HERO_IMAGE} 
            alt="Futuristic VR Headset" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-indigo-500/20 text-indigo-400 border-indigo-500/30 px-3 py-1">
                The Future of Fitness is Here
              </Badge>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
                Ascend to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">CloudVerse</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-xl">
                Experience high-intensity VR workouts in breathtaking digital landscapes. Burn calories, compete globally, and transform your body in the metaverse.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8">
                  Start Training <Play className="ml-2 w-5 h-5 fill-current" />
                </Button>
                <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-white/10">
                  View Experiences
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats Dashboard Preview */}
      <Section className="bg-slate-950 border-y border-slate-800">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Real-time Performance Metrics</h2>
              <p className="text-slate-400 mb-8">
                Monitor your heart rate, calorie burn, and movement precision with our integrated holographic dashboard. Every punch, squat, and sprint is tracked with millisecond accuracy.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Zap, text: "Live Biometric Integration" },
                  { icon: Trophy, text: "Personal Best Tracking" },
                  { icon: Users, text: "Global Leaderboard Sync" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-200">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-2xl">
              <StatsDashboard />
            </div>
          </div>
        </Container>
      </Section>

      {/* Experience Showcase Grid */}
      <Section className="bg-white">
        <Container>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Immersive Worlds</h2>
              <p className="text-slate-600 mt-2">Discover your next favorite workout environment.</p>
            </div>
            <Button variant="ghost" className="hidden md:flex text-indigo-600 hover:text-indigo-700">
              Browse All <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(featuredExperiences ?? []).map((exp, index) => (
              <motion.div
                key={exp?.id ?? index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ExperienceCard 
                  title={exp?.title ?? 'Untitled'}
                  category={exp?.category ?? 'General'}
                  intensity={exp?.intensity ?? 'Medium'}
                  imageUrl={exp?.imageUrl}
                />
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Leaderboard Preview */}
      <Section className="bg-slate-900 text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Global Competition</h2>
            <p className="text-slate-400">Join thousands of athletes competing for the top spot on the CloudVerse rankings. Earn badges, climb divisions, and claim your legend.</p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
            {[
              { rank: 1, name: 'CyberVolt', score: '24,500', streak: 15, avatar: 'CV' },
              { rank: 2, name: 'NeonPulse', score: '23,120', streak: 8, avatar: 'NP' },
              { rank: 3, name: 'SynthRacer', score: '22,900', streak: 12, avatar: 'SR' }
            ].map((user, i) => (
              <div key={i} className={cn(
                "flex items-center gap-4 p-6 border-b border-slate-700 last:border-0",
                i === 0 ? "bg-indigo-500/10" : ""
              )}>
                <span className={cn(
                  "text-2xl font-bold w-8",
                  i === 0 ? "text-yellow-400" : i === 1 ? "text-slate-300" : i === 2 ? "text-amber-600" : "text-slate-500"
                )}>#{user.rank}</span>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold">
                  {user.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{user.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Zap className="w-3 h-3 text-indigo-400" /> {user.streak} Day Streak
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-indigo-400">{user.score}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Points</div>
                </div>
              </div>
            ))}
            <div className="p-4 bg-slate-800 text-center">
              <Button variant="ghost" className="text-slate-400 hover:text-white">View Full Leaderboard</Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Home;