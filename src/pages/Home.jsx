import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import heroLaptop from '../assets/imgs/hero-1bg.png';
import brand1 from '../assets/logo/hp.png';
import brand2 from '../assets/logo/dellbg.png';
import brand3 from '../assets/logo/apple.png';
import brand4 from '../assets/logo/lenovo.jpg';
import brand5 from '../assets/logo/acerbg.png';
import brand6 from '../assets/logo/sonybg.png';
import brand7 from '../assets/logo/samsung.png';

import a1 from '../assets/logo/ss1.jpg';
import a2 from '../assets/logo/ac1.jpg';
import a3 from '../assets/logo/dd1.jpg';
import a4 from '../assets/logo/ll1.jpg';

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const brands = [
    { name: "", img: brand1, path: "/hp" },
    { name: "", img: brand2, path: "/dell" },
    { name: "", img: brand3, path: "/apple" },
    { name: "", img: brand4, path: "/lenovo" },
    { name: "", img: brand5, path: "/acer" },
    { name: "", img: brand6, path: "/sony" },
    { name: "", img: brand7, path: "/samsung" },
  ];

  const products = [
    { id: 1, name: "Samsung Galaxy Book Pro 360", price: "PKR 415,000", rating: 4, reviews: 324, img: a1 },
    { id: 2, name: "Acer Swift X14", price: "PKR 415,000", rating: 4, reviews: 324, img: a2 },
    { id: 3, name: "Alienware m18 R2", price: "PKR 415,000", rating: 4, reviews: 324, img: a3 },
    { id: 4, name: "Lenovo Legion Pro 7i", price: "PKR 415,000", rating: 4, reviews: 324, img: a4 },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + brands.length) % brands.length);
  };

  const getVisibleBrands = () => {
    let items = [];
    for (let i = 0; i < 4; i++) {
      items.push(brands[(currentIndex + i) % brands.length]);
    }
    return items;
  };

  return (
    <section className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-4 mt-2 md:mt-6 overflow-hidden">
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `}
      </style>

      {/* Main Banner */}
      <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-gradient-to-r from-[#A9D1F7] to-white border border-white/60 shadow-sm min-h-[350px] md:min-h-[450px] flex items-center">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-center px-4 md:px-16 relative z-10">
          
          <div className="text-center lg:text-left py-8 md:py-10">
            <h1 className="font-bold text-slate tracking-tight">
              {/* Main Heading - Adjusted for Mobile/Tablet/Laptop */}
              <span className="block text-[32px] sm:text-[45px] md:text-[50px] lg:text-[60px] leading-[1.1]">
                Next-Gen Gaming Laptops
              </span>
              {/* Subheading - Adjusted for Mobile/Tablet/Laptop */}
              <span className="block text-[20px] sm:text-[28px] md:text-[34px] lg:text-[45px] mt-2 md:mt-3 text-slate font-semibold leading-tight">
                Power Meets Performance
              </span>
            </h1>
            <Link to="/laptops" className="inline-block mt-6 md:mt-8 px-8 md:px-16 py-3 md:py-5 bg-gradient-to-r from-[#F4C430] to-[#d6a11e] text-slate-800 text-[14px] md:text-[18px] font-bold rounded-xl md:rounded-2xl shadow-xl hover:scale-105 transition-all tracking-widest active:scale-95 border-b-[4px] md:border-b-[5px] border-[#b8962d]">
              Shop Now
            </Link>
          </div>

          <div className="relative flex justify-center lg:justify-end pb-8 lg:pb-0">
            <img
              src={heroLaptop}
              alt="Laptop"
              className="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[550px] lg:max-w-[600px] object-contain drop-shadow-2xl animate-float"
            />
          </div>
        </div>
      </div>

      {/* Brand Buttons Section */}
      <div className="relative mt-8 md:mt-10">
        <div className="hidden md:flex items-center gap-4">
          <button onClick={prevSlide} className="p-2 rounded-full bg-white shadow-md border border-slate-100 hover:bg-[#F4C430] transition-all">
            <ChevronLeft size={24} />
          </button>

          <div className="grid grid-cols-4 gap-4 flex-1">
            {getVisibleBrands().map((item, index) => (
              <Link to={item.path} key={index} className="bg-white rounded-2xl shadow-md border border-[#E6E6E6] p-4 flex flex-col items-center justify-center group hover:shadow-xl transition-all h-32 lg:h-44">
                <div className="h-16 md:h-24 flex items-center justify-center mb-2">
                  <img src={item.img} alt="brand" className="max-h-full object-contain group-hover:scale-110 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <button onClick={nextSlide} className="p-2 rounded-full bg-white shadow-md border border-slate-100 hover:bg-[#F4C430] transition-all">
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="md:hidden space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {(showAllBrands ? brands : brands.slice(0, 4)).map((item, index) => (
              <Link to={item.path} key={index} className="bg-white rounded-xl shadow-sm border border-[#E6E6E6] p-3 flex items-center justify-center h-24">
                <img src={item.img} alt="brand" className="max-h-12 object-contain" />
              </Link>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => setShowAllBrands(!showAllBrands)}
              className="w-10 h-10 rounded-full bg-white border border-[#E6E6E6] flex items-center justify-center text-[#D4AF37]"
            >
              {showAllBrands ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>
      </div>

      <hr className="w-1/2 mx-auto mt-12 md:mt-16 mb-10 border-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
      
      {/* Featured Products Section */}
      <div className="mt-8 text-center">
        <h2 className="text-[24px] md:text-[40px] font-bold text-slate mb-8 md:mb-10">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl shadow-sm border border-[#E6E6E6] hover:shadow-md transition-all text-left flex flex-col">
              <div className="h-40 md:h-48 flex items-center justify-center mb-4 rounded-xl overflow-hidden">
                <img src={product.img} alt={product.name} className="max-h-full object-contain" />
              </div>
              <h3 className="text-md md:text-lg font-bold text-slate-800 truncate">{product.name}</h3>

              <div className="flex items-center mt-1 mb-3">
                <div className="flex text-orange-400 text-xs">
                  {"★".repeat(product.rating)}{"☆".repeat(5 - product.rating)}
                </div>
                <span className="text-slate-400 text-[10px] ml-2">({product.reviews})</span>
              </div>

              <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-md md:text-lg font-bold text-slate-900">{product.price}</span>
                <button className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-[#F4C430] to-[#d6a11e] text-slate-800 text-[11px] font-bold rounded-lg border-b-[3px] border-[#b8962d] uppercase">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <div className="w-full font-['Poppins','Inter',sans-serif] overflow-x-hidden">
      <Hero />
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-10">
        {/* Baaki sections */}
      </div>
    </div>
  );
}

export default Home;