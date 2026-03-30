import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Images Import
import lap1 from '../assets/imgs/brand1.png';
import lap2 from '../assets/imgs/brand2.png'; 

const Sony = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('default');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    RAM: [],
    Processor: []
  });
  
  const [openSections, setOpenSections] = useState({
    RAM: true,
    Processor: true
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

  // Sony Specific Products Data
  const allProducts = useMemo(() => [
    { id: 701, name: "Sony Vaio Z Flagship Edition", price: 450000, rating: 5, reviews: 45, img: lap1, ram: "16GB", processor: "Core i7" },
    { id: 702, name: "Sony Vaio SX14 Business Pro", price: 320000, rating: 5, reviews: 30, img: lap2, ram: "16GB", processor: "Core i7" },
    { id: 703, name: "Sony Vaio E Series High-End", price: 185000, rating: 4, reviews: 110, img: lap1, ram: "8GB", processor: "Core i5" },
    { id: 704, name: "Sony Vaio FE 14.1 Slim", price: 145000, rating: 4, reviews: 215, img: lap2, ram: "8GB", processor: "Core i5" },
    { id: 705, name: "Sony Vaio S13 Premium Carbon", price: 275000, rating: 5, reviews: 65, img: lap1, ram: "16GB", processor: "Core i7" },
    { id: 706, name: "Sony Vaio Fit Flip Hybrid", price: 125000, rating: 3, reviews: 90, img: lap2, ram: "8GB", processor: "Core i3" },
    ...Array.from({ length: 6 }, (_, i) => ({
        id: i + 707,
        name: `Sony Vaio Classic Edition ${i + 707}`,
        price: 110000 + (i * 10000),
        rating: 4,
        reviews: 20 + i, 
        img: i % 2 === 0 ? lap1 : lap2,
        ram: "8GB", 
        processor: "Core i5"
    }))
  ], []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = allProducts.filter(product => {
      if (selectedFilters.RAM.length > 0 && !selectedFilters.RAM.includes(product.ram)) return false;
      if (selectedFilters.Processor.length > 0 && !selectedFilters.Processor.includes(product.processor)) return false;
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
    { title: "RAM", options: ["8GB", "16GB", "32GB"] },
    { title: "Processor", options: ["Core i3", "Core i5", "Core i7"] },
  ];

  return (
    <div className="bg-[#F8F9FA] min-h-screen font-sans pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        
        {/* Breadcrumb Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-3xl font-bold text-black uppercase tracking-tight">Sony Laptops</h1>
          <nav className="hidden sm:block text-xs md:text-sm text-gray-500">
            <Link to="/" className="hover:text-[#b8962d] transition-colors">Home</Link> 
            <span className="mx-1">/</span> 
            <span className="text-gray-800 font-medium">Sony</span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-[280px] bg-white rounded-2xl border border-[#E6E6E6] shadow-sm p-5 lg:p-6 h-fit shrink-0">
            <div 
              className="flex justify-between items-center cursor-pointer lg:cursor-default lg:mb-6"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            >
              <h2 className="text-lg lg:text-xl font-bold text-gray-800 uppercase tracking-wider">Filters</h2>
              <span className={`text-gray-500 lg:hidden transition-transform ${isMobileFilterOpen ? 'rotate-180' : ''}`}>▼</span>
            </div>

            <div className={`space-y-6 mt-4 lg:mt-0 overflow-hidden transition-all duration-300 ${isMobileFilterOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 lg:max-h-none opacity-0 lg:opacity-100'}`}>
              {categories.map((cat, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                  <div onClick={() => toggleSection(cat.title)} className="flex justify-between items-center mb-4 cursor-pointer group">
                    <h3 className="font-bold text-gray-800 uppercase text-[12px] tracking-widest">{cat.title}</h3>
                    <span className={`text-[10px] text-gray-400 transition-transform ${openSections[cat.title] ? 'rotate-180' : ''}`}>▼</span>
                  </div>
                  <div className={`space-y-3 overflow-hidden transition-all duration-300 ${openSections[cat.title] ? 'max-h-48' : 'max-h-0'}`}>
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

          {/* Main Content Area */}
          <main className="flex-1">
            {/* Top Bar */}
            <div className="bg-white rounded-2xl border border-[#E6E6E6] shadow-sm p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-700 font-bold uppercase tracking-wide text-xs">
                Showing {filteredAndSortedProducts.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length} results
              </p>
              <select onChange={(e) => {setSortBy(e.target.value); setCurrentPage(1);}} className="w-full md:w-auto border border-[#E6E6E6] rounded-lg px-4 py-1.5 bg-white text-sm outline-none focus:border-[#b8962d] cursor-pointer font-medium text-gray-700">
                <option value="default">Default Sorting</option>
                <option value="popularity">Popularity</option>
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {filteredAndSortedProducts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-[#E6E6E6] shadow-sm">
                  <p className="text-gray-500 text-lg">No Sony laptops match your filters.</p>
                </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl border border-[#E6E6E6] shadow-sm p-5 hover:shadow-xl transition-all duration-300 flex flex-col relative group">
                    <div className="h-40 sm:h-44 flex items-center justify-center mb-6 overflow-hidden">
                      <img src={product.img} alt={product.name} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    
                    <h3 className="text-lg font-black text-[#0F172A] mb-1 leading-tight h-14 overflow-hidden">{product.name}</h3>
                    
                    <div className="flex items-center gap-1 mb-4 text-[#F4C430] text-2xl">
                      {"★".repeat(product.rating || 0)}{"☆".repeat(5-(product.rating || 0))}
                      <span className="text-gray-400 text-xs ml-1 font-normal">({product.reviews})</span>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-2 border-t border-gray-50 pt-4">
                      <span className="text-lg sm:text-xl font-black text-[#0F172A]">PKR {product.price.toLocaleString()}</span>
                      <Link 
                        to={`/product/${product.id}`}
                        className="px-4 py-2.5 bg-gradient-to-r from-[#F4C430] to-[#d6a11e] text-slate-800 text-[10px] sm:text-[11px] font-bold rounded-xl border-b-[3px] border-[#b8962d] uppercase whitespace-nowrap hover:brightness-110 active:scale-95 transition-all flex items-center justify-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-4">
                <div className="flex gap-3">
                  {[...Array(totalPages)].map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => setCurrentPage(i + 1)} 
                      className={`w-10 h-10 rounded-lg font-bold transition-all shadow-sm ${
                        currentPage === i + 1 
                        ? 'bg-gradient-to-b from-[#F4C430] to-[#d6a11e] text-slate-800 shadow-lg scale-110' 
                        : 'bg-white border border-[#E6E6E6] text-gray-500 hover:border-[#b8962d]'
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

export default Sony;