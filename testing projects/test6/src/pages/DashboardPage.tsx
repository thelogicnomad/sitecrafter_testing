import { BarChart, CheckCircle, Clock } from 'lucide-react';
    import { motion } from 'framer-motion';
    
    const StatCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => (
        <div className="bg-card p-6 rounded-lg shadow border flex items-start gap-4">
            <div className="bg-primary/10 text-primary p-3 rounded-md">
                {icon}
            </div>
            <div>
                <p className="text-sm text-muted-foreground">{title}</p>
                <p className="text-2xl font-bold font-heading">{value}</p>
            </div>
        </div>
    );

    const ProgressCard = ({ title, progress }: {title: string, progress: number}) => (
        <div className="bg-card p-4 rounded-lg shadow border flex items-center gap-4">
            <div className="flex-grow">
                <h4 className="font-semibold text-foreground">{title}</h4>
                <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                    <motion.div 
                      className="bg-primary h-2.5 rounded-full" 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                </div>
            </div>
            <p className="font-bold text-primary">{progress}%</p>
        </div>
    );
    
    const DashboardPage = () => {
      return (
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <header>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground">Your Progress Snapshot</h1>
          </header>
          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard title="Courses Enrolled" value="5" icon={<BarChart />} />
            <StatCard title="Overall Progress" value="45%" icon={<Clock />} />
            <StatCard title="Certificates Earned" value="1" icon={<CheckCircle />} />
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <main className="lg:col-span-2">
                <h2 className="text-2xl font-bold font-heading text-foreground">Continue Learning</h2>
                <div className="mt-6 space-y-4">
                    <ProgressCard title="Foundations of Taal Cycle" progress={80} />
                    <ProgressCard title="Advanced Theka Improvisation" progress={15} />
                    <ProgressCard title="Rhythmic Sight Reading" progress={100} />
                </div>
            </main>
            <aside>
                <h2 className="text-2xl font-bold font-heading text-foreground">Recent Activity</h2>
                <ul className="mt-6 space-y-4 text-sm">
                    <li className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center flex-shrink-0">✓</div>
                        <div><span className="font-semibold">Completed Lesson:</span> 'Tintal: Layering theka' <span className="block text-xs text-muted-foreground">2 hours ago</span></div>
                    </li>
                     <li className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">+</div>
                        <div><span className="font-semibold">Joined Forum:</span> 'Advanced Theory Q&A' <span className="block text-xs text-muted-foreground">5 hours ago</span></div>
                    </li>
                     <li className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center flex-shrink-0">✓</div>
                        <div><span className="font-semibold">Quiz Passed:</span> 'Taal Identification I' <span className="block text-xs text-muted-foreground">Yesterday</span></div>
                    </li>
                </ul>
            </aside>
          </div>
        </div>
      );
    };
    
    export default DashboardPage;