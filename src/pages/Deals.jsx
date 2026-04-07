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

const BASE_URL = import.meta.env.VITE_API_URL || "https://laptopbackend-seven.vercel.app";


// --- FETCH GAMING PRODUCTS ---
const fetchDeals = async () => {
  setLoading(true);
  try {
    const url = `${BASE_URL}/api/deals`; // or `deals` if backend has a deals endpoint
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    setDealProducts(data);
  } catch (err) {
    console.error("Error fetching deals:", err);
  } finally {
    setLoading(false);
  }
};
const renderImage = (productOrImages, index = 0) => {
  // Handle both product object or array of images
  let images = [];

  // If it’s a product object with .images
  if (productOrImages?.images) {
    images = productOrImages.images;
  } 
  // If it’s already an array of images
  else if (Array.isArray(productOrImages)) {
    images = productOrImages;
  }

  if (!images || images.length === 0) {
    return "https://via.placeholder.com/150?text=No+Image";
  }

  const image = images[index];

  // image might be string URL or object with .url
  return image?.url || image;
};

  const handleAddToCart = (product, silent = false) => {
    const savedCart = localStorage.getItem('globalCart');
    let currentCart = savedCart ? JSON.parse(savedCart) : [];
    const existingItem = currentCart.find(item => item.id === product._id);
    
    if (existingItem) {
      currentCart = currentCart.map(item =>
        item.id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      currentCart.push({
        id: product._id,
        productId: product._id,
        name: product.name,
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
    <div className="w-full font-['Poppins'] bg-[#F8F9FA] min-h-screen">
      {selectedDeal ? (
        <div className="max-w-7xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button 
            onClick={() => { setSelectedDeal(null); setActiveImgIndex(0); window.scrollTo(0,0); }} 
            className="flex items-center gap-2 font-black uppercase text-[10px] tracking-[0.2em] mb-12 text-[#0F172A] hover:text-[#F4C430] transition-all group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Deals
          </button>

          <div className="bg-white rounded-[3rem] border border-slate-100 p-8 md:p-12 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Image Section */}
              <div className="flex flex-col gap-8">
                <div className="bg-[#F8F9FA] rounded-[2.5rem] p-12 border border-slate-50 flex items-center justify-center relative overflow-hidden h-[500px]">
                  <div className="absolute top-8 left-8 z-10">
                    <span className="px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-[#0F172A] text-white italic">
                      Flash Deal Active
                    </span>
                  </div>
                  <img 
                    src={renderImage(selectedDeal, activeImgIndex)}
                    className="max-h-full w-auto object-contain drop-shadow-2xl transition-all duration-700" 
                    alt={selectedDeal.name} 
                  />
                </div>

                <div className="flex flex-wrap gap-4 justify-start px-2">
                  {selectedDeal.images && selectedDeal.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`w-24 h-20 rounded-2xl border-2 transition-all overflow-hidden bg-white p-2 
                        ${activeImgIndex === idx ? 'border-[#F4C430] ring-4 ring-yellow-50' : 'border-slate-100 hover:border-slate-300'}`}
                    >
                      <img src={renderImage(selectedDeal.images, idx)} className="w-full h-full object-contain" alt="" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Info Section */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#0F172A] font-black text-[10px] uppercase tracking-[0.4em] italic border-b-2 border-[#F4C430] pb-1">{selectedDeal.brand} Exclusive</span>
                  <div className="flex items-center gap-1.5 text-[#F4C430]">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-black text-slate-900">4.9</span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-[#0F172A] leading-[0.95] mb-6 uppercase italic tracking-tighter">
                  {selectedDeal.name}
                </h1>
                
                <div className="mb-10 p-6 bg-[#F8F9FA] rounded-2xl border-l-4 border-[#F4C430]">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1 tracking-widest">Special Deal Price</p>
                  <div className="flex items-baseline gap-4">
                    <p className="text-5xl font-black text-[#0F172A]">
                      <span className="text-lg mr-1">PKR</span>
                      {selectedDeal.price?.toLocaleString()}
                    </p>
                    <span className="text-xl text-slate-400 line-through font-bold italic">PKR {selectedDeal.originalPrice?.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                  <DetailSpec icon={<Cpu size={16} />} label="Processor" value={selectedDeal.processor} />
                  <DetailSpec icon={<Box size={16} />} label="Memory" value={selectedDeal.ram} />
                  <DetailSpec icon={<HardDrive size={16} />} label="Storage" value={selectedDeal.storage} />
                  <DetailSpec icon={<Zap size={16} />} label="Graphics" value={selectedDeal.graphics || "Dedicated"} />
                  <DetailSpec icon={<Monitor size={16} />} label="Display" value={selectedDeal.display || "15.6\" FHD"} />
                  <DetailSpec icon={<ShieldCheck size={16} />} label="Warranty" value="1 Year" />
                </div>

                <div 
                  onClick={() => copyToClipboard(`${selectedDeal.brand.toUpperCase()}-DEAL`)}
                  className="mb-8 w-full h-16 bg-[#F8F9FA] border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-between px-6 cursor-pointer hover:border-[#F4C430] group transition-all"
                >
                  <span className="text-sm font-black tracking-[3px] text-[#0F172A] font-mono">
                    {copiedCode ? "COPIED! ✓" : `${selectedDeal.brand.toUpperCase()}-DEAL`}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-[#F4C430]">CLICK TO COPY</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => handleAddToCart(selectedDeal)}
                    className="flex-1 bg-[#0F172A] text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl active:scale-95 group"
                  >
                    <ShoppingCart size={20} /> Add To Cart
                  </button>
                  <button 
                    onClick={() => handleBuyNow(selectedDeal)}
                    className="flex-1 bg-gradient-to-r from-[#F4C430] to-[#d6a11e] text-[#0F172A] py-6 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(244,196,48,0.3)] hover:brightness-110 transition-all active:scale-95"
                  >
                    <CreditCard size={20} /> Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Deals Banner Section */}
          <div className="bg-[#0F172A] text-white py-20 md:py-28 px-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 translate-x-20"></div>
            <div className="max-w-[1400px] mx-auto text-center relative z-10">
              <span className="text-[#F4C430] font-black text-[12px] uppercase tracking-[0.5em] mb-4 block">Exclusive Flash Sales</span>
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-black mb-8 tracking-tighter italic uppercase leading-none">
                FLASH <span className="text-[#F4C430]">DEALS</span>
              </h1>
              
              <div className="flex justify-center gap-3 md:gap-6 mt-12">
                {[{ label: 'Hours', val: timeLeft.hours }, { label: 'Min', val: timeLeft.mins }, { label: 'Sec', val: timeLeft.secs }].map((unit, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] min-w-[120px] shadow-2xl">
                    <div className="text-4xl md:text-5xl font-black text-[#F4C430] italic">{unit.val < 10 ? `0${unit.val}` : unit.val}</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mt-2">{unit.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto px-6 py-20">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-[#F4C430] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {dealProducts.map((deal) => (
                  <div 
                    key={deal._id} 
                    onClick={() => { setSelectedDeal(deal); window.scrollTo(0,0); }}
                    className="group bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 hover:shadow-2xl hover:border-[#F4C430] transition-all duration-500 cursor-pointer flex flex-col relative overflow-hidden"
                  >
                    {/* Badge */}
                    <div className="absolute top-6 left-6 z-10">
                      <span className="bg-[#0F172A] text-[#F4C430] text-[9px] font-black px-4 py-1.5 rounded-lg uppercase italic tracking-widest">Flash Deal</span>
                    </div>

                    {/* Image Box */}
                    <div className="bg-[#F8F9FA] rounded-[2rem] p-8 h-64 flex items-center justify-center mb-8 relative overflow-hidden">
                       <img src={renderImage(deal.images)} className="max-h-full w-auto object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-xl" alt={deal.name} />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-grow px-2">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-black text-[#0F172A] uppercase italic tracking-tighter leading-tight group-hover:text-blue-600 transition-colors">{deal.name}</h3>
                      </div>
                      
                      <div className="flex gap-3 mb-6">
                         <span className="bg-[#F8F9FA] px-3 py-1.5 rounded-lg text-[10px] font-black text-slate-500 uppercase">{deal.processor?.split(' ')[0]}</span>
                         <span className="bg-[#F8F9FA] px-3 py-1.5 rounded-lg text-[10px] font-black text-slate-500 uppercase">{deal.ram}</span>
                      </div>

                      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 line-through text-[10px] font-black italic mb-0.5">PKR {deal.originalPrice?.toLocaleString()}</p>
                          <p className="text-2xl font-black text-[#0F172A] italic">PKR {deal.price?.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center group-hover:bg-[#F4C430] group-hover:text-[#0F172A] transition-all shadow-lg">
                          <ArrowRight size={20} />
                        </div>
                      </div>
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
  <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-[#F4C430] transition-all group">
    <div className="text-[#0F172A] mb-2 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
    <p className="text-[11px] font-black text-slate-800 uppercase italic line-clamp-1">{value}</p>
  </div>
);

export default Deals;