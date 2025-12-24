import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { LottiePlayer } from '@/components/features/LottiePlayer';
import { Layers, Video, Monitor, Sparkles, Zap, Target } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const services = [
  {
    title: '3D Motion Graphics',
    description: 'High-end character animation, product reveals, and abstract visual storytelling using Octane and Redshift.',
    icon: Video,
    color: 'from-indigo-500 to-purple-600',
  },
  {
    title: 'Interactive UI/UX',
    description: 'Bespoke digital experiences that blend motion with functionality for mobile and web platforms.',
    icon: Monitor,
    color: 'from-cyan-400 to-blue-500',
  },
  {
    title: 'Visual Effects',
    description: 'Cinematic compositing, particle systems, and environmental design for commercials and film.',
    icon: Sparkles,
    color: 'from-rose-400 to-orange-500',
  },
  {
    title: 'Brand Identity',
    description: 'Motion-first branding systems that ensure your visual language is consistent across all digital touchpoints.',
    icon: Layers,
    color: 'from-emerald-400 to-teal-500',
  },
  {
    title: 'Performance Creative',
    description: 'Data-driven ad creatives designed to stop the scroll and maximize conversion rates.',
    icon: Zap,
    color: 'from-amber-400 to-yellow-500',
  },
  {
    title: 'Strategy & Direction',
    description: 'Creative consulting and art direction to align your visual output with long-term business goals.',
    icon: Target,
    color: 'from-slate-600 to-slate-800',
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="pt-40 pb-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <Container>
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-7xl font-bold text-white mb-6"
            >
              Our <span className="text-cyan-400">Capabilities</span>
            </motion.h1>
            <p className="text-slate-400 text-xl leading-relaxed">
              We combine artistic vision with technical precision to deliver 
              unmatched visual content that drives engagement and builds prestige.
            </p>
          </div>
        </Container>
      </section>

      {/* Service Grid */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(services ?? []).map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-slate-900/50 border-slate-800 p-8 backdrop-blur-xl hover:border-cyan-500/50 transition-colors">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6",
                    service?.color ?? 'from-slate-500 to-slate-600'
                  )}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{service?.title ?? 'Service'}</h3>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    {service?.description ?? ''}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-800">
                    <button className="text-cyan-400 font-bold flex items-center group-hover:translate-x-2 transition-transform">
                      Learn More <Zap className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Workflow Feature */}
      <Section className="bg-white text-slate-900 rounded-t-[50px]">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="w-full aspect-square bg-slate-100 rounded-3xl flex items-center justify-center overflow-hidden">
                {/* Lottie Placeholder */}
                <div className="w-64 h-64 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full animate-pulse blur-3xl opacity-30" />
                <LottiePlayer 
                  animationData={{}} // Empty for placeholder logic
                  className="absolute z-10"
                />
                <div className="text-slate-300 font-mono text-xs text-center">
                  [ LOTTIE ANIMATION: WORKFLOW_PROCESS ]
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">How We Work</h2>
              <div className="space-y-8">
                {[
                  { step: '01', title: 'Deep Discovery', desc: 'We dive into your brand DNA and market landscape.' },
                  { step: '02', title: 'Conceptualization', desc: 'Storyboarding and styleframes to define the visual direction.' },
                  { step: '03', title: 'Production', desc: 'Agile execution using industry-leading tools and pipelines.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="text-4xl font-black text-slate-200">{item.step}</span>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Services;