import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { CheckCircle2, Clock, MessageSquare, Rocket, Search, Terminal } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const steps = [
  {
    icon: Search,
    title: 'Discovery',
    desc: 'Initial consultation to understand project goals, audience, and technical requirements.',
    color: 'bg-blue-500',
  },
  {
    icon: MessageSquare,
    title: 'Scripting & Storyboard',
    desc: 'Developing the narrative and visual blueprint for the entire motion piece.',
    color: 'bg-indigo-500',
  },
  {
    icon: Terminal,
    title: 'Styleframes',
    desc: 'Creation of high-fidelity keyframes to establish the look, lighting, and texture.',
    color: 'bg-purple-500',
  },
  {
    icon: Clock,
    title: 'Production',
    desc: 'The heavy lifting: 3D modeling, animation, simulation, and rendering.',
    color: 'bg-rose-500',
  },
  {
    icon: CheckCircle2,
    title: 'Review & Refine',
    desc: 'Collaborative feedback cycles to ensure every frame meets our quality standards.',
    color: 'bg-emerald-500',
  },
  {
    icon: Rocket,
    title: 'Delivery',
    desc: 'Final export in all required formats and integration with your platforms.',
    color: 'bg-cyan-500',
  },
];

const Process = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <section className="pt-32 pb-20 text-center">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Production Pipeline</h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Our streamlined workflow ensures consistency, quality, and transparency 
              at every stage of the creative process.
            </p>
          </motion.div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2" />

            <div className="space-y-24">
              {(steps ?? []).map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={cn(
                    "relative flex flex-col md:flex-row items-center gap-12",
                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  {/* Icon Node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center z-10">
                    <step.icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Content */}
                  <div className="md:w-1/2 pl-20 md:pl-0">
                    <div className={cn(
                      "p-8 rounded-2xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm",
                      idx % 2 === 0 ? "md:text-right" : "md:text-left"
                    )}>
                      <span className={cn(
                        "inline-block px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest mb-4",
                        step.color
                      )}>
                        Phase {idx + 1}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-4">{step?.title ?? 'Step'}</h3>
                      <p className="text-slate-400 leading-relaxed">
                        {step?.desc ?? ''}
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Tech Stack */}
      <Section className="bg-slate-950">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Our Tech Stack</h2>
            <p className="text-slate-500">We use the industry's most powerful tools to craft our work.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
            {['Cinema 4D', 'Octane Render', 'After Effects', 'Houdini', 'Unreal Engine', 'ZBrush'].map((tool) => (
              <div key={tool} className="px-8 py-4 bg-slate-900 rounded-xl border border-slate-800 text-slate-300 font-bold">
                {tool}
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Process;