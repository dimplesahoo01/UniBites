
import React from 'react';
import { useGlobal } from '../../App';
import { LOGO_URL } from '../../constants';

interface TokenProps {
  onBackToMenu: () => void;
}

const Token: React.FC<TokenProps> = ({ onBackToMenu }) => {
  const { activeOrder } = useGlobal();

  // If there's no active order, we fallback or show a placeholder
  const tokenDisplay = activeOrder?.token || "#A-124";

  return (
    <div className="min-h-full bg-gradient-to-br from-violet-500 to-indigo-600 p-6 flex flex-col items-center animate-in fade-in duration-700 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-[-5%] right-[-10%] w-[250px] h-[250px] bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[20%] left-[-15%] w-[300px] h-[300px] bg-purple-900/20 rounded-full blur-3xl"></div>

      {/* Header Logo */}
      <div className="flex items-center gap-2 mb-12 self-start ml-4 relative z-10">
        <div className="bg-white p-1 rounded-full shadow-lg w-10 h-10 flex items-center justify-center overflow-hidden">
           <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-lg font-bold italic text-amber-300" style={{ fontFamily: 'serif' }}>Uni Bites</h1>
      </div>

      {/* Title Section */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-5xl font-bold text-white mb-2" style={{ fontFamily: 'serif' }}>Order Placed!</h2>
        <p className="text-amber-300 italic font-medium text-lg" style={{ fontFamily: 'serif' }}>Your Food is being prepared.</p>
      </div>

      {/* Success Card */}
      <div className="w-full max-w-[320px] bg-white rounded-[3rem] shadow-2xl pt-16 pb-12 px-8 flex flex-col items-center relative z-10">
        {/* Overlapping Checkmark */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-full p-2 shadow-xl flex items-center justify-center">
           <div className="w-full h-full bg-green-600 rounded-full flex items-center justify-center text-white text-4xl shadow-inner">
             <i className="fas fa-check"></i>
           </div>
        </div>

        <div className="text-center space-y-6 w-full">
          <h3 className="text-slate-800 font-bold text-sm tracking-widest uppercase" style={{ fontFamily: 'serif' }}>
            YOUR TOKEN NUMBER
          </h3>
          
          <div className="text-amber-400 font-bold text-7xl py-4" style={{ fontFamily: 'serif' }}>
            {tokenDisplay}
          </div>

          <p className="text-slate-800 font-bold text-sm" style={{ fontFamily: 'serif' }}>
            Ready in 10-15 mins
          </p>

          <div className="pt-6">
            <div className="w-full py-4 px-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
               <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Show this to the counter</p>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button 
        onClick={onBackToMenu}
        className="mt-8 text-white/60 hover:text-white text-xs font-bold uppercase tracking-widest relative z-10 transition-colors"
      >
        <i className="fas fa-arrow-left mr-2"></i> Back to Menu
      </button>

      {/* Bottom Padding for Nav */}
      <div className="h-28"></div>
    </div>
  );
};

export default Token;
