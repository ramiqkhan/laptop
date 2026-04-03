import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Cpu, Box, HardDrive, Zap, Monitor, ShieldCheck, ShoppingCart, CreditCard, Star } from 'lucide-react';

const LaptopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('default');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const location = useLocation();
  const navigate = useNavigate(); 
  const itemsPerPage = 6;

  // --- FIXED & SYNCED ADD TO CART ---
  const addToCart = (product, silent = false) => {
    if (!product) return;
    try {
      const savedCart = localStorage.getItem('globalCart');
      let currentCart = savedCart ? JSON.parse(savedCart) : [];
      
      const productId = product._id || product.id;
      const productImage = renderImage(product);

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
    } catch (e) {
      console.error("Cart saving error:", e);
    }
  };

  const handleBuyNow = (product) => {
    addToCart(product, true); 
    navigate('/cart'); 
  };

  const [selectedFilters, setSelectedFilters] = useState({
    Brand: [],
    RAM: [],
    GPU: []
  });

  const [openSections, setOpenSections] = useState({
    Brand: true,
    RAM: true,
    GPU: true
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(location.search);
        const searchQuery = params.get('search');
        
        let url = 'http://localhost:5000/api/products?category=normal';
        if (searchQuery) {
          url += `&search=${encodeURIComponent(searchQuery)}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [location.search]);

  const renderImage = (product, index = 0) => {
    if (product.images && product.images.length > index && product.images[index].data) {
      const imageData = product.images[index].data.data || product.images[index].data;
      const base64String = btoa(
        new Uint8Array(imageData).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      return `data:${product.images[index].contentType};base64,${base64String}`;
    }
    return 'https://placehold.co/400x300?text=No+Image';
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter(p => p.category === 'normal');

    if (selectedFilters.Brand.length > 0) result = result.filter(p => selectedFilters.Brand.includes(p.brand));
    if (selectedFilters.RAM.length > 0) result = result.filter(p => selectedFilters.RAM.includes(p.ram));
    if (selectedFilters.GPU.length > 0) result = result.filter(p => selectedFilters.GPU.includes(p.gpu));

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === 'popularity') result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    
    return result;
  }, [products, sortBy, selectedFilters]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

  const toggleSection = (section) => setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));

  const handleFilterChange = (category, option) => {
    setSelectedFilters(prev => {
      const active = prev[category].includes(option)
        ? prev[category].filter(item => item !== option)
        : [...prev[category], option];
      return { ...prev, [category]: active };
    });
    setCurrentPage(1);
  };

  const categories = [
    { title: "Brand", options: ["HP", "Acer", "Sony", "Dell", "Apple", "Lenovo"] },
    { title: "RAM", options: ["8GB", "16GB", "32GB"] },
    { title: "GPU", options: ["Intel Iris Xe", "AMD Radeon", "M2 Core", "Integrated"] },
  ];

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900"></div>
    </div>
  );

  return (
    <div className="bg-[#F8F9FA] min-h-screen font-sans pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-3xl font-bold text-black">
            {selectedProduct ? 'Product Details' : (new URLSearchParams(location.search).get('search') ? `Results for "${new URLSearchParams(location.search).get('search')}"` : 'Laptops')}
          </h1>
          <nav className="hidden sm:block text-xs md:text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link> 
            <span className="mx-1">/</span> 
            <span className="text-gray-800 font-medium">Laptops</span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {!selectedProduct && (
            <aside className="w-full lg:w-[280px] bg-white rounded-2xl border border-[#E6E6E6] shadow-sm p-5 h-fit shrink-0">
              <div className="flex justify-between items-center cursor-pointer lg:cursor-default" onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}>
                <h2 className="text-lg font-bold text-gray-800">Filters</h2>
                <span className={`lg:hidden transition-transform ${isMobileFilterOpen ? 'rotate-180' : ''}`}>▼</span>
              </div>
              <div className={`space-y-6 mt-4 lg:mt-6 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
                {categories.map((cat, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                    <div onClick={() => toggleSection(cat.title)} className="flex justify-between items-center mb-4 cursor-pointer group">
                      <h3 className="font-bold text-gray-800 uppercase text-[12px] tracking-wider">{cat.title}</h3>
                      <span className={`text-[10px] text-gray-400 transition-transform ${openSections[cat.title] ? 'rotate-180' : ''}`}>▼</span>
                    </div>
                    <div className={`space-y-3 overflow-hidden transition-all ${openSections[cat.title] ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                      {cat.options.map((opt, i) => (
                        <label key={i} className="flex items-center space-x-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={selectedFilters[cat.title].includes(opt)}
                            onChange={() => handleFilterChange(cat.title, opt)}
                            className="w-4 h-4 rounded border-[#E6E6E6] accent-blue-600 cursor-pointer" 
                          />
                          <span className={`text-sm transition-colors ${selectedFilters[cat.title].includes(opt) ? 'text-black font-bold' : 'text-gray-600'}`}>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          )}

          <main className="flex-1">
          {selectedProduct ? (
  <div className="animate-in fade-in duration-500">
    <button 
      onClick={() => setSelectedProduct(null)}
      className="flex items-center gap-2 font-bold text-sm mb-6 text-[#0F172A] hover:text-[#F4C430] transition-all uppercase tracking-tighter"
    >
      <ArrowLeft size={18} /> Back to Laptops
    </button>

    <div className="bg-white rounded-3xl border border-[#E6E6E6] p-6 md:p-10 shadow-xl overflow-hidden relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left: Images Section */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#F8F9FA] rounded-2xl p-8 flex items-center justify-center border border-gray-100 min-h-[400px]">
            <img 
              src={renderImage(selectedProduct, activeImageIndex)} 
              alt={selectedProduct.name} 
              className="max-h-[400px] object-contain drop-shadow-2xl transition-all duration-300" 
            />
          </div>
          
          {selectedProduct.images && selectedProduct.images.length > 1 && (
            <div className="flex flex-wrap gap-3 justify-center">
              {selectedProduct.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl border-2 overflow-hidden bg-gray-50 transition-all ${activeImageIndex === idx ? 'border-[#F4C430] scale-105 shadow-md' : 'border-transparent hover:border-gray-200'}`}
                >
                  <img 
                    src={renderImage(selectedProduct, idx)} 
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
            {selectedProduct.name}
          </h2>

          {/* Golden Rating Display */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-[#F4C430]">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  fill={i < Math.floor(selectedProduct.averageRating || 0) ? "#F4C430" : "none"} 
                  className={i < Math.floor(selectedProduct.averageRating || 0) ? "text-[#F4C430]" : "text-gray-200"}
                />
              ))}
            </div>
            <span className="text-sm font-black text-gray-400">
              {selectedProduct.averageRating || 0}
            </span>
          </div>

          <div className="mb-8 p-4 bg-[#F8F9FA] rounded-2xl border-l-4 border-[#F4C430]">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1 tracking-widest">Special Price</p>
            <span className="text-4xl md:text-5xl font-black text-[#0F172A]">
              PKR {selectedProduct.price.toLocaleString()}
            </span>
          </div>
          
          {/* Specs Grid with Navy Icons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {[
              { label: 'Processor', value: selectedProduct.processor, icon: <Cpu size={16}/> },
              { label: 'RAM', value: selectedProduct.ram, icon: <Zap size={16}/> },
              { label: 'Graphics', value: selectedProduct.gpu, icon: <Monitor size={16}/> },
              { label: 'Storage', value: selectedProduct.storage, icon: <HardDrive size={16}/> },
              { label: 'Display', value: selectedProduct.display || 'Full HD', icon: <Box size={16}/> },
              { label: 'OS', value: selectedProduct.os || 'Windows 11', icon: <ShieldCheck size={16}/> },
            ].map((spec, index) => (
              <div key={index} className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-[#F4C430] transition-colors group">
                <div className="text-[#0F172A] mb-1 group-hover:scale-110 transition-transform">{spec.icon}</div>
                <p className="text-[9px] uppercase font-black text-gray-400 tracking-tighter mb-0.5">{spec.label}</p>
                <p className="text-[11px] font-bold text-slate-800 line-clamp-1">{spec.value}</p>
              </div>
            ))}
          </div>

          {/* Action Buttons - Fully Matched with your Screenshots */}
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            {/* Dark Navy Button */}
            <button 
              onClick={() => addToCart(selectedProduct)} 
              className="flex-1 py-5 bg-[#0F172A] text-white font-black rounded-2xl hover:bg-black transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-lg"
            >
              <ShoppingCart size={18} /> Add To Cart
            </button>
            
            {/* Golden Gradient Button */}
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
                <div className="bg-white rounded-2xl border border-[#E6E6E6] p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-gray-700 font-semibold text-xs sm:text-sm">
                    Showing {filteredAndSortedProducts.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length} results
                  </p>
                  <select onChange={(e) => {setSortBy(e.target.value); setCurrentPage(1);}} className="w-full md:w-auto border border-[#E6E6E6] rounded-lg px-4 py-1.5 bg-white text-sm outline-none focus:border-blue-600 cursor-pointer">
                    <option value="default">Default Sorting</option>
                    <option value="popularity">Popularity</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

              {/* --- UPDATED CLEAN CARD GRID --- */}
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
  {currentProducts.map((product) => (
    <div 
      key={product._id} 
      className="bg-white rounded-2xl border border-[#E6E6E6] p-5 hover:shadow-2xl transition-all flex flex-col group relative overflow-hidden"
      style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
    >
      {/* Clickable Area */}
      <div 
        className="cursor-pointer" 
        onClick={() => { setSelectedProduct(product); setActiveImageIndex(0); window.scrollTo(0,0); }}
      >
        {/* Image Container with subtle gray bg like your screenshot */}
        <div className="h-44 flex items-center justify-center mb-5 bg-[#F8F9FA] rounded-2xl overflow-hidden p-6">
          <img 
            src={renderImage(product)} 
            alt={product.name} 
            className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" 
          />
        </div>

        {/* Product Name - Bold & Dark like your UI */}
        <h3 className="text-lg font-black text-[#0F172A] mb-1 line-clamp-1 group-hover:text-[#F4C430] transition-colors uppercase italic tracking-tighter">
          {product.name}
        </h3>

        {/* --- RATING (Golden/Yellow theme from your screenshots) --- */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex text-[#F4C430]">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                fill={i < Math.floor(product.averageRating || 0) ? "#F4C430" : "none"} 
                className={i < Math.floor(product.averageRating || 0) ? "text-[#F4C430]" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-[11px] font-bold text-gray-400">
             {product.averageRating || 0}
          </span>
        </div>

        {/* Quick Specs - Blue icons to match primary buttons */}
        <div className="flex gap-4 mb-4 text-[11px] text-gray-500 font-bold uppercase tracking-tight">
          <div className="flex items-center gap-1.5">
            <Cpu size={14} className="text-[#0F172A]" /> 
            {product.processor ? product.processor.split(' ')[0] : 'N/A'}
          </div>
          <div className="flex items-center gap-1.5">
            <Zap size={14} className="text-[#0F172A]" /> 
            {product.ram}
          </div>
        </div>

        {/* Price - Bold and Large */}
        <div className="mb-5">
          <span className="text-xl font-black text-[#0F172A]">
            PKR {product.price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* --- THEMED BUTTONS (Matching your uploaded screenshots) --- */}
      <div className="mt-auto flex flex-col gap-2.5">
        {/* Dark Navy Button (Add to Cart theme) */}
        <button 
          onClick={() => addToCart(product)} 
          className="w-full py-3 bg-[#0F172A] text-white text-[11px] font-black rounded-xl hover:opacity-90 transition-all uppercase tracking-[0.15em] flex items-center justify-center gap-2"
        >
          <ShoppingCart size={16} /> Add to Cart
        </button>
        
        {/* Golden/Yellow Gradient Button (View Details/Buy Now theme) */}
        <button 
          onClick={() => { setSelectedProduct(product); setActiveImageIndex(0); window.scrollTo(0,0); }} 
          className="w-full py-3 bg-gradient-to-r from-[#F4C430] to-[#E2B020] text-[#0F172A] text-[11px] font-black rounded-xl border border-[#D4A017] text-center uppercase tracking-[0.15em] shadow-md hover:brightness-105 transition-all"
        >
          View Details
        </button>
      </div>
    </div>
  ))}
</div>

                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center items-center gap-3">
                    {[...Array(totalPages)].map((_, i) => (
                      <button key={i} onClick={() => { setCurrentPage(i + 1); window.scrollTo(0,0); }} className={`w-10 h-10 rounded-lg font-bold transition-all shadow-sm ${currentPage === i + 1 ? 'bg-slate-900 text-white' : 'bg-white border border-[#E6E6E6] text-gray-600 hover:border-blue-600'}`}>{i + 1}</button>
                    ))}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default LaptopPage;