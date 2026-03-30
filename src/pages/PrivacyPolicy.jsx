import React from 'react';

function PrivacyPolicy() {
  return (
    // Max-width 1500px for alignment with navbar/footer, and responsive padding
    <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-16 font-['Poppins','Inter',sans-serif]">
      
      {/* Page Header - Responsive typography and spacing */}
      <header className="mb-10 md:mb-16 border-b border-slate-100 pb-8 md:pb-12">
        <h1 className="text-[30px] sm:text-[40px] md:text-[56px] font-bold text-slate-800 leading-[1.1] tracking-tight">
          Privacy <br className="hidden sm:block" /> 
          <span className="text-[#D4AF37]">Policy</span>
        </h1>
        <p className="mt-4 md:mt-6 text-[14px] md:text-[18px] font-normal text-slate-500 italic">
          Effective Date: March 2026
        </p>
      </header>

      {/* Content Container - max-w-4xl ensures best readability on wide screens */}
      <div className="max-w-4xl space-y-12 md:space-y-16">
        
        {/* Section 1 - Data Collection */}
        <section className="group">
          <h2 className="text-[24px] md:text-[32px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8 transition-all group-hover:underline-offset-4">
            1. Information We Collect
          </h2>
          <p className="text-[15px] md:text-[17px] font-normal text-slate-600 leading-relaxed mb-6">
            At Scms, we collect information to provide better services to our users. This includes:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none">
            {[
              { label: "Personal Information", desc: "Name, email, and shipping address for orders." },
              { label: "Technical Data", desc: "IP address and device info for site optimization." },
              { label: "Payment Data", desc: "Encrypted transaction details via secure gateways." }
            ].map((item, index) => (
              <li key={index} className="bg-slate-50 p-4 rounded-xl border-l-4 border-[#D4AF37]">
                <strong className="text-slate-800 block text-[15px]">{item.label}</strong>
                <span className="text-slate-500 text-sm">{item.desc}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 2 - Usage */}
        <section className="group">
          <h2 className="text-[24px] md:text-[32px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8 transition-all group-hover:underline-offset-4">
            2. How We Use Your Data
          </h2>
          <p className="text-[15px] md:text-[17px] font-normal text-slate-600 leading-relaxed bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            Your data is used solely for processing orders, managing your account, and sending updates. We optimize performance for all device sizes (Mobile, Tablet, Desktop) using technical data.
          </p>
        </section>

        {/* Section 3 - Security */}
        <section className="group">
          <h2 className="text-[24px] md:text-[32px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8 transition-all group-hover:underline-offset-4">
            3. Data Security
          </h2>
          <p className="text-[15px] md:text-[17px] font-normal text-slate-600 leading-relaxed">
            We implement industry-standard <strong>SSL encryption</strong>. Access is restricted to authorized employees who need the info for billing or support. Your security is our top priority.
          </p>
        </section>

        {/* Section 4 - Cookies */}
        <section className="group">
          <h2 className="text-[24px] md:text-[32px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8 transition-all group-hover:underline-offset-4">
            4. Cookie Policy
          </h2>
          <p className="text-[15px] md:text-[17px] font-normal text-slate-600 leading-relaxed">
            Scms uses cookies to enhance your shopping experience. You can disable cookies in your browser settings, but some features may not function properly.
          </p>
        </section>

        {/* Contact Info Box - Enhanced for high conversion and visibility */}
        <section className="relative overflow-hidden bg-slate-900 p-8 md:p-12 rounded-[2.5rem] text-white mt-12 md:mt-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-[22px] md:text-[28px] font-bold mb-3 text-[#D4AF37]">Questions?</h3>
            <p className="text-slate-300 text-[15px] md:text-[17px] mb-6 max-w-md">
              If you have any questions regarding your privacy, feel free to reach out to our legal team.
            </p>
            <a 
              href="mailto:privacy@scms.pk" 
              className="inline-block px-8 py-3 bg-[#D4AF37] text-slate-900 font-bold rounded-xl hover:bg-white transition-all transform hover:scale-105 active:scale-95"
            >
              privacy@scms.pk
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}

export default PrivacyPolicy;