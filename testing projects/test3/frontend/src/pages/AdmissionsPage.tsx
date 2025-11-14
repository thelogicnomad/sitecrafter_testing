import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Calendar, DollarSign, Edit3 } from 'lucide-react';
    import SectionHeading from '@/components/common/SectionHeading';
    import Button from '@/components/common/Button';
    import { usePageTitle } from '@/hooks/usePageTitle';

    const AdmissionsPage: React.FC = () => {
        usePageTitle('Admissions');
      const timeline = [
        { date: 'Sept 1', event: 'Early Action Deadline' },
        { date: 'Nov 15', event: 'Regular Decision Deadline' },
        { date: 'Jan 1', event: 'Financial Aid Priority Submission' },
        { date: 'Mar 15', event: 'Admission Decisions Released' },
      ];

      return (
        <div className="pt-20">
          <header className="bg-au-primary text-au-surface py-24 text-center">
            <h1 className="text-4xl md:text-6xl font-bold">Join the Next Generation of Leaders.</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-au-surface/80">
              The application process is the first step in joining the Aethelred community. Review requirements, deadlines, and financial aid options below.
            </p>
          </header>

          <section className="py-20">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading title="Application Timeline" />
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute left-1/2 w-0.5 h-full bg-au-text-muted/30 -translate-x-1/2"></div>
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    className="relative mb-8 flex items-center"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left order-2'}`}>
                      <p className="font-bold text-au-accent">{item.date}</p>
                      <p className="text-au-primary font-semibold">{item.event}</p>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 bg-au-surface border-4 border-au-accent rounded-full w-6 h-6 z-10"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-au-bg-light">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <SectionHeading title="Investing in Your Future" className="text-left mb-6" />
                        <p className="text-lg text-au-text-muted mb-4">We are committed to making an Aethelred education accessible. Explore our comprehensive financial aid options, including scholarships, grants, and loans.</p>
                        <p className="text-2xl font-bold text-au-primary mb-6">Over 60% of incoming students receive institutional aid.</p>
                        <Button variant="secondary" size="large">View Scholarship Database</Button>
                    </div>
                    <div className="flex justify-center">
                        <DollarSign className="w-48 h-48 text-au-accent/30" />
                    </div>
                </div>
            </div>
          </section>
          
          <InquiryForm />
        </div>
      );
    };

    const InquiryForm = () => {
        const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
      
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setStatus('loading');
          setTimeout(() => {
            setStatus('success');
          }, 1500);
        };
      
        if (status === 'success') {
          return (
            <section id="inquiry" className="py-20">
                <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-au-primary">Thank You!</h2>
                    <p className="mt-4 text-lg text-au-text-muted">Your inquiry has been received. Our admissions team will be in touch shortly.</p>
                </div>
            </section>
          );
        }
      
        return (
          <section id="inquiry" className="py-20">
            <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <SectionHeading title="Request Information" />
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-au-text-dark">Full Name</label>
                  <input type="text" id="name" required className="mt-1 block w-full px-3 py-2 border border-au-text-muted/30 rounded-md shadow-sm focus:outline-none focus:ring-au-accent focus:border-au-accent" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-au-text-dark">Email Address</label>
                  <input type="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-au-text-muted/30 rounded-md shadow-sm focus:outline-none focus:ring-au-accent focus:border-au-accent" />
                </div>
                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-au-text-dark">Intended Study Level</label>
                  <select id="level" required className="mt-1 block w-full px-3 py-2 border border-au-text-muted/30 rounded-md shadow-sm focus:outline-none focus:ring-au-accent focus:border-au-accent">
                    <option>Undergraduate</option>
                    <option>Graduate</option>
                    <option>Undecided</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-au-text-dark">Message</label>
                  <textarea id="message" rows={4} className="mt-1 block w-full px-3 py-2 border border-au-text-muted/30 rounded-md shadow-sm focus:outline-none focus:ring-au-accent focus:border-au-accent"></textarea>
                </div>
                <div>
                  <Button type="submit" variant="primary" size="large" isLoading={status === 'loading'} className="w-full">Submit Inquiry</Button>
                </div>
              </form>
            </div>
          </section>
        );
      };

    export default AdmissionsPage;