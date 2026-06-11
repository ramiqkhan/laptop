import React, { useState, useEffect, useRef } from 'react';
import { Star, ShoppingCart, Loader2, Cpu, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // Ensure this is imported

const GamingBanner = ({ setSelectedProduct }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});
  const sliderRef = useRef(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams(window.location.search);
      const searchQuery = params.get('search');

      let url = 'https://laptopbackend-seven.vercel.app/api/products?category=gaming';
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message || "Something went wrong while pulling inventory.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (!product) return;
    try {
      const savedCart = localStorage.getItem('globalCart');
      let currentCart = savedCart ? JSON.parse(savedCart) : [];
      
      const productId = product._id || product.id;
      const cartImg = renderImage(product.images ? product.images[0] : null);

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
          img: cartImg,
          quantity: 1,
          brand: product.brand || "Premium",
          processor: product.processor,
          ram: product.ram,
          storage: product.storage
        });
      }

      localStorage.setItem('globalCart', JSON.stringify(currentCart));
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { id: productId } }));
      alert(`${product.name} added to cart!`);
    } catch (e) {
      console.error("Cart error:", e);
    }
  };

  const renderImage = (imageSource) => {
    if (!imageSource || imageSource.length === 0) {
      return "https://via.placeholder.com/150?text=No+Image";
    }
    if (Array.isArray(imageSource)) {
      return imageSource[0].url || imageSource[0];
    }
    return imageSource.url || imageSource;
  };

  const handlePrevImage = (e, productId, totalImages) => {
    e.stopPropagation();
    setCurrentImageIndexes(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) === 0 ? totalImages - 1 : prev[productId] - 1
    }));
  };

  const handleNextImage = (e, productId, totalImages) => {
    e.stopPropagation();
    setCurrentImageIndexes(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) === totalImages - 1 ? 0 : (prev[productId] || 0) + 1
    }));
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 text-slate-400">
      <Loader2 className="animate-spin mb-4" size={40} />
      <p className="uppercase tracking-widest text-[10px] font-bold italic">Loading products Assets...</p>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center py-24 text-red-500 font-bold">
      <p>Error: {error}</p>
    </div>
  );

  return (
    <section className="w-full py-16 bg-[#F8F9FA] font-sans overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative">
        
        {/* Header Setup */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-l-8 border-[#0F172A] pl-6 gap-4">
          <div>
            <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">Premium Selection</span>
            <h2 className="text-4xl md:text-6xl font-black text-[#0F172A] uppercase tracking-tighter">
              Gaming <span className="text-gray-400 italic">Inventory</span>
            </h2>
          </div>
        </div>

        {/* --- MAIN SLIDER FRAME WRAPPER --- */}
        <div className="relative group/mainSlider w-full">
          
          {/* Left Floating Button - Hidden on mobile viewports to prevent component blocking */}
          {products.length > 0 && (
            <button 
              onClick={scrollLeft}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 p-3 rounded-xl bg-white border border-[#E6E6E6] text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-all shadow-lg md:opacity-0 group-hover/mainSlider:opacity-100 items-center justify-center"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Right Floating Button - Hidden on mobile viewports to prevent component blocking */}
          {products.length > 0 && (
            <button 
              onClick={scrollRight}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 p-3 rounded-xl bg-white border border-[#E6E6E6] text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-all shadow-lg md:opacity-0 group-hover/mainSlider:opacity-100 items-center justify-center"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* --- SLIDER CONTAINER WRAPPER WITH SNAP ALIGNMENT CORRECTIONS --- */}
          <div 
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 px-6 sm:px-1 scroll-smooth justify-start"
            style={{ 
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {products.map((product) => {
              const images = product.images || [];
              const currentIndex = currentImageIndexes[product._id] || 0;

              return (
                <div 
                  key={product._id} 
                  // FIXED: Added snap-center and responsive margins layout structure
                  className="w-[260px] sm:w-[310px] shrink-0 snap-center bg-white p-5 rounded-2xl border border-[#E6E6E6] hover:shadow-2xl transition-all duration-500 flex flex-col group relative overflow-hidden mx-auto sm:mx-0"
                  style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
                >
                  {/* Image Nested Carousel Framework */}
                  <div className="relative h-44 flex items-center justify-center mb-5 bg-[#F8F9FA] rounded-2xl overflow-hidden p-6 group/slider">
                    <img 
                      src={renderImage(images[currentIndex])} 
                      className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                      alt={product.name} 
                    />
                    
                    {images.length > 1 && (
                      <>
                        <button onClick={(e) => handlePrevImage(e, product._id, images.length)} className="absolute left-2 p-1.5 rounded-full bg-white/90 text-[#0F172A] shadow-md opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-white"><ChevronLeft size={14}/></button>
                        <button onClick={(e) => handleNextImage(e, product._id, images.length)} className="absolute right-2 p-1.5 rounded-full bg-white/90 text-[#0F172A] shadow-md opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-white"><ChevronRight size={14}/></button>
                      </>
                    )}
                  </div>

                  {/* Info Meta Fields Redirection Content */}
                  <div 
                    className="cursor-pointer" 
                    onClick={() => { setSelectedProduct(product); window.scrollTo(0,0); }}
                  >
                    <h3 className="text-base font-black text-[#0F172A] mb-1 line-clamp-1 group-hover:text-[#F4C430] transition-colors uppercase italic tracking-tighter">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex text-[#F4C430]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill={i < Math.floor(product.averageRating || 0) ? "#F4C430" : "none"} className={i < Math.floor(product.averageRating || 0) ? "text-[#F4C430]" : "text-gray-300"} />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-gray-400">{product.averageRating || "0.0"}</span>
                    </div>

                    <div className="flex gap-4 mb-4 text-[10px] text-gray-500 font-bold uppercase tracking-tight">
                      <div className="flex items-center gap-1.5">
                        <Cpu size={14} className="text-[#0F172A]" /> 
                        {product.ram || 'N/A'}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Zap size={14} className="text-[#0F172A]" /> 
                        <span className="line-clamp-1">{product.graphics?.split(' ')[0] || product.gpu || 'Int.'}</span>
                      </div>
                    </div>

                    <div className="mb-5">
                      <span className="text-xl font-black text-[#0F172A]">PKR {product.price?.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Operational Interactive Call to Actions Layout */}
                  <div className="mt-auto flex flex-col gap-2.5">
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full py-3 bg-[#0F172A] text-white text-[11px] font-black rounded-xl hover:opacity-90 transition-all uppercase tracking-[0.15em] flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} /> Add to Cart
                    </button>
                         <Link 
  to={`/product/${product._id || product.id}`}
  className="w-full py-3 bg-gradient-to-r from-[#F4C430] to-[#E2B020] text-[#0F172A] text-[11px] font-black rounded-xl border border-[#D4A017] text-center uppercase tracking-[0.15em] shadow-md hover:brightness-105 transition-all block"
>
  View Details
</Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default GamingBanner;