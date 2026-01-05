
import { MenuItem } from './types';

export const COLORS = {
  primary: '#5B21B6', // Deep Purple
  secondary: '#FACC15', // Vibrant Yellow
  background: '#F3F4F6',
  surface: '#FFFFFF',
  accent: '#A78BFA'
};

// High quality version of the user-provided bento/noodle logo
export const LOGO_URL = 'https://raw.githubusercontent.com/sahildholpuria/unibites-logos/main/logo.png'; 

export const CATEGORIES = ['All', 'Snacks', 'Meals', 'Drinks', 'Desserts'];

export const INITIAL_MENU: MenuItem[] = [
  { id: '1', name: 'Cheese Burger', price: 80, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=400&h=400&auto=format&fit=crop', description: 'Juicy vegetable patty with extra cheese.', available: true, rating: 4.8 },
  { id: '2', name: 'French Fries', price: 50, image: 'https://images.unsplash.com/photo-1598679253544-2c9b928cad18?q=80&w=400&h=400&auto=format&fit=crop', description: 'Crispy golden fries with sea salt.', available: true, rating: 4.5 },
  { id: '3', name: 'Cold Drink', price: 30, image: 'https://images.unsplash.com/photo-1554866585-CD94860890b7?q=80&w=400&h=400&auto=format&fit=crop', description: 'Refreshing chilled cola.', available: true, rating: 4.1 },
  { id: '4', name: 'White Sauce Pasta', price: 100, image: 'https://images.unsplash.com/photo-1598866594240-a02641aced82?q=80&w=400&h=400&auto=format&fit=crop', description: 'Creamy penne with mushrooms.', available: true, rating: 4.9 },
  { id: '5', name: 'Indian Samosa', price: 25, image: 'https://images.unsplash.com/photo-1562376552-0d160a2f439d?q=80&w=400&h=400&auto=format&fit=crop', description: 'Crispy triangle pastry (2 pcs).', available: true, rating: 4.7 },
  { id: '6', name: 'Masala Dosa', price: 60, image: 'https://images.unsplash.com/photo-1626513612993-c40cf8835a46?q=80&w=400&h=400&auto=format&fit=crop', description: 'Crispy crepe with potato filling.', available: true, rating: 4.6 },
  { id: '7', name: 'Poha', price: 40, image: 'https://images.unsplash.com/photo-1601050690327-0231b6f6c0a7?q=80&w=400&h=400&auto=format&fit=crop', description: 'Light flattened rice with peanuts.', available: true, rating: 4.4 },
  { id: '8', name: 'Veg Sandwich', price: 55, image: 'https://images.unsplash.com/photo-1592488734912-2d64a04e3d13?q=80&w=400&h=400&auto=format&fit=crop', description: 'Fresh cucumbers & mint chutney.', available: true, rating: 4.3 },
  { id: '9', name: 'Masala Chai', price: 15, image: 'https://images.unsplash.com/photo-1596854818610-a2f0c7a2b9d2?q=80&w=400&h=400&auto=format&fit=crop', description: 'Traditional ginger & cardamom tea.', available: true, rating: 4.9 },
  { id: '10', name: 'Cold Coffee', price: 70, image: 'https://images.unsplash.com/photo-1630694093228-33534f55338d?q=80&w=400&h=400&auto=format&fit=crop', description: 'Creamy blended coffee.', available: true, rating: 4.5 },
  { id: '11', name: 'Paneer Tikka', price: 120, image: 'https://images.unsplash.com/photo-1602040301822-9a3f293b689e?q=80&w=400&h=400&auto=format&fit=crop', description: 'Grilled spiced cottage cheese.', available: true, rating: 4.7 },
  { id: '12', name: 'Hakka Noodles', price: 90, image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8fcd?q=80&w=400&h=400&auto=format&fit=crop', description: 'Stir-fried veg noodles.', available: true, rating: 4.2 },
  { id: '13', name: 'Veg Manchurian', price: 95, image: 'https://images.unsplash.com/photo-1631783198305-1818b8c2a39a?q=80&w=400&h=400&auto=format&fit=crop', description: 'Fried veg balls in tangy gravy.', available: true, rating: 4.4 },
  { id: '14', name: 'Margherita Pizza', price: 150, image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=400&h=400&auto=format&fit=crop', description: 'Classic thin-crust cheese pizza.', available: true, rating: 4.6 },
  { id: '15', name: 'Spring Rolls', price: 65, image: 'https://images.unsplash.com/photo-1588166524941-d3d5b999a032?q=80&w=400&h=400&auto=format&fit=crop', description: 'Crispy vegetable rolls (3 pcs).', available: true, rating: 4.2 },
  { id: '16', name: 'Hot Coffee', price: 35, image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400&h=400&auto=format&fit=crop', description: 'Rich roasted cappuccino.', available: true, rating: 4.0 },
  { id: '17', name: 'Gulab Jamun', price: 40, image: 'https://images.unsplash.com/photo-1625901314246-cb44804c0428?q=80&w=400&h=400&auto=format&fit=crop', description: 'Soft milk dumplings in syrup.', available: true, rating: 4.9 },
  { id: '18', name: 'Bread Omelette', price: 45, image: 'https://images.unsplash.com/photo-1609521457499-c1b3f5451e6b?q=80&w=400&h=400&auto=format&fit=crop', description: 'Spiced omelette in buttered bread.', available: true, rating: 4.4 }
];
