
import React from 'react';
import { LOGO_URL } from '../constants';

interface SplashPageProps {
  onProceed: () => void;
}

const SplashPage: React.FC<SplashPageProps> = ({ onProceed }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-violet-500 to-indigo-600 flex flex-col items-center justify-center p-6 overflow-hidden z-[100]">
      {/* Abstract Background Waves */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[350px] h-[350px] bg-purple-900/20 rounded-full blur-3xl"></div>
      
      {/* SVG-like Organic Waves using CSS */}
      <div className="absolute top-[20%] right-[-10%] w-[300px] h-[200px] bg-indigo-400/20 rounded-[40%_60%_70%_30%/40%_50%_60%_40%] blur-2xl rotate-12"></div>
      <div className="absolute bottom-[10%] left-[-5%] w-[350px] h-[250px] bg-violet-400/20 rounded-[60%_40%_30%_70%/50%_60%_40%_50%] blur-2xl -rotate-12"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-1000">
        {/* Large Circular Logo Container */}
        <div className="w-64 h-64 md:w-80 md:h-80 bg-slate-200/90 rounded-full flex items-center justify-center p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-8 border-white/20 mb-12">
           <img 
             src={LOGO_URL} 
             alt="Uni Bites Logo" 
             className="w-full h-full object-contain drop-shadow-2xl" 
           />
        </div>

        {/* Branding */}
        <h1 className="text-5xl font-bold text-amber-300 mb-20 drop-shadow-md" style={{ fontFamily: 'serif', fontStyle: 'italic' }}>
          Uni Bites
        </h1>

        {/* Action Button */}
        <button 
          onClick={onProceed}
          className="bg-slate-800 hover:bg-slate-900 text-amber-300 font-bold px-16 py-5 rounded-full shadow-2xl transition-all transform hover:scale-105 active:scale-95 text-2xl border border-slate-700/50"
          style={{ fontFamily: 'serif', fontStyle: 'italic' }}
        >
          Order Now!
        </button>
      </div>

      {/* Subtle Footer Decor */}
      <div className="absolute bottom-8 text-white/40 text-xs font-bold uppercase tracking-[0.3em]">
        Experience Freshness
      </div>
    </div>
  );
};

export default SplashPage;
