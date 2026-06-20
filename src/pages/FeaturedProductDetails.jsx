import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, ShoppingCart, Loader2, Cpu, Zap, ArrowLeft, 
  ShieldCheck, ShieldAlert, Truck, CreditCard, Monitor, HardDrive, Box 
} from 'lucide-react';
import ProductReviews from '../components/ProductReviews'; 
import RelatedProducts from '../components/RelatedProducts'; // ✅ ADDED: Imported Related Products Component

const FeaturedProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]); // ✅ ADDED: State to manage global inventory for matching
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  // Sanitized Base URL string mapping
  const baseUrl = (import.meta.env.VITE_API_URL || "https://laptopbackend-seven.vercel.app").replace(/\/$/, "");

  // ✅ ADDED: Fetch entire layout cluster inventory for cross-referencing related assets
  useEffect(() => {
    const fetchGlobalInventory = async () => {
      try {
        const endpoints = [
          `${baseUrl}/api/products`,
          `${baseUrl}/api/featured-products/all`,
          `${baseUrl}/api/deals`
        ];
        
        const responses = await Promise.all(
          endpoints.map(url => fetch(url).then(res => res.ok ? res.json() : []).catch(() => []))
        );

        // Normalize backend structures safely into a flat single array
        let combined = [];
        responses.forEach(dataset => {
          if (Array.isArray(dataset)) {
            combined = [...combined, ...dataset];
          } else if (dataset && typeof dataset === 'object') {
            const nested = dataset.products || dataset.data || [];
            if (Array.isArray(nested)) combined = [...combined, ...nested];
          }
        });

        setAllProducts(combined);
      } catch (err) {
        console.error("Global inventory tracking layer exception:", err);
      }
    };

    fetchGlobalInventory();
  }, [baseUrl]);

  useEffect(() => {
    const fetchFeaturedProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(false);
      try {
        const cleanId = id.trim();
        const res = await fetch(`${baseUrl}/api/featured-products/${cleanId}`);
        
        if (!res.ok) {
          console.warn("Direct asset lookup failed, triggering cluster array validation fallback...");
          const backupRes = await fetch(`${baseUrl}/api/featured-products/all`);
          
          if (backupRes.ok) {
            const allAssets = await backupRes.json();
            const matchedAsset = allAssets.find(item => (item._id === cleanId || item.id === cleanId));
            
            if (matchedAsset) {
              setProduct(matchedAsset);
              setActiveImageIndex(0);
              return;
            }
          }
          throw new Error("Asset structural signature mismatch across database clusters.");
        }
        
        const data = await res.json();
        setProduct(data);
        setActiveImageIndex(0);
      } catch (err) {
        console.error("Featured Matrix Fetch Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProduct();
    window.scrollTo(0, 0);
  }, [id, baseUrl]);

  const handleAddToCart = (silent = false) => {
    if (!product) return;
    try {
      const savedCart = localStorage.getItem('globalCart');
      let currentCart = savedCart ? JSON.parse(savedCart) : [];
      const productId = product._id || product.id;
      
      const cartImg = product.images?.[0]?.url || product.images?.[0] || "https://via.placeholder.com/150";
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
          brand: product.brand || "Premium Featured",
          processor: product.processor,
          ram: product.ram,
          storage: product.storage
        });
      }

      localStorage.setItem('globalCart', JSON.stringify(currentCart));
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { id: productId } }));
      if (!silent) alert(`${product.name} added to cart!`);
    } catch (e) {
      console.error("Cart error:", e);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart(true);
    navigate('/cart');
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-slate-400">
      <Loader2 className="animate-spin mb-4 text-[#0F172A]" size={40} />
      <p className="uppercase tracking-widest text-[11px] font-black italic">Decrypting Premium Configuration...</p>
    </div>
  );

  if (error || !product) return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#F8F9FA] px-4 text-center">
      <div className="w-4 h-4 bg-red-500 rounded-full mb-4 animate-ping"></div>
      <h2 className="text-xl font-black text-red-500 uppercase tracking-tight mb-2">Product Verification Failed</h2>
      <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-6">This featured asset is unavailable or incorrect node referenced.</p>
      <button onClick={() => navigate('/')} className="px-6 py-3 bg-[#0F172A] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg">
        Back to Home Inventory
      </button>
    </div>
  );

  const images = product.images || [];

  return (
    <div className="bg-[#F8F9FA] min-h-screen py-12 font-sans text-[#0F172A]">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px] animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Back Navigation Bar */}
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 font-bold text-sm mb-6 text-[#0F172A] hover:text-[#F4C430] transition-all uppercase tracking-tighter">
          <ArrowLeft size={18} /> Return to Fleet
        </button>

        {/* Product Matrix Grid */}
        <div className="bg-white rounded-3xl border border-[#E6E6E6] p-6 md:p-10 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LEFT: Image System Section */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="bg-[#F8F9FA] rounded-2xl p-8 flex items-center justify-center border border-gray-100 min-h-[400px] relative overflow-hidden">
                <img 
                  src={images[activeImageIndex]?.url || images[activeImageIndex] || "https://via.placeholder.com/400"} 
                  alt={product.name}
                  className="max-h-[400px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>

              {images.length > 1 && (
                <div className="flex flex-wrap gap-3 justify-center py-1">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`w-20 h-20 rounded-xl border-2 overflow-hidden bg-gray-50 transition-all ${index === activeImageIndex ? 'border-[#F4C430] scale-105 shadow-md' : 'border-transparent hover:border-gray-200'}`}
                    >
                      <img src={img.url || img} className="w-full h-full object-contain p-2" alt="thumb" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Specification & Controls Column */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="mb-2">
                  <span className="px-3 py-1 bg-[#0F172A] text-white text-[10px] font-black rounded-md uppercase tracking-widest italic">
                    Premium Tier Asset
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-black text-[#0F172A] mb-3 leading-tight uppercase italic tracking-tighter">
                  {product.name}
                </h1>
                
                {/* Star Interface Layer */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex text-[#F4C430]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill={i < Math.floor(product.averageRating || 4) ? "#F4C430" : "none"} className={i < Math.floor(product.averageRating || 4) ? "text-[#F4C430]" : "text-gray-300"} />
                    ))}
                  </div>
                  <span className="text-sm font-black text-gray-400">({product.averageRating || "4.0"} Verified Evaluation)</span>
                </div>

                {/* Price System Frame */}
                <div className="mb-6 p-4 bg-[#F8F9FA] rounded-2xl border-l-4 border-[#F4C430]">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1 tracking-widest">Guaranteed Valuation</p>
                  <span className="text-4xl md:text-5xl font-black text-[#0F172A]">
                    PKR {product.price?.toLocaleString()}
                  </span>
                </div>

                {/* Hardware Specifications Grid Layout */}
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Hardware Build Core</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  <div className="p-3.5 bg-white border border-gray-200 rounded-xl flex items-start gap-3 shadow-sm">
                    <div className="text-slate-500 mt-0.5"><Cpu size={16} /></div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-tight">Processor</p>
                      <p className="text-xs font-black uppercase tracking-tight text-[#0F172A] mt-0.5">{product.processor || "N/A"}</p>
                    </div>
                  </div>
                  
                  <div className="p-3.5 bg-white border border-gray-200 rounded-xl flex items-start gap-3 shadow-sm">
                    <div className="text-slate-500 mt-0.5"><Zap size={16} /></div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-tight">RAM</p>
                      <p className="text-xs font-black uppercase tracking-tight text-[#0F172A] mt-0.5">{product.ram || "N/A"}</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-white border border-gray-200 rounded-xl flex items-start gap-3 shadow-sm">
                    <div className="text-slate-500 mt-0.5"><Monitor size={16} /></div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-tight">Graphics</p>
                      <p className="text-xs font-black uppercase tracking-tight text-[#0F172A] mt-0.5">{product.gpu || product.graphics || "Integrated Graphics"}</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-white border border-gray-200 rounded-xl flex items-start gap-3 shadow-sm">
                    <div className="text-slate-500 mt-0.5"><HardDrive size={16} /></div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-tight">Storage</p>
                      <p className="text-xs font-black uppercase tracking-tight text-[#0F172A] mt-0.5">{product.storage || "N/A"}</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-white border border-gray-200 rounded-xl flex items-start gap-3 shadow-sm">
                    <div className="text-slate-500 mt-0.5"><Box size={16} /></div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-tight">Display</p>
                      <p className="text-xs font-black uppercase tracking-tight text-[#0F172A] mt-0.5">{product.display || "Full HD"}</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-white border border-gray-200 rounded-xl flex items-start gap-3 shadow-sm">
                    <div className="text-slate-500 mt-0.5"><ShieldCheck size={16} /></div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-tight">OS</p>
                      <p className="text-xs font-black uppercase tracking-tight text-[#0F172A] mt-0.5">{product.os || "Win 11"}</p>
                    </div>
                  </div>

                  {/* WARRANTY POLICY CARD - Formatted Full-width Option */}
                  <div className="p-3.5 bg-blue-50/40 border border-blue-100 rounded-xl flex items-start gap-3 shadow-sm col-span-1 sm:col-span-2 group hover:border-blue-300 transition-all">
                    <div className="text-blue-600 mt-0.5"><ShieldAlert size={16} className="group-hover:animate-pulse" /></div>
                    <div>
                      <p className="text-[9px] font-black text-blue-500 uppercase tracking-tight">Warranty Policy</p>
                      <p className="text-xs font-black uppercase tracking-tight text-blue-700 mt-0.5">
                        {product.warranty || "NO Warranty"}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Buttons Hub */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6 border-t border-gray-100">
                <button 
                  onClick={() => handleAddToCart(false)}
                  className="flex-1 py-5 bg-[#0F172A] text-white font-black rounded-2xl hover:bg-black transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-lg"
                >
                  <ShoppingCart size={18} /> Add To Cart
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 py-5 bg-gradient-to-r from-[#F4C430] to-[#d6a11e] text-[#0F172A] font-black rounded-2xl uppercase tracking-[0.2em] text-xs shadow-[0_10px_20px_rgba(244,196,48,0.3)] hover:brightness-110 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                >
                  <CreditCard size={18} /> Buy Now
                </button>
              </div>

            </div>
          </div>

          {/* Collapsible Overview (Description Block) */}
          {product.description && (
            <div className="mb-6 mt-10 bg-gradient-to-br from-[#FAFBFC] to-white rounded-2xl p-5 border border-slate-100 border-l-4 border-l-[#0F172A] shadow-inner">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F4C430]" />
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                    Product Overview
                  </p>
                </div>
                <span className="text-slate-500 font-black text-lg mb-2 mr-1 select-none">
                  {isDescriptionOpen ? '−' : '+'}
                </span>
              </div>

              {isDescriptionOpen && (
                <p className="text-[13px] text-slate-600 font-medium leading-relaxed break-words whitespace-pre-line tracking-tight pl-3 animate-in fade-in duration-300">
                  {product.description}
                </p>
              )}
            </div>
          )}

          {/* Collapsible Customer Reviews Wrapper */}
          <div className="mb-6 mt-6 bg-gradient-to-br from-[#FAFBFC] to-white rounded-2xl p-5 border border-slate-100 border-l-4 border-l-[#0F172A] shadow-inner">
            <div 
              className="flex items-center justify-between cursor-pointer group"
              onClick={() => setIsReviewsOpen(!isReviewsOpen)}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4C430]" />
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Customer Reviews
                </p>
              </div>
              <span className="text-slate-500 font-black text-lg mb-2 mr-1 select-none transition-transform duration-300">
                {isReviewsOpen ? '−' : '+'}
              </span>
            </div>

            {isReviewsOpen && (
              <div className="pl-3 animate-in fade-in duration-300">
                <ProductReviews 
                  productItemId={product._id || product.id} 
                  onModel={product.onModel || "FeaturedProduct"} 
                />
              </div>
            )}
          </div>

          {/* Related Products Section integration */}
          <div className="mt-8 pt-4 border-t border-gray-100">
            <RelatedProducts 
              currentProduct={product} 
              allProducts={allProducts} 
            />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductDetails;