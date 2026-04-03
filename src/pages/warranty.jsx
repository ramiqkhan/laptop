import React from 'react';

function warranty() {
  return (
    // Max-width ko fix kiya taake layout desktop par stretch ho sake aur mobile par padding sahi rahe
    <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-16 font-['Poppins','Inter',sans-serif]">
      {/* Page Header - Fully Responsive */}
      <header className="mb-10 md:mb-16 border-b border-slate-100 pb-6 md:pb-10">
        <h1 className="text-[28px] sm:text-[36px] md:text-[48px] font-semibold text-slate-800 leading-tight">
          Warranty 
          <span className="text-[#D4AF37]"> Policy</span>
        </h1>
        <p className="mt-4 md:mt-6 text-[14px] md:text-[16px] font-normal text-slate-500 italic max-w-2xl">
          Your investment is protected with our comprehensive coverage.
        </p>
      </header>

      <div className="max-w-4xl space-y-10 md:space-y-14">

        {/* Section 1 - Warranty Duration */}
        <section>
          <h2 className="text-[22px] sm:text-[26px] md:text-[36px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8">
            1. Warranty Duration
          </h2>
          <p className="text-[15px] md:text-[16px] font-normal text-slate-600 leading-relaxed">
            Scms par milne wale tamam brand new laptops ke sath <strong>1-Year Official Local Warranty</strong> milti hai. Used ya refurbished machines ke liye hum 1-month ki service warranty provide karte hain taake aap be-fikr ho kar purchase kar sakein.
          </p>
        </section>

        {/* Section 2 - What is Covered */}
        <section>
          <h2 className="text-[22px] sm:text-[26px] md:text-[36px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8">
            2. What is Covered
          </h2>
          <p className="text-[15px] md:text-[16px] font-normal text-slate-600 leading-relaxed mb-4">
            Warranty mein darj-zail hardware problems cover ki jati hain:
          </p>
          <ul className="list-disc ml-5 md:ml-6 space-y-3 text-slate-600 text-[14px] md:text-[16px]">
            <li><strong className="text-slate-700">Motherboard & Processor:</strong> Internal circuit faults aur performance issues.</li>
            <li><strong className="text-slate-700">Display:</strong> Screen lines ya dead pixels (brand policy ke mutabiq).</li>
            <li><strong className="text-slate-700">Keyboard & Touchpad:</strong> Agar keys kaam karna chor dein.</li>
            <li><strong className="text-slate-700">Battery & Adapter:</strong> Charging issues aur original accessories ka fault.</li>
          </ul>
        </section>

        {/* Section 3 - What is NOT Covered */}
        <section>
          <h2 className="text-[22px] sm:text-[26px] md:text-[36px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8">
            3. Not Covered (Exclusions)
          </h2>
          <p className="text-[15px] md:text-[16px] font-normal text-slate-600 leading-relaxed">
            In suraton mein warranty claim nahi ki ja sakti:
          </p>
          <ul className="list-disc ml-5 md:ml-6 mt-4 space-y-3 text-slate-600 text-[14px] md:text-[16px]">
            <li>Physical Damage (Laptop gir jana ya toot jana).</li>
            <li>Liquid Damage (Pani ya kisi aur liquid ka girna).</li>
            <li>Software issues ya virus attacks.</li>
            <li>Third-party repair (Agar kisi bahar ke mechanic se laptop khulwaya gaya ho).</li>
          </ul>
        </section>

        {/* Section 4 - How to Claim */}
        <section>
          <h2 className="text-[22px] sm:text-[26px] md:text-[36px] font-semibold text-slate-800 mb-4 md:mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8">
            4. How to Claim
          </h2>
          <p className="text-[15px] md:text-[16px] font-normal text-slate-600 leading-relaxed">
            Warranty claim karne ke liye aapko apna <strong>Original Invoice</strong> aur <strong>Warranty Card</strong> dikhana hoga. Aap hamare Karachi outlet par visit kar sakte hain ya apna device courier ke zariye bhej sakte hain. Inspection ke baad claim process 10-15 working days leta hai.
          </p>
        </section>

        {/* Help Box - Better Mobile Handling */}
        <div className="bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-200 mt-12 transition-all hover:shadow-md">
          <h3 className="text-[20px] md:text-[24px] font-semibold text-slate-800 mb-2">Have a technical issue?</h3>
          <p className="text-slate-600 text-[14px] md:text-[16px] mb-6 leading-relaxed">
            Agar aapke laptop mein koi masla aa raha hai, toh claim karne se pehle hamare technical expert se online mashwara karein.
          </p>
          <button className="w-full sm:w-auto px-10 py-4 bg-[#D4AF37] text-white text-[14px] font-bold rounded-xl hover:bg-[#b8962d] transition-all uppercase tracking-widest shadow-lg shadow-[#D4AF37]/20 active:scale-95">
            Speak with an Expert
          </button>
        </div>

      </div>
    </div>
  );
}

export default warranty;