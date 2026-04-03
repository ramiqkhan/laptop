import React from 'react';
import { Laptop, ShieldCheck, Clock, Award, Headphones, MapPin } from 'lucide-react';

function AboutUs() {
  return (
    <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-16 font-['Poppins','Inter',sans-serif]">
      
      {/* Page Header - Matching Warranty Theme */}
      <header className="mb-10 md:mb-16 border-b border-slate-100 pb-6 md:pb-10">
        <h1 className="text-[28px] sm:text-[36px] md:text-[48px] font-semibold text-slate-800 leading-tight">
          About 
          <span className="text-[#D4AF37]"> IQRA TRADERS</span>
        </h1>
        <p className="mt-4 md:mt-6 text-[14px] md:text-[16px] font-normal text-slate-500 italic max-w-2xl">
          Your trusted destination for high-quality laptops and professional tech solutions in Karachi.
        </p>
      </header>

      <div className="max-w-4xl space-y-10 md:space-y-14">

        {/* Section 1 - Who We Are */}
        <section>
          <h2 className="text-[22px] sm:text-[26px] md:text-[36px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8">
            1. Who We Are
          </h2>
          <p className="text-[15px] md:text-[16px] font-normal text-slate-600 leading-relaxed">
            <strong>IQRA TRADERS</strong> ek bharosa-mand laptop shop hai jo high-quality laptops aur accessories munasib qeemat par faraham karti hai. Hum students, professionals, gamers, aur businesses ke liye behtareen products laate hain. Hamara maqsad performance, affordability, aur customer satisfaction ko ek hi chat ke neechay jama karna hai.
          </p>
        </section>

        {/* Section 2 - Products & Brands */}
        <section>
          <h2 className="text-[22px] sm:text-[26px] md:text-[36px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8">
            2. Our Products & Brands
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Laptop size={20} className="text-[#D4AF37]" /> Range
              </h3>
              <ul className="text-slate-600 text-[14px] space-y-1">
                <li>• Brand New & Used Laptops</li>
                <li>• Gaming & Office Machines</li>
                <li>• Premium Accessories</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Award size={20} className="text-[#D4AF37]" /> Top Brands
              </h3>
              <p className="text-slate-600 text-[14px]">
                HP, Dell, Lenovo, Apple, Asus, Acer, MSI, aur deegar leading brands.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 - Professional Services */}
        <section>
          <h2 className="text-[22px] sm:text-[26px] md:text-[36px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8">
            3. Professional Services
          </h2>
          <p className="text-[15px] md:text-[16px] font-normal text-slate-600 leading-relaxed mb-4">
            Hum sirf sales nahi, balkay mukammal technical support bhi dete hain:
          </p>
          <ul className="list-disc ml-5 md:ml-6 space-y-3 text-slate-600 text-[14px] md:text-[16px]">
            <li><strong className="text-slate-700">Repairing:</strong> Laptop repair aur regular maintenance.</li>
            <li><strong className="text-slate-700">Upgrades:</strong> RAM aur SSD ki installation for faster speed.</li>
            <li><strong className="text-slate-700">Software:</strong> Windows installation aur troubleshooting.</li>
          </ul>
        </section>

        {/* Section 4 - Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-[20px] font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Clock size={20} className="text-[#D4AF37]" /> Our Mission
            </h3>
            <p className="text-slate-600 text-[14px] leading-relaxed">
              Modern users ki zaruriat ko imandari aur professionalism ke sath pura karna aur behtareen technical solutions faraham karna.
            </p>
          </div>
          <div>
            <h3 className="text-[20px] font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <ShieldCheck size={20} className="text-[#D4AF37]" /> Our Vision
            </h3>
            <p className="text-slate-600 text-[14px] leading-relaxed">
              Pakistan ka sab se moatabar laptop store banna jo apni quality aur behtareen service ki wajah se jana jaye.
            </p>
          </div>
        </section>

        {/* Our Promise Box - Matching Style */}
        <div className="bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-200 mt-12 transition-all hover:shadow-md">
          <h3 className="text-[20px] md:text-[24px] font-semibold text-slate-800 mb-4">Our Promise to You</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {['Genuine Product', 'Best Prices', 'Honest Dealing', 'After-Sales Support'].map((promise) => (
              <div key={promise} className="text-center p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                <p className="text-[12px] md:text-[13px] font-bold text-slate-700 uppercase tracking-tight">{promise}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a 
              href="https://wa.me/923092794449" 
              className="w-full sm:w-auto px-10 py-4 bg-[#D4AF37] text-white text-[14px] font-bold rounded-xl hover:bg-[#b8962d] transition-all uppercase tracking-widest shadow-lg shadow-[#D4AF37]/20 text-center"
            >
              Contact on WhatsApp
            </a>
            <div className="flex items-center gap-2 text-slate-500 text-[14px]">
              <MapPin size={16} />
              <span>Saddar, Karachi</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AboutUs;