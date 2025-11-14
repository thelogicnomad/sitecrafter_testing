import { Faculty, Program } from '@/types';

    export const MOCK_FACULTY: Faculty[] = [
      {
        id: 101,
        name: "Dr. Alistair Reed",
        title: "Associate Professor",
        department: "Digital Media",
        specialty: "Documentary Filmmaking & Ethics",
        bioLink: "#",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300"
      },
      {
        id: 102,
        name: "Prof. Lena Ortiz",
        title: "Lecturer",
        department: "Digital Media",
        specialty: "Social Media Strategy & Analytics",
        bioLink: "#",
        imageUrl: "https://images.unsplash.com/photo-1580894742597-87bc8789db3d?q=80&w=300"
      },
      {
        id: 103,
        name: "Dr. Marcus Bell",
        title: "Professor Emeritus",
        department: "Physics",
        specialty: "Quantum Field Theory",
        bioLink: "#",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300"
      }
    ];

    export const MOCK_LEADERSHIP: Faculty[] = [
        {
            id: 201,
            name: "Dr. Eleanor Vance",
            title: "University President",
            department: "Office of the President",
            specialty: "Higher Education Policy",
            bioLink: "#",
            imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300"
        },
        {
            id: 202,
            name: "Mr. Robert Chen",
            title: "Provost & VP Academic Affairs",
            department: "Academic Affairs",
            specialty: "Curriculum Development",
            bioLink: "#",
            imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=300"
        },
        {
            id: 203,
            name: "Dr. Sofia Reyes",
            title: "Dean of Admissions",
            department: "Admissions Office",
            specialty: "Student Success & Enrollment",
            bioLink: "#",
            imageUrl: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=300"
        },
        {
            id: 204,
            name: "Ms. Harriet Jones",
            title: "Chief Financial Officer",
            department: "Finance",
            specialty: "University Endowment Management",
            bioLink: "#",
            imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300"
        }
    ];

    export const MOCK_PROGRAMS: Program[] = [
      {
        id: 'dmc-4yr',
        name: "Digital Media & Communications",
        degree: 'B.A.',
        description: "Crafting narratives for the digital age, focusing on ethics, production, and global reach.",
        school: 'School of Arts & Letters',
        focusAreas: ['Video Production', 'Digital Storytelling', 'Media Law'],
        durationYears: 4,
      },
      {
        id: 'cse-4yr',
        name: "Computer Science & Engineering",
        degree: 'B.S.',
        description: "Foundational and applied knowledge in software architecture, data structures, and emerging AI.",
        school: 'School of Science & Engineering',
        focusAreas: ['Machine Learning', 'Cybersecurity', 'Systems Design'],
        durationYears: 4,
      },
      {
        id: 'eco-ma',
        name: "Applied Economics",
        degree: 'M.A.',
        description: "Advanced quantitative methods applied to real-world policy and market analysis.",
        school: 'School of Business & Economics',
        focusAreas: ['Econometrics', 'Behavioral Finance'],
        durationYears: 2,
      },
      {
        id: 'hist-phd',
        name: "Modern History",
        degree: 'Ph.D.',
        description: "Original research into the political, social, and cultural forces shaping the 20th century.",
        school: 'Graduate Studies',
        focusAreas: ['Post-War Europe', 'Digital Humanities'],
        durationYears: 5,
      },
    ];

    export const MOCK_NEWS = [
        "Dr. Elara Vance wins prestigious Turing Fellowship.",
        "AU Debating Team Secures National Championship Title.",
        "Campus Expansion: New Science Wing Breaks Ground.",
        "Aethelred University ranked #1 for undergraduate teaching.",
        "Student-led startup receives $1M in seed funding.",
        "New study abroad program launched in Kyoto, Japan."
    ];

    // Utility function to simulate fetching data
    export const getProgramById = (id: string): Promise<Program | undefined> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(MOCK_PROGRAMS.find(p => p.id === id));
            }, 500); // Simulate network delay
        });
    };