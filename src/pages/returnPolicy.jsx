import React from 'react';

function returnPolicy() {
  return (
    // W-full aur max-width alignment for consistent desktop view
    <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-20 font-['Poppins','Inter',sans-serif]">
      
      {/* Page Header - Responsive sizing for Mobile/Tablet/Laptop */}
      <header className="mb-12 md:mb-20 border-b border-slate-100 pb-8 md:pb-12">
        <h1 className="text-[30px] sm:text-[42px] md:text-[56px] font-bold text-slate-800 leading-[1.1] tracking-tight">
          Return & <br className="hidden sm:block" /> 
          <span className="text-[#D4AF37]">Refund Policy</span>
        </h1>
        <p className="mt-4 md:mt-6 text-[14px] md:text-[18px] font-normal text-slate-500 italic max-w-2xl">
          Hassle-free returns and peace of mind for every purchase at Scms.
        </p>
      </header>

      {/* Content Container - max-w-4xl for readability on large screens */}
      <div className="max-w-4xl space-y-12 md:space-y-16">
        
        {/* Section 1 - 7 Days Check Warranty */}
        <section className="group">
          <h2 className="text-[24px] md:text-[32px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8 transition-all group-hover:underline-offset-4">
            1. 7-Days Check Warranty
          </h2>
          <p className="text-[15px] md:text-[17px] font-normal text-slate-600 leading-relaxed">
            Hum apne tamam customers ko <strong>7 din ki check warranty</strong> dete hain. Agar aapke laptop mein koi hardware issue ya technical fault nikalta hai, toh aap use 7 din ke andar exchange ya return kar sakte hain. 
          </p>
        </section>

        {/* Section 2 - Conditions for Return */}
        <section className="group">
          <h2 className="text-[24px] md:text-[32px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8 transition-all group-hover:underline-offset-4">
            2. Conditions for Return
          </h2>
          <p className="text-[15px] md:text-[17px] font-normal text-slate-600 leading-relaxed mb-6">
            Return process accept hone ke liye darj-zail sharait lazmi hain:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 list-none">
            {[
              { title: "Original Packaging", desc: "Item apni original box aur packing mein hona chahiye." },
              { title: "No Physical Damage", desc: "Laptop par koi scratches ya liquid damage nahi hona chahiye." },
              { title: "Included Accessories", desc: "Charger, cables, aur manuals ka hona zaroori hai." }
            ].map((item, index) => (
              <li key={index} className="bg-slate-50 p-4 rounded-xl border-l-4 border-[#D4AF37] flex flex-col">
                <strong className="text-slate-800 text-[15px] md:text-[16px]">{item.title}</strong>
                <span className="text-slate-500 text-sm md:text-base">{item.desc}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 3 - Refund Process */}
        <section className="group">
          <h2 className="text-[24px] md:text-[32px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8 transition-all group-hover:underline-offset-4">
            3. Refund Process
          </h2>
          <p className="text-[15px] md:text-[17px] font-normal text-slate-600 leading-relaxed bg-slate-50/50 p-6 rounded-2xl border border-dashed border-slate-200">
            Refund approve hone ke baad, aapki amount <strong>3-5 working days</strong> mein aapke bank account ya original payment method par transfer kar di jati hai. Delivery charges non-refundable hote hain.
          </p>
        </section>

        {/* Section 4 - Change of Mind */}
        <section className="group">
          <h2 className="text-[24px] md:text-[32px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8 transition-all group-hover:underline-offset-4">
            4. Change of Mind
          </h2>
          <p className="text-[15px] md:text-[17px] font-normal text-slate-600 leading-relaxed">
            Humaray paas "Change of Mind" ki surat mein return policy limited hai. Agar product open ho chuki ho aur usme koi defect na ho, toh return accept nahi kiya jayega. Hum suggest karte hain ke aap khareedne se pehle specifications achi tarah check kar lein.
          </p>
        </section>

        {/* Support Box - Redesigned for all devices */}
        <div className="relative overflow-hidden bg-slate-900 p-8 md:p-12 rounded-[2.5rem] text-white mt-12 md:mt-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-[22px] md:text-[28px] font-bold mb-3 text-[#D4AF37]">Initiate a Return?</h3>
              <p className="text-slate-300 text-[15px] md:text-[16px] max-w-md">
                Agar aap koi item return karna chahte hain, toh hamare support portal par apni request submit karein.
              </p>
            </div>
            <button className="w-full md:w-auto px-10 py-4 bg-[#D4AF37] text-slate-900 text-[15px] font-bold rounded-xl hover:bg-white hover:scale-105 transition-all uppercase tracking-widest shadow-lg active:scale-95">
              Contact Support
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default returnPolicy;