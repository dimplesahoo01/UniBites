
import React, { useState } from 'react';
import { useGlobal } from '../../App';
import { LOGO_URL } from '../../constants';
import { OrderStatus } from '../../types';
import AdminOverview from './AdminOverview';

interface StaffDashboardProps {
  onLogout: () => void;
}

const StaffDashboard: React.FC<StaffDashboardProps> = ({ onLogout }) => {
  const { orders, setOrders } = useGlobal();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders'>('orders');

  // Filter for orders that need kitchen attention
  const activeOrders = orders
    .filter(o => ['pending', 'preparing', 'ready'].includes(o.status))
    .sort((a, b) => b.timestamp - a.timestamp);

  const pendingCount = orders.filter(o => o.status === 'pending').length;

  const updateStatus = (id: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#6D5ACF] text-white overflow-hidden relative font-sans">
      {/* Organic Background Shapes */}
      <div className="absolute top-[-10%] right-[-15%] w-[400px] h-[400px] bg-[#8A7ADF]/40 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[450px] h-[450px] bg-[#5B49AF]/60 rounded-full blur-[100px]"></div>
      
      {/* Header */}
      <header className="p-6 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1.5 shadow-lg overflow-hidden">
            <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-bold italic text-amber-300" style={{ fontFamily: 'serif' }}>Uni Bites</h1>
        </div>
        <button 
          onClick={onLogout} 
          className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
        >
          <i className="fas fa-sign-out-alt text-lg"></i>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-4 pb-32 relative z-10 custom-scrollbar">
        {activeTab === 'overview' ? (
          <AdminOverview />
        ) : (
          <div className="animate-in fade-in duration-500">
            {/* Pending Orders Summary Card - Exactly like mockup */}
            <div className="bg-[#D1C8F0] rounded-[1.5rem] p-6 shadow-xl flex items-center justify-between mb-8 mx-2 mt-4 border border-white/10">
              <div className="flex flex-col">
                <h2 className="text-lg font-bold text-slate-800">Pending Orders</h2>
                <div className="text-4xl font-black text-slate-900 mt-1">
                  {pendingCount < 10 && pendingCount > 0 ? `0${pendingCount}` : (pendingCount === 0 ? '00' : pendingCount)}
                </div>
              </div>
              <div className="text-5xl text-slate-800/90 transform rotate-12">
                <i className="fas fa-hourglass-half"></i>
              </div>
            </div>

            {/* Recent Orders Container - Exactly like mockup */}
            <div className="bg-[#D1C8F0] rounded-[2rem] p-5 shadow-2xl min-h-[500px] mx-2">
              <div className="flex justify-between items-center mb-6 px-3">
                <h3 className="text-xl font-black text-slate-900">Recent Orders</h3>
                <button className="text-[#E86B60] font-black text-xs uppercase tracking-wider hover:scale-105 transition-transform">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {activeOrders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-500/50">
                    <i className="fas fa-receipt text-6xl mb-4 opacity-20"></i>
                    <p className="font-bold italic">No active orders yet.</p>
                  </div>
                ) : (
                  activeOrders.map((order) => (
                    <div key={order.id} className="bg-white rounded-[1.5rem] p-4 flex gap-4 shadow-sm items-start animate-in slide-in-from-bottom-2 duration-300">
                      {/* Black Circle Avatar */}
                      <div className="w-12 h-12 bg-black rounded-full flex-shrink-0 shadow-inner"></div>
                      
                      {/* Order Details */}
                      <div className="flex-1">
                        <h4 className="text-[#D4C365] font-bold text-sm tracking-tight">
                          #Token - {order.token.includes('-') ? order.token.split('-')[1] : order.token}
                        </h4>
                        <div className="text-slate-800 text-[11px] font-bold mt-1 space-y-0.5 leading-tight">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="line-clamp-1">
                              {idx + 1}. {item.name}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons / Status - Matching mockup colors */}
                      <div className="flex flex-col gap-2 min-w-[85px] items-center">
                        {order.status === 'pending' ? (
                          <>
                            <button 
                              onClick={() => updateStatus(order.id, 'preparing')}
                              className="bg-[#6EF6B0] hover:bg-[#5ED6A0] text-slate-900 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase shadow-sm w-full transition-colors"
                            >
                              Accept
                            </button>
                            <button 
                              onClick={() => updateStatus(order.id, 'cancelled')}
                              className="bg-[#F66E75] hover:bg-[#E65E65] text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase shadow-sm w-full transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        ) : order.status === 'preparing' ? (
                          <div className="bg-[#FBD4C0] text-[#E86B60] px-4 py-2 rounded-xl text-[10px] font-black uppercase text-center w-full border border-[#E86B60]/10">
                            Preparing
                          </div>
                        ) : (
                          <div className="bg-green-100 text-green-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase text-center w-full">
                            Ready
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Styled Admin Bottom Nav - Exactly as in Screenshot */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#6D5ACF]/40 backdrop-blur-3xl h-20 flex justify-around items-center border-t border-white/10 z-50 rounded-t-[2.5rem]">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`transform transition-all p-3 ${activeTab === 'overview' ? 'text-white scale-125 opacity-100' : 'text-white opacity-40 hover:opacity-60'}`}
        >
          <i className="fas fa-home text-2xl"></i>
        </button>
        <button className="text-white opacity-40 transform hover:scale-110 p-3">
          <i className="fas fa-search text-2xl"></i>
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`transform transition-all p-3 ${activeTab === 'orders' ? 'text-white scale-125 opacity-100' : 'text-white opacity-40 hover:opacity-60'}`}
        >
          <i className="fas fa-shopping-cart text-2xl"></i>
        </button>
        <button className="text-white opacity-40 transform hover:scale-110 p-3">
          <i className="fas fa-user text-2xl"></i>
        </button>
      </div>
    </div>
  );
};

export default StaffDashboard;
