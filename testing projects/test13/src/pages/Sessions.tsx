import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SessionFilter } from '@/components/features/SessionFilter';
import { AudioPlayer } from '@/components/features/AudioPlayer';
import { Play, Clock, BarChart3, TrendingUp, Calendar } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const gradients = [
  'from-blue-400 to-indigo-600',
  'from-emerald-400 to-teal-600',
  'from-purple-400 to-pink-600',
  'from-orange-400 to-rose-600',
  'from-cyan-400 to-blue-600',
  'from-amber-400 to-orange-600',
];

const sessionsData = [
  { id: 1, title: 'Morning Focus', duration: '5 min', category: 'Focus', intensity: 'Low' },
  { id: 2, title: 'Deep Relaxation', duration: '15 min', category: 'Sleep', intensity: 'Medium' },
  { id: 3, title: 'Stress Buster', duration: '10 min', category: 'Stress', intensity: 'High' },
  { id: 4, title: 'Mid-Day Reset', duration: '8 min', category: 'Focus', intensity: 'Medium' },
  { id: 5, title: 'Evening Calm', duration: '20 min', category: 'Sleep', intensity: 'Low' },
  { id: 6, title: 'Creative Flow', duration: '12 min', category: 'Work', intensity: 'Medium' },
];

const Sessions = () => {
  const [activeSession, setActiveSession] = useState<any>(null);
  const [filter, setFilter] = useState('All');

  const filteredSessions = (sessionsData ?? []).filter(s => 
    filter === 'All' || s.category === filter
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Session Hero */}
      <section className="bg-slate-900 py-20">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
              <Badge className="bg-indigo-500 text-white mb-4">Library</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Find Your Moment</h1>
              <p className="text-slate-400 text-lg">
                Explore our curated library of micro-meditations designed to help you navigate the challenges of your day.
              </p>
            </div>
            {/* Analytics Mockup */}
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 w-full md:w-auto">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Weekly Streak</p>
                  <p className="text-white font-bold">12 Days</p>
                </div>
              </div>
              <div className="flex gap-2">
                {[40, 70, 45, 90, 65, 30, 80].map((h, i) => (
                  <div key={i} className="w-3 bg-slate-700 rounded-full h-12 relative overflow-hidden">
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-indigo-500 rounded-full transition-all duration-1000" 
                      style={{ height: `${h}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <Container className="py-4">
          <SessionFilter onFilterChange={(val) => setFilter(val)} />
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(filteredSessions ?? []).map((session, index) => (
              <motion.div
                key={session?.id ?? index}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className={`h-48 bg-gradient-to-br ${gradients[index % gradients.length]} relative group`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    <button 
                      onClick={() => setActiveSession(session)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                        <Play className="w-8 h-8 fill-current" />
                      </div>
                    </button>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/20 backdrop-blur-md text-white border-none">
                        {session?.category ?? 'General'}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{session?.title ?? 'Untitled Session'}</h3>
                      <div className="flex items-center text-slate-500 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {session?.duration ?? '5m'}
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm mb-6">
                      A calming practice to help you find {session?.category?.toLowerCase() ?? 'balance'} and reclaim your energy.
                    </p>
                    <Button 
                      onClick={() => setActiveSession(session)}
                      variant="outline" 
                      className="w-full border-slate-200 hover:bg-slate-50 text-slate-900"
                    >
                      Listen Now
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Audio Preview Feature */}
      {activeSession && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <Container className="max-w-4xl">
            <div className="bg-slate-900 rounded-2xl shadow-2xl p-6 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradients[activeSession.id % gradients.length]}`} />
                  <div>
                    <h4 className="text-white font-bold">{activeSession.title}</h4>
                    <p className="text-slate-400 text-xs">{activeSession.category} • {activeSession.duration}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setActiveSession(null)}
                  className="text-slate-400 hover:text-white"
                >
                  Close
                </Button>
              </div>
              <AudioPlayer 
                src="#" 
                title={activeSession.title} 
                onClose={() => setActiveSession(null)} 
              />
            </div>
          </Container>
        </motion.div>
      )}
    </div>
  );
};

export default Sessions;