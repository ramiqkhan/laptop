import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Acer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('default');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({ RAM: [], GPU: [] });
  const [openSections, setOpenSections] = useState({ RAM: true, GPU: true });

  const itemsPerPage = 6;

  // Fetch products from backend using fetch
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products?brand=Acer`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching Acer products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  // Filter and sort
  const filteredAndSortedProducts = products
    .filter(product => {
      if (selectedFilters.RAM.length && !selectedFilters.RAM.includes(product.ram)) return false;
      if (selectedFilters.GPU.length && !selectedFilters.GPU.includes(product.gpu)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'popularity') return (b.reviews || 0) - (a.reviews || 0);
      return 0;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

  const categories = [
    { title: "RAM", options: ["8GB", "16GB", "32GB"] },
    { title: "GPU", options: ["RTX 3060", "RTX 3070", "RTX 4060", "Integrated"] },
  ];

  if (loading) return <div className="text-center py-20">Loading Acer products...</div>;

  return (
    <div className="bg-[#F8F9FA] min-h-screen font-sans pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        <h1 className="text-xl md:text-3xl font-bold text-black mb-6">Acer Laptops</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-[280px] bg-white rounded-2xl border border-[#E6E6E6] shadow-sm p-5 lg:p-6 h-fit shrink-0">
            <div onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)} className="flex justify-between items-center cursor-pointer lg:cursor-default lg:mb-6">
              <h2 className="text-lg lg:text-xl font-bold text-gray-800 uppercase tracking-tight">Filters</h2>
              <span className={`text-gray-500 lg:hidden transition-transform ${isMobileFilterOpen ? 'rotate-180' : ''}`}>▼</span>
            </div>

            <div className={`space-y-6 mt-4 lg:mt-0 overflow-hidden transition-all duration-300 ${isMobileFilterOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 lg:max-h-none opacity-0 lg:opacity-100'}`}>
              {categories.map((cat, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                  <div onClick={() => toggleSection(cat.title)} className="flex justify-between items-center mb-4 cursor-pointer group">
                    <h3 className="font-bold text-gray-800 uppercase text-[12px] tracking-widest">{cat.title}</h3>
                    <span className={`text-[10px] text-gray-400 transition-transform ${openSections[cat.title] ? 'rotate-180' : ''}`}>▼</span>
                  </div>
                  <div className={`space-y-3 overflow-hidden transition-all duration-300 ${openSections[cat.title] ? 'max-h-56' : 'max-h-0'}`}>
                    {cat.options.map((opt, i) => (
                      <label key={i} className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={selectedFilters[cat.title]?.includes(opt)}
                          onChange={() => handleFilterChange(cat.title, opt)}
                          className="w-4 h-4 rounded border-[#E6E6E6] accent-[#d6a11e] focus:ring-[#b8962d]" 
                        />
                        <span className={`text-sm ${selectedFilters[cat.title]?.includes(opt) ? 'text-black font-bold' : 'text-gray-600 group-hover:text-black'}`}>
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Sorting */}
            <div className="bg-white rounded-2xl border border-[#E6E6E6] shadow-sm p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-700 font-bold uppercase tracking-wide text-xs">
                Showing {filteredAndSortedProducts.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length} results
              </p>
              <select onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }} className="w-full md:w-auto border border-[#E6E6E6] rounded-lg px-4 py-1.5 bg-white text-sm outline-none focus:border-[#b8962d] cursor-pointer transition-all">
                <option value="default">Default Sorting</option>
                <option value="popularity">Sort by Popularity</option>
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-[#E6E6E6] shadow-sm">
                <p className="text-gray-500 text-lg">No Acer laptops match your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentProducts.map(product => (
                  <div key={product._id || product.id} className="bg-white rounded-2xl border border-[#E6E6E6] shadow-sm p-5 hover:shadow-xl transition-all flex flex-col group relative">
                    <div className="h-40 sm:h-44 flex items-center justify-center mb-6 overflow-hidden">
                      <img src={product.image} alt={product.name} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="text-lg font-black text-[#0F172A] mb-1 leading-tight h-14 overflow-hidden">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-4 text-[#F4C430] text-2xl">
                      {"★".repeat(product.rating || 0)}{"☆".repeat(5-(product.rating || 0))}
                      <span className="text-gray-400 text-xs ml-1 font-normal">({product.reviews || 0})</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-2">
                      <span className="text-lg sm:text-xl font-black text-[#0F172A]">PKR {product.price.toLocaleString()}</span>
                      <Link to={`/product/${product._id || product.id}`} className="px-4 py-2.5 bg-gradient-to-r from-[#F4C430] to-[#d6a11e] text-slate-800 text-[10px] sm:text-[11px] font-bold rounded-xl border-b-[3px] border-[#b8962d] uppercase hover:brightness-110 transition-all active:scale-95 shadow-sm flex items-center justify-center">View Details</Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-4">
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i} onClick={() => setCurrentPage(i+1)} className={`w-10 h-10 rounded-lg font-bold transition-all shadow-sm ${currentPage === i+1 ? 'bg-gradient-to-b from-[#F4C430] to-[#d6a11e] text-slate-800 shadow-lg scale-110' : 'bg-white border border-[#E6E6E6] text-gray-500 hover:border-[#b8962d]'}`}>{i+1}</button>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Acer;