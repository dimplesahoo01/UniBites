
import React from 'react';
import { useGlobal } from '../../App';

const Profile: React.FC = () => {
  const { orders, currentUser, setView, setCurrentUser } = useGlobal();

  // Only show orders belonging to this user
  const myOrders = orders.filter(o => o.customerEmail === currentUser?.email);

  const handleLogout = () => {
    setCurrentUser(null);
    setView('auth');
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col items-center text-center space-y-4 pt-4">
        <div className="relative">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name}`} alt="Profile" className="w-32 h-32 rounded-[2.5rem] bg-violet-100 border-4 border-white shadow-2xl object-cover" />
          <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-sm"></div>
        </div>
        <div>
          <h2 className="text-3xl font-black text-violet-900">{currentUser?.name || 'Student User'}</h2>
          <p className="text-gray-400 font-medium text-sm">{currentUser?.email}</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm text-center">
            <div className="text-violet-600 font-black text-xl">{myOrders.length}</div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total Orders</div>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-white px-6 py-3 rounded-2xl shadow-sm text-center text-red-500 hover:bg-red-50 transition-all"
          >
            <i className="fas fa-power-off mb-1"></i>
            <div className="text-[10px] font-bold uppercase tracking-widest">Log Out</div>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-black text-xl text-gray-800">Order History</h3>
        <div className="space-y-4">
          {myOrders.length === 0 ? (
            <div className="bg-white p-12 rounded-[2.5rem] text-center text-gray-400 border border-dashed border-gray-200">
               <i className="fas fa-hamburger text-4xl mb-4 opacity-10"></i>
               <p className="font-bold">No history found</p>
            </div>
          ) : (
            myOrders.map(order => (
              <div key={order.id} className="bg-white p-5 rounded-[2rem] shadow-sm flex items-center justify-between border border-violet-50">
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
                     order.status === 'ready' ? 'bg-green-100 text-green-600' : 
                     order.status === 'completed' ? 'bg-gray-100 text-gray-600' :
                     'bg-amber-100 text-amber-600'
                   }`}>
                     <i className={`fas ${order.status === 'ready' ? 'fa-bell' : (order.status === 'completed' ? 'fa-check' : 'fa-clock')}`}></i>
                   </div>
                   <div>
                     <h4 className="font-bold text-gray-800">Token #{order.token}</h4>
                     <p className="text-[10px] text-gray-400 uppercase font-black">{new Date(order.timestamp).toLocaleDateString()}</p>
                   </div>
                </div>
                <div className="text-right">
                   <div className="font-black text-violet-700">₹{order.total}</div>
                   <div className={`text-[10px] font-black uppercase tracking-tighter ${
                     order.status === 'ready' ? 'text-green-500' : (order.status === 'awaiting_payment' ? 'text-red-500' : 'text-amber-500')
                   }`}>{order.status.replace('_', ' ')}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
