import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Heart, CheckCircle2, ShoppingCart, CreditCard, Star } from "lucide-react";
import {
  Cpu, Zap, Monitor, HardDrive, Box, ShieldCheck, ShieldAlert
} from "lucide-react";
import lap1 from "../assets/imgs/brand1.png";
import RelatedProducts from "../components/RelatedProducts";
import ProductReviews from "../components/ProductReviews";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0); // Image gallery selector state
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  
  // Fallback API if environment variable isn't fully ready
  const API = import.meta.env.VITE_API_URL || "https://laptopbackend-seven.vercel.app";

  // Helper function to render image inside galleries safely
  const renderImage = (prod, index = 0) => {
    if (!prod) return lap1;
    const img = prod.images?.[index];
    if (!img) return prod.image || lap1;
    return img.url || img;
  };

  const addToCart = (product, silent = false) => {
    if (!product) return;

    try {
      const savedCart = localStorage.getItem('globalCart');
      let currentCart = savedCart ? JSON.parse(savedCart) : [];

      const productId = product._id || product.id;
      const productImage = product.images?.[0] || product.img || "";

      const existingItem = currentCart.find(item => item.id === productId);

      if (existingItem) {
        currentCart = currentCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
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

      window.dispatchEvent(
        new CustomEvent('cartUpdated', { detail: product })
      );

      if (!silent) alert(`${product.name} added to cart!`);

    } catch (e) {
      console.error("Cart saving error:", e);
    }
  };

  const handleBuyNow = (product) => {
    addToCart(product, true);
    navigate('/cart');
  };

  // Fetch single product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API}/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setActiveImageIndex(0); // Reset picture index when product dynamically switches
      } catch (err) {
        console.log("Error fetching product details:", err);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
    setIsLiked(false);
  }, [id, API]);

  // Fetch related catalog products
  useEffect(() => {
    if (!product || !product.category) return;

    const fetchRelated = async () => {
      try {
        const res = await fetch(`${API}/api/products`);
        const data = await res.json();

        if (Array.isArray(data)) {
          const filtered = data
            .filter((p) => 
              p.category?.toLowerCase() === product.category.toLowerCase() && 
              p._id !== id
            )
            .slice(0, 4);
          
          setRelated(filtered);
        }
      } catch (err) {
        console.log("Error fetching related products:", err);
      }
    };

    fetchRelated();
  }, [id, product, API]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-slate-600 font-medium bg-[#F8F9FA]">
        Loading product...
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-10">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">

        {/* Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6 border-b pb-3">
          <nav className="text-[11px] sm:text-xs text-gray-400">
            <Link to="/" className="hover:text-slate-600 transition">Home</Link> / <span className="text-slate-600 font-medium">{product.name}</span>
          </nav>
        </div>

        {/* MAIN GRID BLOCK */}
        <div className="bg-white rounded-3xl border border-[#E6E6E6] p-6 md:p-10 shadow-xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left: Images Section */}
            <div className="flex flex-col gap-4">
              <div className="bg-[#F8F9FA] rounded-2xl p-8 flex items-center justify-center border border-gray-100 min-h-[400px]">
                <img 
                  src={renderImage(product, activeImageIndex)} 
                  alt={product.name} 
                  className="max-h-[400px] object-contain drop-shadow-2xl transition-all duration-300" 
                />
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="flex flex-wrap gap-3 justify-center">
                  {product.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-20 h-20 rounded-xl border-2 overflow-hidden bg-gray-50 transition-all ${activeImageIndex === idx ? 'border-[#F4C430] scale-105 shadow-md' : 'border-transparent hover:border-gray-200'}`}
                    >
                      <img 
                        src={renderImage(product, idx)} 
                        alt={`View ${idx}`} 
                        className="w-full h-full object-contain p-2"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Details Section */}
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="px-3 py-1 bg-[#0F172A] text-white text-[10px] font-black rounded-md uppercase tracking-widest italic">
                  Premium Quality
                </span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] mb-3 leading-tight uppercase italic tracking-tighter">
                {product.name}
              </h2>

              {/* Golden Rating Display */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-[#F4C430]">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      fill={i < Math.floor(product.averageRating || 5) ? "#F4C430" : "none"} 
                      className={i < Math.floor(product.averageRating || 5) ? "text-[#F4C430]" : "text-gray-200"}
                    />
                  ))}
                </div>
                <span className="text-sm font-black text-gray-400">
                  {product.averageRating || 5}.0
                </span>
              </div>

              {/* Price Banner */}
              <div className="mb-8 p-4 bg-[#F8F9FA] rounded-2xl border-l-4 border-l-[#F4C430]">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1 tracking-widest">Special Price</p>
                <span className="text-4xl md:text-5xl font-black text-[#0F172A]">
                  PKR {product.price?.toLocaleString()}
                </span>
              </div>
              
              {/* Specs Grid with Integrated Warranty Display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  { label: 'Processor', value: product.processor, icon: <Cpu size={16}/> },
                  { label: 'RAM', value: product.ram, icon: <Zap size={16}/> },
                  { label: 'Graphics', value: product.gpu || product.graphics || 'Intel Integrated', icon: <Monitor size={16}/> },
                  { label: 'Storage', value: product.storage, icon: <HardDrive size={16}/> },
                  { label: 'Display', value: product.display || 'Full HD', icon: <Box size={16}/> },
                  { label: 'OS', value: product.os || 'Windows 11', icon: <ShieldCheck size={16}/> },
                  { label: 'Warranty Policy', value: product.warranty, icon: <ShieldAlert size={16} className="text-blue-600 group-hover:animate-pulse"/>, isWarranty: true },
                ].map((spec, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-xl border shadow-sm transition-all group ${
                      spec.isWarranty && spec.value 
                        ? 'bg-blue-50/40 border-blue-100 hover:border-blue-400 col-span-1 sm:col-span-2' 
                        : 'bg-white border-gray-100 hover:border-[#F4C430]'
                    }`}
                  >
                    <div className="text-[#0F172A] mb-1 group-hover:scale-110 transition-transform">{spec.icon}</div>
                    <p className={`text-[9px] uppercase font-black tracking-tighter mb-0.5 ${spec.isWarranty ? 'text-blue-500' : 'text-gray-400'}`}>{spec.label}</p>
                    <p className={`text-[11px] font-bold line-clamp-1 ${spec.isWarranty ? 'text-blue-700' : 'text-slate-800'}`}>
                      {spec.value || (spec.isWarranty ? "Check Description / No Direct Warranty" : "Standard")}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button 
                  onClick={() => addToCart(product)} 
                  className="flex-1 py-5 bg-[#0F172A] text-white font-black rounded-2xl hover:bg-black transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-lg"
                >
                  <ShoppingCart size={18} /> Add To Cart
                </button>
                
                <button 
                  onClick={() => handleBuyNow(product)} 
                  className="flex-1 py-5 bg-gradient-to-r from-[#F4C430] to-[#d6a11e] text-[#0F172A] font-black rounded-2xl uppercase tracking-[0.2em] text-xs shadow-[0_10px_20px_rgba(244,196,48,0.3)] hover:brightness-110 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                >
                  <CreditCard size={18} /> Buy Now
                </button>
              </div>
            </div>

          </div>

          {/* Description Overview Render */}
          {product?.description && (
            <div className="mb-2 mt-10 bg-gradient-to-br from-[#FAFBFC] to-white rounded-2xl p-5 border border-slate-100 border-l-4 border-l-[#0F172A] shadow-inner">
              <div 
                className="flex items-center justify-between cursor-pointer group"
                onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F4C430]" />
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                    Product Overview
                  </p>
                </div>
                <span className="text-slate-500 font-black text-lg mb-2 mr-1 select-none transition-transform duration-300">
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

          {/* Collapsible Reviews Accordion Section */}
          <div className="mb-2 mt-6 bg-gradient-to-br from-[#FAFBFC] to-white rounded-2xl p-5 border border-slate-100 border-l-4 border-l-[#0F172A] shadow-inner">
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
                  productItemId={product._id || id} 
                  onModel={product.onModel || "Product"} 
                />
              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS SECTION */}
        <div className="mt-12 sm:mt-16">
          <RelatedProducts 
            currentProduct={product} 
            allProducts={related} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;