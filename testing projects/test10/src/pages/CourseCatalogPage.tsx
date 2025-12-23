import React, { useState } from 'react';
import { Search, ChevronDown, AlertCircle } from 'lucide-react';

const CATEGORIES = ['All', 'Technology', 'Business', 'Arts', 'Science', 'Medicine', 'Law'];

const MOCK_COURSES = [
  {
    id: '1',
    title: 'Advanced Software Engineering',
    category: 'Technology',
    instructor: 'Dr. Ramesh Kumar',
    rating: 4.9,
    students: 1240,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
    price: '₹12,000',
    duration: '12 Weeks'
  },
  {
    id: '2',
    title: 'Sustainable Architecture',
    category: 'Arts',
    instructor: 'Ar. Priya Sharma',
    rating: 4.8,
    students: 850,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
    price: '₹15,500',
    duration: '10 Weeks'
  },
  {
    id: '3',
    title: 'Digital Marketing Excellence',
    category: 'Business',
    instructor: 'Sanjay Hegde',
    rating: 4.7,
    students: 2100,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    price: '₹8,999',
    duration: '8 Weeks'
  },
  {
    id: '4',
    title: 'Modern Psychology Foundations',
    category: 'Science',
    instructor: 'Dr. Sarah Mitchell',
    rating: 4.9,
    students: 1500,
    image: 'https://images.unsplash.com/photo-1576089172869-4f5f6f315620?w=400&h=300&fit=crop',
    price: '₹10,500',
    duration: '10 Weeks'
  },
  {
    id: '5',
    title: 'Corporate Law Essentials',
    category: 'Law',
    instructor: 'Adv. Rajesh Varma',
    rating: 4.6,
    students: 920,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop',
    price: '₹18,000',
    duration: '14 Weeks'
  },
  {
    id: '6',
    title: 'Medical Ethics & Practice',
    category: 'Medicine',
    instructor: 'Dr. Anita Desai',
    rating: 4.8,
    students: 750,
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=300&fit=crop',
    price: '₹22,000',
    duration: '16 Weeks'
  }
];

const CourseCard = ({ course }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
        {!imageError ? (
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            crossOrigin="anonymous"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200">
            <div className="text-center">
              <AlertCircle className="w-8 h-8 text-gray-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Image unavailable</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
            {course.category}
          </span>
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="font-semibold text-gray-900">{course.rating}</span>
            <span className="text-gray-500 text-sm">({course.students})</span>
          </div>
          <span className="text-xs text-gray-600">{course.duration}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-gray-900">{course.price}</span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors">
            Enroll
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CourseCatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCourses = MOCK_COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Catalog</h1>
          <p className="text-gray-600">
            Explore our wide range of professional courses designed for your career growth.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses by name or instructor..."
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any courses matching your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}