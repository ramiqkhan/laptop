import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, ArrowLeft, Box, Cpu, HardDrive, Layout, 
  ShoppingCart, CreditCard, ShieldCheck, Truck, Monitor, Zap, Star,
  ChevronUp, ChevronDown 
} from 'lucide-react';
import brand1 from '../assets/logo/hp.png';
import brand2 from '../assets/logo/dellbg.png';
import brand3 from '../assets/logo/apple.png';
import brand4 from '../assets/logo/lenovo.jpg';
import brand5 from '../assets/logo/acerbg.png';
import brand6 from '../assets/logo/sonybg.png';
import brand7 from '../assets/logo/samsung.png';
import heroLaptop from '../assets/imgs/hero-1bg.png';
import FeaturedProducts from '../components/Featurecomp';
import banner1 from '../assets/banner.jpeg';
import banner2 from '../assets/banners.jpeg';
import banner3 from '../assets/bannerss.jpeg';

import LaptopPages from '../components/laptopbanner';
import GamingBanner from '../components/gamingbanner';
import WorkBanner from '../components/workbanner';
import NewBanner from '../components/neworkbanner';
import ProductReviews from '../components/ProductReviews';

const images = [banner1, banner2, banner3];
const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [products, setProducts] = useState([]);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Changes image every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [images.length]);

  const brands = [
    { name: "HP", img: typeof brand1 !== 'undefined' ? brand1 : "", path: "/hp" },
    { name: "Dell", img: typeof brand2 !== 'undefined' ? brand2 : "", path: "/dell" },
    { name: "Apple", img: typeof brand3 !== 'undefined' ? brand3 : "", path: "/apple" },
    { name: "Lenovo", img: typeof brand4 !== 'undefined' ? brand4 : "", path: "/lenovo" },
    { name: "Acer", img: typeof brand5 !== 'undefined' ? brand5 : "", path: "/acer" },
    { name: "Sony", img: typeof brand6 !== 'undefined' ? brand6 : "", path: "/sony" },
    { name: "Samsung", img: typeof brand7 !== 'undefined' ? brand7 : "", path: "/samsung" },
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

  useEffect(() => {
    setActiveImgIndex(0);
  }, [selectedProduct]);

  const renderImage = (product, index = 0) => {
    if (!product) return "https://via.placeholder.com/600x400?text=No+Image";
    
    const targetImage = (product.images && product.images.length > 0) 
      ? product.images[index] 
      : product.image;

    if (!targetImage) return "https://via.placeholder.com/600x400?text=No+Image";
    if (typeof targetImage === 'string') return targetImage;

    try {
      const rawData = targetImage.data?.data || targetImage.data;
      if (!rawData) return "https://via.placeholder.com/600x400?text=No+Data";
      const binary = new Uint8Array(rawData);
      let binaryString = "";
      for (let i = 0; i < binary.length; i++) {
        binaryString += String.fromCharCode(binary[i]);
      }
      return `data:${targetImage.contentType || 'image/jpeg'};base64,${btoa(binaryString)}`;
    } catch (err) { 
      return "https://via.placeholder.com/600x400?text=Error"; 
    }
  };

  const handleAddToCart = (product, silent = false) => {
    if (!product) return;
    try {
      const savedCart = localStorage.getItem('globalCart');
      let currentCart = savedCart ? JSON.parse(savedCart) : [];
      const productId = product._id || product.id;
      const productImage = renderImage(product, 0);

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
    } catch (e) { console.error(e); }
  };

  const handleBuyNow = (product) => {
    handleAddToCart(product, true);
    navigate('/cart');
  };

  return (
 
        /* --- CATALOG LAYOUT STORE FRONT (BANNER MOVED HERE) --- */
        <>
          {/* ✅ THE BANNER SLIDER IS NOW INSIDE THE MAIN STORE CATALOG ENVIRONMENT */}
          <div className="relative w-full aspect-[16/9] mb-10 overflow-hidden">
            <Link to="/deals" className="block w-full h-full">
              {images?.length > 0 ? (
                images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Banner ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out ${
                      index === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ zIndex: index === currentImageIndex ? 1 : 0 }}
                  />
                ))
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  Loading Banners...
                </div>
              )}
            </Link>
            {images?.length > 0 && (
              <div className="absolute bottom-4 left-0 right-0 flex mb-6 justify-center items-center gap-2 z-20">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentImageIndex
                        ? "w-6 h-2 bg-white"
                        : "w-2 h-2 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <section className="relative w-full max-w-[1900px] mx-auto px-4 lg:px-12 py-4 mt-6">
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

            <div className="mt-20">
              <LaptopPages setSelectedProduct={setSelectedProduct} />
              <NewBanner setSelectedProduct={setSelectedProduct} />
              <GamingBanner setSelectedProduct={setSelectedProduct} />
              <WorkBanner setSelectedProduct={setSelectedProduct} />
              <FeaturedProducts setSelectedProduct={setSelectedProduct} />
            </div>
          </section>
        </>
      )}



const SpecBox = ({ icon, label, value }) => (
  <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-[#F4C430] transition-colors group">
    <div className="text-[#0F172A] mb-1 group-hover:scale-110 transition-transform">{icon}</div>
    <p className="text-[9px] uppercase font-black text-gray-400 tracking-tighter mb-0.5">{label}</p>
    <p className="text-[11px] font-bold text-slate-800 line-clamp-1">{value || "N/A"}</p>
  </div>
);

export default Home;