
import { MenuItem } from './types';

export const COLORS = {
  primary: '#5B21B6', // Deep Purple
  secondary: '#FACC15', // Vibrant Yellow
  background: '#F3F4F6',
  surface: '#FFFFFF',
  accent: '#A78BFA'
};

// High quality version of the user-provided bento/noodle logo
export const LOGO_URL = 'https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/unibites-logo.png'; 

export const CATEGORIES = ['All', 'Snacks', 'Meals', 'Drinks', 'Desserts'];

export const INITIAL_MENU: MenuItem[] = [
  { id: '1', name: 'Cheese Burger', price: 80, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&h=400&auto=format&fit=crop', description: 'Juicy vegetable patty with extra cheese.', available: true, rating: 4.8 },
  { id: '2', name: 'French Fries', price: 50, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=400&h=400&auto=format&fit=crop', description: 'Crispy golden fries with sea salt.', available: true, rating: 4.5 },
  { id: '3', name: 'Cold Drink', price: 30, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400&h=400&auto=format&fit=crop', description: 'Refreshing chilled cola.', available: true, rating: 4.1 },
  { id: '4', name: 'White Sauce Pasta', price: 100, image: 'https://images.unsplash.com/photo-1645112481338-35613777414d?q=80&w=400&h=400&auto=format&fit=crop', description: 'Creamy penne with mushrooms.', available: true, rating: 4.9 },
  { id: '5', name: 'Indian Samosa', price: 25, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=400&h=400&auto=format&fit=crop', description: 'Crispy triangle pastry (2 pcs).', available: true, rating: 4.7 },
  { id: '6', name: 'Masala Dosa', price: 60, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=400&h=400&auto=format&fit=crop', description: 'Crispy crepe with potato filling.', available: true, rating: 4.6 },
  { id: '7', name: 'Poha', price: 40, image: 'https://images.unsplash.com/photo-1626132646529-500637532537?q=80&w=400&h=400&auto=format&fit=crop', description: 'Light flattened rice with peanuts.', available: true, rating: 4.4 },
  { id: '8', name: 'Veg Sandwich', price: 55, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=400&h=400&auto=format&fit=crop', description: 'Fresh cucumbers & mint chutney.', available: true, rating: 4.3 },
  { id: '9', name: 'Masala Chai', price: 15, image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=400&h=400&auto=format&fit=crop', description: 'Traditional ginger & cardamom tea.', available: true, rating: 4.9 },
  { id: '10', name: 'Cold Coffee', price: 70, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=400&h=400&auto=format&fit=crop', description: 'Creamy blended coffee.', available: true, rating: 4.5 },
  { id: '11', name: 'Paneer Tikka', price: 120, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=400&h=400&auto=format&fit=crop', description: 'Grilled spiced cottage cheese.', available: true, rating: 4.7 },
  { id: '12', name: 'Hakka Noodles', price: 90, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=400&h=400&auto=format&fit=crop', description: 'Stir-fried veg noodles.', available: true, rating: 4.2 },
  { id: '13', name: 'Veg Manchurian', price: 95, image: 'https://images.unsplash.com/photo-1626808642820-2194d015764d?q=80&w=400&h=400&auto=format&fit=crop', description: 'Fried veg balls in tangy gravy.', available: true, rating: 4.4 },
  { id: '14', name: 'Margherita Pizza', price: 150, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=400&h=400&auto=format&fit=crop', description: 'Classic thin-crust cheese pizza.', available: true, rating: 4.6 },
  { id: '15', name: 'Spring Rolls', price: 65, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&h=400&auto=format&fit=crop', description: 'Crispy vegetable rolls (3 pcs).', available: true, rating: 4.2 },
  { id: '16', name: 'Hot Coffee', price: 35, image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=400&h=400&auto=format&fit=crop', description: 'Rich roasted cappuccino.', available: true, rating: 4.0 },
  { id: '17', name: 'Gulab Jamun', price: 40, image: 'https://images.unsplash.com/photo-1605197509751-62ad15fc4a1b?q=80&w=400&h=400&auto=format&fit=crop', description: 'Soft milk dumplings in syrup.', available: true, rating: 4.9 },
  { id: '18', name: 'Bread Omelette', price: 45, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=400&h=400&auto=format&fit=crop', description: 'Spiced omelette in buttered bread.', available: true, rating: 4.4 }
];
