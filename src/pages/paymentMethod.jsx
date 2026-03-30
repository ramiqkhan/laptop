import React from 'react';
import { CreditCard, Wallet, Banknote, Building2, ShieldCheck, CheckCircle2, Landmark } from 'lucide-react';

function paymentMethod() {
  return (
    // Max-width fix for large screens and better horizontal padding for mobile
    <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-16 font-['Poppins','Inter',sans-serif]">
      
      {/* Page Header - Responsive Text Sizes */}
      <header className="mb-10 md:mb-16 border-b border-slate-100 pb-8 md:pb-12">
        <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest">
              Secure Payments
            </span>
        </div>
        <h1 className="text-[30px] sm:text-[40px] md:text-[56px] font-semibold text-slate-800 leading-[1.1] tracking-tight">
          Payment <br className="hidden sm:block" /> 
          <span className="text-[#D4AF37]">Methods</span>
        </h1>
        <p className="mt-4 md:mt-6 text-[14px] md:text-[17px] font-normal text-slate-500 italic max-w-2xl leading-relaxed">
          Choose from our variety of secure payment options designed for your ease.
        </p>
      </header>

      {/* Content Container - Optimized vertical spacing */}
      <div className="max-w-4xl space-y-6 md:space-y-10">
        
        {/* Option 1 - Cash on Delivery */}
        <section className="group p-5 md:p-8 rounded-4xl border border-slate-100 bg-white hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/40 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/20 transition-all shrink-0">
            <Banknote className="text-[#D4AF37]" size={32} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
                <h2 className="text-[20px] md:text-[24px] font-bold text-slate-800">1. Cash on Delivery (COD)</h2>
                <CheckCircle2 size={18} className="text-green-500 shrink-0" />
            </div>
            <p className="text-[14px] md:text-[16px] font-normal text-slate-600 leading-relaxed">
              Hum poore Pakistan mein COD ki sahulat dete hain. Jab parcel aapke darwaze par pahunche, tab hi payment karein. Yeh sab se safe aur trusted tareeqa hai.
            </p>
          </div>
        </section>

        {/* Option 2 - Direct Bank Transfer */}
        <section className="group p-5 md:p-8 rounded-[2rem] border border-slate-100 bg-white hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/40 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/20 transition-all shrink-0">
              <Landmark className="text-[#D4AF37]" size={32} />
            </div>
            <div>
              <h2 className="text-[20px] md:text-[24px] font-bold text-slate-800 mb-2">2. Direct Bank Transfer</h2>
              <p className="text-[14px] md:text-[16px] font-normal text-slate-600 leading-relaxed">
                Aap hamare official business account mein directly amount transfer kar sakte hain. Transfer ke baad screenshot share karna na bhooliye ga.
              </p>
            </div>
          </div>
          
          {/* Bank Card Display - Optimized for all screen sizes */}
          <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl">
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">Bank Name</span>
                <p className="font-semibold text-[#D4AF37] text-base md:text-lg tracking-wide">Meezan Bank Limited</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">Account Title</span>
                <p className="font-semibold text-base md:text-lg tracking-wide">Scms Official Store</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">Account Number</span>
                <p className="font-mono text-base md:text-lg tracking-widest text-slate-200">0123-4567890123</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">IBAN</span>
                <p className="font-mono text-[11px] md:text-[13px] text-slate-300 break-all">PK00 MEZN 0000 0123 4567 8901</p>
              </div>
            </div>
          </div>
        </section>

        {/* Option 3 - Mobile Wallets */}
        <section className="group p-5 md:p-8 rounded-4xl border border-slate-100 bg-white hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/40 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/20 transition-all shrink-0">
            <Wallet className="text-[#D4AF37]" size={32} />
          </div>
          <div className="flex-1">
            <h2 className="text-[20px] md:text-[24px] font-bold text-slate-800 mb-2">3. EasyPaisa / JazzCash</h2>
            <p className="text-[14px] md:text-[16px] font-normal text-slate-600 leading-relaxed">
              Quick checkout ke liye aap mobile wallets use kar sakte hain. Order confirmation ke waqt hamara support team representative aapko payment details provide kar dega.
            </p>
          </div>
        </section>

        {/* Security Banner - Redesigned for Impact */}
        <div className="relative overflow-hidden bg-slate-900 p-8 md:p-12 rounded-[2.5rem] text-white mt-12 md:mt-16">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <ShieldCheck size={180} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
            <div className="bg-[#D4AF37] p-4 rounded-[1.25rem] rotate-3 shadow-2xl shadow-[#D4AF37]/20 shrink-0">
              <ShieldCheck className="text-slate-900" size={40} />
            </div>
            <div>
              <h3 className="text-[20px] md:text-[26px] font-bold mb-3 text-white">100% Secure & Encrypted</h3>
              <p className="text-slate-400 text-[14px] md:text-[16px] leading-relaxed max-w-xl">
                Aapka data aur transaction hamari top priority hai. Hum industry-standard SSL encryption use karte hain taake aapka har paisa mehfooz rahe.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default paymentMethod;