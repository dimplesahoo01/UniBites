
import React, { useState, useEffect } from 'react';
import { useGlobal } from '../../App';
import { Order, OrderStatus } from '../../types';
import { getKitchenSummary } from '../../services/geminiService';
import { db } from '../../firebase'; // Firebase integration
import { collection, onSnapshot, doc, updateDoc, query, orderBy } from 'firebase/firestore'; // Firebase integration

const KitchenDashboard: React.FC = () => {
  const { orders, setOrders, setView } = useGlobal();
  const [filter, setFilter] = useState<OrderStatus | 'all'>('pending');
  const [motivation, setMotivation] = useState('Welcome back, Chef!');

  // Firebase integration: Listen for real-time order updates
  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Order));
      setOrders(ordersData);
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [setOrders]);

  useEffect(() => {
    const fetchMotivation = async () => {
      if (orders.length > 0) {
        const pendingCount = orders.filter(o => o.status === 'pending').length;
        const quote = await getKitchenSummary(pendingCount);
        setMotivation(quote);
      }
    };
    fetchMotivation();
  }, [orders]);

  // Firebase integration: Update order status in Firestore
  const updateStatus = async (id: string, newStatus: OrderStatus) => {
    const orderDocRef = doc(db, 'orders', id);
    try {
      await updateDoc(orderDocRef, { status: newStatus });
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  const filteredOrders = orders.filter(o => filter === 'all' || o.status === filter);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <button onClick={() => setView('auth')} className="text-gray-400 hover:text-gray-600">
              <i className="fas fa-chevron-left"></i>
            </button>
            <h1 className="text-3xl font-black text-gray-800">Kitchen Console</h1>
          </div>
          <p className="text-indigo-600 font-medium mt-1">"{motivation}"</p>
        </div>
        
        <div className="flex gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-200 overflow-x-auto no-scrollbar">
          {['all', 'pending', 'preparing', 'ready', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all ${filter === status ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              {status}
            </button>
          ))}
        </div>
      </header>

      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <i className="fas fa-utensils text-6xl mb-4 opacity-20"></i>
          <p className="text-xl font-medium">No orders found in this section</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col border border-gray-100 hover:shadow-xl transition-all">
              {/* Card Header */}
              <div className={`p-4 flex justify-between items-center ${
                order.status === 'pending' ? 'bg-amber-50' : 
                order.status === 'preparing' ? 'bg-indigo-50' : 
                'bg-green-50'
              }`}>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Token</span>
                  <div className="text-2xl font-black text-gray-800">#{order.token}</div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    order.status === 'pending' ? 'bg-amber-400 text-amber-900' :
                    order.status === 'preparing' ? 'bg-indigo-600 text-white' :
                    'bg-green-500 text-white'
                  }`}>
                    {order.status}
                  </span>
                  <div className="text-[10px] text-gray-400 mt-1 font-mono">
                    {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="p-5 flex-1 space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <div className="flex gap-3">
                       <span className="bg-gray-100 text-gray-600 w-6 h-6 rounded flex items-center justify-center text-xs font-bold">{item.quantity}</span>
                       <div>
                         <span className="font-bold text-gray-800 text-sm">{item.name}</span>
                         <p className="text-[10px] text-gray-400">Regular Style</p>
                       </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Info */}
              <div className="px-5 py-3 border-t border-gray-50 bg-gray-50/50 flex justify-between items-center">
                 <div className="flex items-center gap-2">
                   <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-[10px] font-bold text-indigo-700">
                     {order.customerName[0]}
                   </div>
                   <span className="text-xs font-medium text-gray-600">{order.customerName}</span>
                 </div>
                 <span className="text-xs font-bold text-indigo-600">₹{order.total}</span>
              </div>

              {/* Actions */}
              <div className="p-4 bg-white grid grid-cols-2 gap-2">
                {order.status === 'pending' && (
                  <button 
                    onClick={() => updateStatus(order.id, 'preparing')}
                    className="col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-100"
                  >
                    Start Cooking
                  </button>
                )}
                {order.status === 'preparing' && (
                  <button 
                    onClick={() => updateStatus(order.id, 'ready')}
                    className="col-span-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-green-100"
                  >
                    Mark as Ready
                  </button>
                )}
                {order.status === 'ready' && (
                  <button 
                    onClick={() => updateStatus(order.id, 'completed')}
                    className="col-span-2 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 rounded-xl transition-all active:scale-95"
                  >
                    Handed Over
                  </button>
                )}
                {order.status !== 'completed' && order.status !== 'cancelled' && (
                   <button 
                    onClick={() => updateStatus(order.id, 'cancelled')}
                    className="col-span-2 mt-2 text-xs font-bold text-red-400 hover:text-red-500 py-2"
                   >
                     Cancel Order
                   </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KitchenDashboard;
