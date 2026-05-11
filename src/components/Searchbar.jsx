import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Search Logic
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    const delay = setTimeout(async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/search?q=${query}`);
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
      } catch (err) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(delay);
  }, [query]);

  const handleSelect = (id) => {
    navigate(`/product/${id}`);
    setOpen(false);
    setQuery("");
  };

  return (
    <div className="relative flex items-center">
      
      {/* --- BIG SCREENS (1280px+): Permanent Search Bar --- */}
      <div className="hidden xl:flex items-center bg-slate-100 rounded-lg px-3 py-1.5 border border-slate-200 w-[300px]">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && navigate(`/search?q=${query}`)}
          className="w-full px-2 bg-transparent outline-none text-slate-800 text-sm"
        />
        {query && (
          <button onClick={() => setQuery("")}>
            <X size={16} className="text-slate-400 hover:text-slate-600" />
          </button>
        )}

        {/* Big Screen Dropdown */}
        {query.length >= 2 && (
          <div className="absolute top-full right-0 mt-2 w-[350px] bg-white shadow-xl rounded-xl border border-slate-100 z-[110] max-h-[400px] overflow-y-auto">
             {loading ? (
                <div className="p-4 text-center text-xs text-slate-400">Searching...</div>
             ) : (
                results.map(item => (
                  <div key={item._id} onClick={() => handleSelect(item._id)} className="p-3 hover:bg-slate-50 cursor-pointer border-b last:border-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{item.name}</p>
                    <p className="text-[10px] text-[#D4AF37]">PKR {item.price?.toLocaleString()}</p>
                  </div>
                ))
             )}
          </div>
        )}
      </div>

      {/* --- SMALL & LAPTOP SCREENS (Up to 1279px): Icon Trigger --- */}
      <button
        onClick={() => setOpen(true)}
        className="xl:hidden p-2 rounded-full hover:bg-slate-100 transition-colors"
      >
        <Search size={22} className="text-slate-800" />
      </button>

      {/* BLURRED OVERLAY: Active for Mobile AND Laptops */}
      {open && (
        <div className="xl:hidden fixed inset-0 bg-black/40 backdrop-blur-md z-[100] flex items-start justify-center pt-10 px-4">
          
          {/* Centered box that is wider on Laptops (lg) */}
          <div className="w-full max-w-[500px] lg:max-w-[700px] bg-white rounded-2xl p-3 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center bg-slate-100 rounded-xl px-4 py-4">
              <Search size={22} className="text-slate-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search laptops, gaming, workstation..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && navigate(`/search?q=${query}`)}
                className="w-full px-4 bg-transparent outline-none text-lg text-slate-800"
              />
              <button onClick={() => { setOpen(false); setQuery(""); }}>
                <X size={26} className="text-slate-500 hover:text-black" />
              </button>
            </div>

            {/* Results inside Overlay */}
            {query.length >= 2 && (
              <div className="mt-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {loading ? (
                   <div className="p-10 text-center text-slate-400">Searching...</div>
                ) : (
                  results.length > 0 ? (
                    results.map(item => (
                      <div key={item._id} onClick={() => handleSelect(item._id)} className="p-4 border-b hover:bg-slate-50 cursor-pointer flex justify-between items-center">
                        <p className="font-semibold text-slate-800">{item.name}</p>
                        <p className="text-[#D4AF37] font-bold whitespace-nowrap ml-4">PKR {item.price?.toLocaleString()}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-10 text-center text-slate-500">No results found</div>
                  )
                )}
              </div>
            )}
          </div>

          {/* Close overlay on backdrop click */}
          <div className="absolute inset-0 -z-10" onClick={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;