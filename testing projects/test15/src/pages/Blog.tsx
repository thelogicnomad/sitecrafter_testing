import React from 'react';
import { motion } from 'framer-motion';
import { Container, Section } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Clock, Calendar, ArrowRight, ChevronRight } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const posts = [
  {
    id: 1,
    title: "Mastering High-Intensity Intervals in VR",
    excerpt: "Learn how to optimize your cardiovascular health using our new HIIT-specific environments.",
    category: "Training",
    date: "Oct 24, 2023",
    readTime: "5 min",
    imageUrl: "https://images.unsplash.com/photo-1585559604959-6388fe69c92a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDczNjF8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBoZWFsdGglMjBibG9nfGVufDB8fHx8MTc2NjU4NDQ1NXww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    title: "The Science of Immersion: Why VR Workouts Feel Easier",
    excerpt: "Discover the psychological benefits of exercising in virtual reality and why time flies when you're in the zone.",
    category: "Science",
    date: "Oct 20, 2023",
    readTime: "8 min",
    imageUrl: "https://images.unsplash.com/photo-1657165235722-e50bbac41584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDczNjF8MHwxfHNlYXJjaHwxfHxob2xvZ3JhcGhpYyUyMGZpdG5lc3MlMjBkYXNoYm9hcmR8ZW58MHx8fHwxNzY2NTg0NDM5fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    title: "New Update: Zenith City Environment Reveal",
    excerpt: "Take a first look at our upcoming cyberpunk metropolis workout world launching next month.",
    category: "News",
    date: "Oct 15, 2023",
    readTime: "3 min",
    imageUrl: "https://images.unsplash.com/photo-1728632286888-04c64f48e506?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDczNjF8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBjaXR5JTIwd29ya291dHxlbnwwfHx8fDE3NjY1ODQ0Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 4,
    title: "Nutrition for the Virtual Athlete",
    excerpt: "Fueling your body for high-intensity VR sessions requires a specific approach to hydration and macros.",
    category: "Nutrition",
    date: "Oct 12, 2023",
    readTime: "6 min",
    imageUrl: "https://images.unsplash.com/photo-1665470909933-42ff1a746f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDczNjF8MHwxfHNlYXJjaHwxfHxob3QlMjBwaW5rJTIwY2Fsb3JpZSUyMGNvdW50ZXJ8ZW58MHx8fHwxNzY2NTg0NDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Featured Post */}
      <section className="bg-slate-900 py-20 text-white overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Badge className="bg-indigo-500 text-white border-transparent mb-6">FEATURED ARTICLE</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                How VR is Revolutionizing Physical Therapy
              </h1>
              <p className="text-slate-400 text-lg mb-8">
                Clinicians are increasingly turning to immersive environments to help patients recover faster and with less pain through gamified movement protocols.
              </p>
              <div className="flex items-center gap-6 mb-8 text-sm text-slate-400 font-medium">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Oct 28, 2023</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 12 min read</span>
              </div>
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">Read Full Story</Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
            >
              <img 
                src="https://images.unsplash.com/photo-1698306642516-9841228dcff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDczNjF8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwaGVhcnQlMjByYXRlJTIwbW9uaXRvcnxlbnwwfHx8fDE3NjY1ODQ0NDR8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="Heart Rate Monitor"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Blog Grid */}
      <Section>
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Latest Insights</h2>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {['All', 'Training', 'News', 'Science', 'Nutrition'].map(cat => (
                <button key={cat} className="px-4 py-2 rounded-lg text-sm font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(posts ?? []).map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full flex flex-col overflow-hidden group cursor-pointer border-slate-200 hover:border-indigo-500 transition-all shadow-sm hover:shadow-xl">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <Badge className="absolute top-4 left-4 bg-white/90 text-slate-900 border-transparent backdrop-blur-sm">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-6 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-indigo-600 font-bold text-sm">
                      Read More <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button variant="outline" size="lg" className="border-slate-300">
              Load More Articles
            </Button>
          </div>
        </Container>
      </Section>

      {/* Newsletter */}
      <Section className="bg-slate-900 py-24">
        <Container>
          <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Stay in the Loop</h2>
              <p className="text-indigo-100 text-lg mb-10">
                Get the latest workout updates, science-backed fitness tips, and community highlights delivered to your inbox.
              </p>
              <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-6 py-4 rounded-2xl bg-white text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-400"
                />
                <Button className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-4 rounded-2xl h-auto font-bold">
                  Subscribe
                </Button>
              </form>
              <p className="text-indigo-200 text-xs mt-6 opacity-60">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Blog;