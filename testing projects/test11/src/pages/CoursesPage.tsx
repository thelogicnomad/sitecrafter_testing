import React, { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { CourseCard, Course } from '@/components/features/CourseCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

const allCourses: Course[] = [
  {
    id: '1',
    title: 'Beginner Tabla: The First 90 Days',
    instructor: 'Guru Rahul Sharma',
    level: 'Beginner',
    duration: '12 Weeks',
    rating: 4.9,
    price: 149,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    category: 'Classical'
  },
  {
    id: '2',
    title: 'Farrukhabad Gharana Gat & Kayda',
    instructor: 'Ustad Karim Khan',
    level: 'Intermediate',
    duration: '10 Weeks',
    rating: 4.7,
    price: 199,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
    category: 'Traditional'
  },
  {
    id: '3',
    title: 'Masters of Speed: Relas & Tihais',
    instructor: 'Pandit Vivek Rao',
    level: 'Advanced',
    duration: '14 Weeks',
    rating: 5.0,
    price: 299,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
    category: 'Advanced'
  },
  {
    id: '4',
    title: 'Tabla for Fusion & World Music',
    instructor: 'Sanjay Das',
    level: 'Intermediate',
    duration: '8 Weeks',
    rating: 4.6,
    price: 129,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop',
    category: 'Fusion'
  },
  {
    id: '5',
    title: 'Rhythm Theory for Percussionists',
    instructor: 'Dr. Anjali Mehta',
    level: 'Beginner',
    duration: '6 Weeks',
    rating: 4.8,
    price: 89,
    image: 'https://images.unsplash.com/photo-1514320298574-2b1284b7ad30?w=800&h=600&fit=crop',
    category: 'Theory'
  },
  {
    id: '6',
    title: 'The Art of Accompaniment',
    instructor: 'Pandit Vivek Rao',
    level: 'Advanced',
    duration: '16 Weeks',
    rating: 4.9,
    price: 349,
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop',
    category: 'Classical'
  }
];

const categories = ['All', 'Classical', 'Traditional', 'Fusion', 'Theory'];

export const CoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-20 pb-16">
      <Section className="bg-muted/30">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Explore Our Courses</h1>
            <p className="text-xl text-muted-foreground">
              Master the art of Tabla with world-class instructors. From basic bols to advanced compositions, we have a curriculum for every stage of your journey.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses, instructors..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted transition-colors">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="text-sm font-medium">Filters</span>
            </button>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria to find what you're looking for.</p>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
};

export default CoursesPage;