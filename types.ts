
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  available: boolean;
  rating: number;
}

export type OrderStatus = 'awaiting_payment' | 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface OrderItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  token: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  timestamp: number;
  paymentMethod: 'online' | 'counter';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  role: 'student' | 'staff';
}

export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  suggestion?: string;
  timestamp: number;
}
