export interface Course {
      id: number;
      title: string;
      instructor: string;
      price: string;
      rating: number;
      students: number;
      category: 'Beginner' | 'Intermediate' | 'Advanced';
      image: string;
    }

    export interface TeamMember {
        name: string;
        title: string;
        expertise: string;
        avatar: string;
    }