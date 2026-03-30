import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Navigate hook import kiya

function shippinginfo() {
  const navigate = useNavigate(); // 2. Hook ko initialize kiya

  return (
    // Max-width 1500px for consistency across the site
    <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-16 font-['Poppins','Inter',sans-serif]">
      
      {/* Page Header */}
      <header className="mb-10 md:mb-16 border-b border-slate-100 pb-8 md:pb-12">
        <h1 className="text-[30px] sm:text-[40px] md:text-[56px] font-bold text-slate-800 leading-[1.1] tracking-tight">
          Shipping <br className="hidden sm:block" /> 
          <span className="text-[#D4AF37]">Information</span>
        </h1>
        <p className="mt-4 md:mt-6 text-[14px] md:text-[18px] font-normal text-slate-500 italic max-w-2xl">
          Fast and secure delivery across Pakistan, ensuring your tech reaches you safely.
        </p>
      </header>

      {/* Content Container */}
      <div className="max-w-4xl space-y-12 md:space-y-16">
        
        {/* Section 1 - Delivery Timeline */}
        <section className="group">
          <h2 className="text-[24px] md:text-[32px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8 transition-all group-hover:underline-offset-4">
            1. Delivery Timeline
          </h2>
          <p className="text-[15px] md:text-[17px] font-normal text-slate-600 leading-relaxed">
            Hum koshish karte hain ke aapka order jald se jald aap tak pahunche. <strong className="text-slate-700">Karachi</strong> ke liye delivery <span className="text-[#D4AF37] font-semibold">24-48 hours</span> mein ho jati hai, jabke baaki cities (Lahore, Islamabad, etc.) ke liye <span className="text-[#D4AF37] font-semibold">3-5 working days</span> lagte hain.
          </p>
        </section>

        {/* Section 2 - Shipping Charges */}
        <section className="group">
          <h2 className="text-[24px] md:text-[32px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8 transition-all group-hover:underline-offset-4">
            2. Shipping Charges
          </h2>
          <p className="text-[15px] md:text-[17px] font-normal text-slate-600 leading-relaxed mb-6">
            Scms offers competitive shipping rates based on your location:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-5 rounded-2xl border-l-4 border-[#D4AF37]">
              <h4 className="font-bold text-slate-800 text-lg mb-1">Free Shipping</h4>
              <p className="text-slate-600 text-sm md:text-base font-medium">Tamam premium laptops par free delivery provide ki jati hai.</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border-l-4 border-slate-300">
              <h4 className="font-bold text-slate-800 text-lg mb-1">Accessories</h4>
              <p className="text-slate-600 text-sm md:text-base font-medium">Choti items aur accessories par nominal shipping charges apply hote hain.</p>
            </div>
          </div>
        </section>

        {/* Section 3 - Order Tracking */}
        <section className="group">
          <h2 className="text-[24px] md:text-[32px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8 transition-all group-hover:underline-offset-4">
            3. Order Tracking
          </h2>
          <p className="text-[15px] md:text-[17px] font-normal text-slate-600 leading-relaxed">
            Jaise hi aapka order dispatch hota hai, aapko email aur SMS ke zariye ek <strong className="text-slate-700">tracking ID</strong> bheji jati hai. Aap hamari website par ja kar apna order real-time track kar sakte hain.
          </p>
        </section>

        {/* Section 4 - Packaging & Safety */}
        <section className="group">
          <h2 className="text-[24px] md:text-[32px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8 transition-all group-hover:underline-offset-4">
            4. Packaging & Safety
          </h2>
          <p className="text-[15px] md:text-[17px] font-normal text-slate-600 leading-relaxed bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            Hum <strong className="text-slate-700">high-quality bubble wrap</strong> aur double-layered boxes use karte hain taake aapka laptop safely aap tak pahunche. Delivery ke waqt agar box damage ho, toh baraye meherbani use accept na karein aur foran humse raabta karein.
          </p>
        </section>

        {/* Help Box */}
        <div className="relative overflow-hidden bg-slate-900 p-8 md:p-12 rounded-[2.5rem] text-white mt-12 md:mt-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-[22px] md:text-[28px] font-bold mb-3 text-[#D4AF37]">Need help with your order?</h3>
              <p className="text-slate-300 text-[15px] md:text-[16px] max-w-md">
                Agar aapka order late ho jaye ya tracking mein masla ho, toh hamari helpline par call karein.
              </p>
            </div>
            {/* 3. Button par onClick lagaya */}
            <button 
              onClick={() => navigate('/track-order')}
              className="w-full md:w-auto px-10 py-4 bg-[#D4AF37] text-slate-900 text-[15px] font-bold rounded-xl hover:bg-white hover:scale-105 transition-all uppercase tracking-widest shadow-lg active:scale-95"
            >
              Check Order Status
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default shippinginfo;