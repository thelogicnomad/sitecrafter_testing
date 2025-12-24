import React from 'react';
import { motion } from 'framer-motion';
import { Container, Section } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Heart, MessageCircle, Share2, Star, Users, Zap } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const testimonials = [
  {
    id: 1,
    name: "Elena Rodriguez",
    role: "Marathon Runner",
    content: "CloudVerse has completely changed how I cross-train. The 'Neon Velocity' environment is so immersive I forget I'm actually working out until I see the calorie counter!",
    rating: 5,
    avatar: "ER"
  },
  {
    id: 2,
    name: "David Kim",
    role: "Tech Professional",
    content: "As someone who spends all day in front of a screen, getting into the CloudVerse is the highlight of my day. It's the first 'game' that actually makes me sweat.",
    rating: 5,
    avatar: "DK"
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Fitness Instructor",
    content: "The tracking accuracy is phenomenal. I recommend CloudVerse to my clients who struggle with traditional cardio. It's pure fun.",
    rating: 4,
    avatar: "SJ"
  }
];

const feedItems = [
  {
    id: 1,
    user: "VoltMaster",
    action: "completed a 45min session in",
    target: "Cyber Strike",
    stats: "842 kcal burned",
    time: "2h ago",
    likes: 24,
    comments: 5
  },
  {
    id: 2,
    user: "ZenWarrior",
    action: "achieved a new personal best in",
    target: "Zen Garden",
    stats: "98% Precision",
    time: "4h ago",
    likes: 56,
    comments: 12
  },
  {
    id: 3,
    user: "RhythmKing",
    action: "leveled up to",
    target: "Level 25",
    stats: "Gold Tier Unlocked",
    time: "6h ago",
    likes: 102,
    comments: 28
  }
];

const Community = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate-900 py-20 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-600/20 to-transparent pointer-events-none" />
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Built by Athletes, for the <span className="text-indigo-400">Metaverse</span></h1>
              <p className="text-slate-300 text-lg mb-8">
                Join a global community of over 500,000 users pushing the boundaries of what's possible in fitness. Share your progress, compete in events, and find your tribe.
              </p>
              <div className="flex gap-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-indigo-500 flex items-center justify-center font-bold text-xs">U{i}</div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-bold">500k+ Members</div>
                  <div className="text-slate-400">Active worldwide</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Join the Discussion</h3>
                  <p className="text-slate-400 text-sm">Our official Discord is live!</p>
                </div>
              </div>
              <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4]">Connect on Discord</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <Section className="bg-slate-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">User Stories</h2>
            <p className="text-slate-600">Real results from our global community.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(testimonials ?? []).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-8 h-full flex flex-col shadow-md border-none">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("w-4 h-4 fill-current", i < t.rating ? "text-yellow-400" : "text-slate-200")} />
                    ))}
                  </div>
                  <p className="text-slate-700 italic mb-6 flex-1">"{t.content}"</p>
                  <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{t.name}</div>
                      <div className="text-sm text-slate-500">{t.role}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Social Feed */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Live Activity Feed</h2>
              <Button variant="ghost" className="text-indigo-600">Refresh</Button>
            </div>
            
            <div className="space-y-6">
              {(feedItems ?? []).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                      {item.user.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900">{item.user}</span>
                        <span className="text-xs text-slate-400">{item.time}</span>
                      </div>
                      <p className="text-slate-600 text-sm mb-4">
                        {item.action} <span className="text-indigo-600 font-bold">{item.target}</span>
                      </p>
                      
                      <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-4 mb-4">
                        <Zap className="w-5 h-5 text-indigo-500" />
                        <span className="font-bold text-slate-900">{item.stats}</span>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 text-slate-500 hover:text-rose-500 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span className="text-xs font-bold">{item.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-xs font-bold">{item.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors ml-auto">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button variant="outline" className="border-slate-200">Load More Activity</Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Community;