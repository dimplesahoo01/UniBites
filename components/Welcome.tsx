
import React from 'react';
import { useGlobal } from '../App';
import { LOGO_URL } from '../constants';

const Welcome: React.FC = () => {
  const { setView } = useGlobal();

  return (
    <div className="min-h-full bg-gradient-to-br from-violet-600 to-indigo-700 flex flex-col justify-between items-center text-white p-8 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-20%] left-[-20%] w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[5%] right-[-25%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="text-center z-10 pt-16">
        <h2 className="text-2xl font-light italic text-amber-300" style={{ fontFamily: 'serif' }}>
          Welcome To
        </h2>
        <h1 className="text-6xl font-extrabold tracking-tighter mt-1 mb-6 text-shadow-lg" style={{ fontFamily: 'sans-serif' }}>
          Uni Bites
        </h1>
      </div>

      <div className="z-10 flex flex-col items-center">
        <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-2xl mb-8 overflow-hidden">
          <img 
            src={LOGO_URL} 
            alt="Uni Bites Logo" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 z-10 pb-8">
        <button 
          onClick={() => setView('student')}
          className="w-full bg-white text-indigo-700 font-bold py-5 rounded-full shadow-lg text-xl tracking-wide uppercase transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          Student
        </button>
        <button 
          onClick={() => setView('admin')}
          className="w-full bg-slate-800/50 backdrop-blur-sm border border-white/20 text-white font-bold py-4 rounded-full shadow-md text-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          Admin
        </button>
      </div>
    </div>
  );
};

export default Welcome;
