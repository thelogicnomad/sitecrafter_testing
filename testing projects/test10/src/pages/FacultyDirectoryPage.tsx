import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ProfileCard } from '@/components/ui/ProfileCard';

const DEPARTMENTS = ['All Departments', 'Computer Science', 'Mechanical Engineering', 'Physics', 'Management', 'Biotechnology'];

const MOCK_FACULTY = [
  {
    name: 'Dr. Ramesh Kumar',
    role: 'Head of Department, CS',
    department: 'Computer Science',
    email: 'ramesh.k@kenexus.edu.in',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: 'Specializes in Artificial Intelligence and Machine Learning with over 20 years of research experience.',
    stats: { publications: 45, experience: '22y', students: 120 }
  },
  {
    name: 'Dr. Anita Desai',
    role: 'Associate Professor',
    department: 'Biotechnology',
    email: 'anita.d@kenexus.edu.in',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    bio: 'Lead researcher in Molecular Genetics and Sustainable Biofuels. Recipient of the National Science Award.',
    stats: { publications: 32, experience: '15y', students: 85 }
  },
  {
    name: 'Prof. Sanjay Hegde',
    role: 'Professor of Practice',
    department: 'Management',
    email: 'sanjay.h@kenexus.edu.in',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'Former CEO with 30 years of industry experience in Strategic Management and Corporate Governance.',
    stats: { publications: 12, experience: '30y', students: 200 }
  },
  {
    name: 'Dr. Priya Sharma',
    role: 'Assistant Professor',
    department: 'Physics',
    email: 'priya.s@kenexus.edu.in',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    bio: 'Expert in Quantum Mechanics and Particle Physics. Focused on high-energy physics research.',
    stats: { publications: 28, experience: '8y', students: 45 }
  },
  {
    name: 'Dr. Arjun Singh',
    role: 'Professor',
    department: 'Mechanical Engineering',
    email: 'arjun.s@kenexus.edu.in',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    bio: 'Specialist in Thermodynamics and Robotics. Holds 5 patents in automated manufacturing systems.',
    stats: { publications: 52, experience: '25y', students: 150 }
  },
  {
    name: 'Dr. Meera Reddy',
    role: 'Associate Professor',
    department: 'Computer Science',
    email: 'meera.r@kenexus.edu.in',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    bio: 'Research focused on Cyber Security and Blockchain technologies. Consultant for national security projects.',
    stats: { publications: 38, experience: '12y', students: 95 }
  }
];

export const FacultyDirectoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');

  const filteredFaculty = MOCK_FACULTY.filter((faculty) => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faculty.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All Departments' || faculty.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Section className="bg-primary text-white py-16">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Faculty Directory</h1>
            <p className="text-xl text-blue-100">
              Meet our world-class educators and researchers who are shaping the future of innovation and leadership.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search faculty by name or role..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {DEPARTMENTS.map((dept) => (
                <Button
                  key={dept}
                  variant={selectedDept === dept ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedDept(dept)}
                >
                  {dept}
                </Button>
              ))}
            </div>
          </div>

          {filteredFaculty.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFaculty.map((faculty, index) => (
                <ProfileCard
                  key={index}
                  name={faculty.name}
                  role={faculty.role}
                  department={faculty.department}
                  email={faculty.email}
                  image={faculty.image}
                  bio={faculty.bio}
                  stats={faculty.stats}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No faculty members found matching your criteria.</p>
              <Button 
                variant="link" 
                onClick={() => { setSearchQuery(''); setSelectedDept('All Departments'); }}
                className="mt-2"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
};

export default FacultyDirectoryPage;