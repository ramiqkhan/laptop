import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, Cpu, Layers, HardDrive, Monitor, CheckCircle, Copy, 
  ArrowRight, ArrowLeft, Star, ShieldCheck, Zap, Box, ShoppingCart, CreditCard 
} from 'lucide-react';

const Deals = () => {
  const navigate = useNavigate();
  const [dealProducts, setDealProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState("");
  const [selectedDeal, setSelectedDeal] = useState(null); 
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 12, mins: 45, secs: 30 });

  const API_URL = "http://localhost:5000/api/deals";

  const fetchDeals = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  console.log("Deals from DB:", data); // Check karein ke yahan _id kya aa rahi hai
  setDealProducts(data);
};

  const renderImage = (imageSource) => {
    const imgObj = Array.isArray(imageSource) ? imageSource[activeImgIndex] || imageSource[0] : imageSource;
    if (!imgObj || !imgObj.data) return "https://via.placeholder.com/600x400?text=No+Image";
    try {
      const bufferData = imgObj.data.data || imgObj.data;
      const binary = new Uint8Array(bufferData).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
      return `data:${imgObj.contentType || 'image/jpeg'};base64,${btoa(binary)}`;
    } catch (err) { return "https://via.placeholder.com/600x400?text=Error"; }
  };

  // --- FIXED ADD TO CART LOGIC ---
// --- FIXED ADD TO CART LOGIC IN Deals.jsx ---
const handleAddToCart = (product, silent = false) => {
  const savedCart = localStorage.getItem('globalCart');
  let currentCart = savedCart ? JSON.parse(savedCart) : [];

  // Yahan check karein ke hum product._id use kar rahe hain, name nahi
  const existingItem = currentCart.find(item => item.id === product._id);
  
  if (existingItem) {
    currentCart = currentCart.map(item =>
      item.id === product._id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    currentCart.push({
      id: product._id,         // <--- Ye MongoDB wali lambi ID honi chahiye
      productId: product._id,  // <--- Backend isi ID ko dhoond raha hai
      name: product.name,      // Ye "33" hoga, jo ke thik hai
      price: product.price,
      img: renderImage(product.images),
      quantity: 1,
      brand: product.brand,
      processor: product.processor,
      ram: product.ram,
      storage: product.storage
    });
  }

  localStorage.setItem('globalCart', JSON.stringify(currentCart));
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { id: product._id } }));
  
  if (!silent) alert("Added to cart!");
};
  const handleBuyNow = (product) => {
    handleAddToCart(product, true);
    navigate('/cart');
  };

  useEffect(() => {
    fetchDeals();
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <div className="w-full font-['Poppins'] bg-white min-h-screen">
      {selectedDeal ? (
        <div className="max-w-7xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button 
            onClick={() => { setSelectedDeal(null); setActiveImgIndex(0); window.scrollTo(0,0); }} 
            className="flex items-center gap-2 font-black uppercase text-[10px] tracking-[0.2em] mb-12 text-slate-400 hover:text-blue-600 transition-all group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Deals
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="flex flex-col gap-8">
              <div className="bg-slate-50 rounded-[3rem] p-12 border border-slate-100 flex items-center justify-center shadow-inner relative overflow-hidden h-[500px]">
                <div className="absolute top-8 left-8 z-10">
                  <span className="px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-[#F4C430] text-[#0F172A]">
                    Flash Deal Active
                  </span>
                </div>
                <img 
                  src={renderImage(selectedDeal.images)} 
                  className="max-h-full w-auto object-contain drop-shadow-2xl transition-all duration-700" 
                  alt={selectedDeal.name} 
                />
              </div>

              <div className="flex flex-wrap gap-4 justify-start px-2">
                {selectedDeal.images && selectedDeal.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`w-28 h-24 rounded-2xl border-2 transition-all overflow-hidden bg-white p-2 shadow-sm 
                      ${activeImgIndex === idx ? 'border-blue-600 ring-4 ring-blue-50' : 'border-slate-100 hover:border-slate-300'}`}
                  >
                    <img src={renderImage(selectedDeal.images[idx])} className="w-full h-full object-contain" alt="" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em]">{selectedDeal.brand} Exclusive</span>
                <div className="flex items-center gap-1 text-[#F4C430]">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-black text-slate-900">4.9</span>
                </div>
              </div>

              <h1 className="text-5xl font-black text-slate-900 leading-[0.9] mb-6 uppercase italic tracking-tighter">
                {selectedDeal.name}
              </h1>
              
              <div className="flex items-baseline gap-4 mb-10">
                <p className="text-4xl font-black text-slate-900 flex items-start gap-1">
                  <span className="text-sm mt-2 text-blue-600 font-bold">PKR</span>
                  {selectedDeal.price?.toLocaleString()}
                </p>
                <span className="text-xl text-slate-400 line-through font-bold font-mono">PKR {selectedDeal.originalPrice?.toLocaleString()}</span>
              </div>

              <div className="grid grid-cols-2 gap-y-8 gap-x-12 mb-12 bg-slate-50/50 p-10 rounded-[2.5rem] border border-slate-50">
                <DetailSpec icon={<Cpu size={14} />} label="Processor" value={selectedDeal.processor} />
                <DetailSpec icon={<Box size={14} />} label="Memory" value={selectedDeal.ram} />
                <DetailSpec icon={<HardDrive size={14} />} label="Storage" value={selectedDeal.storage} />
                <DetailSpec icon={<Zap size={14} />} label="Graphics" value={selectedDeal.graphics || "Dedicated GPU"} />
                <DetailSpec icon={<Monitor size={14} />} label="Display" value={selectedDeal.display || "15.6\" FHD"} />
                <DetailSpec icon={<ShieldCheck size={14} />} label="Warranty" value="1 Year Brand" />
              </div>

              <div 
                onClick={() => copyToClipboard(`${selectedDeal.brand.toUpperCase()}-DEAL`)}
                className="mb-8 w-full h-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-between px-6 cursor-pointer hover:border-[#F4C430] group transition-all"
              >
                <span className="text-sm font-black tracking-[3px] text-slate-900 font-mono">
                  {copiedCode ? "COPIED! ✓" : `${selectedDeal.brand.toUpperCase()}-DEAL`}
                </span>
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-[#F4C430]">CLICK TO COPY</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => handleAddToCart(selectedDeal)}
                  className="flex-1 bg-slate-900 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl active:scale-95 group"
                >
                  <ShoppingCart size={18} /> Add To Cart
                </button>
                <button 
                  onClick={() => handleBuyNow(selectedDeal)}
                  className="flex-1 bg-blue-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-slate-900 transition-all shadow-xl active:scale-95"
                >
                  <CreditCard size={18} /> Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-[#0F172A] text-white py-12 md:py-20 px-4 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto text-center relative z-10">
              <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Limited Time Offers</span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 tracking-tighter italic uppercase">
                FLASH <span className="text-[#F4C430]">DEALS</span>
              </h1>
              
              <div className="flex justify-center gap-2 md:gap-4 mt-8">
                {[{ label: 'Hours', val: timeLeft.hours }, { label: 'Min', val: timeLeft.mins }, { label: 'Sec', val: timeLeft.secs }].map((unit, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl min-w-[100px]">
                    <div className="text-2xl md:text-4xl font-black text-[#F4C430]">{unit.val < 10 ? `0${unit.val}` : unit.val}</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{unit.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto px-4 py-20">
            {loading ? (
              <div className="text-center font-black text-slate-300 animate-pulse uppercase tracking-widest">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {dealProducts.map((deal) => (
                  <div 
                    key={deal._id} 
                    onClick={() => { setSelectedDeal(deal); window.scrollTo(0,0); }}
                    className="group bg-white rounded-[32px] p-2 shadow-sm border border-slate-100 hover:shadow-2xl hover:border-blue-100 transition-all duration-500 cursor-pointer"
                  >
                    <div className="bg-slate-50 rounded-[28px] p-6 h-full flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-[#F4C430] text-[#0F172A] text-[9px] font-black px-4 py-1.5 rounded-full uppercase">Deal</span>
                        <div className="text-right">
                          <p className="text-gray-400 line-through text-[10px] font-bold italic">PKR {deal.originalPrice?.toLocaleString()}</p>
                          <p className="text-xl font-black text-slate-900 italic">PKR {deal.price?.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="h-48 flex items-center justify-center mb-6">
                        <img src={renderImage(deal.images[0])} className="max-h-full w-auto object-contain group-hover:scale-110 transition-transform duration-500" />
                      </div>

                      <h3 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-tight">{deal.name}</h3>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="bg-white px-3 py-1 rounded-lg text-[10px] font-bold text-slate-500 border border-slate-100">{deal.processor}</span>
                        <span className="bg-white px-3 py-1 rounded-lg text-[10px] font-bold text-slate-500 border border-slate-100">{deal.ram}</span>
                      </div>

                      <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest group-hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
                        View Details <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const DetailSpec = ({ icon, label, value }) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-2 text-slate-400 mb-1">
      {icon} <p className="text-[9px] font-black uppercase tracking-widest">{label}</p>
    </div>
    <p className="text-sm font-black text-slate-800 uppercase italic">{value}</p>
  </div>
);

export default Deals;