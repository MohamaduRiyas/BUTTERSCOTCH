export interface Product {
  _id: string; // Changed from id: number to match MongoDB
  id: string; // Keep for convenience, mapping from _id
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  imageUrl: string;
  description: string;
  rating: number;
  reviews: number;
}

export interface Category {
  id: number; // Keep as number for simple static list
  name:string;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  token: string; // Added token from backend response
}

export interface ShippingInfo {
    address: string;
    email: string;
    firstName?: string; // Optional fields from form
    lastName?: string;
}

export interface Order {
    _id: string;
    user: string | { _id: string, name: string }; // User can be populated
    orderItems: CartItem[];
    shippingInfo: ShippingInfo;
    totalPrice: number;
    status: 'Pending' | 'Shipped' | 'Delivered';
    createdAt: string;
    updatedAt?: string; // Mongoose adds this
}