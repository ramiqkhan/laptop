import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Images
import lap1 from '../assets/imgs/brand1.png';
import lap2 from '../assets/imgs/brand2.png';

const Deals = () => {
  const [copiedCode, setCopiedCode] = useState("");
  const [timeLeft, setTimeLeft] = useState({ hours: 12, mins: 45, secs: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        return { ...prev, mins: prev.mins - 1, secs: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  const dealProducts = [
    { id: 101, name: "HP Victus 15 - RTX 3050", originalPrice: 210000, dealPrice: 185000, discount: "12% OFF", img: lap1, code: "HP-SAVE-15" },
    { id: 403, name: "Alienware m16 R2 Beast", originalPrice: 650000, dealPrice: 585000, discount: "PKR 65k OFF", img: lap2, code: "ALIEN-DEAL" },
    { id: 301, name: "MacBook Air M2 (Silver)", originalPrice: 345000, dealPrice: 315000, discount: "SAVE 30K", img: lap1, code: "APPLE-M2" },
  ];

  return (
    <div className="bg-[#F8F9FA] min-h-screen font-sans pb-10 md:pb-20">
      
      {/* --- HERO SECTION --- */}
      <div className="bg-[#0F172A] text-white py-12 md:py-20 px-4 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 tracking-tighter italic">
            FLASH <span className="text-[#F4C430]">DEALS</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-lg mb-8 max-w-2xl mx-auto font-medium px-4">
            Exclusive discounts on high-performance machines. Limited time only.
          </p>
          
          {/* Timer - Responsive gap and sizing */}
          <div className="flex justify-center gap-2 md:gap-4">
            {[ 
              { label: 'Hours', val: timeLeft.hours }, 
              { label: 'Min', val: timeLeft.mins }, 
              { label: 'Sec', val: timeLeft.secs } 
            ].map((unit, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-2 md:p-4 rounded-xl md:rounded-2xl min-w-[70px] md:min-w-[100px] shadow-2xl">
                <div className="text-xl md:text-4xl font-black text-[#F4C430]">{unit.val < 10 ? `0${unit.val}` : unit.val}</div>
                <div className="text-[8px] md:text-[10px] uppercase tracking-[1px] md:tracking-[2px] text-gray-400 font-bold">{unit.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-[#F4C430]/10 rounded-full blur-[80px] md:blur-[120px] -mr-32 -mt-32"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-12">
        
        {/* --- PROFESSIONAL CARDS GRID --- */}
        {/* Adjusted grid for Mobile (1), Tablet (2), Laptop (3) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {dealProducts.map((deal) => (
            <div key={deal.id} className="group relative bg-white rounded-[24px] md:rounded-[32px] p-1.5 md:p-2 shadow-[0_15px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-all duration-500 border border-transparent hover:border-[#b8962d]/20">
              
              <div className="bg-white rounded-[20px] md:rounded-[28px] p-5 md:p-6 h-full flex flex-col">
                
                <div className="flex justify-between items-start mb-2">
                  <div className="bg-[#F4C430] text-[#0F172A] text-[9px] md:text-[11px] font-black px-3 py-1 md:px-4 md:py-1.5 rounded-full shadow-lg shadow-[#F4C430]/20 uppercase">
                    {deal.discount}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-gray-400 line-through text-[10px] md:text-xs font-bold font-['Poppins']">PKR {deal.originalPrice.toLocaleString()}</span>
                    <span className="text-lg md:text-2xl font-black text-[#0F172A] font-['Poppins']">PKR {deal.dealPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="relative h-40 md:h-56 w-full flex items-center justify-center my-4 overflow-hidden rounded-xl bg-[#F8F9FA]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-[#F4C430]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <img 
                      src={deal.img} 
                      alt={deal.name} 
                      className="max-h-[85%] w-auto object-contain transform group-hover:scale-110 md:group-hover:-rotate-3 transition-all duration-700" 
                    />
                </div>

                <h3 className="text-md md:text-lg font-bold text-[#0F172A] mb-4 leading-tight group-hover:text-[#b8962d] transition-colors min-h-[3rem]">
                  {deal.name}
                </h3>

                <div className="mt-auto space-y-3 md:space-y-4">
                    <div 
                      onClick={() => copyToClipboard(deal.code)}
                      className="relative h-12 md:h-14 bg-[#F8F9FA] rounded-xl md:rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer overflow-hidden group/coupon"
                    >
                      <div className={`absolute inset-0 bg-[#0F172A] flex items-center justify-center transition-all duration-500 ${copiedCode === deal.code ? '-translate-y-full' : 'translate-y-0'}`}>
                        <div className="flex items-center gap-2">
                           <span className="text-[#F4C430] text-[9px] md:text-[10px] font-black uppercase tracking-[2px] md:tracking-[3px]">Reveal Coupon</span>
                        </div>
                      </div>
                      <span className="text-xs md:text-sm font-mono font-black text-[#0F172A] tracking-[3px] md:tracking-[5px]">
                        {copiedCode === deal.code ? "✓ COPIED" : deal.code}
                      </span>
                    </div>

                    <Link 
                      to={`/product/${deal.id}`}
                      className="w-full flex items-center justify-center py-3 md:py-4 bg-gradient-to-r from-[#0F172A] to-[#1e293b] text-white rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:shadow-xl hover:shadow-[#0F172A]/20 transition-all active:scale-95"
                    >
                      Grab This Deal
                    </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- NEWSLETTER SECTION --- */}
        <div className="bg-gradient-to-r from-[#F4C430] to-[#d6a11e] rounded-[30px] md:rounded-[48px] p-6 md:p-16 text-center shadow-[0_30px_100px_rgba(244,196,48,0.3)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-12 -translate-y-12"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-5xl font-black text-[#0F172A] mb-3 md:mb-4 uppercase tracking-tighter leading-tight">
              Want an extra 5% off?
            </h2>
            <p className="text-[#0F172A]/70 font-bold mb-6 md:mb-10 uppercase tracking-[2px] md:tracking-[4px] text-[10px] md:text-xs">
              Exclusive weekend deals delivered to your inbox
            </p>
            
            <div className="flex flex-col md:flex-row max-w-xl mx-auto gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full md:flex-[2] px-6 md:px-8 py-4 md:py-5 rounded-xl md:rounded-[20px] outline-none bg-white border-2 border-[#0F172A]/5 text-[#0F172A] font-bold shadow-xl placeholder:text-[#0F172A]/40 focus:border-[#0F172A] transition-all" 
              />
              <button className="w-full md:flex-1 bg-[#0F172A] text-white px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-[20px] font-black hover:bg-slate-800 active:scale-95 transition-all shadow-2xl uppercase text-[10px] md:text-xs tracking-widest">
                Join Now
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Deals;