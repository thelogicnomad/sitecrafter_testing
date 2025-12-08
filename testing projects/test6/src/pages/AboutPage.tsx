import { ProfileCard } from '@/components/ui/ProfileCard';
    import type { TeamMember } from '@/types';
    
    const team: TeamMember[] = [
        { name: 'Guru Ravi Menon', title: 'Founder & Lead Instructor', expertise: 'Expertise: Traditional Benares Gharana', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80' },
        { name: 'Priya Sharma', title: 'CTO & Platform Architect', expertise: 'Expertise: Scalable Learning Systems', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80' },
        { name: 'Sameer Joshi', title: 'Curriculum Designer', expertise: 'Expertise: Beginner Pedagogy', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80' },
        { name: 'Anjali Rao', title: 'Community Manager', expertise: 'Expertise: Student Engagement', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80' },
    ];
    
    const AboutPage = () => {
      return (
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <section className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground">Rhythm, Reverence, Reach: Our Founding Vision</h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
              Our mission is to democratize the ancient art of tabla, making world-class musical education accessible to anyone, anywhere. We are committed to preserving the rich traditions of Indian classical music while leveraging technology to create an unparalleled learning experience for a global community of enthusiasts.
            </p>
          </section>
    
          <section className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center text-foreground">Meet the Gurus and Core Team</h2>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" style={{ perspective: '1000px' }}>
              {team.map((member) => (
                <ProfileCard 
                  key={member.name}
                  name={member.name}
                  title={member.title}
                  expertise={member.expertise}
                  avatarUrl={member.avatar}
                />
              ))}
            </div>
          </section>
        </div>
      );
    };
    
    export default AboutPage;