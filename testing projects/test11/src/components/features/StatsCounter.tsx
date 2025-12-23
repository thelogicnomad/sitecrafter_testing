import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Award, Globe } from 'lucide-react';

const stats = [
  { label: 'Active Students', value: '12,000+', icon: Users },
  { label: 'Masterclasses', value: '450+', icon: BookOpen },
  { label: 'Certifications', value: '8,500+', icon: Award },
  { label: 'Global Reach', value: '45+', icon: Globe },
];

export const StatsCounter = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-3xl text-center"
        >
          <div className="inline-flex p-3 rounded-2xl bg-[#2d5a88]/20 text-[#2d5a88] mb-4">
            <stat.icon className="w-6 h-6" />
          </div>
          <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-slate-400 text-sm md:text-base font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};