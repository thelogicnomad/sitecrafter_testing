import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Star, Heart, Award, Users } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const experts = [
  { name: 'Dr. Sarah Chen', role: 'Neuroscientist', bio: 'Specializing in the effects of mindfulness on executive function.', color: 'from-blue-400 to-indigo-500' },
  { name: 'Marcus Thorne', role: 'Meditation Master', bio: 'Over 20 years of experience in Zen practices and corporate wellness.', color: 'from-emerald-400 to-teal-500' },
  { name: 'Elena Rodriguez', role: 'Psychologist', bio: 'Expert in stress management and emotional regulation techniques.', color: 'from-rose-400 to-orange-500' },
  { name: 'Julian Vane', role: 'Breathwork Coach', bio: 'Pioneer in rhythmic breathing for athletic and mental performance.', color: 'from-purple-400 to-pink-500' },
];

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Our Mission Hero */}
      <section className="bg-gradient-to-br from-indigo-900 to-slate-900 py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/2" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-indigo-500 text-white border-none mb-6">Our Mission</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Making Mindfulness <br /> <span className="text-indigo-400">Accessible to All.</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              MindfulBreaks was born from a simple observation: the modern world is faster than the human brain was designed for. 
              We are on a mission to integrate mental well-being into the fabric of daily work life.
            </p>
          </div>
        </Container>
      </section>

      {/* Science Section */}
      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">The Science of the Micro-Break</h2>
              <div className="space-y-8">
                {[
                  { icon: <Star />, title: "Neurological Impact", text: "Short, focused meditations stimulate the parasympathetic nervous system, lowering heart rate and blood pressure instantly." },
                  { icon: <Heart />, title: "Emotional Intelligence", text: "Regular practice increases the density of gray matter in brain regions associated with empathy and self-awareness." },
                  { icon: <Award />, title: "Cognitive Performance", text: "Breathing exercises help clear CO2 from the blood, providing a natural oxygen boost to the prefrontal cortex." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-600">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users className="w-32 h-32 text-white/20" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <p className="text-sm font-bold text-slate-900">12.4k People Breathing Right Now</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Expert Panel */}
      <Section className="bg-slate-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Meet the Minds Behind the Breaks</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our content is crafted by a diverse team of neuroscientists, psychologists, and meditation experts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(experts ?? []).map((expert, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center"
              >
                <div className={cn("w-24 h-24 rounded-full mx-auto mb-6 bg-gradient-to-br flex items-center justify-center text-white text-3xl font-bold", expert.color)}>
                  {expert?.name?.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{expert?.name}</h3>
                <p className="text-indigo-600 text-sm font-medium mb-4">{expert?.role}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{expert?.bio}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default About;