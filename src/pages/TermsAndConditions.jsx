import React from 'react';

function TermsAndConditions() {
  return (
    // Max-width 1500px for layout consistency and responsive horizontal padding
    <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-16 font-['Poppins','Inter',sans-serif]">
      
      {/* Page Header - Fully responsive font sizes and spacing */}
      <header className="mb-10 md:mb-16 border-b border-slate-100 pb-8 md:pb-12">
        <h1 className="text-[30px] sm:text-[40px] md:text-[56px] font-bold text-slate-800 leading-[1.1] tracking-tight">
          Terms & <br className="hidden sm:block" /> 
          <span className="text-[#D4AF37]">Conditions</span>
        </h1>
        <p className="mt-4 md:mt-6 text-[14px] md:text-[18px] font-normal text-slate-500 italic">
          Last Updated: March 2026
        </p>
      </header>

      {/* Content Container - Optimized for readability on wider screens */}
      <div className="max-w-4xl space-y-12 md:space-y-16">
        
        {/* Section 1 - Introduction */}
        <section className="group">
          <h2 className="text-[24px] md:text-[32px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8 transition-all group-hover:underline-offset-4">
            1. Introduction
          </h2>
          <p className="text-[15px] md:text-[17px] font-normal text-slate-600 leading-relaxed">
            Welcome to Scms. By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
            All services and information provided on this platform are subject to your compliance with the terms listed below.
          </p>
        </section>

        {/* Section 2 - Purchase Policy */}
        <section className="group">
          <h2 className="text-[24px] md:text-[32px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8 transition-all group-hover:underline-offset-4">
            2. Purchase Policy
          </h2>
          <div className="space-y-4">
            <p className="text-[15px] md:text-[17px] font-normal text-slate-600 leading-relaxed">
              When placing an order for a laptop or accessory, you agree that:
            </p>
            {/* Grid layout for list items on tablets/desktops */}
            <ul className="grid grid-cols-1 md:grid-cols-1 gap-4 list-none">
              {[
                "All prices are inclusive of standard taxes unless stated otherwise.",
                "Scms reserves the right to cancel orders in case of stock unavailability.",
                "Payment must be verified before the dispatch of premium computing hardware."
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-[#D4AF37]/30 transition-colors">
                  <span className="h-2 w-2 rounded-full bg-[#D4AF37] mt-2 shrink-0"></span>
                  <span className="text-slate-600 text-[14px] md:text-[16px] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 3 - Warranty */}
        <section className="group">
          <h2 className="text-[24px] md:text-[32px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8 transition-all group-hover:underline-offset-4">
            3. Warranty & Returns
          </h2>
          <p className="text-[15px] md:text-[17px] font-normal text-slate-600 leading-relaxed bg-slate-50/50 p-6 rounded-2xl border border-dashed border-slate-200">
            Our high-performance machines come with official manufacturer warranties. Returns are only accepted within <strong>7 days</strong> if the product 
            is in its original packaging and <span className="text-[#D4AF37] font-semibold">"Void" seals</span> are intact.
          </p>
        </section>

        {/* Action Button - Optimized for touch and click */}
        <div className="pt-6 md:pt-10 flex flex-col sm:flex-row gap-4 items-center">
          <button className="w-full sm:w-auto px-10 py-4 bg-[#D4AF37] text-slate-900 text-[14px] font-bold rounded-xl shadow-lg shadow-[#D4AF37]/20 hover:bg-[#b8962d] hover:text-white transition-all uppercase tracking-widest active:scale-95">
            I Accept the Terms
          </button>
          <p className="text-slate-400 text-xs sm:text-sm font-medium">
            By clicking, you agree to our usage guidelines.
          </p>
        </div>

      </div>
    </div>
  );
}

export default TermsAndConditions;