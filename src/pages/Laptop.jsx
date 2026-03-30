import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Images Import
import lap1 from '../assets/imgs/brand1.png';
import lap2 from '../assets/imgs/brand2.png'; 

const LaptopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('default');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
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

  const itemsPerPage = 6;

  const allProducts = useMemo(() => [
    // --- LENOVO ---
    { id: 501, name: "Lenovo Legion 5 Pro Gen 8", price: 385000, rating: 5, reviews: 120, img: lap1, ram: "16GB", gpu: "RTX 4060", brand: "Lenovo" },
    { id: 502, name: "Lenovo ThinkPad X1 Carbon Gen 11", price: 415000, rating: 5, reviews: 85, img: lap2, ram: "16GB", gpu: "Integrated", brand: "Lenovo" },
    { id: 503, name: "Lenovo Yoga 7i Convertible", price: 235000, rating: 4, reviews: 64, img: lap1, ram: "16GB", gpu: "Integrated", brand: "Lenovo" },
    { id: 504, name: "Lenovo IdeaPad Gaming 3", price: 185000, rating: 4, reviews: 92, img: lap2, ram: "8GB", gpu: "RTX 3050", brand: "Lenovo" },
    { id: 505, name: "Lenovo LOQ 15 Gaming", price: 225000, rating: 4, reviews: 45, img: lap1, ram: "16GB", gpu: "RTX 4050", brand: "Lenovo" },
    { id: 506, name: "Lenovo V15 Business Laptop", price: 95000, rating: 3, reviews: 20, img: lap2, ram: "8GB", gpu: "Integrated", brand: "Lenovo" },
    ...Array.from({ length: 6 }, (_, i) => ({
        id: i + 507,
        name: `Lenovo ThinkBook Series ${i + 507}`,
        price: 140000 + (i * 15000),
        rating: 4, reviews: 15,
        img: i % 2 === 0 ? lap1 : lap2,
        ram: "16GB", gpu: "Integrated", brand: "Lenovo"
    })),

    // --- DELL ---
    { id: 401, name: "Dell XPS 13 Plus 9320", price: 425000, rating: 5, reviews: 210, img: lap1, ram: "16GB", gpu: "Integrated", brand: "Dell" },
    { id: 402, name: "Dell G15 5530 Gaming", price: 215000, rating: 4, reviews: 145, img: lap2, ram: "16GB", gpu: "RTX 3060", brand: "Dell" },
    { id: 403, name: "Dell Alienware m16 R2", price: 585000, rating: 5, reviews: 32, img: lap1, ram: "32GB", gpu: "RTX 4070", brand: "Dell" },
    { id: 404, name: "Dell Inspiron 15 3520", price: 115000, rating: 3, reviews: 88, img: lap2, ram: "8GB", gpu: "Integrated", brand: "Dell" },
    ...Array.from({ length: 6 }, (_, i) => ({
        id: i + 407,
        name: `Dell Latitude Professional Series ${i + 407}`,
        price: 130000 + (i * 12000),
        rating: 4, reviews: 25,
        img: i % 2 === 0 ? lap1 : lap2,
        ram: "16GB", gpu: "Integrated", brand: "Dell"
    })),

    // --- APPLE ---
    { id: 301, name: "MacBook Air 13-inch M2", price: 315000, rating: 5, reviews: 520, img: lap1, ram: "8GB", gpu: "M2 Core", brand: "Apple" },
    { id: 302, name: "MacBook Pro 14-inch M3", price: 545000, rating: 5, reviews: 130, img: lap2, ram: "16GB", gpu: "M3 Core", brand: "Apple" },
    { id: 303, name: "MacBook Pro 16-inch M3 Max", price: 980000, rating: 5, reviews: 45, img: lap1, ram: "32GB", gpu: "M3 Max", brand: "Apple" },
    ...Array.from({ length: 4 }, (_, i) => ({
        id: i + 307,
        name: `MacBook Pro Custom Build ${i + 307}`,
        price: 450000 + (i * 50000),
        rating: 5, reviews: 10,
        img: i % 2 === 0 ? lap1 : lap2,
        ram: "16GB", gpu: "M2 Pro", brand: "Apple"
    })),

    // --- ACER ---
    { id: 201, name: "Acer Nitro 5 Gaming", price: 165000, rating: 4, reviews: 310, img: lap2, ram: "8GB", gpu: "RTX 3060", brand: "Acer" },
    { id: 205, name: "Acer Triton 500 SE", price: 480000, rating: 5, reviews: 28, img: lap2, ram: "32GB", gpu: "RTX 3070 Ti", brand: "Acer" },
    ...Array.from({ length: 6 }, (_, i) => ({
        id: i + 207,
        name: `Acer Extensa Professional ${i + 207}`,
        price: 110000 + (i * 8000),
        rating: 3, reviews: 14,
        img: i % 2 === 0 ? lap1 : lap2,
        ram: "8GB", gpu: "Integrated", brand: "Acer"
    })),

    // --- HP ---
    { id: 101, name: "HP Victus 15 Gaming", price: 185000, rating: 4, reviews: 450, img: lap1, ram: "16GB", gpu: "RTX 3050", brand: "HP" },
    { id: 103, name: "HP Omen 16 High Performance", price: 325000, rating: 5, reviews: 110, img: lap1, ram: "16GB", gpu: "RTX 4060", brand: "HP" },

    // --- SONY ---
    { id: 701, name: "Sony Vaio Z Flagship", price: 450000, rating: 5, reviews: 15, img: lap1, ram: "16GB", gpu: "Integrated", brand: "Sony" },
  ], []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = allProducts.filter(product => {
      if (selectedFilters.Brand.length > 0 && !selectedFilters.Brand.includes(product.brand)) return false;
      if (selectedFilters.RAM.length > 0 && !selectedFilters.RAM.includes(product.ram)) return false;
      if (selectedFilters.GPU.length > 0 && !selectedFilters.GPU.includes(product.gpu)) return false;
      return true;
    });

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === 'popularity') result.sort((a, b) => b.reviews - a.reviews);
    
    return result;
  }, [allProducts, sortBy, selectedFilters]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

  const categories = [
    { title: "Brand", options: ["HP", "Acer", "Sony", "Dell", "Apple", "Lenovo"] },
    { title: "RAM", options: ["8GB", "16GB", "32GB"] },
    { title: "GPU", options: ["RTX 3050", "RTX 3060", "RTX 4050", "RTX 4060", "RTX 4070", "M2 Core", "Integrated"] },
  ];

  return (
    <div className="bg-[#F8F9FA] min-h-screen font-sans pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-3xl font-bold text-black">Laptops</h1>
          <nav className="hidden sm:block text-xs md:text-sm text-gray-500">
            <Link to="/" className="hover:text-[#b8962d] transition-colors cursor-pointer">Home</Link> 
            <span className="mx-1">/</span> 
            <span className="text-gray-800 font-medium">Laptops</span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-[280px] bg-white rounded-2xl border border-[#E6E6E6] shadow-sm p-5 lg:p-6 h-fit shrink-0">
            <div 
              className="flex justify-between items-center cursor-pointer lg:cursor-default lg:mb-6"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            >
              <h2 className="text-lg lg:text-xl font-bold text-gray-800">Filters</h2>
              <span className={`text-gray-500 lg:hidden transition-transform ${isMobileFilterOpen ? 'rotate-180' : ''}`}>▼</span>
            </div>

            <div className={`space-y-6 mt-4 lg:mt-0 overflow-hidden transition-all duration-300 ${isMobileFilterOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 lg:max-h-none opacity-0 lg:opacity-100'}`}>
              {categories.map((cat, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                  <div onClick={() => toggleSection(cat.title)} className="flex justify-between items-center mb-4 cursor-pointer group">
                    <h3 className="font-bold text-gray-800 uppercase text-[12px] tracking-wider">{cat.title}</h3>
                    <span className={`text-[10px] text-gray-400 transition-transform ${openSections[cat.title] ? 'rotate-180' : ''}`}>▼</span>
                  </div>
                  <div className={`space-y-3 overflow-hidden transition-all duration-300 ${openSections[cat.title] ? 'max-h-64' : 'max-h-0'}`}>
                    {cat.options.map((opt, i) => (
                      <label key={i} className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={selectedFilters[cat.title].includes(opt)}
                          onChange={() => handleFilterChange(cat.title, opt)}
                          className="w-4 h-4 rounded border-[#E6E6E6] accent-[#d6a11e] focus:ring-[#b8962d] cursor-pointer" 
                        />
                        <span className={`text-sm transition-colors ${selectedFilters[cat.title].includes(opt) ? 'text-black font-bold' : 'text-gray-600'}`}>
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-white rounded-2xl border border-[#E6E6E6] shadow-sm p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-700 font-semibold text-xs sm:text-sm">
                Showing {filteredAndSortedProducts.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length} results
              </p>
              <select onChange={(e) => {setSortBy(e.target.value); setCurrentPage(1);}} className="w-full md:w-auto border border-[#E6E6E6] rounded-lg px-4 py-1.5 bg-white text-sm outline-none focus:border-[#b8962d] cursor-pointer">
                <option value="default">Default Sorting</option>
                <option value="popularity">Popularity</option>
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {filteredAndSortedProducts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-[#E6E6E6] shadow-sm">
                  <p className="text-gray-500 text-lg">No laptops match your filters.</p>
                </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl border border-[#E6E6E6] shadow-sm p-5 hover:shadow-xl transition-all flex flex-col relative group">
                    {/* Entire Card becomes a Link area */}
                    <Link to={`/product/${product.id}`} className="flex flex-col h-full">
                      <div className="h-40 sm:h-44 flex items-center justify-center mb-6">
                        <img src={product.img} alt={product.name} className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] mb-0 leading-tight h-14 overflow-hidden hover:text-[#b8962d] transition-colors">{product.name}</h3>
                      
                      <div className="flex items-center gap-1 mb-3 text-[#F4C430] text-2xl mt-0">
                        {"★".repeat(product.rating || 0)}{"☆".repeat(5-(product.rating || 0))}
                        <span className="text-gray-400 text-xs ml-1 font-normal">({product.reviews})</span>
                      </div>

                      <div className="mt-auto flex items-center justify-between gap-2">
                        <span className="text-lg sm:text-xl font-black text-[#0F172A]">PKR {product.price.toLocaleString()}</span>
                        <div className="px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-[#F4C430] to-[#d6a11e] text-slate-800 text-[10px] sm:text-[11px] font-bold rounded-xl border-b-[3px] border-[#b8962d] uppercase whitespace-nowrap hover:brightness-110 flex items-center justify-center">
                          View Details
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-4">
                <div className="flex gap-3">
                  {[...Array(totalPages)].map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => setCurrentPage(i + 1)} 
                      className={`w-10 h-10 rounded-lg font-bold transition-all shadow-sm ${
                        currentPage === i + 1 
                        ? 'bg-gradient-to-b from-[#F4C430] to-[#d6a11e] text-slate-800 shadow-lg' 
                        : 'bg-white border border-[#E6E6E6] text-gray-600 hover:border-[#b8962d]'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
                  disabled={currentPage === totalPages} 
                  className="px-6 py-2.5 rounded-lg font-bold bg-gradient-to-b from-[#F4C430] to-[#d6a11e] text-slate-800 shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Next <span className="text-lg">→</span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default LaptopPage;