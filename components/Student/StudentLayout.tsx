
import React from 'react';
import Menu from './Menu';
import Cart from './Cart';
import Profile from './Profile';
import Review from './Review';
import Bill from './Bill';
import Token from './Token';
import { useGlobal } from '../../App';
import { LOGO_URL } from '../../constants';

interface StudentLayoutProps {
  onLogout: () => void;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ onLogout }) => {
  const { currentUser, studentView, setStudentView } = useGlobal();

  return (
    <div className="flex flex-col min-h-screen bg-[#6D5ACF] relative overflow-hidden">
      {/* Shared Background Aesthetics */}
      <div className="absolute top-[-5%] left-[-10%] w-[400px] h-[400px] bg-[#7D6ADF] rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-[0%] right-[-15%] w-[450px] h-[450px] bg-[#5B49AF] rounded-full blur-3xl opacity-50"></div>

      <header className="p-4 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setStudentView('home')}>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 shadow-lg">
            <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-xl font-bold italic text-amber-300" style={{ fontFamily: 'serif' }}>Uni Bites</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setStudentView('profile')} className="w-10 h-10 rounded-full border-2 border-amber-400 overflow-hidden shadow-md">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name}`} alt="Profile" />
          </button>
        </div>
      </header>

      <main className="flex-1 pb-32 overflow-y-auto relative z-10 custom-scrollbar">
        {studentView === 'home' && <Menu />}
        {studentView === 'review' && <Review />}
        {studentView === 'bill' && <Bill onPaymentComplete={() => setStudentView('token')} />}
        {studentView === 'token' && <Token onBackToMenu={() => setStudentView('home')} />}
        {studentView === 'cart' && <Cart onCheckoutComplete={() => setStudentView('bill')} />}
        {studentView === 'profile' && <Profile />}
      </main>

      {/* Styled Bottom Nav for Students */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xl h-20 flex justify-around items-center border-t border-white/10 z-50">
        <button onClick={() => setStudentView('home')} className={`text-2xl transition-all ${studentView === 'home' ? 'text-amber-400 scale-110' : 'text-white/40'}`}>
          <i className="fas fa-home"></i>
        </button>
        <button onClick={() => setStudentView('review')} className={`text-2xl transition-all ${studentView === 'review' ? 'text-amber-400 scale-110' : 'text-white/40'}`}>
          <i className="fas fa-star"></i>
        </button>
        <button onClick={() => setStudentView('cart')} className={`text-2xl transition-all ${studentView === 'cart' ? 'text-amber-400 scale-110' : 'text-white/40'}`}>
          <i className="fas fa-shopping-cart"></i>
        </button>
        <button onClick={() => setStudentView('profile')} className={`text-2xl transition-all ${studentView === 'profile' ? 'text-amber-400 scale-110' : 'text-white/40'}`}>
          <i className="fas fa-user"></i>
        </button>
      </nav>
    </div>
  );
};

export default StudentLayout;
