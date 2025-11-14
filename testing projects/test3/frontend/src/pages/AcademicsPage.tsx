import React from 'react';
    import SectionHeading from '@/components/common/SectionHeading';
    import CourseCard from '@/components/academic/CourseCard';
    import { MOCK_PROGRAMS } from '@/api/mockData';
    import { usePageTitle } from '@/hooks/usePageTitle';

    const AcademicsPage: React.FC = () => {
        usePageTitle('Academics');
      return (
        <div className="bg-au-bg-light">
          <header className="bg-au-primary text-au-surface py-24">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-6xl font-bold">Curiosity Cultivated. Excellence Achieved.</h1>
              <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-au-surface/80">
                Explore the diverse schools and departments that form the foundation of Aethelred’s world-class education.
              </p>
            </div>
          </header>

          <section className="py-20">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading title="Our Programs" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_PROGRAMS.map(program => (
                  <CourseCard key={program.id} program={program} />
                ))}
              </div>
            </div>
          </section>
        </div>
      );
    };

    export default AcademicsPage;