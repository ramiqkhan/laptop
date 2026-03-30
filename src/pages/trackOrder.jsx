import React from 'react';

function trackOrder() {
  const isOrderFound = true; // Placeholder for order tracking state

  return (
    // Max-width 1500px for consistency across the site
    <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-16 font-['Poppins','Inter',sans-serif]">
      
      {/* Page Header - Clean design with responsive typography */}
      <header className="border-b border-slate-100 pb-8 md:pb-12">
        <h1 className="text-[30px] sm:text-[40px] md:text-[56px] font-bold text-slate-800 leading-[1.1] tracking-tight">
          Track Your <br className="hidden sm:block" /> 
          <span className="text-[#D4AF37]">Order</span>
        </h1>
        <p className="mt-4 md:mt-6 text-[14px] md:text-[18px] font-normal text-slate-500 italic max-w-2xl">
          Enter your order details below to see real-time updates of your delivery.
        </p>
      </header>

      {/* Main Content - Fluid margins */}
      <div className="max-w-4xl mt-10 md:mt-14 space-y-12 md:space-y-20">
        
        {/* Tracking Form Section - Optimized for Touch & Desktop */}
        <section className="bg-slate-50 p-6 md:p-10 rounded-[2rem] border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:shadow-slate-200/50">
          <h2 className="text-[20px] md:text-[24px] font-bold text-slate-800 mb-8 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#D4AF37] rounded-full"></span>
            Enter Order Details
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="flex flex-col gap-2.5">
              <label htmlFor="orderId" className="text-slate-700 text-[14px] md:text-[15px] font-bold tracking-wide">Order ID</label>
              <input 
                type="text" 
                id="orderId" 
                name="orderId" 
                placeholder="e.g., #SCMS-123456" 
                className="w-full px-5 py-3.5 border border-slate-300 rounded-xl text-slate-800 text-[15px] focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/10 focus:border-[#D4AF37] transition-all bg-white" 
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <label htmlFor="emailAddress" className="text-slate-700 text-[14px] md:text-[15px] font-bold tracking-wide">Billing Email</label>
              <input 
                type="email" 
                id="emailAddress" 
                name="emailAddress" 
                placeholder="your.email@example.com" 
                className="w-full px-5 py-3.5 border border-slate-300 rounded-xl text-slate-800 text-[15px] focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/10 focus:border-[#D4AF37] transition-all bg-white" 
              />
            </div>
            <div className="md:col-span-2 pt-2">
                <button type="submit" className="w-full md:w-auto px-10 py-4 bg-[#D4AF37] text-slate-900 text-[15px] font-bold rounded-xl hover:bg-slate-900 hover:text-white transition-all uppercase tracking-[0.1em] shadow-lg shadow-[#D4AF37]/20 active:scale-95">
                  Track My Order
                </button>
            </div>
          </form>
        </section>

        {/* Conditional Order Details Block - Improved Visual Hierarchy */}
        {isOrderFound && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-[24px] md:text-[34px] font-bold text-slate-800 mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8">
              Order Status: SCMS-123456
            </h2>
            <p className="text-[15px] md:text-[17px] font-normal text-slate-600 leading-relaxed mb-8">
                Your high-performance machine is on its way. Use the tracking details below to stay updated.
            </p>

            {/* Status Cards - Responsive Grid (1 col mobile, 3 cols laptop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col gap-1.5 shadow-sm hover:border-[#D4AF37]/30 transition-colors">
                    <span className="text-slate-400 text-[11px] uppercase font-bold tracking-widest">Current Status</span>
                    <span className="text-emerald-600 font-bold text-lg md:text-xl">In Transit</span>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col gap-1.5 shadow-sm hover:border-[#D4AF37]/30 transition-colors">
                    <span className="text-slate-400 text-[11px] uppercase font-bold tracking-widest">Carrier Partner</span>
                    <span className="text-[#D4AF37] font-bold text-lg md:text-xl">SCMS Logistics</span>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col gap-1.5 shadow-sm hover:border-[#D4AF37]/30 transition-colors sm:col-span-2 lg:col-span-1">
                    <span className="text-slate-400 text-[11px] uppercase font-bold tracking-widest">Tracking ID</span>
                    <span className="font-mono text-[14px] md:text-[15px] border border-slate-200 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-800 font-medium">#SCMST-987654321</span>
                </div>
            </div>

            {/* Support Message Box */}
            <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
              <p className="text-[14px] md:text-[16px] font-normal text-slate-300 leading-relaxed">
                In the event of delivery delays or tracking discrepancies, please reach out to our support desk via email at 
                <span className="text-[#D4AF37] font-bold mx-1">support@scms.pk</span> 
                We provide round-the-clock assistance for your convenience.
              </p>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

export default trackOrder;