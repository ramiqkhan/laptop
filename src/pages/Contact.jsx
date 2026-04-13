import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Globe } from 'lucide-react';

function Contact() {
  return (
    <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-16 font-['Poppins','Inter',sans-serif]">
      
      {/* Page Header - Matching About Us Theme */}
      <header className="mb-10 md:mb-16 border-b border-slate-100 pb-6 md:pb-10">
        <h1 className="text-[28px] sm:text-[36px] md:text-[48px] font-semibold text-slate-800 leading-tight">
          Contact 
          <span className="text-[#D4AF37]"> IQRA TRADERS</span>
        </h1>
        <p className="mt-4 md:mt-6 text-[14px] md:text-[16px] font-normal text-slate-500 italic max-w-2xl">
          Hamse rabta karein mazeed maloomat ya kisi bhi kism ki technical support ke liye.
        </p>
      </header>

      <div className="max-w-5xl space-y-12">
        
        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Phone & WhatsApp Section */}
          <section>
            <h2 className="text-[22px] md:text-[28px] font-semibold text-slate-800 mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8">
              1. Call & WhatsApp
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <Phone size={24} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-[16px]">Direct Contact</h3>
                  <p className="text-slate-600 text-[15px] mt-1">0322-9299951</p>
            
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <MessageCircle size={24} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-[16px]">Instant WhatsApp</h3>
                  <p className="text-slate-600 text-[15px] mt-1">923092794449</p>
                  <p className="text-[12px] text-slate-400">Available: 11 AM - 9 PM</p>
                </div>
              </div>
            </div>
          </section>

          {/* Email & Online Section */}
          <section>
            <h2 className="text-[22px] md:text-[28px] font-semibold text-slate-800 mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8">
              2. Online Support
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <Mail size={24} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-[16px]">Official Email</h3>
                  <p className="text-slate-600 text-[15px] mt-1">iqratraders34@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <Clock size={24} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-[16px]">Business Hours</h3>
                  <p className="text-slate-600 text-[15px] mt-1">Monday - Saturday</p>
                  <p className="text-slate-600 text-[15px]">12:00 AM - 09:00 PM</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Location Section - Full Width */}
        <section className="bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-200 mt-12">
          <div className="flex items-center gap-3 mb-6">
            <MapPin size={28} className="text-[#D4AF37]" />
            <h2 className="text-[22px] md:text-[28px] font-semibold text-slate-800">
              Visit Our Store
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-[15px] md:text-[16px] font-normal text-slate-600 leading-relaxed">
                Aap hamari shop visit kar sakte hain behtareen laptop deals aur technical services ke liye.
              </p>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-1">HQ Address:</h4>
                <p className="text-slate-600 text-[15px]">
                 Plot no 83,saghir Hussain United center, Shop no F-34,<br />
                    1st floor Near star city mall saddar mobile market Karachi.
                </p>
              </div>
            </div>

            {/* Quick Action Button Box - Matching About Us style */}
            <div className="flex flex-col justify-center items-center md:items-end gap-4">
              <a 
                href="https://wa.me/923092794449" 
                className="w-full sm:w-auto px-10 py-4 bg-[#D4AF37] text-white text-[14px] font-bold rounded-xl hover:bg-[#b8962d] transition-all uppercase tracking-widest shadow-lg shadow-[#D4AF37]/20 text-center"
              >
                Get Directions on WhatsApp
              </a>
              <div className="flex items-center gap-2 text-slate-500 text-[13px] font-medium uppercase tracking-tighter">
                <Globe size={16} />
                <span>Open in Karachi (Saddar Area)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Accent - Keeping it professional */}
        <div className="text-center pt-8">
           <p className="text-slate-400 text-[12px] uppercase tracking-[0.2em]">
             Quality Tech Solutions Since 2015
           </p>
        </div>

      </div>
    </div>
  );
}

export default Contact;