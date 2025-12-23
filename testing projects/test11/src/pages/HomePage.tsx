import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Music, Users, Award, PlayCircle } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Aurora } from '@/components/ui/Aurora';
import { SplitText } from '@/components/ui/SplitText';
import { RotatingText } from '@/components/ui/RotatingText';
import { CourseCard, Course } from '@/components/features/CourseCard';
import { StatsCounter } from '@/components/features/StatsCounter';

const featuredCourses: Course[] = [
  {
    id: '1',
    title: 'Foundations of Delhi Gharana',
    instructor: 'Ustad Zakir Rahim',
    level: 'Beginner',
    duration: '12 Weeks',
    rating: 4.9,
    price: 199,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    category: 'Classical'
  },
  {
    id: '2',
    title: 'Advanced Teental Variations',
    instructor: 'Pandit Anindo Sen',
    level: 'Advanced',
    duration: '8 Weeks',
    rating: 5.0,
    price: 299,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
    category: 'Rhythm'
  },
  {
    id: '3',
    title: 'The Art of Accompaniment',
    instructor: 'Guru Meera Bai',
    level: 'Intermediate',
    duration: '10 Weeks',
    rating: 4.8,
    price: 249,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
    category: 'Performance'
  }
];

const HomePage = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-900">
        <Aurora colorStops={["#2d5a88", "#1a1c23", "#fca311"]} speed={0.5} />
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
                Master the Rhythm of <br />
                <RotatingText 
                  texts={['Teental', 'Ektaal', 'Jhaptal', 'Rupak']}
                  mainClassName="text-accent inline-block"
                  staggerDuration={0.05}
                  rotationInterval={3000}
                />
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl leading-relaxed"
            >
              Join TaalVista, the world's premier digital academy for Tabla. 
              Learn from legendary Gurus through interactive, high-definition lessons.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-slate-900 font-bold px-8 py-6 text-lg">
                Start Learning Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 px-8 py-6 text-lg">
                <PlayCircle className="mr-2 h-5 w-5" /> Watch Demo
              </Button>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <Section className="bg-white border-b border-slate-100">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCounter end={5000} suffix="+" label="Active Students" />
            <StatsCounter end={150} suffix="+" label="Expert Gurus" />
            <StatsCounter end={450} suffix="+" label="HD Lessons" />
            <StatsCounter end={98} suffix="%" label="Success Rate" />
          </div>
        </Container>
      </Section>

      {/* Featured Courses */}
      <Section className="bg-slate-50">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                Curated Learning Paths
              </h2>
              <p className="text-lg text-slate-600">
                From basic finger placements to complex Tihais, our structured courses 
                cater to every skill level and Gharana style.
              </p>
            </div>
            <Button variant="outline" className="text-primary border-primary hover:bg-primary/5">
              View All Courses
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Value Propositions */}
      <Section className="bg-slate-900 text-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop" 
                alt="Tabla Session" 
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <PlayCircle className="w-10 h-10 text-slate-900" />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                Why Choose <span className="text-accent">TaalVista</span> Academy?
              </h2>
              <div className="space-y-6">
                {[
                  { icon: <Music className="text-accent" />, title: "Authentic Pedagogy", desc: "Traditional Gharana-based teaching adapted for the modern digital era." },
                  { icon: <Users className="text-accent" />, title: "Live Masterclasses", desc: "Direct interaction with world-renowned Tabla maestros every month." },
                  { icon: <Award className="text-accent" />, title: "Global Certification", desc: "Recognized certificates upon completion of each grade level." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 bg-white/10 p-3 rounded-lg">{item.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section className="bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <Container className="relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to find your rhythm?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of students worldwide and start your musical journey today. 
            Get 7 days of full access for free.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-slate-100 font-bold px-10 py-6">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-10 py-6">
              Contact Sales
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default HomePage;