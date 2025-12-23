import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ProfileCard } from '@/components/ui/ProfileCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Music, Award, Star } from 'lucide-react';

const gurus = [
  {
    name: "Ustad Zakir Rahim",
    role: "Senior Instructor - Delhi Gharana",
    bio: "A disciple of the legendary masters, Ustad Zakir has over 40 years of experience in performance and teaching.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
    socials: { twitter: "#", linkedin: "#", github: "#" }
  },
  {
    name: "Pandit Anindo Sen",
    role: "Farrukhabad Specialist",
    bio: "Renowned for his incredible speed and clarity, Pandit Sen brings the rich tradition of Farrukhabad to digital life.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    socials: { twitter: "#", linkedin: "#" }
  },
  {
    name: "Guru Meera Bai",
    role: "Lead Accompanist & Educator",
    bio: "Specializing in the art of vocal and instrumental accompaniment, Meera has performed at major festivals worldwide.",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop",
    socials: { twitter: "#", github: "#" }
  },
  {
    name: "Rahul Sharma",
    role: "Foundations & Basics",
    bio: "Rahul specializes in making Tabla accessible for modern learners, focusing on ergonomic technique and daily practice.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    socials: { linkedin: "#" }
  }
];

const InstructorsPage = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-primary text-white">
        <Container>
          <div className="max-w-3xl">
            <Badge className="bg-accent text-slate-900 font-bold mb-6">WORLD-CLASS FACULTY</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-8">Learn from the <span className="text-accent">Masters</span></h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Our instructors aren't just teachers—they are practitioners of a centuries-old 
              lineage, dedicated to passing on the pure essence of Tabla to the next generation.
            </p>
          </div>
        </Container>
      </section>

      {/* Guru Grid */}
      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {gurus.map((guru, i) => (
              <ProfileCard 
                key={i}
                name={guru.name}
                role={guru.role}
                bio={guru.bio}
                image={guru.image}
                socials={guru.socials}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Feature Section */}
      <Section className="bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop" 
                alt="Guru Teaching" 
                className="rounded-2xl shadow-xl"
                crossOrigin="anonymous"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">The Guru-Shishya Digital Experience</h2>
              <div className="space-y-6">
                {[
                  { icon: <Star className="text-accent" />, title: "Personalized Feedback", desc: "Submit videos of your practice and get detailed critiques from your Guru." },
                  { icon: <Music className="text-accent" />, title: "Direct Lineage", desc: "Every instructor is vetted for their connection to established musical Gharanas." },
                  { icon: <Award className="text-accent" />, title: "Performance Opportunities", desc: "Top students are invited to perform in our quarterly digital showcase." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100">{item.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Join CTA */}
      <Section className="bg-slate-900 text-white">
        <Container className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Are you an expert Tabla player?</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            We are always looking for authentic voices to join our faculty. 
            Share your knowledge with a global audience.
          </p>
          <Button size="lg" className="bg-accent text-slate-900 hover:bg-accent/90 font-bold px-10">
            Apply to Teach
          </Button>
        </Container>
      </Section>
    </div>
  );
};

export default InstructorsPage;