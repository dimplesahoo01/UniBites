
import React from 'react';
import { LOGO_URL } from '../../constants';

const AdminOverview: React.FC = () => {
  // Mock data as per the provided image
  const feedbackData = [
    { id: '#T004', name: 'Rajesh Kumar', rating: 3, comment: 'One of the best items on the menu.' },
    { id: '#T003', name: 'Priya Sharma', rating: 2, comment: 'Quantity was less compared to the price.' },
    { id: '#T002', name: 'Aditya Dubey', rating: 4, comment: 'Really enjoyed the flavors, would order again.' },
    { id: '#T001', name: 'Riya Jain', rating: 3, comment: 'Nice food, but serving time can improve.' },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <i key={i} className={`fas fa-star text-[10px] ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}></i>
    ));
  };

  return (
    <div className="flex flex-col min-h-full bg-transparent text-white overflow-hidden font-sans">
      {/* Dashboard Overview Header Card */}
      <div className="bg-[#D1C8F0] rounded-full py-3 px-8 shadow-xl flex items-center justify-between mb-8 mx-2 mt-4">
        <h2 className="text-sm font-bold text-slate-900">Dashboard Overview</h2>
        <span className="text-[10px] font-bold text-slate-600">Today, Jan 4</span>
      </div>

      {/* Main Stats Row */}
      <div className="grid grid-cols-2 gap-4 mb-6 px-2">
        <div className="bg-[#D1C8F0] rounded-[1.5rem] p-6 shadow-lg flex flex-col justify-between relative overflow-hidden h-36">
          <div>
            <div className="text-3xl font-black text-slate-900">47</div>
            <div className="text-[10px] font-bold text-slate-500 mt-1">Total Orders</div>
          </div>
          <div className="self-end bg-blue-100 p-2 rounded-lg text-blue-600 shadow-sm">
            <i className="fas fa-shopping-cart text-lg"></i>
          </div>
        </div>

        <div className="bg-[#D1C8F0] rounded-[1.5rem] p-6 shadow-lg flex flex-col justify-between relative overflow-hidden h-36">
          <div>
            <div className="text-2xl font-black text-slate-900">₹2,340</div>
            <div className="text-[10px] font-bold text-slate-500 mt-1">Revenue</div>
          </div>
          <div className="self-end bg-green-100 p-2 rounded-lg text-green-600 shadow-sm flex items-center gap-1 font-bold text-xs">
            Rs <i className="fas fa-check-circle"></i>
          </div>
        </div>
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-8 px-2">
        <div className="bg-[#D1C8F0] rounded-[1rem] p-4 shadow-md text-center flex flex-col items-center justify-center gap-1">
          <div className="text-lg font-black text-amber-500">8</div>
          <div className="text-[10px] font-bold text-slate-500">Pending</div>
        </div>
        <div className="bg-[#D1C8F0] rounded-[1rem] p-4 shadow-md text-center flex flex-col items-center justify-center gap-1">
          <div className="text-lg font-black text-blue-600">12</div>
          <div className="text-[10px] font-bold text-slate-500">Preparing</div>
        </div>
        <div className="bg-[#D1C8F0] rounded-[1rem] p-4 shadow-md text-center flex flex-col items-center justify-center gap-1">
          <div className="text-lg font-black text-green-500">27</div>
          <div className="text-[10px] font-bold text-slate-500">Completed</div>
        </div>
      </div>

      {/* Suggestions / Feedback Section */}
      <div className="bg-[#D1C8F0] rounded-[2rem] p-6 shadow-2xl mb-10 mx-2">
        <h3 className="text-lg font-black text-slate-900 mb-4 px-2">Suggestions/Feedback</h3>
        <div className="space-y-3">
          {feedbackData.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] font-black text-slate-800">{item.id} - {item.name}</span>
                <div className="flex gap-0.5">
                  {renderStars(item.rating)}
                </div>
              </div>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                {item.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="h-24"></div>
    </div>
  );
};

export default AdminOverview;
