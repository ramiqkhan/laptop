import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Loader2, Monitor, Box, HardDrive, Cpu, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const FeaturedProducts = ({ setSelectedProduct }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Naya State: Har product ka current image index track karne ke liye
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});

  const API_URL = "http://localhost:5000/api/featured-products/all";

  // --- Image Rendering Logic ---
  const renderImage = (imageObj) => {
    if (!imageObj || !imageObj.data || !imageObj.data.data) return "https://via.placeholder.com/300x200?text=No+Image";
    try {
      const binary = imageObj.data.data;
      let binaryString = "";
      for (let i = 0; i < binary.length; i++) binaryString += String.fromCharCode(binary[i]);
      return `data:${imageObj.contentType || 'image/jpeg'};base64,${btoa(binaryString)}`;
    } catch (err) { return "https://via.placeholder.com/300x200?text=Error"; }
  };

  // --- Carousel Navigation ---
  const handlePrevImage = (e, productId, totalImages) => {
    e.stopPropagation(); // Card click event ko rokne ke liye
    setCurrentImageIndexes(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) === 0 ? totalImages - 1 : prev[productId] - 1
    }));
  };

  const handleNextImage = (e, productId, totalImages) => {
    e.stopPropagation(); // Card click event ko rokne ke liye
    setCurrentImageIndexes(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) === totalImages - 1 ? 0 : (prev[productId] || 0) + 1
    }));
  };

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) { setError(err.message); } finally { setLoading(false); }
    };
    fetchFeatured();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 text-slate-400">
      <Loader2 className="animate-spin mb-4" size={40} />
      <p className="uppercase tracking-widest text-[10px] font-bold italic">Loading Featured Assets...</p>
    </div>
  );

  return (
    <section className="w-full py-16 bg-white font-sans">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12 border-l-8 border-slate-900 pl-6">
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">Premium Selection</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter">
            Featured <span className="text-slate-400 italic">Inventory</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const images = product.images || [];
            const currentIndex = currentImageIndexes[product._id] || 0;

            return (
              <div 
                key={product._id} 
                className="group relative flex flex-col h-full bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
                onClick={() => {
                  if (setSelectedProduct) {
                    setSelectedProduct(product);
                    setTimeout(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, 100);
                  }
                }}
              >
                {/* Badges */}
                <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                  <span className="bg-slate-900 text-white text-[7px] font-black px-2 py-1 rounded-md uppercase tracking-widest">{product.os}</span>
                  <span className={`${product.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} text-[7px] font-black px-2 py-1 rounded-md uppercase w-fit`}>
                    {product.stock > 0 ? 'Available' : 'Sold Out'}
                  </span>
                </div>

                {/* Image Slider Container */}
                <div className="relative h-48 flex items-center justify-center mb-6 bg-slate-50 rounded-[2rem] p-4 overflow-hidden group/slider">
                  <img 
                    src={renderImage(images[currentIndex])} 
                    className="max-h-full w-auto object-contain transition-transform duration-700 drop-shadow-lg group-hover:scale-105" 
                    alt={product.name} 
                  />

                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => handlePrevImage(e, product._id, images.length)}
                        className="absolute left-2 p-1.5 rounded-full bg-white/80 text-slate-900 shadow-md opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-white"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button 
                        onClick={(e) => handleNextImage(e, product._id, images.length)}
                        className="absolute right-2 p-1.5 rounded-full bg-white/80 text-slate-900 shadow-md opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-white"
                      >
                        <ChevronRight size={16} />
                      </button>

                      {/* Dots Indicator */}
                      <div className="absolute bottom-3 flex gap-1.5">
                        {images.map((_, idx) => (
                          <div 
                            key={idx} 
                            className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-blue-600' : 'w-1 bg-slate-300'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-blue-600">
                      <Cpu size={12} />
                      <span className="text-[10px] font-black uppercase tracking-tighter">{product.processor?.split(' ')[0]} Series</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#F4C430]">
                      <Star size={10} fill="currentColor" />
         <span className="text-xs font-bold">
    {product.averageRating || "0.0"}
  </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors uppercase italic truncate">
                    {product.name}
                  </h3>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6 border-y border-slate-50 py-4">
                    <div className="flex items-center gap-2">
                      <Box size={14} className="text-slate-300" />
                      <span className="text-[9px] font-bold text-slate-500 uppercase truncate">{product.ram} Memory</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HardDrive size={14} className="text-slate-300" />
                      <span className="text-[9px] font-bold text-slate-500 uppercase truncate">{product.storage}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Monitor size={14} className="text-slate-300" />
                      <span className="text-[9px] font-bold text-slate-500 uppercase truncate">{product.display}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap size={14} className="text-slate-300" />
                      <span className="text-[9px] font-bold text-slate-500 uppercase truncate">{product.graphics?.split(' ')[0]} GPU</span>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div>
                      <p className="text-[8px] text-slate-400 font-black uppercase mb-1">Total Value</p>
                      <p className="text-2xl font-black text-slate-900 tracking-tighter">
                        <span className="text-[10px] mr-1 text-blue-600 font-bold">PKR</span>
                        {product.price?.toLocaleString()}
                      </p>
                    </div>
                    <button className="p-4 bg-slate-900 text-white rounded-2xl group-hover:bg-blue-600 transition-all shadow-xl active:scale-95">
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;