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
                  className="flex items-center gap-2 font-bold text-sm mb-6 text-gray-500 hover:text-blue-600 transition-all"
                >
                  <ArrowLeft size={18} /> Back to Laptops
                </button>

                <div className="bg-white rounded-3xl border border-[#E6E6E6] p-6 md:p-10 shadow-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    <div className="flex flex-col gap-4">
                      <div className="bg-[#F8F9FA] rounded-2xl p-8 flex items-center justify-center border border-gray-100 min-h-[400px]">
                        <img 
                          src={renderImage(selectedProduct, activeImageIndex)} 
                          alt={selectedProduct.name} 
                          className="max-h-[400px] object-contain drop-shadow-xl transition-all duration-300" 
                        />
                      </div>
                      
                      {selectedProduct.images && selectedProduct.images.length > 1 && (
                        <div className="flex flex-wrap gap-3 justify-center">
                          {selectedProduct.images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveImageIndex(idx)}
                              className={`w-20 h-20 rounded-xl border-2 overflow-hidden bg-gray-50 transition-all ${activeImageIndex === idx ? 'border-blue-600 scale-105 shadow-sm' : 'border-transparent hover:border-gray-200'}`}
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

                    <div className="flex flex-col">
                      <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-2 leading-tight uppercase italic tracking-tighter">
                        {selectedProduct.name}
                      </h2>

                      {/* STAR RATING DISPLAY */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-blue-600">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              fill={i < Math.floor(selectedProduct.averageRating || 0) ? "#2563eb" : "none"} 
                              className={i < Math.floor(selectedProduct.averageRating || 0) ? "" : "text-gray-300"}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-gray-500">
                          {selectedProduct.averageRating || 0} ({selectedProduct.ratings?.length || 0} Reviews)
                        </span>
                      </div>

                      <div className="mb-6">
                        <span className="text-4xl font-black text-[#0F172A]">PKR {selectedProduct.price.toLocaleString()}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <p className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mb-1">Processor</p>
                          <p className="text-xs font-bold text-slate-800">{selectedProduct.processor}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <p className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mb-1">RAM</p>
                          <p className="text-xs font-bold text-slate-800">{selectedProduct.ram}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <p className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mb-1">Graphics</p>
                          <p className="text-xs font-bold text-slate-800">{selectedProduct.gpu}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <p className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mb-1">Storage</p>
                          <p className="text-xs font-bold text-slate-800">{selectedProduct.storage}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <p className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mb-1">Display</p>
                          <p className="text-xs font-bold text-slate-800">{selectedProduct.display || 'Full HD'}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <p className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mb-1">OS</p>
                          <p className="text-xs font-bold text-slate-800">{selectedProduct.os || 'Windows 11'}</p>
                        </div>
                      </div>

                      {/* CORE FEATURES LIST */}
                      {selectedProduct.features && selectedProduct.features.length > 0 && (
                        <div className="mb-8">
                          <p className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] mb-3">Key Features</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedProduct.features.map((feature, idx) => (
                              <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-lg border border-blue-100 uppercase">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                        <button onClick={() => addToCart(selectedProduct)} className="flex-1 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-[#b8962d] transition-all uppercase tracking-widest text-xs">Add To Cart</button>
                        <button onClick={() => handleBuyNow(selectedProduct)} className="flex-1 py-4 bg-gradient-to-r from-[#F4C430] to-[#d6a11e] text-slate-900 font-bold rounded-xl uppercase tracking-widest text-xs shadow-lg hover:brightness-110 transition-all">Buy Now</button>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentProducts.map((product) => (
                    <div key={product._id} className="bg-white rounded-2xl border border-[#E6E6E6] shadow-sm p-5 hover:shadow-xl transition-all flex flex-col group relative">
                      <div className="cursor-pointer" onClick={() => { setSelectedProduct(product); setActiveImageIndex(0); window.scrollTo(0,0); }}>
                        <div className="h-44 flex items-center justify-center mb-6">
                          <img src={renderImage(product)} alt={product.name} className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <h3 className="text-lg font-extrabold text-[#0F172A] mb-2 leading-tight h-14 overflow-hidden group-hover:text-[#d6a11e] transition-colors">{product.name}</h3>
                      </div>
                      <div className="mt-auto">
                        <div className="mb-4"><span className="text-xl font-black text-[#0F172A]">PKR {product.price.toLocaleString()}</span></div>
                        <div className="flex flex-col gap-2">
                          <button onClick={() => addToCart(product)} className="w-full py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-blue-600 transition-colors uppercase tracking-wider">Add to Cart</button>
                          <button onClick={() => { setSelectedProduct(product); setActiveImageIndex(0); window.scrollTo(0,0); }} className="w-full py-2.5 bg-gradient-to-r from-[#F4C430] to-[#f9f9f9] text-slate-900 text-xs font-bold rounded-xl border border-[#d6a11e] text-center uppercase tracking-wider hover:bg-[#d6a11e] transition-all">View Details</button>
                        </div>
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