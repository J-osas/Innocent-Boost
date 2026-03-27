export type Theme = 'day' | 'night';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  flavor: string;
  image: string;
  theme: Theme;
  accentColor: string;
  ingredients: string[];
  benefits: string[];
  rating?: number;
  ratingCount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}
