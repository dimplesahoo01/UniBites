
import React, { useState } from 'react';
import { useGlobal } from '../App';
import { LOGO_URL } from '../constants';

const Auth: React.FC = () => {
  const { setCurrentUser, setView } = useGlobal();
  const [isStudent, setIsStudent] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // Strict Student domain validation: id@rbunagpur.in
    if (isStudent) {
      const studentEmailRegex = /^[a-zA-Z0-9._%+-]+@rbunagpur\.in$/i;
      if (!studentEmailRegex.test(trimmedEmail)) {
        alert("Access Denied: Only student emails ending with @rbunagpur.in are accepted.");
        return;
      }
    }

    setIsLoading(true);
    
    // Simulate API call for login
    await new Promise(r => setTimeout(r, 800));
    
    const role = isStudent ? 'student' : 'staff';
    setCurrentUser({
      name: isStudent ? trimmedEmail.split('@')[0] : 'Admin User',
      email: trimmedEmail,
      phone: '9876543210',
      role: role
    });
    setView(role === 'student' ? 'student' : 'staff');
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#6D5ACF] text-white overflow-hidden relative font-sans">
      {/* Background Organic Blobs - Matching the 'main chick' mockup */}
      <div className="absolute top-[-5%] left-[-15%] w-[450px] h-[450px] bg-[#8271E0] rounded-full blur-[70px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#8271E0] rounded-full blur-[80px] opacity-70"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] bg-[#8271E0] rounded-full blur-[60px] opacity-50"></div>

      {/* Header with Logo exactly as mockup */}
      <header className="pt-10 pl-10 flex items-center gap-2 relative z-10">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 shadow-lg overflow-hidden">
          <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-xl font-bold italic text-amber-300" style={{ fontFamily: 'serif' }}>Uni Bites</h1>
      </header>

      {/* Main Login Form Area */}
      <main className="flex-1 flex flex-col items-center pt-24 px-10 relative z-10">
        
        {/* Role Toggle Switch - matching screenshot yellow text and green toggle */}
        <div className="flex items-center gap-5 mb-14">
          <span className="text-3xl font-black text-[#D4C365] tracking-tight">
            {isStudent ? 'STUDENT' : 'ADMIN'}
          </span>
          <button 
            type="button"
            onClick={() => setIsStudent(!isStudent)}
            className={`w-16 h-8 rounded-full relative transition-all duration-300 shadow-inner p-1 ${isStudent ? 'bg-[#50C878]' : 'bg-[#D4C365]'}`}
          >
            <div className={`w-6 h-6 bg-white rounded-full transition-all shadow-md ${isStudent ? 'translate-x-8' : 'translate-x-0'}`}></div>
          </button>
        </div>

        {/* Form Inputs Container */}
        <form onSubmit={handleLogin} className="w-full max-w-[320px] space-y-5">
          {/* Email Input Field */}
          <div className="relative group">
            <i className="fas fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-slate-900 opacity-60"></i>
            <input 
              type="email" 
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#8A7ADF] border-none rounded-xl py-4 pl-14 pr-6 text-slate-900 placeholder:text-slate-800/50 focus:ring-2 focus:ring-[#D4C365]/50 shadow-md transition-all text-sm font-medium"
              required
            />
          </div>

          {/* Password Input Field */}
          <div className="relative">
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#8A7ADF] border-none rounded-xl py-4 px-6 text-slate-900 placeholder:text-slate-800/50 focus:ring-2 focus:ring-[#D4C365]/50 shadow-md text-center transition-all text-sm font-medium"
              required
            />
          </div>

          {/* Create Account Link exactly like mockup */}
          <div className="text-left mt-3">
            <p className="text-[10px] font-medium text-slate-900/80">
              New to Uni Bites? <button type="button" className="text-[#D4C365] font-bold hover:underline">Create Account</button>
            </p>
          </div>

          {/* Login Button Area - Pushed down as per screenshot */}
          <div className="pt-32">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#D4C365] hover:bg-[#C4B355] text-slate-900 font-bold py-4 rounded-xl shadow-[0_4px_0_rgba(0,0,0,0.2),0_10px_20px_rgba(0,0,0,0.15)] transition-all transform active:scale-95 text-2xl"
              style={{ fontFamily: 'serif' }}
            >
              {isLoading ? 'Wait...' : 'Login'}
            </button>
          </div>
        </form>
      </main>

      {/* Footer Space padding to mimic the mockup's length */}
      <div className="h-24"></div>
    </div>
  );
};

export default Auth;
