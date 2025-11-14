import React, { useEffect, useState } from 'react';
    import { useParams, Link } from 'react-router-dom';
    import { Clock, Users, School, ChevronsRight } from 'lucide-react';

    import { getProgramById } from '@/api/mockData';
    import { Program, Faculty } from '@/types';
    import { MOCK_FACULTY } from '@/api/mockData';
    import ProfileCard from '@/components/common/ProfileCard';
    import Button from '@/components/common/Button';
    import ProgramAccordion from '@/components/academic/ProgramAccordion';
    import SectionHeading from '@/components/common/SectionHeading';
    import { usePageTitle } from '@/hooks/usePageTitle';
    
    const ProgramDetailPage: React.FC = () => {
      const { programId } = useParams<{ programId: string }>();
      const [program, setProgram] = useState<Program | null>(null);
      const [isLoading, setIsLoading] = useState(true);
      
      usePageTitle(program ? program.name : 'Program Details');

      useEffect(() => {
        if (!programId) return;
        setIsLoading(true);
        getProgramById(programId).then(data => {
          setProgram(data || null);
          setIsLoading(false);
        });
      }, [programId]);
    
      if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
      }
    
      if (!program) {
        return <div className="text-center py-20">Program not found.</div>;
      }
    
      const accordionItems = [
        { id: 'overview', title: 'Overview', content: <p>{program.description}</p> },
        { id: 'curriculum', title: 'Curriculum', content: 
            <ul className="list-disc pl-5 space-y-2">
                {program.focusAreas.map(area => <li key={area}>{area}</li>)}
            </ul>
        },
        { id: 'outcomes', title: 'Outcomes', content: <p>Graduates are prepared for careers in various fields related to {program.name}.</p> },
      ];

      return (
        <div className="pt-20">
          <header className="bg-au-bg-light py-16">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center text-sm text-au-text-muted mb-4">
                <Link to="/" className="hover:text-au-primary">Home</Link>
                <ChevronsRight size={16} className="mx-2" />
                <Link to="/academics" className="hover:text-au-primary">Academics</Link>
                <ChevronsRight size={16} className="mx-2" />
                <span className="font-semibold text-au-primary">{program.name}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-au-primary">{program.name}</h1>
              <p className="mt-2 text-xl text-au-text-muted">Crafting narratives for the digital age.</p>
            </div>
          </header>
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <ProgramAccordion items={accordionItems} />
              </div>
              <aside className="lg:col-span-1">
                <div className="sticky top-24 bg-au-surface p-6 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-au-primary mb-4">Program Details</h3>
                  <ul className="space-y-4 text-au-text-dark">
                    <li className="flex items-center"><School className="mr-3 text-au-accent" /><strong>Degree:</strong><span className="ml-auto">{program.degree}</span></li>
                    <li className="flex items-center"><Clock className="mr-3 text-au-accent" /><strong>Duration:</strong><span className="ml-auto">{program.durationYears} Years</span></li>
                    <li className="flex items-center"><Users className="mr-3 text-au-accent" /><strong>Department:</strong><span className="ml-auto text-right">{program.school}</span></li>
                  </ul>
                  <Button variant="secondary" size="large" className="w-full mt-6">Apply to this Program</Button>
                </div>
              </aside>
            </div>
          </div>
          <section className="bg-au-bg-light py-20">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading title="Meet Your Mentors" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_FACULTY.map(faculty => (
                        <ProfileCard key={faculty.id} name={faculty.name} title={faculty.title} avatarUrl={faculty.imageUrl}/>
                    ))}
                </div>
            </div>
          </section>
        </div>
      );
    };
    
    export default ProgramDetailPage;