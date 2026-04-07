import React, { useState } from 'react';

function TrackOrder() {
  // Input fields ke liye states
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  
  // Data aur Loading states
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 const handleTrack = async (e) => {
  e.preventDefault();
  
  // Clean inputs
  const cleanOrderId = orderId.replace('#', '').replace('SCMS-', '').trim();
  const cleanEmail = email.trim();

  if (!cleanOrderId || !cleanEmail) {
    setError("Please enter both Order ID and Email.");
    return;
  }

  setLoading(true);
  setError('');
  setOrderData(null);

  try {
    const res = await fetch(
      `https://laptopbackend-seven.vercel.app/api/orders/track?orderId=${encodeURIComponent(cleanOrderId)}&email=${encodeURIComponent(cleanEmail)}`
    );

    const data = await res.json();

    if (res.ok) {
      setOrderData(data);
    } else {
      setError(data.message || "Order nahi mila. Details check karein.");
    }
  } catch (err) {
    setError("Server se rabta nahi ho pa raha.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-16 font-['Poppins','Inter',sans-serif]">
      
      <header className="border-b border-slate-100 pb-8 md:pb-12">
        <h1 className="text-[30px] sm:text-[40px] md:text-[56px] font-bold text-slate-800 leading-[1.1] tracking-tight">
          Track Your <br className="hidden sm:block" /> 
          <span className="text-[#D4AF37]">Order</span>
        </h1>
        <p className="mt-4 md:mt-6 text-[14px] md:text-[18px] font-normal text-slate-500 italic max-w-2xl">
          Enter your order details below to see real-time updates of your delivery.
        </p>
      </header>

      <div className="max-w-4xl mt-10 md:mt-14 space-y-12 md:space-y-20">
        
        {/* Tracking Form */}
        <section className="bg-slate-50 p-6 md:p-10 rounded-[2rem] border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:shadow-slate-200/50">
          <h2 className="text-[20px] md:text-[24px] font-bold text-slate-800 mb-8 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#D4AF37] rounded-full"></span>
            Enter Order Details
          </h2>
          <form onSubmit={handleTrack} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="flex flex-col gap-2.5">
              <label className="text-slate-700 text-[14px] md:text-[15px] font-bold tracking-wide">Order ID</label>
              <input 
                type="text" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g., #SCMS-123456" 
                required
                className="w-full px-5 py-3.5 border border-slate-300 rounded-xl text-slate-800 text-[15px] focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/10 focus:border-[#D4AF37] transition-all bg-white" 
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-slate-700 text-[14px] md:text-[15px] font-bold tracking-wide">Billing Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com" 
                required
                className="w-full px-5 py-3.5 border border-slate-300 rounded-xl text-slate-800 text-[15px] focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/10 focus:border-[#D4AF37] transition-all bg-white" 
              />
            </div>
            <div className="md:col-span-2 pt-2">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full md:w-auto px-10 py-4 bg-[#D4AF37] text-slate-900 text-[15px] font-bold rounded-xl hover:bg-slate-900 hover:text-white transition-all uppercase tracking-[0.1em] shadow-lg shadow-[#D4AF37]/20 active:scale-95 disabled:opacity-50"
                >
                  {loading ? "Searching..." : "Track My Order"}
                </button>
            </div>
          </form>
          {error && <p className="mt-4 text-red-500 font-bold text-sm uppercase tracking-wider">{error}</p>}
        </section>

        {/* Order Result Section */}
        {orderData && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-[24px] md:text-[34px] font-bold text-slate-800 mb-6 underline decoration-[#D4AF37] decoration-4 underline-offset-8">
              Order Status: {orderData.orderId || orderData._id.slice(-6)}
            </h2>
            <p className="text-[15px] md:text-[17px] font-normal text-slate-600 leading-relaxed mb-8">
                Your order for <span className="font-bold text-slate-800">{orderData.userName}</span> is currently being processed.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col gap-1.5 shadow-sm hover:border-[#D4AF37]/30 transition-colors">
                    <span className="text-slate-400 text-[11px] uppercase font-bold tracking-widest">Current Status</span>
                    <span className="text-emerald-600 font-bold text-lg md:text-xl uppercase">{orderData.status}</span>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col gap-1.5 shadow-sm hover:border-[#D4AF37]/30 transition-colors">
                    <span className="text-slate-400 text-[11px] uppercase font-bold tracking-widest">Payment Method</span>
                   <span className="text-[#D4AF37] font-bold text-lg md:text-xl uppercase">
        {/* Agar paymentType null hai toh "N/A" dikhaye ga */}
        {orderData.paymentType ? orderData.paymentType : "Not Specified"}
    </span>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col gap-1.5 shadow-sm hover:border-[#D4AF37]/30 transition-colors sm:col-span-2 lg:col-span-1">
                    <span className="text-slate-400 text-[11px] uppercase font-bold tracking-widest">Total Amount</span>
                    <span className="font-mono text-[16px] md:text-[18px] text-slate-800 font-bold italic">PKR {orderData.totalAmount?.toLocaleString()}</span>
                </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
              <p className="text-[14px] md:text-[16px] font-normal text-slate-300 leading-relaxed">
                In the event of delivery delays or tracking discrepancies, please reach out to our support desk via email at 
                <span className="text-[#D4AF37] font-bold mx-1">support@iqratraders.pk</span> 
                We provide round-the-clock assistance for your convenience.
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default TrackOrder;