import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Cpu, Zap, ShoppingCart, Star, Filter, X, HardDrive, Monitor, Box, ShieldCheck, CreditCard } from 'lucide-react';

const Acer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('default');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // --- FILTER STATES ---
  const [selectedFilters, setSelectedFilters] = useState({
    RAM: [],
    GPU: []
  });
  
  const [openSections, setOpenSections] = useState({
    RAM: true,
    GPU: true
  });

  const navigate = useNavigate(); 
  const itemsPerPage = 6;

  // --- API FETCHING ---
  useEffect(() => {
    const fetchAcerProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/products?category=normal');
        const data = await response.json();
        const acerOnly = data.filter(p => p.brand?.toUpperCase() === 'ACER');
        setProducts(acerOnly);
      } catch (err) {
        console.error("Error fetching Acer products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAcerProducts();
  }, []);

  // --- UTILS ---
  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFilterChange = (category, option) => {
    setSelectedFilters(prev => {
      const active = prev[category].includes(option)
        ? prev[category].filter(item => item !== option)
        : [...prev[category], option];
      return { ...prev, [category]: active };
    });
    setCurrentPage(1);
  };

  const renderImage = (product, index = 0) => {
    if (product.images && product.images.length > index && product.images[index].data) {
      const imageData = product.images[index].data.data || product.images[index].data;
      const base64String = btoa(
        new Uint8Array(imageData).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      return `data:${product.images[index].contentType};base64,${base64String}`;
    }
    return 'https://placehold.co/400x300?text=Acer+Laptop';
  };

  // --- CART LOGIC ---
  const addToCart = (product, silent = false) => {
    if (!product) return;
    const savedCart = localStorage.getItem('globalCart');
    let currentCart = savedCart ? JSON.parse(savedCart) : [];
    
    const existingItem = currentCart.find(item => item.id === product._id);
    if (existingItem) {
      currentCart = currentCart.map(item => item.id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
    } else {
      currentCart.push({
        id: product._id,
        name: product.name,
        price: Number(product.price),
        img: renderImage(product),
        quantity: 1,
        brand: "Acer",
        ram: product.ram,
        processor: product.processor
      });
    }

    localStorage.setItem('globalCart', JSON.stringify(currentCart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    if (!silent) alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = (product) => {
    addToCart(product, true); 
    navigate('/cart'); 
  };

  // --- FILTER & SORT LOGIC ---
  const filteredAndSorted = useMemo(() => {
    let result = products.filter(p => {
      const pRam = p.ram?.toUpperCase().replace(/\s/g, '') || "";
      const pGpu = p.gpu?.toUpperCase() || "INTEGRATED";
      const ramMatch = selectedFilters.RAM.length === 0 || 
        selectedFilters.RAM.some(f => pRam.includes(f.toUpperCase()));
      const gpuMatch = selectedFilters.GPU.length === 0 || 
        selectedFilters.GPU.some(f => pGpu.includes(f.toUpperCase()));
      return ramMatch && gpuMatch;
    });

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [products, sortBy, selectedFilters]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const currentProducts = filteredAndSorted.slice(indexOfLastItem - itemsPerPage, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);

  const categories = [
    { title: "RAM", options: ["8GB", "16GB", "32GB"] },
    { title: "GPU", options: ["Integrated", "RTX 3060", "RTX 4060", "RTX 3050"] },
  ];

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#0F172A]"></div>
    </div>
  );

  return (
    <div className="bg-[#F8F9FA] min-h-screen font-sans pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        
        {/* Updated Header - Matches Laptop Style */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl md:text-4xl font-black text-[#0F172A] uppercase italic tracking-tighter leading-none">
              Acer Aspire Series
            </h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-2">Authorized Premium Inventory</p>
          </div>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-[#0F172A] tracking-widest transition-colors">
             <ArrowLeft size={14} strokeWidth={3}/> Return to Fleet
          </button>
        </div>

        {selectedProduct ? (
          /* --- Acer DETAIL VIEW (Laptop Layout) --- */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="flex items-center gap-2 font-black text-[10px] mb-8 text-[#0F172A] uppercase tracking-[0.2em] hover:text-[#F4C430] transition-colors"
            >
              <ArrowLeft size={16} strokeWidth={3} /> Back to Acer Collection
            </button>
            
            <div className="bg-white rounded-[40px] border border-[#E6E6E6] p-6 md:p-12 shadow-2xl overflow-hidden relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                
                {/* Left: Premium Image Gallery Layout */}
                <div className="flex flex-col gap-6">
                  <div className="bg-[#F8F9FA] rounded-[32px] p-10 flex items-center justify-center border border-gray-50 min-h-[450px] shadow-inner">
                    <img 
                      src={renderImage(selectedProduct, activeImageIndex)} 
                      alt={selectedProduct.name} 
                      className="max-h-[380px] object-contain drop-shadow-2xl transition-all duration-500" 
                    />
                  </div>
                  {selectedProduct.images && selectedProduct.images.length > 1 && (
                    <div className="flex flex-wrap gap-4 justify-center">
                      {selectedProduct.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`w-20 h-20 rounded-2xl border-2 overflow-hidden transition-all ${activeImageIndex === idx ? 'border-[#F4C430] scale-110' : 'border-transparent opacity-50'}`}
                        >
                          <img src={renderImage(selectedProduct, idx)} alt="" className="w-full h-full object-contain p-2" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column: Premium Info */}
                <div className="flex flex-col">
                  <div className="mb-4">
                    <span className="px-4 py-1.5 bg-[#0F172A] text-white text-[10px] font-black rounded-full uppercase tracking-[0.2em] italic">
                      Acer {selectedProduct.category} Series
                    </span>
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl font-black text-[#0F172A] mb-4 leading-[0.9] uppercase italic tracking-tighter">
                    {selectedProduct.name}
                  </h2>

                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex text-[#F4C430]">
                      {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#F4C430" />)}
                    </div>
                    <span className="text-xs font-black text-gray-400 italic">(4.9/5.0)</span>
                  </div>

                  <div className="mb-10 p-6 bg-[#F8F9FA] rounded-[24px] border-l-8 border-[#F4C430] shadow-sm">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1 tracking-[0.2em]">Current Market Price</p>
                    <span className="text-4xl md:text-5xl font-black text-[#0F172A] tracking-tighter">
                      PKR {selectedProduct.price.toLocaleString()}
                    </span>
                  </div>
                  
                  {/* Laptop Layout Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                    {[
                      { label: 'Processor', value: selectedProduct.processor, icon: <Cpu size={18}/> },
                      { label: 'RAM', value: selectedProduct.ram, icon: <Zap size={18}/> },
                      { label: 'Storage', value: selectedProduct.storage, icon: <HardDrive size={18}/> },
                      { label: 'Graphics', value: selectedProduct.gpu, icon: <Monitor size={18}/> },
                      { label: 'Security', value: 'TPM 2.0', icon: <ShieldCheck size={18}/> },
                      { label: 'Display', value: selectedProduct.display, icon: <Box size={18}/> },
                    ].map((spec, index) => (
                      <div key={index} className="p-4 bg-white rounded-2xl border border-gray-100 hover:border-[#F4C430] transition-all group">
                        <div className="text-[#0F172A] mb-2 group-hover:scale-110 transition-transform">{spec.icon}</div>
                        <p className="text-[9px] uppercase font-black text-gray-400 tracking-widest mb-1">{spec.label}</p>
                        <p className="text-[12px] font-black text-[#0F172A] truncate">{spec.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <button 
                      onClick={() => addToCart(selectedProduct)} 
                      className="flex-1 py-6 bg-[#0F172A] text-white font-black rounded-2xl hover:bg-black transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-xl"
                    >
                      <ShoppingCart size={20} /> Add To Cart
                    </button>
                    <button 
                      onClick={() => handleBuyNow(selectedProduct)} 
                      className="flex-1 py-6 bg-gradient-to-r from-[#F4C430] to-[#d6a11e] text-[#0F172A] font-black rounded-2xl uppercase tracking-[0.2em] text-xs shadow-[0_15px_30px_rgba(244,196,48,0.3)] hover:brightness-110 transition-all flex items-center justify-center gap-3"
                    >
                      <CreditCard size={20} /> Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* --- Acer LIST VIEW WITH SIDEBAR --- */
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Improved Sidebar */}
            <aside className="w-full lg:w-[300px] shrink-0">
              <div className="bg-white rounded-[2.5rem] border border-[#E6E6E6] shadow-sm p-8 sticky top-6">
                <div 
                  className="flex justify-between items-center cursor-pointer lg:cursor-default"
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                >
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#0F172A]">Refine Fleet</h2>
                  <Filter size={16} className="lg:hidden text-gray-400" />
                </div>

                <div className={`space-y-10 mt-8 transition-all duration-300 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
                  {categories.map((cat, index) => (
                    <div key={index} className="border-b border-gray-50 pb-6 last:border-0">
                      <div onClick={() => toggleSection(cat.title)} className="flex justify-between items-center mb-5 cursor-pointer group">
                        <h3 className="font-black text-[#0F172A] uppercase text-[10px] tracking-[0.2em]">{cat.title}</h3>
                        <span className={`text-[10px] text-gray-300 transition-transform ${openSections[cat.title] ? 'rotate-180' : ''}`}>▼</span>
                      </div>
                      <div className={`space-y-4 ${openSections[cat.title] ? 'block' : 'hidden'}`}>
                        {cat.options.map((opt, i) => (
                          <label key={i} className="flex items-center space-x-3 cursor-pointer group">
                            <input 
                              type="checkbox" 
                              checked={selectedFilters[cat.title]?.includes(opt)}
                              onChange={() => handleFilterChange(cat.title, opt)}
                              className="w-4 h-4 rounded border-[#E6E6E6] accent-[#0F172A] cursor-pointer" 
                            />
                            <span className={`text-[11px] font-black uppercase tracking-tight transition-colors ${selectedFilters[cat.title]?.includes(opt) ? 'text-[#0F172A]' : 'text-gray-400 group-hover:text-black'}`}>
                              {opt}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {(selectedFilters.RAM.length > 0 || selectedFilters.GPU.length > 0) && (
                    <button 
                      onClick={() => setSelectedFilters({RAM: [], GPU: []})}
                      className="w-full py-4 bg-[#F8F9FA] text-[9px] font-black uppercase text-red-500 rounded-2xl hover:bg-red-50 transition-colors tracking-widest"
                    >
                      Reset All Filters
                    </button>
                  )}
                </div>
              </div>
            </aside>

            {/* Main Content Grid */}
            <main className="flex-1">
              <div className="bg-white rounded-[2rem] border border-[#E6E6E6] p-6 mb-10 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
                <p className="text-[#0F172A] font-black text-[10px] uppercase tracking-widest italic">
                  Inventory: {filteredAndSorted.length} Acer Units Available
                </p>
                <select onChange={(e) => setSortBy(e.target.value)} className="border-2 border-[#F8F9FA] rounded-xl px-5 py-3 bg-[#F8F9FA] text-[10px] font-black uppercase tracking-widest outline-none focus:border-[#F4C430] cursor-pointer">
                  <option value="default">Sort by: Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Alphabetical (A-Z)</option>
                </select>
              </div>

              {filteredAndSorted.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-[3rem] border border-[#E6E6E6]">
                  <p className="text-gray-300 font-black uppercase tracking-[0.2em] italic">No Match Found in Acer Repository</p>
                </div>
              ) : (
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
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-20 flex justify-center gap-4">
                  {[...Array(totalPages)].map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => {setCurrentPage(i + 1); window.scrollTo({top: 0, behavior: 'smooth'});}}
                      className={`w-12 h-12 rounded-2xl font-black text-xs transition-all ${currentPage === i + 1 ? 'bg-[#0F172A] text-white shadow-xl scale-110' : 'bg-white text-gray-400 border border-[#E6E6E6] hover:border-[#F4C430]'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
};

export default Acer;