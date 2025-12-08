import { Product, TeamMember } from "@/types";

const products: Product[] = [
    { id: 1, name: 'Double Chocolate Fudge Cake', price: 65, description: 'An intensely rich, molten chocolate cake, made with 70% single-origin cocoa.', category: 'Cakes', imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop', rating: 4.9, reviewCount: 512, details: { sizes: ['Standard (Serves 2-4)', 'Large (Serves 6-8)'], customization: 'Optional message inscription (max 20 chars)', ingredients: ['Flour', 'Sugar', 'Cocoa', 'Eggs', 'Butter', 'Dairy']}},
    { id: 2, name: 'Lemon Meringue Tart', price: 45, description: 'A zesty lemon curd filling topped with fluffy toasted meringue.', category: 'Tarts', imageUrl: 'https://images.unsplash.com/photo-1533134213437-74595a8229b3?q=80&w=800&auto=format&fit=crop', rating: 4.8, reviewCount: 320 },
    { id: 3, name: 'Red Velvet Classic', price: 55, description: 'Classic red velvet cake with a rich cream cheese frosting.', category: 'Cakes', imageUrl: 'https://images.unsplash.com/photo-1616541823720-737c34443743?q=80&w=800&auto=format&fit=crop', rating: 4.7, reviewCount: 450 },
    { id: 4, name: 'Vegan Almond Croissant', price: 7, description: 'A flaky, buttery croissant with a sweet almond filling, 100% vegan.', category: 'Vegan', imageUrl: 'https://images.unsplash.com/photo-1599819034177-3d3b5a452a32?q=80&w=800&auto=format&fit=crop', rating: 4.9, reviewCount: 180 },
    { id: 5, name: 'Signature Macaron Box (12pc)', price: 32, description: 'A selection of our finest seasonal macarons.', category: 'Pastries', imageUrl: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?q=80&w=800&auto=format&fit=crop', rating: 4.9, reviewCount: 610 },
    { id: 6, name: 'Gluten-Free Brownies', price: 28, description: 'Decadent and fudgy brownies, made without gluten.', category: 'Gluten-Free', imageUrl: 'https://images.unsplash.com/photo-1606313564205-5b6910374e2d?q=80&w=800&auto=format&fit=crop', rating: 4.6, reviewCount: 95 },
    { id: 7, name: 'Birthday Cake Decorating Kit', price: 40, description: 'Everything you need to decorate a spectacular birthday cake.', category: 'Seasonal', imageUrl: 'https://images.unsplash.com/photo-1551893315-b46a7886470d?q=80&w=800&auto=format&fit=crop', rating: 4.8, reviewCount: 75 },
    { id: 8, name: 'Espresso Bean Torte', price: 60, description: 'A rich coffee-infused torte for the serious coffee lover.', category: 'Cakes', imageUrl: 'https://images.unsplash.com/photo-1542826438-c33a4a754865?q=80&w=800&auto=format&fit=crop', rating: 4.9, reviewCount: 220 },
    { id: 9, name: 'Fruit Galette Seasonal', price: 42, description: 'A rustic, free-form tart with the best seasonal fruits.', category: 'Tarts', imageUrl: 'https://images.unsplash.com/photo-1626379963951-5a4574843949?q=80&w=800&auto=format&fit=crop', rating: 4.7, reviewCount: 150 },
    { id: 10, name: 'Mini Cheesecakes (6pc)', price: 38, description: 'A delightful assortment of mini cheesecakes.', category: 'Pastries', imageUrl: 'https://images.unsplash.com/photo-1614707268751-1a0335755513?q=80&w=800&auto=format&fit=crop', rating: 4.8, reviewCount: 190 },
    { id: 11, name: 'Custom Wedding Cake Inquiry', price: 0, description: 'Contact us to design the wedding cake of your dreams.', category: 'Cakes', imageUrl: 'https://images.unsplash.com/photo-1587590227264-0ac64ce63ce8?q=80&w=800&auto=format&fit=crop', rating: 5.0, reviewCount: 120 },
    { id: 12, name: 'Chocolate Chip Cookie Pack', price: 18, description: 'A pack of 6 classic, chewy chocolate chip cookies.', category: 'Pastries', imageUrl: 'https://images.unsplash.com/photo-1597733230802-ba53381a8b41?q=80&w=800&auto=format&fit=crop', rating: 4.9, reviewCount: 880 },
    { id: 13, name: 'Salted Caramel Bar', price: 9, description: 'A rich chocolate bar with a gooey salted caramel center.', category: 'Pastries', imageUrl: 'https://images.unsplash.com/photo-1588869201599-9a74705548f3?q=80&w=800&auto=format&fit=crop', rating: 4.8, reviewCount: 340 },
    { id: 14, name: 'Classic Scone Selection', price: 24, description: 'A box of freshly baked scones with clotted cream and jam.', category: 'Pastries', imageUrl: 'https://images.unsplash.com/photo-1589114408223-a5b6389335f3?q=80&w=800&auto=format&fit=crop', rating: 4.7, reviewCount: 210 },
    { id: 15, name: 'Holiday Gingerbread House Kit', price: 75, description: 'A festive kit to build and decorate your own gingerbread house.', category: 'Seasonal', imageUrl: 'https://images.unsplash.com/photo-1606925243401-08103c804245?q=80&w=800&auto=format&fit=crop', rating: 4.9, reviewCount: 60 },
];

const teamMembers: TeamMember[] = [
    { name: 'Elara Vance', title: 'Founder & Head Pastry Chef', handle: 'elaravance', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop' },
    { name: 'Marcus Chen', title: 'Operations Director', handle: 'marcuschen', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop' },
    { name: 'Sarah Bell', title: 'Lead Cake Artist', handle: 'sarahbellart', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop' },
    { name: 'David Kim', title: 'Logistics Manager', handle: 'davidkim', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop' },
    { name: 'Aisha Khan', title: 'Pastry Sous-Chef', handle: 'aishakhan', avatarUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop' },
    { name: 'Leo Martinez', title: 'Baker & Chocolatier', handle: 'leomartinez', avatarUrl: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=400&auto=format&fit=crop' },
    { name: 'Grace Lee', title: 'Customer Relations', handle: 'gracelee', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop' },
    { name: 'Tom Iwata', title: 'Marketing Lead', handle: 'tomiwata', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' },
];

// Mock API functions
export const fetchProducts = async (): Promise<Product[]> => {
    console.log("Fetching products...");
    return new Promise(resolve => setTimeout(() => resolve(products), 500));
};

export const fetchProductById = async (id: number): Promise<Product | undefined> => {
    console.log(`Fetching product with id: ${id}`);
    const product = products.find(p => p.id === id);
    return new Promise(resolve => setTimeout(() => resolve(product), 500));
};

export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
    console.log("Fetching team members...");
    return new Promise(resolve => setTimeout(() => resolve(teamMembers), 500));
};

export const submitInquiry = async (data: any): Promise<{ success: boolean; orderId: string }> => {
    console.log("Submitting inquiry:", data);
    return new Promise(resolve => setTimeout(() => resolve({ success: true, orderId: `AB-${Math.random().toString(36).substr(2, 9).toUpperCase()}` }), 1000));
};