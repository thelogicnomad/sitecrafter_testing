export interface NavigationItem {
      label: string;
      href: string;
      isDropdown?: boolean;
      subItems?: NavigationItem[];
    }
    
    export interface Program {
      id: string;
      name: string;
      degree: 'B.A.' | 'B.S.' | 'M.A.' | 'Ph.D.';
      description: string;
      school: string;
      focusAreas: string[];
      durationYears: number;
    }
    
    export interface Faculty {
      id: number;
      name: string;
      title: string;
      department: string;
      specialty: string;
      bioLink: string;
      imageUrl: string;
    }