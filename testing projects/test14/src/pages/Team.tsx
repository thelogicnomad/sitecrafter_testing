import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { Twitter, Linkedin, Github, Instagram } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const team = [
  {
    name: 'Alex Rivera',
    role: 'Creative Director',
    bio: '15+ years of experience in motion design and brand strategy.',
    gradient: 'from-indigo-500 to-cyan-500',
  },
  {
    name: 'Sarah Chen',
    role: 'Lead 3D Artist',
    bio: 'Specialist in lighting, texturing, and photorealistic rendering.',
    gradient: 'from-rose-500 to-orange-500',
  },
  {
    name: 'Marcus Thorne',
    role: 'Technical Director',
    bio: 'Master of Houdini simulations and complex visual systems.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Elena Vance',
    role: 'UX Architect',
    bio: 'Bridging the gap between motion and interactive usability.',
    gradient: 'from-purple-500 to-indigo-600',
  },
  {
    name: 'David Kim',
    role: 'Motion Designer',
    bio: 'Expert in typography-driven animation and editorial design.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Sofia Rossi',
    role: 'Producer',
    bio: 'Ensuring every project stays on track and above expectations.',
    gradient: 'from-amber-500 to-rose-500',
  },
];

const Team = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-20 bg-slate-900">
        <Container>
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              The Minds Behind <span className="text-cyan-400">The Motion</span>
            </motion.h1>
            <p className="text-slate-400 text-lg">
              A diverse collective of artists, engineers, and strategists obsessed with 
              pushing the boundaries of visual communication.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {(team ?? []).map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="border-none shadow-none group text-center">
                  <div className="relative mb-6 inline-block">
                    <div className={cn(
                      "w-40 h-40 rounded-full bg-gradient-to-br p-1 transition-transform group-hover:rotate-12 duration-500",
                      member?.gradient ?? 'from-slate-200 to-slate-300'
                    )}>
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                         <div className={cn("w-full h-full bg-gradient-to-br opacity-80", member?.gradient)} />
                         <span className="absolute text-4xl font-bold text-white">
                           {member?.name?.charAt(0) ?? '?'}
                         </span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{member?.name ?? 'Name'}</h3>
                  <p className="text-indigo-600 font-semibold mb-4">{member?.role ?? 'Role'}</p>
                  <p className="text-slate-600 mb-6 px-4">
                    {member?.bio ?? ''}
                  </p>
                  <div className="flex justify-center gap-4 text-slate-400">
                    <Twitter className="w-5 h-5 hover:text-cyan-400 cursor-pointer transition-colors" />
                    <Linkedin className="w-5 h-5 hover:text-indigo-600 cursor-pointer transition-colors" />
                    <Instagram className="w-5 h-5 hover:text-rose-500 cursor-pointer transition-colors" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Culture Section */}
      <Section className="bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">Our Culture</h2>
              <div className="space-y-6">
                <p className="text-slate-600 text-lg leading-relaxed">
                  We believe in a "motion-first" mindset. At Pixel Studio, creativity isn't a 
                  department—it's the foundation of everything we do.
                </p>
                <ul className="space-y-4">
                  {['Radical Transparency', 'Continuous Exploration', 'Precision Craft', 'Empathetic Design'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-slate-900 font-bold">
                      <div className="w-2 h-2 rounded-full bg-cyan-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="h-64 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl" />
               <div className="h-64 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl mt-8" />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Team;