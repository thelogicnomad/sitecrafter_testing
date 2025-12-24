import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Section } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Trophy, TrendingUp, Medal, Crown, Star, Flame } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const rankings = [
  { id: 1, name: 'Alex Rivera', score: 145200, level: 42, streak: 14, avatar: 'AR', trend: 'up' },
  { id: 2, name: 'Sarah Chen', score: 142100, level: 39, streak: 21, avatar: 'SC', trend: 'up' },
  { id: 3, name: 'Marcus Thorne', score: 138900, level: 45, streak: 7, avatar: 'MT', trend: 'down' },
  { id: 4, name: 'Luna Stark', score: 125400, level: 31, streak: 5, avatar: 'LS', trend: 'stable' },
  { id: 5, name: 'Jade Phantom', score: 121000, level: 35, streak: 12, avatar: 'JP', trend: 'up' },
  { id: 6, name: 'Vector X', score: 118500, level: 28, streak: 3, avatar: 'VX', trend: 'down' },
  { id: 7, name: 'Cyber Queen', score: 112000, level: 33, streak: 9, avatar: 'CQ', trend: 'up' },
];

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState('weekly');

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Header */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-indigo-900/40 to-slate-950">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-indigo-400 font-bold mb-4">
                <Trophy className="w-5 h-5" />
                <span>GLOBAL RANKINGS</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Hall of Legends</h1>
              <p className="text-slate-400 text-lg">
                The top 1% of CloudVerse athletes. Push your limits and claim your place in history.
              </p>
            </div>
            
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
              {['daily', 'weekly', 'all-time'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={cn(
                    "px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all",
                    timeframe === t ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Top 3 Podium */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-end">
            {/* 2nd Place */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="order-2 md:order-1 bg-slate-900/50 border border-slate-800 p-8 rounded-3xl text-center relative pt-16"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-24 h-24 rounded-full border-4 border-slate-400 p-1 bg-slate-950">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-2xl font-bold">
                    SC
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-400 text-slate-950 font-black px-3 py-1 rounded-full text-sm">
                  #2
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">Sarah Chen</h3>
              <div className="text-indigo-400 font-bold text-2xl mb-4">142,100</div>
              <div className="flex justify-center gap-2">
                <Badge variant="outline" className="border-slate-700 text-slate-400">Level 39</Badge>
                <Badge variant="outline" className="border-slate-700 text-slate-400">21 Day Streak</Badge>
              </div>
            </motion.div>

            {/* 1st Place */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="order-1 md:order-2 bg-gradient-to-b from-indigo-900/30 to-indigo-950/30 border border-indigo-500/30 p-10 rounded-3xl text-center relative pt-20 scale-105 shadow-[0_0_50px_-12px_rgba(79,70,229,0.3)]"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                  <Crown className="w-12 h-12 text-yellow-400 fill-yellow-400 drop-shadow-glow" />
                </div>
                <div className="w-32 h-32 rounded-full border-4 border-yellow-400 p-1 bg-slate-950">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-4xl font-bold text-slate-950">
                    AR
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-950 font-black px-4 py-1.5 rounded-full text-base">
                  #1
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-1">Alex Rivera</h3>
              <div className="text-yellow-400 font-black text-3xl mb-4">145,200</div>
              <div className="flex justify-center gap-2">
                <Badge className="bg-yellow-400 text-slate-950 border-transparent">GODLIKE</Badge>
                <Badge variant="outline" className="border-indigo-500/50 text-indigo-400">Level 42</Badge>
              </div>
            </motion.div>

            {/* 3rd Place */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="order-3 md:order-3 bg-slate-900/50 border border-slate-800 p-8 rounded-3xl text-center relative pt-16"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-24 h-24 rounded-full border-4 border-amber-700 p-1 bg-slate-950">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-2xl font-bold">
                    MT
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-700 text-white font-black px-3 py-1 rounded-full text-sm">
                  #3
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">Marcus Thorne</h3>
              <div className="text-indigo-400 font-bold text-2xl mb-4">138,900</div>
              <div className="flex justify-center gap-2">
                <Badge variant="outline" className="border-slate-700 text-slate-400">Level 45</Badge>
                <Badge variant="outline" className="border-slate-700 text-slate-400">7 Day Streak</Badge>
              </div>
            </motion.div>
          </div>

          {/* Table List */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-sm">
            <div className="grid grid-cols-12 gap-4 px-8 py-4 border-b border-slate-800 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <div className="col-span-1">Rank</div>
              <div className="col-span-5">Athlete</div>
              <div className="col-span-2 text-center">Level</div>
              <div className="col-span-2 text-center">Streak</div>
              <div className="col-span-2 text-right">Points</div>
            </div>
            
            {(rankings ?? []).map((user, index) => (
              <motion.div 
                key={user?.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-12 gap-4 px-8 py-6 items-center border-b border-slate-800/50 hover:bg-white/5 transition-colors group"
              >
                <div className="col-span-1 font-bold text-slate-400 group-hover:text-white transition-colors">
                  {index + 1}
                </div>
                <div className="col-span-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs">
                    {user?.avatar}
                  </div>
                  <div>
                    <div className="font-bold">{user?.name}</div>
                    <div className="text-xs text-slate-500">Tier: Platinum Elite</div>
                  </div>
                </div>
                <div className="col-span-2 text-center">
                  <Badge variant="outline" className="border-slate-800">{user?.level}</Badge>
                </div>
                <div className="col-span-2 text-center flex items-center justify-center gap-1.5">
                  <Flame className={cn("w-4 h-4", user.streak > 10 ? "text-orange-500" : "text-slate-500")} />
                  <span className="font-bold">{user?.streak}</span>
                </div>
                <div className="col-span-2 text-right">
                  <div className="font-bold text-indigo-400">{user?.score.toLocaleString()}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Leaderboard;