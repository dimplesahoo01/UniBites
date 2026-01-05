
import React, { useState } from 'react';
import { useGlobal } from '../App';
import { LOGO_URL } from '../constants';
import { auth, db } from '../firebase'; // Firebase integration
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Firebase integration
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firebase integration
import { User } from '../types';

const Auth: React.FC = () => {
  const { setCurrentUser, setView } = useGlobal();
  const [isStudent, setIsStudent] = useState(true);
  const [isLoginView, setIsLoginView] = useState(true); // To toggle between login and signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      alert("Please enter both email and password.");
      return;
    }

    if (isStudent) {
      const studentEmailRegex = /^[a-zA-Z0-9._%+-]+@rbunagpur\.in$/i;
      if (!studentEmailRegex.test(trimmedEmail)) {
        alert("Access Denied: Only student emails ending with @rbunagpur.in are accepted.");
        return;
      }
    }

    setIsLoading(true);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        
        const role = isStudent ? 'student' : 'staff';
        if (userData.role !== role) {
          alert(`Access Denied: You are not registered as a ${role}. Please switch to the correct role or contact support.`);
          setIsLoading(false);
          return;
        }

        setCurrentUser(userData);
        setView(userData.role === 'student' ? 'student' : 'staff');
      } else {
        alert("User data not found. Please contact support.");
      }

    } catch (error: any) {
      console.error("Firebase Auth Error:", error);
      let errorMessage = "An error occurred during login. Please try again.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = "Invalid email or password. Please check your credentials and try again.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "The email address is not valid. Please enter a valid email.";
      }
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password || !fullName || !phone) {
      alert("Please fill in all fields.");
      return;
    }

    if (isStudent) {
      const studentEmailRegex = /^[a-zA-Z0-9._%+-]+@rbunagpur\.in$/i;
      if (!studentEmailRegex.test(trimmedEmail)) {
        alert("Access Denied: Only student emails ending with @rbunagpur.in are accepted for signup.");
        return;
      }
    }

    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
      const user = userCredential.user;
      const role = isStudent ? 'student' : 'staff';

      const newUser: User = {
        id: user.uid,
        name: fullName,
        email: trimmedEmail,
        phone: phone,
        role: role,
      };

      await setDoc(doc(db, "users", user.uid), newUser);
      setCurrentUser(newUser);
      setView(role === 'student' ? 'student' : 'staff');

    } catch (error: any) {
      console.error("Firebase Signup Error:", error);
      let errorMessage = "An error occurred during sign-up. Please try again.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already registered. Please log in or use a different email.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "The email address is not valid.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "The password is too weak. Please use a stronger password.";
      }
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#6D5ACF] text-white overflow-hidden relative font-sans">
      <div className="absolute top-[-5%] left-[-15%] w-[450px] h-[450px] bg-[#8271E0] rounded-full blur-[70px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#8271E0] rounded-full blur-[80px] opacity-70"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] bg-[#8271E0] rounded-full blur-[60px] opacity-50"></div>

      <header className="pt-10 pl-10 flex items-center gap-2 relative z-10">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 shadow-lg overflow-hidden">
          <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-xl font-bold italic text-amber-300" style={{ fontFamily: 'serif' }}>Uni Bites</h1>
      </header>

      <main className="flex-1 flex flex-col items-center pt-12 px-10 relative z-10">
        
        <div className="flex items-center gap-5 mb-10">
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

        <form onSubmit={isLoginView ? handleLogin : handleSignUp} className="w-full max-w-[320px] space-y-4">
          {!isLoginView && (
            <>
              <div className="relative group">
                <i className="fas fa-user absolute left-5 top-1/2 -translate-y-1/2 text-slate-900 opacity-60"></i>
                <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-[#8A7ADF] border-none rounded-xl py-4 pl-14 pr-6 text-slate-900 placeholder:text-slate-800/50 focus:ring-2 focus:ring-[#D4C365]/50 shadow-md transition-all text-sm font-medium" required />
              </div>
              <div className="relative group">
                <i className="fas fa-phone absolute left-5 top-1/2 -translate-y-1/2 text-slate-900 opacity-60"></i>
                <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-[#8A7ADF] border-none rounded-xl py-4 pl-14 pr-6 text-slate-900 placeholder:text-slate-800/50 focus:ring-2 focus:ring-[#D4C365]/50 shadow-md transition-all text-sm font-medium" required />
              </div>
            </>
          )}
          <div className="relative group">
            <i className="fas fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-slate-900 opacity-60"></i>
            <input type="email" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#8A7ADF] border-none rounded-xl py-4 pl-14 pr-6 text-slate-900 placeholder:text-slate-800/50 focus:ring-2 focus:ring-[#D4C365]/50 shadow-md transition-all text-sm font-medium" required />
          </div>
          <div className="relative">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#8A7ADF] border-none rounded-xl py-4 px-6 text-slate-900 placeholder:text-slate-800/50 focus:ring-2 focus:ring-[#D4C365]/50 shadow-md text-center transition-all text-sm font-medium" required />
          </div>

          <div className="text-left mt-3">
            <p className="text-[10px] font-medium text-slate-900/80">
              {isLoginView ? "New to Uni Bites? " : "Already have an account? "}
              <button type="button" onClick={() => setIsLoginView(!isLoginView)} className="text-[#D4C365] font-bold hover:underline">
                {isLoginView ? "Create Account" : "Login"}
              </button>
            </p>
          </div>

          <div className="pt-20">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#D4C365] hover:bg-[#C4B355] text-slate-900 font-bold py-4 rounded-xl shadow-[0_4px_0_rgba(0,0,0,0.2),0_10px_20px_rgba(0,0,0,0.15)] transition-all transform active:scale-95 text-2xl"
              style={{ fontFamily: 'serif' }}
            >
              {isLoading ? 'Wait...' : (isLoginView ? 'Login' : 'Sign Up')}
            </button>
          </div>
        </form>
      </main>

      <div className="h-24"></div>
    </div>
  );
};

export default Auth;
