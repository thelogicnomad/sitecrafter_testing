export interface Recipe {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'Wedding' | 'Birthday' | 'Cupcakes' | 'Seasonal' | 'Everyday';
  tags: string[];
  rating: number;
  reviews: number;
}

export interface UserProfile {
  name: string;
  email: string;
  lastLogin: string;
  stats: {
    enrolledCourses: number;
    cakesOrdered: number;
    favoriteFlavor: string;
    loyaltyPoints: number;
  };
  orders: Order[];
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Cancelled' | 'Processing';
}

export interface CartItem extends Recipe {
    quantity: number;
}