import React, { useState, useMemo } from 'react';

// Images Import
import lap1 from '../assets/imgs/brand1.png';
import lap2 from '../assets/imgs/brand2.png'; 

const Compare = () => {
  const allProducts = useMemo(() => [
    // --- LENOVO ---
    { id: 501, name: "Lenovo Legion 5 Pro Gen 8", price: 385000, specs: { processor: "AMD Ryzen 7 7745HX", ram: "16GB DDR5", storage: "512GB SSD", graphics: "RTX 4060", display: "16\" QHD 165Hz", os: "Windows 11" }, img: lap1 },
    { id: 502, name: "Lenovo ThinkPad X1 Carbon Gen 11", price: 415000, specs: { processor: "Intel Core i7-1355U", ram: "16GB", storage: "512GB SSD", graphics: "Integrated", display: "14\" FHD+", os: "Windows 11 Pro" }, img: lap2 },
    { id: 503, name: "Lenovo Yoga 7i Convertible", price: 235000, specs: { processor: "Intel Core i5-1335U", ram: "16GB", storage: "512GB SSD", graphics: "Integrated", display: "14\" Touch", os: "Windows 11" }, img: lap1 },
    { id: 504, name: "Lenovo IdeaPad Gaming 3", price: 185000, specs: { processor: "AMD Ryzen 5 7535HS", ram: "8GB", storage: "512GB SSD", graphics: "RTX 3050", display: "15.6\" 120Hz", os: "Windows 11" }, img: lap2 },
    { id: 505, name: "Lenovo LOQ 15 Gaming", price: 225000, specs: { processor: "Intel Core i5-12450H", ram: "16GB", storage: "512GB SSD", graphics: "RTX 4050", display: "15.6\" 144Hz", os: "Windows 11" }, img: lap1 },
    { id: 506, name: "Lenovo V15 Business Laptop", price: 95000, specs: { processor: "Intel Core i3-1215U", ram: "8GB", storage: "256GB SSD", graphics: "Integrated", display: "15.6\" FHD", os: "Windows 11" }, img: lap2 },
    ...Array.from({ length: 6 }, (_, i) => ({
        id: i + 507,
        name: `Lenovo ThinkBook Series ${i + 507}`,
        price: 140000 + (i * 15000),
        specs: { processor: "Intel Core i5", ram: "16GB", storage: "512GB SSD", graphics: "Integrated", display: "14\" FHD", os: "Windows 11" },
        img: i % 2 === 0 ? lap1 : lap2,
    })),

    // --- DELL ---
    { id: 401, name: "Dell XPS 13 Plus 9320", price: 425000, specs: { processor: "Intel Core i7-1360P", ram: "16GB", storage: "512GB SSD", graphics: "Integrated", display: "13.4\" OLED", os: "Windows 11" }, img: lap1 },
    { id: 402, name: "Dell G15 5530 Gaming", price: 215000, specs: { processor: "Intel Core i5-13450H", ram: "16GB", storage: "512GB SSD", graphics: "RTX 3060", display: "15.6\" 120Hz", os: "Windows 11" }, img: lap2 },
    { id: 403, name: "Dell Alienware m16 R2", price: 585000, specs: { processor: "Intel Core i9-13900HX", ram: "32GB", storage: "1TB SSD", graphics: "RTX 4070", display: "16\" QHD 240Hz", os: "Windows 11" }, img: lap1 },
    { id: 404, name: "Dell Inspiron 15 3520", price: 115000, specs: { processor: "Intel Core i3-1215U", ram: "8GB", storage: "256GB SSD", graphics: "Integrated", display: "15.6\" 120Hz", os: "Windows 11" }, img: lap2 },
    ...Array.from({ length: 6 }, (_, i) => ({
        id: i + 407,
        name: `Dell Latitude Professional Series ${i + 407}`,
        price: 130000 + (i * 12000),
        specs: { processor: "Intel Core i5", ram: "16GB", storage: "512GB SSD", graphics: "Integrated", display: "14\" FHD", os: "Windows 11" },
        img: i % 2 === 0 ? lap1 : lap2,
    })),

    // --- APPLE ---
    { id: 301, name: "MacBook Air 13-inch M2", price: 315000, specs: { processor: "Apple M2 Chip", ram: "8GB", storage: "256GB SSD", graphics: "8-Core GPU", display: "13.6\" Liquid Retina", os: "macOS" }, img: lap1 },
    { id: 302, name: "MacBook Pro 14-inch M3", price: 545000, specs: { processor: "Apple M3 Chip", ram: "16GB", storage: "512GB SSD", graphics: "10-Core GPU", display: "14.2\" XDR", os: "macOS" }, img: lap2 },
    { id: 303, name: "MacBook Pro 16-inch M3 Max", price: 980000, specs: { processor: "Apple M3 Max", ram: "32GB", storage: "1TB SSD", graphics: "30-Core GPU", display: "16.2\" XDR", os: "macOS" }, img: lap1 },
    ...Array.from({ length: 4 }, (_, i) => ({
        id: i + 307,
        name: `MacBook Pro Custom Build ${i + 307}`,
        price: 450000 + (i * 50000),
        specs: { processor: "Apple M2 Pro", ram: "16GB", storage: "1TB SSD", graphics: "16-Core GPU", display: "14\" Liquid Retina", os: "macOS" },
        img: i % 2 === 0 ? lap1 : lap2,
    })),

    // --- ACER ---
    { id: 201, name: "Acer Nitro 5 Gaming", price: 165000, specs: { processor: "Intel Core i5-12500H", ram: "8GB", storage: "512GB SSD", graphics: "RTX 3060", display: "15.6\" 144Hz", os: "Windows 11" }, img: lap2 },
    { id: 205, name: "Acer Triton 500 SE", price: 480000, specs: { processor: "Intel Core i9-12900H", ram: "32GB", storage: "1TB SSD", graphics: "RTX 3070 Ti", display: "16\" 240Hz", os: "Windows 11" }, img: lap2 },
    ...Array.from({ length: 6 }, (_, i) => ({
        id: i + 207,
        name: `Acer Extensa Professional ${i + 207}`,
        price: 110000 + (i * 8000),
        specs: { processor: "Intel Core i3", ram: "8GB", storage: "256GB SSD", graphics: "Integrated", display: "15.6\" FHD", os: "Windows 11" },
        img: i % 2 === 0 ? lap1 : lap2,
    })),

    // --- HP ---
    { id: 101, name: "HP Victus 15 Gaming", price: 185000, specs: { processor: "Intel Core i5-13420H", ram: "16GB", storage: "512GB SSD", graphics: "RTX 3050", display: "15.6\" 144Hz", os: "Windows 11" }, img: lap1 },
    { id: 103, name: "HP Omen 16 High Performance", price: 325000, specs: { processor: "Intel Core i7-13700HX", ram: "16GB", storage: "512GB SSD", graphics: "RTX 4060", display: "16.1\" 165Hz", os: "Windows 11" }, img: lap1 },

    // --- SONY ---
    { id: 701, name: "Sony Vaio Z Flagship", price: 450000, specs: { processor: "Intel Core i7-11375H", ram: "16GB", storage: "512GB SSD", graphics: "Integrated", display: "14\" 4K", os: "Windows 11" }, img: lap1 },
  ], []);

  const [selectedProduct1, setSelectedProduct1] = useState(allProducts[0]);
  const [selectedProduct2, setSelectedProduct2] = useState(allProducts[1]);

  const specKeys = Object.keys(allProducts[0].specs);
  const compareList = [selectedProduct1, selectedProduct2];

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-6 font-['Poppins'] bg-white">
      
      {/* Premium Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
            Compare <span className="text-[#b8962d]">Products</span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm font-medium italic">Explore {allProducts.length} devices</p>
        </div>
        
        <div className="relative flex items-center bg-slate-50 p-2 rounded-[2rem] border border-slate-200 shadow-inner w-full md:w-auto">
          {/* Product 1 Select */}
          <div className="relative flex-1 md:w-56">
            <select 
              className="w-full appearance-none bg-white border border-slate-200 rounded-[1.5rem] py-2.5 px-4 pr-10 text-[10px] md:text-xs font-bold text-slate-700 shadow-sm focus:border-[#b8962d] outline-none transition-all cursor-pointer"
              value={selectedProduct1.id}
              onChange={(e) => setSelectedProduct1(allProducts.find(p => p.id === parseInt(e.target.value)))}
            >
              {allProducts.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>

          {/* VS Badge */}
          <div className="z-10 -mx-3 bg-[#b8962d] text-white w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black italic shadow-lg border-2 border-white shrink-0">
            VS
          </div>

          {/* Product 2 Select */}
          <div className="relative flex-1 md:w-56">
            <select 
              className="w-full appearance-none bg-white border border-slate-200 rounded-[1.5rem] py-2.5 px-4 pr-10 text-[10px] md:text-xs font-bold text-slate-700 shadow-sm focus:border-[#b8962d] outline-none transition-all cursor-pointer"
              value={selectedProduct2.id}
              onChange={(e) => setSelectedProduct2(allProducts.find(p => p.id === parseInt(e.target.value)))}
            >
              {allProducts.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Table Container */}
      <div className="overflow-hidden rounded-2xl md:rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl">
        
        {/* Product Cards Header */}
        <div className="grid grid-cols-2 md:grid-cols-3 bg-white border-b border-slate-100">
          <div className="hidden md:flex items-center p-8 bg-slate-50/50">
             <span className="text-xs font-black text-black uppercase tracking-widest">Specifications</span>
          </div>

          {compareList.map((product, index) => (
            <div key={`${product.id}-${index}`} className="p-4 md:p-8 flex flex-col items-center border-r last:border-r-0 border-slate-100">
              <div className="h-24 md:h-40 w-full flex items-center justify-center mb-3">
                <img src={product.img} alt={product.name} className="max-h-full object-contain drop-shadow-lg" />
              </div>
              <h3 className="font-bold text-black text-[11px] md:text-lg text-center leading-tight mb-2 h-10 md:h-auto overflow-hidden">{product.name}</h3>
              <div className="text-[#d6a11e] font-black text-xs md:text-xl">PKR {product.price.toLocaleString()}</div>
            </div>
          ))}
        </div>

        {/* Specifications Rows */}
        {specKeys.map((key) => (
          <div key={key} className="flex flex-col md:grid md:grid-cols-3 border-b border-slate-50 last:border-0">
            <div className="bg-slate-50/80 md:bg-white p-2 md:p-6 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-100">
              <span className="text-[10px] md:text-sm font-bold text-slate-500 md:text-black uppercase md:capitalize tracking-wider">{key}</span>
            </div>
            
            <div className="grid grid-cols-2 col-span-2">
              <div className="p-4 md:p-6 text-center border-r border-slate-100 text-black text-[10px] md:text-sm font-medium">
                {selectedProduct1.specs[key] || "N/A"}
              </div>
              <div className="p-4 md:p-6 text-center text-black text-[10px] md:text-sm font-medium">
                {selectedProduct2.specs[key] || "N/A"}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold">
         Iqra Traders Comparison Tool
      </div>
    </div>
  );
};

export default Compare;