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

  // --- FIXED & STABILIZED IMAGE RENDERER ---
  const renderImage = (image) => {
    if (!image) return "https://via.placeholder.com/600x400?text=No+Image";
    
    // Check if it's already a URL
    if (typeof image === 'string') return image;

    try {
      // Handle both structures: image.data.data OR image.data
      const rawData = image.data?.data || image.data;
      
      if (!rawData) return "https://via.placeholder.com/600x400?text=No+Data";

      const binary = new Uint8Array(rawData);
      let binaryString = "";
      for (let i = 0; i < binary.length; i++) {
        binaryString += String.fromCharCode(binary[i]);
      }
      return `data:${image.contentType || 'image/jpeg'};base64,${btoa(binaryString)}`;
    } catch (err) { 
      console.error("Image rendering failed:", err);
      return "https://via.placeholder.com/600x400?text=Error"; 
    }
  };

  // --- ADD TO CART LOGIC ---
 const handleAddToCart = (product, silent = false) => {
    if (!product) return;
    try {
      const savedCart = localStorage.getItem('globalCart');
      let currentCart = savedCart ? JSON.parse(savedCart) : [];
      
      const productId = product._id || product.id;
      
      // Image nikalne ka safe tareeka
      const productImage = product.images && product.images.length > 0 
        ? renderImage(product.images[0]) 
        : renderImage(product.image);

      const existingItem = currentCart.find(item => item.id === productId);

      if (existingItem) {
        currentCart = currentCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        currentCart.push({
          id: productId,
          name: product.name,
          // Price ko numeric banayein taake NaN na aaye
          price: Number(product.price) || 0, 
          img: productImage, // Base64 string yahan save hogi
          quantity: 1,
          brand: product.brand || "Premium",
          processor: product.processor,
          ram: product.ram,
          storage: product.storage
        });
      }

      localStorage.setItem('globalCart', JSON.stringify(currentCart));
      
      // Dispatch event for Navbar sync
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { id: productId } }));
      
      if (!silent) alert("Added to cart!");
    } catch (e) {
      console.error("Cart saving error:", e);
    }
  };

  const handleBuyNow = (product) => {
    handleAddToCart(product, true);
    navigate('/cart');
  };

  return (
    <div className="w-full font-['Poppins'] bg-white min-h-screen">
      
      {selectedProduct ? (
        <div className="max-w-7xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button 
            onClick={() => { setSelectedProduct(null); window.scrollTo(0,0); }} 
            className="flex items-center gap-2 font-black uppercase text-[10px] tracking-[0.2em] mb-12 text-slate-400 hover:text-blue-600 transition-all group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Store
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            <div className="flex flex-col gap-8">
              <div className="bg-slate-50 rounded-[3rem] p-12 border border-slate-100 flex items-center justify-center shadow-inner relative overflow-hidden h-[500px]">
                <div className="absolute top-8 left-8 z-10">
                  <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${selectedProduct.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {selectedProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                
                <img 
                  src={renderImage(selectedProduct.images ? selectedProduct.images[activeImgIndex] : selectedProduct.image)} 
                  className="max-h-full w-auto object-contain drop-shadow-2xl transition-all duration-700" 
                  alt={selectedProduct.name} 
                />
              </div>

              <div className="flex flex-wrap gap-4 justify-start px-2">
                {selectedProduct.images && selectedProduct.images.length > 0 ? (
                  selectedProduct.images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <button 
                        onClick={() => setActiveImgIndex(idx)}
                        className={`w-28 h-24 rounded-2xl border-2 transition-all overflow-hidden bg-white p-2 shadow-sm 
                          ${activeImgIndex === idx ? 'border-blue-600 ring-4 ring-blue-50' : 'border-slate-100 hover:border-slate-300'}`}
                      >
                        <img 
                          src={renderImage(img)} 
                          className="w-full h-full object-contain" 
                          alt={`View ${idx + 1}`} 
                        />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="w-28 h-24 rounded-2xl border-2 border-blue-600 p-2">
                    <img src={renderImage(selectedProduct.image)} className="w-full h-full object-contain" alt="" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em]">Premium Selection</span>
                <div className="flex items-center gap-1 text-[#F4C430]">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-black text-slate-900">{selectedProduct.ratings || "4.9"}</span>
                </div>
              </div>

              <h1 className="text-5xl font-black text-slate-900 leading-[0.9] mb-6 uppercase italic tracking-tighter">
                {selectedProduct.name}
              </h1>
              
              <p className="text-4xl font-black text-slate-900 mb-10 flex items-start gap-1">
                <span className="text-sm mt-2 text-blue-600 font-bold">PKR</span>
                {selectedProduct.price?.toLocaleString() || "0"}
              </p>

              <div className="grid grid-cols-2 gap-y-8 gap-x-12 mb-12 bg-slate-50/50 p-10 rounded-[2.5rem] border border-slate-50">
                <SpecItem icon={<Cpu size={14} />} label="Processor" value={selectedProduct.processor} />
                <SpecItem icon={<Box size={14} />} label="Memory" value={selectedProduct.ram} />
                <SpecItem icon={<HardDrive size={14} />} label="Storage" value={selectedProduct.storage} />
                <SpecItem icon={<Zap size={14} />} label="Graphics" value={selectedProduct.graphics} />
                <SpecItem icon={<Monitor size={14} />} label="Display" value={selectedProduct.display || "N/A"} />
                <SpecItem icon={<ShieldCheck size={14} />} label="OS" value={selectedProduct.os || "Win 11 Pro"} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button 
                  onClick={() => handleAddToCart(selectedProduct)}
                  className="flex-1 bg-slate-900 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl active:scale-95 group"
                >
                  <ShoppingCart size={18} className="group-hover:rotate-12 transition-transform" /> Add To Cart
                </button>
                <button 
                  onClick={() => handleBuyNow(selectedProduct)}
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
          <section className="relative w-full max-w-[1600px] mx-auto px-4 lg:px-12 py-4 mt-6">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#A9D1F7] to-white border border-white/60 shadow-sm min-h-[450px] flex items-center">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-16">
                  <div className="py-10">
                    <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">New Season Drop</span>
                    <h1 className="text-[50px] lg:text-[70px] font-black leading-[0.9] uppercase italic tracking-tighter mb-8">
                      Next-Gen <br /> <span className="text-white drop-shadow-sm">Gaming</span> Laptops
                    </h1>
                    <Link to="/laptops" className="inline-block px-12 py-5 bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-2xl hover:bg-blue-600 transition-all">Shop Collection</Link>
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

const SpecItem = ({ icon, label, value }) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-2 text-slate-400 mb-1">
      {icon} <p className="text-[9px] font-black uppercase tracking-widest">{label}</p>
    </div>
    <p className="text-sm font-black text-slate-800 uppercase italic">{value || "N/A"}</p>
  </div>
);

export default Home;