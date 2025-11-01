import { Product, TeamMember } from '@/types';

    export const products: Product[] = [
      { id: 1, name: 'Classic Croissant', category: 'Pastries', price: 3.50, rating: 5, reviewCount: 120, imageUrl: 'https://images.unsplash.com/photo-1549931274-ddabdb5f2183?q=80&w=800', description: 'Buttery, flaky, and perfectly golden. A timeless classic.' },
      { id: 2, name: 'Sourdough Loaf', category: 'Breads', price: 7.00, rating: 5, reviewCount: 215, imageUrl: 'https://images.unsplash.com/photo-1589981240093-088193b29a6b?q=80&w=800', description: 'Artisanal sourdough with a tangy flavor and a satisfyingly chewy crust.' },
      { id: 3, name: 'Chocolate Eclair', category: 'Pastries', price: 4.75, rating: 4, reviewCount: 95, imageUrl: 'https://images.unsplash.com/photo-1627834392236-764a8b735233?q=80&w=800', description: 'Choux pastry filled with rich chocolate cream and topped with a glossy ganache.' },
      { id: 4, name: 'New York Cheesecake', category: 'Cakes', price: 6.50, rating: 5, reviewCount: 180, imageUrl: 'https://images.unsplash.com/photo-1578642353-0248a3c25b34?q=80&w=800', description: 'A dense, smooth, and creamy cheesecake with a graham cracker crust.' },
      { id: 5, name: 'Blueberry Muffin', category: 'Pastries', price: 3.25, rating: 4, reviewCount: 78, imageUrl: 'https://images.unsplash.com/photo-1557087425-17d239b56f43?q=80&w=800', description: 'A soft and moist muffin bursting with fresh, juicy blueberries.' },
      { id: 6, name: 'Red Velvet Cupcake', category: 'Cakes', price: 4.00, rating: 5, reviewCount: 150, imageUrl: 'https://images.unsplash.com/photo-1614707267537-789726a35a54?q=80&w=800', description: 'Classic red velvet cake with a rich cream cheese frosting.' },
      { id: 7, name: 'Cinnamon Roll', category: 'Pastries', price: 4.50, rating: 5, reviewCount: 190, imageUrl: 'https://images.unsplash.com/photo-1554522723-b1aa1363412b?q=80&w=800', description: 'A warm, gooey cinnamon roll topped with a sweet vanilla glaze.' },
      { id: 8, name: 'Baguette', category: 'Breads', price: 4.00, rating: 4, reviewCount: 110, imageUrl: 'https://images.unsplash.com/photo-1556910110-a5a63502b4d3?q=80&w=800', description: 'A traditional French baguette with a crisp crust and a soft, airy interior.' },
      { id: 9, name: 'Macarons (Box of 6)', category: 'Pastries', price: 15.00, rating: 5, reviewCount: 250, imageUrl: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?q=80&w=800', description: 'A delightful assortment of French macarons with various fillings.' },
      { id: 10, name: 'Tiramisu Slice', category: 'Cakes', price: 6.00, rating: 5, reviewCount: 130, imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800', description: 'Layers of coffee-soaked ladyfingers and creamy mascarpone.' },
      { id: 11, name: 'Apple Turnover', category: 'Pastries', price: 4.25, rating: 4, reviewCount: 85, imageUrl: 'https://images.unsplash.com/photo-1627993099198-a22a37e595b4?q=80&w=800', description: 'Flaky pastry filled with a warm, spiced apple filling.' },
      { id: 12, name: 'Lemon Tart', category: 'Cakes', price: 5.50, rating: 5, reviewCount: 165, imageUrl: 'https://images.unsplash.com/photo-1586929853363-c24c2947575e?q=80&w=800', description: 'A zesty and refreshing lemon curd in a sweet pastry crust.' },
    ];

    export const teamMembers: TeamMember[] = [
      { id: 1, name: 'Juliette Dubois', role: 'Founder & Head Pâtissier', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600' },
      { id: 2, name: 'Marcus Chen', role: 'Head Baker - Bread', imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600' },
      { id: 3, name: 'Elena Rodriguez', role: 'Cake Decorator', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600' },
      { id: 4, name: 'Leo Tanaka', role: 'Viennoiserie Specialist', imageUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=600' },
      { id: 5, name: 'Aisha Khan', role: 'Dessert Innovator', imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600' },
      { id: 6, name: 'David Miller', role: 'Operations Manager', imageUrl: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=600' },
      { id: 7, name: 'Chloe Wilson', role: 'Customer Experience Lead', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600' },
      { id: 8, name: 'Ben Carter', role: 'Apprentice Baker', imageUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=600' },
    ];