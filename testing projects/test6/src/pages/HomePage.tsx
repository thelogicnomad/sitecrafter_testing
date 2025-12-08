import { motion } from 'framer-motion';
    import { SplitText } from '@/components/ui/SplitText';
    import { Button } from '@/components/ui/Button';
    import { CourseCard } from '@/components/CourseCard';
    import { useCountUp } from '@/hooks/useCountUp';
    import { BookUser, Music, Users, Star } from 'lucide-react';
    import type { Course } from '@/types';

    const featuredCourses: Course[] = [
      { id: 1, title: 'Foundations of Taal Cycle', instructor: 'Guru Anil Sharma', price: '$49/mo', rating: 4.7, students: 1200, category: 'Beginner', image: 'https://images.unsplash.com/photo-1612101031332-9f416a220c33?w=800&q=80' },
      { id: 2, title: 'Advanced Theka Improvisation', instructor: 'Guru Priya Singh', price: '$79/mo', rating: 4.9, students: 550, category: 'Advanced', image: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=800&q=80' },
      { id: 3, title: 'Tabla Maintenance & Care', instructor: 'Guest Expert', price: '$29/mo', rating: 4.5, students: 900, category: 'Intermediate', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80' },
    ];

    const StatCard = ({ icon, value, label }: { icon: React.ReactNode, value: number, label: string }) => {
      const count = useCountUp(value);
      return (
        <div className="text-center">
            <div className="flex justify-center text-primary-foreground/80">{icon}</div>
            <p className="text-4xl md:text-5xl font-bold font-heading text-primary-foreground mt-2">{count.toLocaleString()}+</p>
            <p className="text-sm text-primary-foreground/70 mt-1">{label}</p>
        </div>
      );
    }

    const HomePage = () => {
      return (
        <div className="overflow-x-hidden">
          {/* Hero Section */}
          <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
            <SplitText text="Master the Tabla: Rhythm, Precision, and Soul" className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-foreground" />
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground"
            >
              Unlock ancient musical wisdom through interactive, expert-guided online tabla classes and advanced technique modules.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" asChild><a href="/courses">Start Your Free Trial</a></Button>
              <Button size="lg" variant="secondary" asChild><a href="/about">Meet Our Gurus</a></Button>
            </motion.div>
          </section>

          {/* Featured Courses */}
          <section className="py-16 md:py-20 bg-muted">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-center text-foreground">Where Tradition Meets Technology</h2>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ staggerChildren: 0.2 }}
                className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {featuredCourses.map(course => <CourseCard key={course.id} course={course} />)}
              </motion.div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 md:py-20 bg-primary">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-center text-primary-foreground">Our Impact So Far</h2>
              <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard icon={<Users size={40}/>} value={18500} label="Students Enrolled" />
                <StatCard icon={<Music size={40}/>} value={42} label="Courses Offered" />
                <StatCard icon={<BookUser size={40}/>} value={28} label="Expert Gurus" />
                <StatCard icon={<Star size={40}/>} value={4.8} label="Average Rating" />
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 md:py-24">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground">Ready to Feel the Rhythm?</h2>
              <div className="mt-8">
                 <Button size="lg" asChild><a href="/courses">Enroll Now and Begin Your Journey</a></Button>
              </div>
            </div>
          </section>
        </div>
      );
    };

    export default HomePage;