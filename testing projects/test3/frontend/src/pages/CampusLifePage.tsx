import React from 'react';
    import { DomeGallery } from '@/components/marketing/DomeGallery';
    import SectionHeading from '@/components/common/SectionHeading';
    import { usePageTitle } from '@/hooks/usePageTitle';

    const CampusLifePage: React.FC = () => {
        usePageTitle('Campus Life');
        
        return (
            <div className="pt-20">
                <header className="bg-au-bg-light py-24 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-au-primary">Experience Aethelred</h1>
                    <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-au-text-muted">
                        Our campus is more than just buildings; it's a vibrant community where students learn, grow, and thrive.
                    </p>
                </header>

                <section className="h-screen w-full relative">
                    <DomeGallery />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center bg-black/50 p-8 rounded-lg">
                            <h2 className="text-4xl font-bold text-white">Explore Our Campus</h2>
                            <p className="text-white/80 mt-2">Drag to explore our beautiful grounds.</p>
                        </div>
                    </div>
                </section>
            </div>
        );
    };

    export default CampusLifePage;