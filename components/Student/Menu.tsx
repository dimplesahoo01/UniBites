
import React, { useState, useMemo } from 'react';
import { useGlobal } from '../../App';
import { MenuItem } from '../../types';

interface MenuProps {
  showSearchInitially?: boolean;
}

const Menu: React.FC<MenuProps> = ({ showSearchInitially = false }) => {
  const { menu, cart, setCart, setStudentView } = useGlobal();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMenu = useMemo(() => {
    return menu.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [menu, searchTerm]);

  const highestRatedItem = useMemo(() => {
    return [...menu].sort((a, b) => b.rating - a.rating)[0];
  }, [menu]);

  const addToCart = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    if (!cart[id]) return;
    setCart(prev => {
      const newVal = prev[id] - 1;
      if (newVal <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newVal };
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menu.find(m => m.id === id);
    return sum + (item?.price || 0) * qty;
  }, 0);

  return (
    <div className="p-4 space-y-6">
      {/* Search */}
      <div className="space-y-4">
        <div className="relative">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input 
            type="text" 
            placeholder="Search for something delicious..."
            className="w-full bg-white border-none shadow-sm rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-violet-500 transition-all text-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Highest Rated Food Section */}
      {highestRatedItem && (
        <div className="bg-gradient-to-r from-violet-600 to-indigo-700 rounded-[2.5rem] p-6 text-white shadow-2xl flex items-center justify-between border border-white/10 relative overflow-hidden group">
          <div className="relative z-10">
            <span className="bg-amber-400 text-purple-900 text-[10px] font-black px-3 py-1 rounded-full mb-3 inline-block uppercase tracking-widest shadow-lg">
              <i className="fas fa-crown mr-1"></i> Highest Rated
            </span>
            <h2 className="text-2xl font-black tracking-tight mb-1">{highestRatedItem.name}</h2>
            <div className="flex items-center gap-1.5 text-amber-300 font-bold">
              <i className="fas fa-star text-sm"></i>
              <span className="text-lg">{highestRatedItem.rating}</span>
              <span className="text-xs text-white/60 font-medium">/ 5.0</span>
            </div>
            <p className="opacity-60 text-[11px] mt-2 font-medium">Based on 500+ student reviews</p>
          </div>
          <div className="relative z-10">
             <img 
               src={highestRatedItem.image} 
               alt={highestRatedItem.name} 
               className="rounded-3xl w-28 h-28 object-cover rotate-3 shadow-2xl border-4 border-white/20 transition-transform group-hover:scale-110 group-hover:rotate-6 duration-500" 
             />
             <div className="absolute -bottom-2 -right-2 bg-amber-400 text-purple-900 w-10 h-10 rounded-full flex items-center justify-center font-black text-xs shadow-lg">
               TOP
             </div>
          </div>
          
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl"></div>
        </div>
      )}

      {/* Menu Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-xl text-white flex items-center gap-2">
          Our Menu
          <span className="text-sm font-normal text-white/60">({filteredMenu.length} items)</span>
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          {filteredMenu.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-3xl flex items-center gap-4 shadow-sm hover:shadow-md transition-all group">
              <div className="relative">
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover" />
                {!item.available && (
                   <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center">
                     <span className="text-white text-[10px] font-bold uppercase">Sold Out</span>
                   </div>
                )}
                <div className="absolute -top-1 -right-1 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-lg flex items-center gap-1 shadow-sm border border-gray-100">
                  <i className="fas fa-star text-[10px] text-amber-400"></i>
                  <span className="text-[10px] font-bold text-gray-700">{item.rating}</span>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg text-gray-800">{item.name}</h4>
                <p className="text-gray-400 text-xs line-clamp-1 mb-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-violet-600">₹{item.price}</span>
                  
                  {cart[item.id] ? (
                    <div className="flex items-center gap-3 bg-violet-100 rounded-xl p-1">
                      <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-violet-600 shadow-sm active:scale-90">
                        <i className="fas fa-minus text-xs"></i>
                      </button>
                      <span className="font-bold text-violet-800 text-sm">{cart[item.id]}</span>
                      <button onClick={() => addToCart(item.id)} className="w-8 h-8 flex items-center justify-center bg-violet-600 rounded-lg text-white shadow-sm active:scale-90">
                        <i className="fas fa-plus text-xs"></i>
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => addToCart(item.id)}
                      disabled={!item.available}
                      className="bg-amber-400 hover:bg-amber-300 disabled:bg-gray-200 disabled:text-gray-400 text-purple-900 w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-sm active:scale-90"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[85%] max-sm:w-[90%] max-w-sm bg-violet-700 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between animate-in slide-in-from-bottom duration-300 z-40 border border-white/10">
           <div className="flex items-center gap-3">
             <div className="bg-white/20 px-3 py-1 rounded-lg text-sm font-bold">{totalItems} Items</div>
             <span className="font-bold">Total: ₹{totalPrice}</span>
           </div>
           <button 
             onClick={() => setStudentView('cart')}
             className="bg-amber-400 text-purple-900 px-4 py-2 rounded-xl font-bold text-sm shadow-lg active:scale-95 flex items-center gap-1"
           >
             View Cart <i className="fas fa-arrow-right ml-1"></i>
           </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
