export interface Product {
  id: number;
  name: string;
  nameAr?: string;
  category: string;
  description: string;
  descriptionAr?: string;
  price: number;
  discount: number;
  images: string[];
  sizes: string[];
  colors: string[];
  available: boolean;
  isNew?: boolean;
}

export interface CartItem {
  id: number;
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}

export interface OrderSummary {
  orderNumber: string;
  date: string;
  items: CartItem[];
  customer: CustomerInfo;
  originalSubtotal: number;
  discountTotal: number;
  finalTotal: number;
}

export type Page = 'home' | 'shop' | 'product' | 'about' | 'offers';

export type Category =
  | 'All'
  | 'T-Shirts'
  | 'Shirts'
  | 'Pants'
  | 'Hoodies'
  | 'Jackets'
  | 'New Arrivals'
  | 'Offers';
