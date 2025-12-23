import React from 'react';
import { CheckCircle2, FileText, Calendar, HelpCircle, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AdmissionsTimeline } from '@/components/features/AdmissionsTimeline';

const timelineSteps = [
  {
    title: 'Online Registration',
    date: 'June 01 - July 15',
    description: 'Create your account on the portal and fill in basic details to start your application.',
    status: 'completed' as const
  },
  {
    title: 'Document Upload',
    date: 'July 16 - July 30',
    description: 'Upload scanned copies of marks cards, identity proof, and category certificates.',
    status: 'current' as const
  },
  {
    title: 'Entrance Examinations',
    date: 'August 10 - August 20',
    description: 'Subject-specific entrance tests conducted across various centers in Karnataka.',
    status: 'upcoming' as const
  },
  {
    title: 'Counseling & Interview',
    date: 'September 01 - September 15',
    description: 'Personal interviews and seat allotment based on merit and preference.',
    status: 'upcoming' as const
  }
];

const AdmissionsGuidePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600&h=900&fit=crop" 
            alt="Campus" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-indigo-500 text-white mb-6">Admissions 2024 Now Open</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Begin Your Journey to <span className="text-indigo-400">Academic Excellence</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Everything you need to know about the admission process, eligibility criteria, and key deadlines for the upcoming academic session.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 h-14 px-8">Apply Online Now</Button>
              <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 h-14">Download Prospectus</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Timeline Section */}
      <Section className="bg-slate-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Admissions Lifecycle</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Follow these steps to ensure a smooth application process.</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <AdmissionsTimeline steps={timelineSteps} />
        </div>
      </Section>

      {/* Requirements Section */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Required Documentation</h2>
            <p className="text-lg text-slate-600 mb-8">
              Please ensure you have digital copies of the following documents ready before starting your application.
            </p>
            
            <div className="space-y-4">
              {[
                'Class 10th & 12th Marks Cards',
                'Transfer Certificate (TC)',
                'Migration Certificate (for non-KA students)',
                'Character Certificate',
                'Caste/Income Certificate (if applicable)',
                '4 Recent Passport Size Photographs',
                'Valid Government ID (Aadhar/PAN)'
              ].map((doc, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{doc}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-indigo-900 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-2xl font-bold mb-6">Need Assistance?</h3>
            <p className="text-indigo-200 mb-8 leading-relaxed">
              Our admissions helpdesk is available Monday to Saturday (9:00 AM - 5:00 PM) to assist you with any queries regarding the application process.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-800 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-indigo-300" />
                </div>
                <div>
                  <div className="font-bold">General Inquiries</div>
                  <div className="text-indigo-300">admissions@kenexus.edu.in</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-800 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-indigo-300" />
                </div>
                <div>
                  <div className="font-bold">Technical Support</div>
                  <div className="text-indigo-300">portal-help@kenexus.edu.in</div>
                </div>
              </div>
            </div>
            
            <Button className="w-full mt-10 bg-white text-indigo-900 hover:bg-indigo-50 h-14 font-bold">
              Schedule a Call Back
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default AdmissionsGuidePage;