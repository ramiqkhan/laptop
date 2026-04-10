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
    href="https://wa.me/92309-2794449" 
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-white text-[14px] font-bold rounded-xl hover:bg-[#b8962d] transition-all uppercase tracking-widest shadow-lg shadow-[#D4AF37]/20 text-center"
  >
    {/* Official WhatsApp SVG Icon */}
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="25" 
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.483 8.413-.003 6.557-5.338 11.892-11.893 11.892-1.972-.001-3.911-.496-5.631-1.432l-6.365 1.669zm6.335-3.094l.361.214a9.873 9.873 0 005.031 1.378h.004c5.449 0 9.882-4.433 9.885-9.884.001-2.64-1.03-5.122-2.893-6.989a9.824 9.824 0 00-6.988-2.898c-5.451 0-9.887 4.434-9.888 9.884-.001 2.096.547 4.142 1.51 5.26l.235.374-.998 3.648 3.741-.982zm11.138-7.859c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    </svg>
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