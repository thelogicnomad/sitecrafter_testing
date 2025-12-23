import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { StatsCounter } from '@/components/features/StatsCounter';
import { ActivityFeed } from '@/components/features/ActivityFeed';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { Play, BookOpen, Award, Clock, ChevronRight } from 'lucide-react';

const activeCourses = [
  {
    title: "Foundations of Delhi Gharana",
    instructor: "Ustad Zakir Rahim",
    progress: 65,
    lastLesson: "Basic Bols: Na, Ta, Tin",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop"
  },
  {
    title: "Teental Mastery",
    instructor: "Pandit Anindo Sen",
    progress: 20,
    lastLesson: "Understanding the Sam",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop"
  }
];

const DashboardPage = () => {
  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen">
      {/* Dashboard Header */}
      <section className="pt-12 pb-8 bg-white border-b border-slate-200">
        <Container>
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-6">
              <Avatar 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop" 
                fallback="AS" 
                className="w-20 h-20 border-4 border-slate-100"
              />
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Welcome back, Arjun!</h1>
                <p className="text-slate-500 flex items-center gap-2">
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-none">Pro Member</Badge>
                  <span>Student ID: TV-2024-882</span>
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Resume Last Lesson
              </button>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Stats & Courses */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: <Clock className="text-blue-500" />, label: "Hours Practiced", value: "42.5" },
                  { icon: <BookOpen className="text-purple-500" />, label: "Lessons Done", value: "18" },
                  { icon: <Award className="text-orange-500" />, label: "Certificates", value: "2" },
                  { icon: <Play className="text-green-500" />, label: "Current Streak", value: "5 Days" }
                ].map((stat, i) => (
                  <Card key={i} className="p-4 flex flex-col items-center text-center">
                    <div className="mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-xs text-slate-500 font-medium uppercase">{stat.label}</div>
                  </Card>
                ))}
              </div>

              {/* Active Courses */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">My Active Courses</h2>
                  <button className="text-primary font-medium flex items-center gap-1">
                    View All <ChevronRight size={16} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {activeCourses.map((course, i) => (
                    <Card key={i} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={course.image} className="w-full h-full object-cover" crossOrigin="anonymous" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <h3 className="font-bold text-slate-900">{course.title}</h3>
                            <span className="text-sm font-bold text-primary">{course.progress}%</span>
                          </div>
                          <p className="text-sm text-slate-500 mb-4">{course.instructor}</p>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all duration-1000" 
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-slate-400 mt-2 italic">Next: {course.lastLesson}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Activity & Notifications */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <div className="p-6 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
                </div>
                <div className="p-2">
                  <ActivityFeed />
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default DashboardPage;