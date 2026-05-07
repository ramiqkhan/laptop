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

  // Auto focus when open
useEffect(() => {
  if (open) {
    inputRef.current?.focus();
  }
}, [open]);

  // Fetch results (debounce)
useEffect(() => {
  if (query.trim().length < 2) {
    setResults([]);
    setLoading(false);
    return;
  }

  const delay = setTimeout(async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/search?q=${query}`
      );

      const data = await res.json();

      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, 300);

  return () => clearTimeout(delay);
}, [query]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?q=${query}`);
      setResults([]);
      setOpen(false);
    }
  };

  const handleSelect = (id) => {
    navigate(`/product/${id}`);
    setQuery("");
    setResults([]);
    setOpen(false);
  };
  const wrapperRef = useRef(null);
useEffect(() => {
  if (query.trim().length < 2) {
    setResults([]);
    setLoading(false);
    return;
  }

  setLoading(true);

  const delay = setTimeout(async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/search?q=${query}`
      );

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, 400);

  return () => clearTimeout(delay);
}, [query]);

  return (
<div ref={wrapperRef} className="relative flex items-center">

      {/* 🔍 ICON BUTTON */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <Search size={20} />
        </button>
      )}

      {/* ❌ CLOSE BUTTON */}
      {open && (
        <div className="relative w-full max-w-md">
          <div className="flex items-center bg-white border rounded-lg px-3 shadow-sm">

            <Search size={18} className="text-gray-400" />

            <input
              ref={inputRef}
              type="text"
              placeholder="Search laptops..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-2 py-2 outline-none"
            />

            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-black"
            >
              <X size={18} />
            </button>
          </div>

          {/* RESULTS */}
        {/* RESULTS DROPDOWN */}
{/* RESULTS DROPDOWN */}
{/* RESULTS DROPDOWN */}
{open && query.trim().length >= 2 && (
  <div className="absolute top-full left-0 w-full bg-white shadow-2xl rounded-xl mt-2 max-h-72 overflow-y-auto z-50 border border-gray-100">

    <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase">
      Suggestions
    </div>

    {/* LOADING */}
    {loading && (
      <div className="p-3 text-sm text-gray-400">
        Searching...
      </div>
    )}

    {/* NO RESULTS */}


    {/* RESULTS */}
    {!loading && results.map((item) => (
      <div
        key={item._id}
        onClick={() => handleSelect(item._id)}
        className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer transition"
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">
            {item.name}
          </p>
          <p className="text-xs text-gray-500">
            {item.type === "product" ? "Product" : "Featured"}
          </p>
        </div>
      </div>
    ))}

  </div>
)}
        </div>
      )}
    </div>
  );
};

export default SearchBar;