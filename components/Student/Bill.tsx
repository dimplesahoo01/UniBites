
import React from 'react';
import { useGlobal } from '../../App';
import { LOGO_URL } from '../../constants';

interface BillProps {
  onPaymentComplete: () => void;
}

const Bill: React.FC<BillProps> = ({ onPaymentComplete }) => {
  const { activeOrder } = useGlobal();

  if (!activeOrder) {
    return (
      <div className="min-h-full bg-[#6D5ACF] p-8 flex flex-col items-center justify-center text-white">
        <i className="fas fa-receipt text-6xl opacity-20 mb-4"></i>
        <h2 className="text-2xl font-bold">No Active Bill</h2>
      </div>
    );
  }

  const subtotal = activeOrder.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // Using 20 as per screenshot example (which implies a flat or different tax rate)
  // but let's make it look realistic for the numbers shown: 200 subtotal + 20 GST = 220
  const gst = Math.round(subtotal * 0.1); 

  return (
    <div className="min-h-full bg-[#6D5ACF] p-6 flex flex-col items-center animate-in fade-in zoom-in duration-500 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-[-5%] right-[-10%] w-[300px] h-[300px] bg-[#8A7ADF]/40 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-[20%] left-[-15%] w-[350px] h-[350px] bg-[#5B49AF]/60 rounded-full blur-[100px]"></div>

      {/* Header Logo */}
      <div className="flex items-center gap-2 mb-8 self-start ml-4 relative z-10">
        <div className="bg-white p-1 rounded-full shadow-lg w-10 h-10 flex items-center justify-center overflow-hidden">
           <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-lg font-bold italic text-amber-300" style={{ fontFamily: 'serif' }}>Uni Bites</h1>
      </div>

      {/* Title Section from Mockup */}
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-5xl font-bold text-white mb-2" style={{ fontFamily: 'serif' }}>Order Placed!</h2>
        <p className="text-amber-300 italic font-medium text-lg" style={{ fontFamily: 'serif' }}>Thanks for order.</p>
      </div>

      {/* Order Details Card exactly like mockup */}
      <div className="w-full max-w-[340px] bg-white rounded-[2.5rem] shadow-2xl px-8 py-10 flex flex-col relative z-10">
        <h3 className="text-3xl font-bold text-center text-slate-800 mb-8" style={{ fontFamily: 'serif' }}>Order Details</h3>
        
        <div className="space-y-6">
          {/* Table Header */}
          <div className="flex justify-between border-b-2 border-slate-300 pb-2 text-[14px] font-bold text-slate-800" style={{ fontFamily: 'serif' }}>
            <span className="w-2/5 text-left">Item</span>
            <span className="w-1/5 text-center">Qty</span>
            <span className="w-1/5 text-center">Rate</span>
            <span className="w-1/5 text-right">Total</span>
          </div>

          {/* Table Items */}
          <div className="space-y-6 py-2">
            {activeOrder.items.map((item, index) => (
              <div key={item.id} className="flex justify-between text-[14px] font-bold text-slate-800 leading-tight" style={{ fontFamily: 'serif' }}>
                <span className="w-2/5 text-left">{index + 1}.{item.name}</span>
                <span className="w-1/5 text-center">{item.quantity}</span>
                <span className="w-1/5 text-center">{item.price}</span>
                <span className="w-1/5 text-right">{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Totals Section */}
          <div className="pt-8 space-y-3">
            <div className="flex justify-between text-[15px] font-bold text-slate-800" style={{ fontFamily: 'serif' }}>
              <span>GST</span>
              <span>{gst}</span>
            </div>
            <div className="flex justify-between text-[15px] font-bold text-slate-800" style={{ fontFamily: 'serif' }}>
              <span>Total Payment</span>
              <span>{subtotal + gst}</span>
            </div>
          </div>

          {/* Pay Now Button */}
          <div className="pt-8">
            <button 
              onClick={onPaymentComplete}
              className="w-full bg-[#4D3A9F] hover:bg-[#3D2A8F] text-amber-300 font-bold py-5 rounded-[2.5rem] shadow-xl active:scale-95 transition-all text-3xl"
              style={{ fontFamily: 'serif' }}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
      
      <div className="h-28"></div>
    </div>
  );
};

export default Bill;
