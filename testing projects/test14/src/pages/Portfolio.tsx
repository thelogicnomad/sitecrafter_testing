import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Filter, Maximize2, X } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const categories = ['All', '3D Motion', 'Brand Design', 'Interactive', 'VFX'];

const projects = [
  { id: 1, title: 'Prism Core', category: '3D Motion', color: 'from-blue-600 to-indigo-600', description: 'Real-time particle simulation for a fintech leader.' },
  { id: 2, title: 'Velocitas', category: 'Brand Design', color: 'from-rose-500 to-orange-500', description: 'Rebranding a high-performance sports apparel company.' },
  { id: 3, title: 'Aether UI', category: 'Interactive', color: 'from-emerald-500 to-teal-500', description: 'Next-gen dashboard for space exploration logistics.' },
  { id: 4, title: 'Neon Pulse', category: 'VFX', color: 'from-purple-500 to-pink-500', description: 'Cinematic trailer effects for an indie gaming studio.' },
  { id: 5, title: 'Gravity Shift', category: '3D Motion', color: 'from-cyan-500 to-blue-500', description: 'Abstract exploration of physical laws in a digital void.' },
  { id: 6, title: 'Nexus Identity', category: 'Brand Design', color: 'from-amber-400 to-rose-400', description: 'Logo and identity system for a global tech conglomerate.' },
];

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const filteredProjects = activeTab === 'All' 
    ? projects 
    : (projects ?? []).filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-32 pb-16 bg-slate-900">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Portfolio</h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              Exploring the boundaries of motion and design. Every project is a unique 
              journey in visual storytelling.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-[72px] z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4">
        <Container>
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
            <Filter className="w-5 h-5 text-slate-400 shrink-0" />
            {(categories ?? []).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap",
                  activeTab === cat 
                    ? "bg-slate-900 text-white" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Grid */}
      <Section className="bg-white">
        <Container>
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {(filteredProjects ?? []).map((project, idx) => (
                <motion.div
                  key={project?.id ?? idx}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                    <div className={cn("absolute inset-0 bg-gradient-to-br", project?.color ?? 'from-slate-200 to-slate-300')} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Badge variant="outline" className="mb-2 border-slate-200 text-slate-500 uppercase tracking-tighter text-[10px]">
                      {project?.category ?? 'Category'}
                    </Badge>
                    <h3 className="text-xl font-bold text-slate-900">{project?.title ?? 'Untitled'}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </Section>

      {/* Project Modal */}
      <Modal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title ?? 'Project Details'}
      >
        <div className="space-y-6">
          <div className={cn("w-full h-64 rounded-xl bg-gradient-to-br", selectedProject?.color ?? 'from-slate-200 to-slate-300')} />
          <div>
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">The Challenge</h4>
            <p className="text-slate-700 leading-relaxed">
              {selectedProject?.description ?? 'Detailed project description goes here...'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <span className="text-xs text-slate-400 block mb-1">Duration</span>
              <span className="font-bold text-slate-900">4 Months</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <span className="text-xs text-slate-400 block mb-1">Tech Stack</span>
              <span className="font-bold text-slate-900">C4D, Octane, AE</span>
            </div>
          </div>
          <Button className="w-full bg-slate-900 text-white h-12">Visit Project Site</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Portfolio;