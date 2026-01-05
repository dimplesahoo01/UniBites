
import React, { useState, useMemo } from 'react';
import { useGlobal } from '../../App';
import { OrderItem, Order } from '../../types';
import { LOGO_URL } from '../../constants';
import { db } from '../../firebase'; // Firebase integration
import { collection, doc, runTransaction } from 'firebase/firestore'; // Firebase integration

interface CartProps {
  onCheckoutComplete: () => void;
}

const Cart: React.FC<CartProps> = ({ onCheckoutComplete }) => {
  const { menu, setOrders, currentUser, setActiveOrder, cart, setCart, setStudentView } = useGlobal();
  const [instructions, setInstructions] = useState('Keep the burger a little less spicy.');
  const [isProcessing, setIsProcessing] = useState(false);

  // Derive cart items from the global cart map and menu list
  const cartItems: OrderItem[] = useMemo(() => {
    return Object.entries(cart).map(([id, quantity]) => {
      const menuItem = menu.find(m => m.id === id);
      if (!menuItem) return null;
      return { ...menuItem, quantity };
    }).filter((item): item is OrderItem => item !== null);
  }, [cart, menu]);

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      const currentQty = prev[id] || 0;
      const newQty = Math.max(0, currentQty + delta);
      if (newQty === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setIsProcessing(true);

    try {
      // Firebase integration: Atomically create a new order and update token count
      const newOrder = await runTransaction(db, async (transaction) => {
        // 1. Get the current token number
        const tokenDocRef = doc(db, "globals", "counters");
        const tokenDoc = await transaction.get(tokenDocRef);
        const lastToken = tokenDoc.exists() && tokenDoc.data().orderToken ? tokenDoc.data().orderToken : 0;
        const newTokenNumber = lastToken + 1;
        
        // 2. Create or update the token number
        if (tokenDoc.exists()) {
            transaction.update(tokenDocRef, { orderToken: newTokenNumber });
        } else {
            transaction.set(tokenDocRef, { orderToken: newTokenNumber });
        }

        const newToken = `ON-${newTokenNumber}`;
        const total = subtotal + (subtotal * 0.05); // Assuming 5% GST

        const orderPayload: Omit<Order, 'id'> = {
          token: newToken,
          items: cartItems,
          total,
          status: 'pending',
          timestamp: Date.now(),
          paymentMethod: 'online',
          customerName: currentUser?.name || 'Student',
          customerEmail: currentUser?.email || '',
          customerPhone: currentUser?.phone || '',
        };
        
        // 3. Create the new order
        const newOrderRef = doc(collection(db, "orders"));
        transaction.set(newOrderRef, orderPayload);
        
        return { ...orderPayload, id: newOrderRef.id };
      });

      // Update local state
      setOrders(prev => [newOrder, ...prev]);
      setActiveOrder(newOrder);
      setCart({});
      onCheckoutComplete();

    } catch (error) {
      console.error("Order placement error:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-violet-500 to-indigo-600 p-6 flex flex-col items-center relative overflow-hidden text-white">
      <div className="absolute top-[-5%] right-[-10%] w-[250px] h-[250px] bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[20%] left-[-15%] w-[300px] h-[300px] bg-purple-900/20 rounded-full blur-3xl"></div>

      <div className="flex items-center gap-2 mb-4 self-start relative z-10">
        <div className="bg-white p-1 rounded-full shadow-lg overflow-hidden w-10 h-10 flex items-center justify-center">
           <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-lg font-bold italic text-amber-300" style={{ fontFamily: 'serif' }}>Uni Bites</h1>
      </div>

      <div className="bg-amber-400/20 border border-amber-400/30 px-10 py-2 rounded-full mb-8 relative z-10">
        <span className="text-amber-300 font-bold text-lg" style={{ fontFamily: 'serif' }}>Total Items: {totalItemsCount}</span>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-20 relative z-10">
          <i className="fas fa-shopping-basket text-6xl opacity-20"></i>
          <p className="text-white/60 font-bold italic" style={{ fontFamily: 'serif' }}>Your cart is empty.</p>
          <button 
            onClick={() => setStudentView('home')}
            className="text-amber-300 font-bold underline"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="w-full space-y-4 mb-6 relative z-10">
          {cartItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-3 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover shadow-md" />
                <div>
                  <h4 className="text-slate-800 font-bold text-sm leading-tight max-w-[120px]">{item.name}</h4>
                  <p className="text-indigo-600 font-black text-sm mt-0.5">₹{item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center active:scale-90 transition-transform">
                  <i className="fas fa-minus text-xs"></i>
                </button>
                <span className="text-slate-800 font-bold text-sm">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                  <i className="fas fa-plus text-xs"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <>
          <div className="w-full mb-8 relative z-10">
            <h3 className="text-white font-medium italic mb-2 ml-1" style={{ fontFamily: 'serif' }}>Order Instructions:</h3>
            <textarea 
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full bg-white/20 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 text-indigo-950 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all shadow-inner h-28 italic"
              placeholder="Anything else we should know?..."
            />
          </div>

          <div className="w-full flex justify-between gap-4 mb-6 relative z-10">
            <div className="flex-1 bg-indigo-700/50 border border-indigo-400/30 rounded-full py-3 text-center">
              <span className="text-amber-300 font-bold text-lg" style={{ fontFamily: 'serif' }}>Total</span>
            </div>
            <div className="flex-1 bg-indigo-700/50 border border-indigo-400/30 rounded-full py-3 text-center">
              <span className="text-amber-300 font-bold text-lg" style={{ fontFamily: 'serif' }}>₹{subtotal}</span>
            </div>
          </div>

          <div className="w-full mb-4 relative z-10">
            <button 
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-slate-800/90 hover:bg-slate-900 text-amber-400 font-bold py-5 rounded-[2rem] shadow-2xl active:scale-95 transition-all text-xl disabled:opacity-50"
              style={{ fontFamily: 'serif' }}
            >
              {isProcessing ? 'Processing...' : 'Checkout!'}
            </button>
          </div>
        </>
      )}

      <button 
        onClick={() => setStudentView('home')}
        className="text-amber-300 text-xs font-bold border-t border-b border-amber-300/30 py-1 px-4 mb-20 relative z-10"
      >
        Back To Menu
      </button>

      <div className="h-8 flex-shrink-0"></div>
    </div>
  );
};

export default Cart;
