
import React, { useState } from 'react';
import { useGlobal } from '../../App';
import { LOGO_URL } from '../../constants';

const Review: React.FC = () => {
  const { currentUser } = useGlobal();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [suggestionText, setSuggestionText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating!");
      return;
    }
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setReviewText('');
    setRating(0);
  };

  const handleSubmitSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setSuggestionText('');
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-20%] w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-20%] w-[300px] h-[300px] bg-purple-900/20 rounded-full blur-3xl"></div>

      <div className="flex items-center gap-2 mb-8 animate-in fade-in slide-in-from-top duration-500 relative z-10">
        <div className="bg-white p-1 rounded-full shadow-lg w-10 h-10 flex items-center justify-center overflow-hidden">
           <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-xl font-bold italic text-amber-300" style={{ fontFamily: 'serif' }}>Uni Bites</h1>
      </div>

      <div className="space-y-6 max-w-md mx-auto relative z-10">
        {isSubmitted && (
          <div className="bg-green-400 text-purple-900 p-3 rounded-2xl font-bold text-center animate-bounce shadow-xl">
            Thank you for your feedback! 💖
          </div>
        )}

        <section className="bg-white/20 backdrop-blur-md border border-white/30 rounded-[2.5rem] p-8 shadow-2xl transform transition-all hover:scale-[1.02]">
          <h2 className="text-2xl font-black mb-4 text-purple-950" style={{ fontFamily: 'serif' }}>Review</h2>
          <hr className="border-white/40 mb-6" />
          
          <div className="flex justify-between mb-6 px-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star} 
                onClick={() => setRating(star)}
                className="transition-transform active:scale-125"
              >
                <i className={`fas fa-star text-3xl ${star <= rating ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'text-gray-300'}`}></i>
              </button>
            ))}
          </div>

          <textarea 
            placeholder="Write Your Reviews......."
            className="w-full bg-gray-200/90 rounded-2xl p-4 text-purple-900 placeholder:text-gray-500 outline-none h-32 mb-6 border-none focus:ring-2 focus:ring-amber-400 transition-all shadow-inner"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />

          <button onClick={handleSubmitReview} className="w-full bg-slate-800/90 hover:bg-slate-900 text-amber-400 font-bold py-4 rounded-full shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
            Submit Review
          </button>
        </section>

        <section className="bg-white/20 backdrop-blur-md border border-white/30 rounded-[2.5rem] p-8 shadow-2xl transform transition-all hover:scale-[1.02]">
          <h2 className="text-2xl font-black mb-4 text-purple-950" style={{ fontFamily: 'serif' }}>Suggestions</h2>
          <hr className="border-white/40 mb-6" />

          <textarea 
            placeholder="What are your suggestions............"
            className="w-full bg-gray-200/90 rounded-2xl p-4 text-purple-900 placeholder:text-gray-500 outline-none h-24 mb-6 border-none focus:ring-2 focus:ring-amber-400 transition-all shadow-inner"
            value={suggestionText}
            onChange={(e) => setSuggestionText(e.target.value)}
          />

          <button onClick={handleSubmitSuggestion} className="w-full bg-slate-800/90 hover:bg-slate-900 text-amber-400 font-bold py-4 rounded-full shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
            Submit Suggestion
          </button>
        </section>
      </div>
      
      <div className="h-20"></div>
    </div>
  );
};

export default Review;
