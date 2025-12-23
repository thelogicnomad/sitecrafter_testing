import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, GraduationCap, Users, Award } from 'lucide-react';

const stats = [
  { label: 'Enrolled Students', value: '50,000+', icon: Users },
  { label: 'Academic Programs', value: '120+', icon: BookOpen },
  { label: 'Expert Faculty', value: '1,200+', icon: GraduationCap },
  { label: 'Global Rankings', value: 'Top 10', icon: Award },
];

const featuredCourses = [
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
    category: 'Design',
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
  }
];

const CourseCard = ({ id, title, category, instructor, rating, students, image, price, duration }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
    >
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
        {!imgError ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            crossOrigin="anonymous"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200">
            <p className="text-gray-600 text-sm">Image unavailable</p>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="mb-3">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
        <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-slate-600 mb-4">{instructor}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="font-semibold text-slate-900">{rating}</span>
            <span className="text-slate-500 text-sm">({students})</span>
          </div>
          <span className="text-xs text-slate-600">{duration}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-slate-900">{price}</span>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Enroll
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialCard = ({ quote, author, role, img }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl"
    >
      <p className="text-slate-300 text-lg italic mb-8">"{quote}"</p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 overflow-hidden flex-shrink-0">
          {!imgError ? (
            <img
              src={img}
              alt={author}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
              crossOrigin="anonymous"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400" />
          )}
        </div>
        <div>
          <div className="text-white font-bold">{author}</div>
          <div className="text-slate-400 text-sm">{role}</div>
        </div>
      </div>
    </motion.div>
  );
};

const HomePage = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-600/20 via-transparent to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                Empowering Karnataka's Future Through Education
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl lg:text-2xl text-slate-300 mb-10 max-w-2xl"
            >
              Access world-class learning resources, expert faculty, and a vibrant academic community dedicated to excellence in the heart of India's Silicon Valley.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-14 text-lg font-semibold rounded-lg transition-colors">
                Explore Programs
              </button>
              <button className="border border-white/20 hover:bg-white/10 text-white px-8 h-14 text-lg font-semibold rounded-lg transition-colors">
                View Admissions
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <stat.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm md:text-base text-slate-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="bg-slate-50 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Featured Academic Programs
              </h2>
              <p className="text-lg text-slate-600">
                Discover our most popular courses designed by industry experts and top-tier academicians to accelerate your career.
              </p>
            </div>
            <button className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-2 transition-colors">
              View All Courses <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-900 overflow-hidden relative py-12 md:py-16">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-600/10 blur-3xl rounded-full translate-x-1/2" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">What Our Students Say</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Hear from the thousands of successful graduates who have transformed their lives through Karnataka Education Nexus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                quote: "The quality of faculty and the modern curriculum at Karnataka Education Nexus surpassed my expectations. It provided the perfect bridge to my first job in tech.",
                author: "Ananya Rao",
                role: "Software Engineer at Infosys",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
              },
              {
                quote: "Comprehensive learning materials and a supportive community. The admissions process was seamless, and the career counseling helped me find my true passion.",
                author: "Karthik Gowda",
                role: "Architecture Graduate",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
              }
            ].map((testimonial, i) => (
              <TestimonialCard key={i} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;