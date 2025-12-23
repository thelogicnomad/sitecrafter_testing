import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Trophy, 
  Calendar, 
  Bell, 
  Search,
  LayoutDashboard,
  GraduationCap,
  Settings,
  LogOut
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { CourseProgressTracker } from '@/components/features/CourseProgressTracker';

const stats = [
  { label: 'Courses Enrolled', value: '4', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100' },
  { label: 'Hours Learned', value: '128h', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { label: 'Completed', value: '2', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { label: 'Certificates', value: '1', icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-100' },
];

const activeCourses = [
  {
    title: 'Advanced Software Engineering',
    progress: 65,
    nextLesson: 'Microservices Architecture',
    time: '2:30 PM Today'
  },
  {
    title: 'Digital Marketing Excellence',
    progress: 32,
    nextLesson: 'SEO Advanced Strategies',
    time: 'Tomorrow, 10:00 AM'
  }
];

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              K
            </div>
            <span className="font-bold text-slate-900 tracking-tight">KE Nexus</span>
          </div>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          {[
            { name: 'Dashboard', icon: LayoutDashboard, active: true },
            { name: 'My Courses', icon: BookOpen },
            { name: 'Schedule', icon: Calendar },
            { name: 'Achievements', icon: Trophy },
            { name: 'Resources', icon: GraduationCap },
          ].map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                item.active 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50">
            <Settings className="w-5 h-5" /> Settings
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Top Nav */}
        <header className="bg-white border-b border-slate-200 h-[72px] sticky top-0 z-30 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-grow max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="w-full bg-slate-50 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-900 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-slate-900">Aryan Deshmukh</div>
                <div className="text-xs text-slate-500">Student ID: #KA2934</div>
              </div>
              <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" />
            </div>
          </div>
        </header>

        <Container className="py-8">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Welcome back, Aryan! 👋</h1>
            <p className="text-slate-600">You've completed 65% of your weekly goal. Keep it up!</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat) => (
              <Card key={stat.label} className="p-6 border-none shadow-sm flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Progress Trackers */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="p-6 border-none shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Current Learning Progress</h3>
                  <Button variant="ghost" size="sm" className="text-indigo-600">View All</Button>
                </div>
                <div className="space-y-6">
                  {activeCourses.map((course, i) => (
                    <CourseProgressTracker 
                      key={i}
                      title={course.title}
                      progress={course.progress}
                      nextLesson={course.nextLesson}
                    />
                  ))}
                </div>
              </Card>

              {/* Activity Timeline */}
              <Card className="p-6 border-none shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h3>
                <div className="space-y-6">
                  {[
                    { action: 'Submitted Assignment', target: 'Module 4: Design Patterns', time: '2 hours ago', type: 'upload' },
                    { action: 'Joined Live Session', target: 'Cloud Computing Workshop', time: 'Yesterday', type: 'video' },
                    { action: 'Earned Badge', target: 'Top Contributor - CS Forum', time: '2 days ago', type: 'award' }
                  ].map((activity, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-1 bg-slate-100 rounded-full relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-indigo-600 rounded-full border-2 border-white shadow-sm" />
                      </div>
                      <div className="pb-2">
                        <div className="text-sm font-bold text-slate-900">{activity.action}</div>
                        <div className="text-sm text-slate-600">{activity.target}</div>
                        <div className="text-xs text-slate-400 mt-1">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-8">
              <Card className="p-6 border-none shadow-sm bg-indigo-900 text-white">
                <h3 className="font-bold mb-4">Upcoming Schedule</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 p-3 bg-white/10 rounded-xl">
                    <div className="text-center min-w-[40px]">
                      <div className="text-xs text-indigo-300">OCT</div>
                      <div className="text-lg font-bold">12</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold">System Design Quiz</div>
                      <div className="text-xs text-indigo-300">10:00 AM - 11:30 AM</div>
                    </div>
                  </div>
                  <div className="flex gap-4 p-3 bg-white/10 rounded-xl">
                    <div className="text-center min-w-[40px]">
                      <div className="text-xs text-indigo-300">OCT</div>
                      <div className="text-lg font-bold">14</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold">Project Submission</div>
                      <div className="text-xs text-indigo-300">Before 11:59 PM</div>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-white text-indigo-900 hover:bg-indigo-50">View Full Calendar</Button>
              </Card>

              <Card className="p-6 border-none shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4">Quick Links</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Library', 'Forum', 'Support', 'Grades', 'Identity', 'Payments'].map(link => (
                    <button key={link} className="p-3 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl text-xs font-bold transition-colors text-center">
                      {link}
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default DashboardPage;