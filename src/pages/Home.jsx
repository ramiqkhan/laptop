import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, ArrowLeft, Box, Cpu, HardDrive, Layout, 
  ShoppingCart, CreditCard, ShieldCheck, Truck, Monitor, Zap, Star 
} from 'lucide-react';

import heroLaptop from '../assets/imgs/hero-1bg.png';
import FeaturedProducts from '../components/Featurecomp';

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveImgIndex(0);
  }, [selectedProduct]);

  // --- FIXED IMAGE RENDERER ---
  const renderImage = (product, index = 0) => {
    if (!product) return "https://via.placeholder.com/600x400?text=No+Image";
    
    const targetImage = (product.images && product.images.length > 0) 
      ? product.images[index] 
      : product.image;

    if (!targetImage) return "https://via.placeholder.com/600x400?text=No+Image";
    if (typeof targetImage === 'string') return targetImage;

    try {
      const rawData = targetImage.data?.data || targetImage.data;
      if (!rawData) return "https://via.placeholder.com/600x400?text=No+Data";
      const binary = new Uint8Array(rawData);
      let binaryString = "";
      for (let i = 0; i < binary.length; i++) {
        binaryString += String.fromCharCode(binary[i]);
      }
      return `data:${targetImage.contentType || 'image/jpeg'};base64,${btoa(binaryString)}`;
    } catch (err) { 
      return "https://via.placeholder.com/600x400?text=Error"; 
    }
  };

  const handleAddToCart = (product, silent = false) => {
    if (!product) return;
    try {
      const savedCart = localStorage.getItem('globalCart');
      let currentCart = savedCart ? JSON.parse(savedCart) : [];
      const productId = product._id || product.id;
      const productImage = renderImage(product, 0);

      const existingItem = currentCart.find(item => item.id === productId);

      if (existingItem) {
        currentCart = currentCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        currentCart.push({
          id: productId,
          name: product.name,
          price: Number(product.price) || 0, 
          img: productImage,
          quantity: 1,
          brand: product.brand || "Premium",
          processor: product.processor,
          ram: product.ram,
          storage: product.storage
        });
      }
      localStorage.setItem('globalCart', JSON.stringify(currentCart));
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { id: productId } }));
      if (!silent) alert(`${product.name} added to cart!`);
    } catch (e) { console.error(e); }
  };

  const handleBuyNow = (product) => {
    handleAddToCart(product, true);
    navigate('/cart');
  };

  return (
    <div className="w-full font-['Poppins'] bg-white min-h-screen">
      
      {selectedProduct ? (
        <div className="max-w-7xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Back Button - Same as LaptopPage */}
          <button 
            onClick={() => { setSelectedProduct(null); window.scrollTo(0,0); }} 
            className="flex items-center gap-2 font-bold text-sm mb-6 text-[#0F172A] hover:text-[#F4C430] transition-all uppercase tracking-tighter"
          >
            <ArrowLeft size={18} /> Back to Store
          </button>

          <div className="bg-white rounded-3xl border border-[#E6E6E6] p-6 md:p-10 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* LEFT: IMAGE GALLERY (Synced with LaptopPage) */}
              <div className="flex flex-col gap-4">
                <div className="bg-[#F8F9FA] rounded-2xl p-8 flex items-center justify-center border border-gray-100 min-h-[400px]">
                  <img 
                    src={renderImage(selectedProduct, activeImgIndex)} 
                    className="max-h-[400px] object-contain drop-shadow-2xl transition-all duration-300" 
                    alt={selectedProduct.name} 
                  />
                </div>

                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <div className="flex flex-wrap gap-3 justify-center">
                    {selectedProduct.images.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setActiveImgIndex(idx)}
                        className={`w-20 h-20 rounded-xl border-2 overflow-hidden bg-gray-50 transition-all ${activeImgIndex === idx ? 'border-[#F4C430] scale-105 shadow-md' : 'border-transparent hover:border-gray-200'}`}
                      >
                        <img src={renderImage(selectedProduct, idx)} className="w-full h-full object-contain p-2" alt="thumb" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT: CONTENT SECTION (Synced with LaptopPage Colors/Fonts) */}
              <div className="flex flex-col">
                <div className="mb-2">
                  <span className="px-3 py-1 bg-[#0F172A] text-white text-[10px] font-black rounded-md uppercase tracking-widest italic">
                    Premium Quality
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] mb-3 leading-tight uppercase italic tracking-tighter">
                  {selectedProduct.name}
                </h2>

                {/* Golden Rating Display */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex text-[#F4C430]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill={i < 4 ? "#F4C430" : "none"} className={i < 4 ? "text-[#F4C430]" : "text-gray-200"} />
                    ))}
                  </div>
                  <span className="text-sm font-black text-gray-400">4.0</span>
                </div>

                {/* Special Price Card */}
                <div className="mb-8 p-4 bg-[#F8F9FA] rounded-2xl border-l-4 border-[#F4C430]">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1 tracking-widest">Special Price</p>
                  <span className="text-4xl md:text-5xl font-black text-[#0F172A]">
                    PKR {selectedProduct.price?.toLocaleString()}
                  </span>
                </div>

                {/* Specs Grid with Navy Icons */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                  <SpecBox icon={<Cpu size={16}/>} label="Processor" value={selectedProduct.processor} />
                  <SpecBox icon={<Zap size={16}/>} label="RAM" value={selectedProduct.ram} />
                  <SpecBox icon={<Monitor size={16}/>} label="Graphics" value={selectedProduct.gpu || selectedProduct.graphics} />
                  <SpecBox icon={<HardDrive size={16}/>} label="Storage" value={selectedProduct.storage} />
                  <SpecBox icon={<Box size={16}/>} label="Display" value={selectedProduct.display || "Full HD"} />
                  <SpecBox icon={<ShieldCheck size={16}/>} label="OS" value={selectedProduct.os || "Win 11"} />
                </div>

                {/* Action Buttons (Exactly as LaptopPage) */}
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <button 
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="flex-1 py-5 bg-[#0F172A] text-white font-black rounded-2xl hover:bg-black transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-lg"
                  >
                    <ShoppingCart size={18} /> Add To Cart
                  </button>
                  <button 
                    onClick={() => handleBuyNow(selectedProduct)}
                    className="flex-1 py-5 bg-gradient-to-r from-[#F4C430] to-[#d6a11e] text-[#0F172A] font-black rounded-2xl uppercase tracking-[0.2em] text-xs shadow-[0_10px_20px_rgba(244,196,48,0.3)] hover:brightness-110 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                  >
                    <CreditCard size={18} /> Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative w-full max-w-[1600px] mx-auto px-4 lg:px-12 py-4 mt-6">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#A9D1F7] to-white border border-white/60 shadow-sm min-h-[450px] flex items-center">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-16">
                  <div className="py-10">
                    <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">New Season Drop</span>
                    <h1 className="text-[50px] lg:text-[70px] font-black leading-[0.9] uppercase italic tracking-tighter mb-8 text-[#0F172A]">
                      Next-Gen <br /> <span className="text-white drop-shadow-sm">Gaming</span> Laptops
                    </h1>
                    <Link to="/laptops" className="inline-block px-12 py-5 bg-[#0F172A] text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-2xl hover:bg-blue-600 transition-all">Shop Collection</Link>
                  </div>
                  <div className="flex justify-end">
                    <img src={heroLaptop} className="w-[600px] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]" alt="Hero" />
                  </div>
                </div>
            </div>

            <div className="mt-20">
              <FeaturedProducts setSelectedProduct={setSelectedProduct} />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

// Sub-component for Spec Box (Synced with LaptopPage Style)
const SpecBox = ({ icon, label, value }) => (
  <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-[#F4C430] transition-colors group">
    <div className="text-[#0F172A] mb-1 group-hover:scale-110 transition-transform">{icon}</div>
    <p className="text-[9px] uppercase font-black text-gray-400 tracking-tighter mb-0.5">{label}</p>
    <p className="text-[11px] font-bold text-slate-800 line-clamp-1">{value || "N/A"}</p>
  </div>
);

export default Home;