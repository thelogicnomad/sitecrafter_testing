import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { BreathingVisualizer } from '@/components/features/BreathingVisualizer';
import { ArrowRight, Zap, Shield, Smartphone, Heart } from 'lucide-react';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const gradients = [
  'from-indigo-500 to-purple-600',
  'from-rose-500 to-orange-500',
  'from-emerald-500 to-teal-500',
  'from-blue-500 to-cyan-500',
];

const features = [
  {
    icon: <Zap className="w-6 h-6 text-indigo-400" />,
    title: "Micro-Meditation",
    description: "Scientifically backed 5-minute sessions that fit into your busiest work days."
  },
  {
    icon: <Shield className="w-6 h-6 text-emerald-400" />,
    title: "Stress Reduction",
    description: "Lower cortisol levels and improve focus with guided rhythmic breathing."
  },
  {
    icon: <Smartphone className="w-6 h-6 text-rose-400" />,
    title: "On-the-Go Access",
    description: "Seamlessly transition between desktop and mobile for mindfulness anywhere."
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                Reclaim Your <span className="text-indigo-400">Mental Clarity</span> in Minutes.
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-lg">
                MindfulBreaks provides bite-sized meditation and breathing exercises designed for the modern professional.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-14 text-lg">
                  Start Free Session <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white/20 hover:bg-white/10 h-14 text-lg">
                  View Library
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative p-8 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
                <BreathingVisualizer />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Problem Statement Section */}
      <Section className="bg-slate-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">The High Cost of Burnout</h2>
            <p className="text-lg text-slate-600">
              Modern work environments are designed for productivity, but often at the expense of mental health. 
              Chronic stress leads to a 40% decrease in focus and a 60% increase in error rates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(features ?? []).map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100"
              >
                <div className="mb-4">{feature?.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature?.title ?? 'Feature'}</h3>
                <p className="text-slate-600 leading-relaxed">{feature?.description ?? ''}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Solution Benefits */}
      <Section className="bg-white">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className={`w-full aspect-square rounded-3xl bg-gradient-to-br ${gradients[0]} flex items-center justify-center p-12`}>
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 w-full h-full flex flex-col justify-center border border-white/30">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">MB</div>
                    <div>
                      <div className="h-3 w-32 bg-white/40 rounded-full mb-2" />
                      <div className="h-2 w-20 bg-white/20 rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 w-full bg-white/40 rounded-full" />
                    <div className="h-4 w-5/6 bg-white/40 rounded-full" />
                    <div className="h-4 w-4/6 bg-white/40 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                Designed for the <br /> 
                <span className="text-indigo-600">Flow State.</span>
              </h2>
              <ul className="space-y-6">
                {[
                  "Intelligent scheduling based on your calendar",
                  "No-setup required audio streaming",
                  "Progress tracking and mindfulness streaks",
                  "Expert-led sessions for every mood"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-emerald-100 p-1 rounded-full">
                      <Heart className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-lg text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-10 h-14 px-8 text-lg bg-slate-900 hover:bg-slate-800 text-white">
                Explore the Science
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Download CTA */}
      <Section className="py-0">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center overflow-hidden relative">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full translate-x-1/4 translate-y-1/4" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to breathe better?</h2>
              <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">
                Join over 50,000 professionals who use MindfulBreaks to stay calm, focused, and productive throughout the day.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-white text-indigo-600 hover:bg-slate-100 h-14 px-10 text-lg font-bold">
                  Download for iOS
                </Button>
                <Button className="bg-indigo-500 text-white border border-indigo-400 hover:bg-indigo-400 h-14 px-10 text-lg font-bold">
                  Download for Android
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Home;