
import React from 'react';
import { useGlobal } from '../App';
import { LOGO_URL } from '../constants';

interface LandingPageProps {
  onLogin: (role: 'student' | 'staff') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const { setCurrentUser } = useGlobal();

  const handleLogin = (role: 'student' | 'staff') => {
    setCurrentUser({
      name: role === 'student' ? 'Student User' : 'Kitchen Admin',
      email: role === 'student' ? 'student@rbunagpur.in' : 'staff@unibites.com',
      phone: '9876543210',
      role: role
    });
    onLogin(role);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-violet-600 to-indigo-900 text-white px-6">
      <div className="bg-white p-2 rounded-3xl mb-6 shadow-2xl animate-bounce overflow-hidden w-28 h-28 flex items-center justify-center">
        <img src={LOGO_URL} alt="Uni Bites Logo" className="w-full h-full object-contain" />
      </div>
      
      <h1 className="text-5xl font-bold mb-2 tracking-tighter">Uni Bites</h1>
      <p className="text-lg opacity-80 mb-12 text-center max-w-xs">
        Fresh food, zero queues. Your campus canteen experience, reinvented.
      </p>

      <div className="w-full max-w-xs space-y-4">
        <button 
          onClick={() => handleLogin('student')}
          className="w-full bg-amber-400 hover:bg-amber-300 text-purple-900 font-bold py-4 rounded-2xl shadow-xl transition-all active:scale-95"
        >
          I'm a Student
        </button>
        <button 
          onClick={() => handleLogin('staff')}
          className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-4 rounded-2xl border border-white/30 backdrop-blur-md transition-all active:scale-95"
        >
          Kitchen Dashboard
        </button>
      </div>

      <footer className="mt-16 text-sm opacity-50">
        © 2024 Uni Bites - Smart Campus Solutions
      </footer>
    </div>
  );
};

export default LandingPage;
