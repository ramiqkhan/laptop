import React from 'react';

function FAQs() {
  return (
    // Max-width 1600px kar diya hai footer aur hero se alignment match karne ke liye
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-16 font-['Poppins','Inter',sans-serif]">
      
      {/* Page Header - Refined spacing to match site-wide alignment */}
      <header className="mb-10 md:mb-16 border-b border-slate-100 pb-8 md:pb-12">
        <h1 className="text-[30px] sm:text-[40px] md:text-[56px] font-bold text-slate-800 leading-[1.1] tracking-tight">
          Frequently Asked <br className="hidden sm:block" /> 
          <span className="text-[#D4AF37]">Questions</span>
        </h1>
        <p className="mt-4 md:mt-6 text-[14px] md:text-[18px] font-normal text-slate-500 italic max-w-2xl">
          Everything you need to know about our products and services.
        </p>
      </header>

      {/* Main Content - Max-width 4xl remains for readability, but it sits inside the 1600px container */}
      <div className="max-w-4xl space-y-12 md:space-y-16">
        
        {/* FAQ Sections */}
        {[
          {
            id: "1",
            q: "What is the delivery time?",
            a: "Standard delivery across Pakistan takes 3-5 working days. For major cities like Karachi, Lahore, and Islamabad, we often provide expedited 24-48 hour shipping for our premium laptop range."
          },
          {
            id: "2",
            q: "Are your laptops brand new?",
            a: "Yes, we primarily deal in brand-new, box-packed machines with official local or international warranties. Any open-box or refurbished units are clearly marked in the product description."
          },
          {
            id: "3",
            q: "Do you offer Cash on Delivery?",
            a: "We offer Cash on Delivery (COD) for orders up to a certain limit. For high-end gaming rigs and professional workstations, a partial advance payment may be required for security and insurance purposes."
          },
          {
            id: "4",
            q: "Can I return a laptop?",
            a: "Returns are accepted within 7 days if there is a manufacturing defect. The machine must be in its original packaging with all accessories and seals intact as per our Terms and Conditions."
          }
        ].map((faq) => (
          <section key={faq.id} className="group">
            <h2 className="text-[22px] md:text-[30px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8 transition-all group-hover:underline-offset-4">
              {faq.id}. {faq.q}
            </h2>
            <p className="text-[15px] md:text-[17px] font-normal text-slate-600 leading-relaxed">
              {faq.a}
            </p>
          </section>
        ))}

        {/* Support Box - Alignment and border radius matched with site containers */}
        <div className="relative overflow-hidden bg-[#0F172A] p-8 md:p-12 rounded-[2.5rem] text-white mt-12 md:mt-20 shadow-2xl">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-[22px] md:text-[28px] font-bold mb-3 text-[#D4AF37]">Still have questions?</h3>
              <p className="text-slate-300 text-[15px] md:text-[16px] max-w-md">
                Our support team is available to assist you with your technical needs and order inquiries.
              </p>
            </div>
            {/* Button matched with Footer/Hero CTA style */}
            <button className="w-full md:w-auto px-10 py-4 bg-[#D4AF37] text-slate-900 text-[15px] font-bold rounded-xl hover:bg-white hover:scale-105 transition-all uppercase tracking-widest shadow-lg active:scale-95">
              Contact Support
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default FAQs;