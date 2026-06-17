import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Cpu, Box, HardDrive, Zap, ShoppingCart, Star, Filter } from 'lucide-react';

const Acer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('default');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate(); 
  const itemsPerPage = 6;
  const BASE_URL = import.meta.env.VITE_API_URL || "https://laptopbackend-seven.vercel.app";

  const [selectedFilters, setSelectedFilters] = useState({
    RAM: [],
    GPU: []
  });

  const [openSections, setOpenSections] = useState({
    RAM: true,
    GPU: true
  });

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
          brand: product.brand || "ACER",
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

  // --- API FETCHING ---
  useEffect(() => {
    const fetchAcerProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/products?category=normal`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        
        // Filter out items strictly belonging to Acer brand
        const acerOnly = Array.isArray(data) ? data.filter(p => p.brand?.toUpperCase() === 'ACER') : [];
        setProducts(acerOnly);
      } catch (err) {
        console.error("Error fetching Acer products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAcerProducts();
  }, []);

  const renderImage = (product, index = 0) => {
    if (!product || !product.images || product.images.length === 0) {
      return "https://via.placeholder.com/150?text=No+Image";
    }
    return product.images[index].url || product.images[index];
  };

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

  // --- FILTER & SORT LOGIC ---
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (selectedFilters.RAM.length > 0) {
      result = result.filter(p => {
        const pRam = p.ram?.toUpperCase().replace(/\s/g, '') || "";
        return selectedFilters.RAM.some(f => pRam.includes(f.toUpperCase()));
      });
    }

    if (selectedFilters.GPU.length > 0) {
      result = result.filter(p => {
        const pGpu = p.gpu?.toUpperCase() || "INTEGRATED";
        return selectedFilters.GPU.some(f => pGpu.includes(f.toUpperCase()));
      });
    }

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

  const categories = [
    { title: "RAM", options: ["8GB", "16GB", "32GB"] },
    { title: "GPU", options: ["Integrated", "RTX 3060", "RTX 4060", "RTX 3050"] },
  ];

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F4C430]"></div>
    </div>
  );

  return (
    <div className="bg-[#F8F9FA] min-h-screen font-sans pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-3xl font-black text-black italic uppercase tracking-tighter">
            Acer Fleet
          </h1>
          <nav className="hidden sm:block text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest">
            <Link to="/" className="hover:text-[#F4C430] transition-colors">Home</Link> 
            <span className="mx-2">/</span> 
            <span className="text-gray-800">Acer</span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-[280px] bg-white rounded-2xl border border-[#E6E6E6] shadow-sm p-5 h-fit shrink-0">
            <div className="flex justify-between items-center cursor-pointer lg:cursor-default" onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}>
              <h2 className="text-lg font-black text-gray-800 uppercase tracking-tighter italic">Filters</h2>
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
                          className="w-4 h-4 rounded border-[#E6E6E6] accent-[#F4C430] cursor-pointer" 
                        />
                        <span className={`text-sm transition-colors ${selectedFilters[cat.title].includes(opt) ? 'text-black font-bold' : 'text-gray-600'}`}>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-white rounded-2xl border border-[#E6E6E6] p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-700 font-semibold text-xs sm:text-sm">
                Showing {filteredAndSortedProducts.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length} Acer Laptops
              </p>
              <select onChange={(e) => {setSortBy(e.target.value); setCurrentPage(1);}} className="w-full md:w-auto border border-[#E6E6E6] rounded-lg px-4 py-1.5 bg-white text-sm outline-none focus:border-[#F4C430] cursor-pointer font-bold">
                <option value="default">Default Sorting</option>
                <option value="popularity">Top Performance</option>
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {currentProducts.length === 0 ? (
              <div className="text-center py-12 text-gray-500 font-bold bg-white rounded-2xl border border-[#E6E6E6]">
                No Acer laptops matching your configuration found.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <div 
                    key={product._id} 
                    className="bg-white rounded-2xl border border-[#E6E6E6] p-5 hover:shadow-2xl transition-all flex flex-col group relative overflow-hidden"
                    style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
                  >
                    <div className="cursor-pointer" onClick={() => { navigate(`/product/${product._id}`); }}>
                      <div className="h-44 flex items-center justify-center mb-5 bg-[#F8F9FA] rounded-2xl overflow-hidden p-6">
                        <img
                          src={renderImage(product)}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                          className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <h3 className="text-lg font-black text-[#0F172A] mb-1 line-clamp-1 group-hover:text-[#F4C430] transition-colors uppercase italic tracking-tighter">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex text-[#F4C430]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < Math.floor(product.averageRating || 0) ? "#F4C430" : "none"} className={i < Math.floor(product.averageRating || 0) ? "text-[#F4C430]" : "text-gray-300"} />
                          ))}
                        </div>
                        <span className="text-[11px] font-bold text-gray-400">{product.averageRating || 0}</span>
                      </div>

                      <div className="flex gap-4 mb-4 text-[11px] text-gray-500 font-bold uppercase tracking-tight">
                        <div className="flex items-center gap-1.5">
                          <Cpu size={14} className="text-[#0F172A]" /> {product.processor ? product.processor.split(' ')[0] : 'N/A'}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Zap size={14} className="text-[#0F172A]" /> {product.ram}
                        </div>
                      </div>

                      <div className="mb-5">
                        <span className="text-xl font-black text-[#0F172A]">
                          PKR {product.price ? product.price.toLocaleString() : 0}
                        </span>
                      </div>
                    </div>

                    <div className="mt-auto flex flex-col gap-2.5">
                      <button onClick={() => addToCart(product)} className="w-full py-3 bg-[#0F172A] text-white text-[11px] font-black rounded-xl hover:opacity-90 transition-all uppercase tracking-[0.15em] flex items-center justify-center gap-2">
                        <ShoppingCart size={16} /> Add to Cart
                      </button>
                      <button onClick={() => { navigate(`/product/${product._id}`); }} className="w-full py-3 bg-gradient-to-r from-[#F4C430] to-[#E2B020] text-[#0F172A] text-[11px] font-black rounded-xl border border-[#D4A017] text-center uppercase tracking-[0.15em] shadow-md hover:brightness-105 transition-all">
                        View Specs
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center flex-wrap gap-2 md:gap-3 px-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                  .map((page, index, arr) => {
                    const prevPage = arr[index - 1];
                    return (
                      <React.Fragment key={page}>
                        {prevPage && page - prevPage > 1 && <span className="px-2 text-gray-400">...</span>}
                        <button
                          onClick={() => { setCurrentPage(page); window.scrollTo(0, 0); }}
                          className={`min-w-[32px] h-8 px-2 text-sm md:w-10 md:h-10 md:text-base rounded-md md:rounded-lg font-semibold transition-all shadow-sm ${currentPage === page ? 'bg-slate-900 text-white' : 'bg-white border border-[#E6E6E6] text-gray-600 hover:border-blue-600'}`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    );
                  })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Acer;