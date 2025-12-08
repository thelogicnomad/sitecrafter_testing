export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: 'Cakes' | 'Tarts' | 'Pastries' | 'Seasonal' | 'Gluten-Free' | 'Vegan';
  imageUrl: string;
  rating: number;
  reviewCount: number;
  details?: {
    sizes: string[];
    customization: string;
    ingredients: string[];
  }
}

export interface TeamMember {
  name: string;
  title: string;
  handle: string;
  avatarUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}