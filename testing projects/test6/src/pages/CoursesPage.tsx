import { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Search, ListFilter } from 'lucide-react';
    import { CourseCard } from '@/components/CourseCard';
    import { Button } from '@/components/ui/Button';
    import type { Course } from '@/types';
    
    const allCourses: Course[] = [
        { id: 1, title: 'Tabla Basics: Hand Positioning & Tone Production', instructor: 'Anil Sharma', price: '$39/mo', rating: 4.9, students: 1200, category: 'Beginner', image: 'https://images.unsplash.com/photo-1565103442895-2c84c18a8165?w=800&q=80' },
        { id: 2, title: 'Advanced Theka Variation', instructor: 'Priya Singh', price: '$89/mo', rating: 4.8, students: 550, category: 'Advanced', image: 'https://images.unsplash.com/photo-1598387993441-2b011681a833?w=800&q=80' },
        { id: 3, title: 'Rhythmic Sight Reading', instructor: 'Rohan Kumar', price: '$59/mo', rating: 4.7, students: 900, category: 'Intermediate', image: 'https://images.unsplash.com/photo-1629909284242-8d778875567b?w=800&q=80' },
        { id: 4, title: 'Bol Sequencing for Solos', instructor: 'Priya Singh', price: '$99/mo', rating: 4.9, students: 400, category: 'Advanced', image: 'https://images.unsplash.com/photo-1559825481-6d452d815750?w=800&q=80' },
        { id: 5, title: 'Intro to Tintal', instructor: 'Anil Sharma', price: '$39/mo', rating: 4.8, students: 1500, category: 'Beginner', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80' },
        { id: 6, title: 'Keherwa and Dadra Rhythms', instructor: 'Rohan Kumar', price: '$49/mo', rating: 4.6, students: 1100, category: 'Intermediate', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80' },
        { id: 7, title: 'The Art of Accompaniment', instructor: 'Meera Desai', price: '$79/mo', rating: 4.7, students: 650, category: 'Advanced', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80' },
        { id: 8, title: 'Understanding Rupak Taal', instructor: 'Anil Sharma', price: '$59/mo', rating: 4.5, students: 800, category: 'Intermediate', image: 'https://images.unsplash.com/photo-1516280440614-376394488844?w=800&q=80' },
        { id: 9, title: 'Your First 10 Bols', instructor: 'Anil Sharma', price: '$29/mo', rating: 5.0, students: 2500, category: 'Beginner', image: 'https://images.unsplash.com/photo-1607994998188-9635b430034a?w=800&q=80' },
        { id: 10, title: 'Complex Tihai Structures', instructor: 'Priya Singh', price: '$109/mo', rating: 4.9, students: 300, category: 'Advanced', image: 'https://images.unsplash.com/photo-1588791328318-f7c3c544f85e?w=800&q=80' },
        { id: 11, 'title': 'Intermediate Speed Drills', instructor: 'Rohan Kumar', price: '$69/mo', rating: 4.6, students: 750, category: 'Intermediate', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80' },
        { id: 12, 'title': 'Studio Recording for Tabla', instructor: 'Meera Desai', price: '$89/mo', rating: 4.8, students: 450, category: 'Advanced', image: 'https://images.unsplash.com/photo-1466428996289-fb355538da1b?w=800&q=80' },
    ];
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const CoursesPage = () => {
      const [filteredCourses, setFilteredCourses] = useState(allCourses);
    
      return (
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <header className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground">Comprehensive Tabla Course Catalog</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Filter and explore {allCourses.length} in-depth courses designed for every level of musician.</p>
          </header>
    
          <div className="sticky top-24 z-10 bg-background/80 backdrop-blur-sm py-4 my-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input type="text" placeholder="Search courses..." className="w-full pl-10 pr-4 py-2 rounded-md border bg-card focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <Button variant="outline" className="w-full md:w-auto"><ListFilter className="mr-2 h-4 w-4" /> Filters</Button>
            </div>
          </div>
    
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </motion.div>
    
          <div className="mt-16 flex justify-center">
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="ghost" size="sm">1</Button>
                <Button variant="ghost" size="sm">2</Button>
                <Button variant="ghost" size="sm">3</Button>
                <span>...</span>
                <Button variant="ghost" size="sm">8</Button>
                <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      );
    };
    
    export default CoursesPage;