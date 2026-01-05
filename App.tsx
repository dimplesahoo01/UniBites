
import React, { useState, useEffect, createContext, useContext } from 'react';
import { MenuItem, Order, User } from './types';
import { db } from './firebase'; // Firebase integration
import { collection, getDocs } from 'firebase/firestore'; // Firebase integration
import StudentLayout from './components/Student/StudentLayout';
import StaffDashboard from './components/Staff/StaffDashboard';
import Auth from './components/Auth';
import SplashPage from './components/SplashPage';

export type StudentNavView = 'home' | 'review' | 'bill' | 'cart' | 'profile' | 'token';

interface GlobalContextType {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  menu: MenuItem[];
  setMenu: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  view: 'splash' | 'auth' | 'student' | 'staff';
  setView: React.Dispatch<React.SetStateAction<'splash' | 'auth' | 'student' | 'staff'>>;
  activeOrder: Order | null;
  setActiveOrder: React.Dispatch<React.SetStateAction<Order | null>>;
  // Cart state
  cart: Record<string, number>;
  setCart: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  // Student-specific navigation
  studentView: StudentNavView;
  setStudentView: React.Dispatch<React.SetStateAction<StudentNavView>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobal must be used within GlobalProvider");
  return context;
};

const App: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('uni-bites-orders-v2');
    return saved ? JSON.parse(saved) : [];
  });
  const [menu, setMenu] = useState<MenuItem[]>([]); // Firebase integration: Initialize with empty array
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('uni-bites-user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [view, setView] = useState<'splash' | 'auth' | 'student' | 'staff'>(() => {
    if (currentUser) {
      return currentUser.role === 'student' ? 'student' : 'staff';
    }
    return 'splash';
  });
  
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Persistence for Cart
  const [cart, setCart] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('uni-bites-cart');
    return saved ? JSON.parse(saved) : {};
  });

  const [studentView, setStudentView] = useState<StudentNavView>('home');

  // Firebase integration: Fetch menu from Firestore
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menuCollection = collection(db, 'menu');
        const menuSnapshot = await getDocs(menuCollection);
        const menuList = menuSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as MenuItem));
        setMenu(menuList);
      } catch (error) {
        console.error("Error fetching menu from Firestore:", error);
      }
    };

    fetchMenu();
  }, []);

  useEffect(() => {
    localStorage.setItem('uni-bites-orders-v2', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('uni-bites-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('uni-bites-user', JSON.stringify(currentUser));
      setView(currentUser.role === 'student' ? 'student' : 'staff');
    } else {
      localStorage.removeItem('uni-bites-user');
    }
  }, [currentUser]);

  const handleLogout = () => {
    setCurrentUser(null);
    setView('auth');
    setActiveOrder(null);
    setCart({});
    setStudentView('home');
  };

  return (
    <GlobalContext.Provider value={{ 
      orders, setOrders, 
      menu, setMenu, 
      currentUser, setCurrentUser,
      view, setView,
      activeOrder, setActiveOrder,
      cart, setCart,
      studentView, setStudentView
    }}>
      <div className="min-h-screen bg-gray-50 flex flex-col no-print">
        {view === 'splash' && <SplashPage onProceed={() => setView('auth')} />}
        {view === 'auth' && <Auth />}
        {view === 'student' && <StudentLayout onLogout={handleLogout} />}
        {view === 'staff' && <StaffDashboard onLogout={handleLogout} />}
      </div>
    </GlobalContext.Provider>
  );
};

export default App;
