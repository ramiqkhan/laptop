import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, CheckCircle2 } from 'lucide-react';

// Images Import
import lap1 from '../assets/imgs/brand1.png';
import lap2 from '../assets/imgs/brand2.png';

const ALL_PRODUCTS = [
    { id: 1, name: "HP Victus 15", price: 185000, rating: 5, reviews: 450, img: lap1, specs: ["Premium aluminum chassis", "Advanced cooling system", "Wi-Fi 6E connectivity", "RGB backlit keyboard", "Thunderbolt 4 support", "Dolby Atmos audio"], technical: { processor: "Intel Core i9-13900HX", ram: "32GB DDR5", storage: "1TB NVMe SSD", graphics: "NVIDIA RTX 4070", display: "16\" QHD 240Hz", os: "Windows 11 Pro" } },
    { id: 2, name: "Dell G15 Gaming", price: 210000, rating: 4, reviews: 120, img: lap2, specs: ["Premium aluminum chassis", "Advanced cooling system", "Wi-Fi 6E connectivity", "RGB backlit keyboard", "Thunderbolt 4 support", "Dolby Atmos audio"], technical: { processor: "Intel Core i7-13650HX", ram: "16GB DDR5", storage: "512GB NVMe SSD", graphics: "NVIDIA RTX 4050", display: "15.6\" FHD 165Hz", os: "Windows 11 Home" } },
    { id: 3, name: "Lenovo Legion 5", price: 325000, rating: 5, reviews: 89, img: lap1, specs: ["Premium aluminum chassis", "Advanced cooling system", "Wi-Fi 6E connectivity", "RGB backlit keyboard", "Thunderbolt 4 support", "Dolby Atmos audio"], technical: { processor: "AMD Ryzen 7 7745HX", ram: "16GB DDR5", storage: "1TB NVMe SSD", graphics: "NVIDIA RTX 4060", display: "16\" QHD 165Hz", os: "Windows 11 Pro" } },
    { id: 4, name: "Asus ROG Zephyrus", price: 450000, rating: 4, reviews: 310, img: lap2, specs: ["Premium aluminum chassis", "Advanced cooling system", "Wi-Fi 6E connectivity", "RGB backlit keyboard", "Thunderbolt 4 support", "Dolby Atmos audio"], technical: { processor: "Intel Core i9-13900H", ram: "32GB DDR5", storage: "1TB NVMe SSD", graphics: "NVIDIA RTX 4070", display: "14\" QHD 165Hz", os: "Windows 11 Pro" } },
    { id: 5, name: "Apple MacBook M2", price: 380000, rating: 5, reviews: 520, img: lap1, specs: ["Premium aluminum chassis", "Advanced cooling system", "Wi-Fi 6E connectivity", "RGB backlit keyboard", "Thunderbolt 4 support", "Dolby Atmos audio"], technical: { processor: "Apple M2 Chip", ram: "16GB Unified", storage: "512GB SSD", graphics: "10-Core GPU", display: "13.6\" Liquid Retina", os: "macOS Ventura" } },
    { id: 6, name: "Acer Nitro 5", price: 165000, rating: 3, reviews: 95, img: lap2, specs: ["Premium aluminum chassis", "Advanced cooling system", "Wi-Fi 6E connectivity", "RGB backlit keyboard", "Thunderbolt 4 support", "Dolby Atmos audio"], technical: { processor: "Intel Core i5-12500H", ram: "8GB DDR4", storage: "512GB SSD", graphics: "NVIDIA RTX 3050", display: "15.6\" FHD 144Hz", os: "Windows 11 Home" } },
];

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(false);

    const product = useMemo(() => {
        return ALL_PRODUCTS.find(p => p.id === parseInt(id)) || ALL_PRODUCTS[0];
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsLiked(false);
    }, [id]);

    const handleWishlist = () => {
        const newStatus = !isLiked;
        setIsLiked(newStatus);
        window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { increment: newStatus } }));
    };

    const handleAddToCart = () => {
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: product }));
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/cart');
    };

    return (
        <div className="bg-[#F8F9FA] min-h-screen font-sans pb-10 md:pb-20">
            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 py-4 md:py-6">

                {/* Header/Breadcrumbs */}
                <div className="flex flex-row justify-between items-center mb-6 md:mb-8 border-b border-gray-100 pb-4">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900">Gaming</h1>
                    <nav className="text-[9px] md:text-[11px] text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        <Link to="/" className="hover:text-black">Home</Link> /
                        <Link to="/gaming" className="hover:text-black">Gaming</Link> /
                        <span className="text-gray-900 font-bold truncate max-w-[80px] md:max-w-none">Details</span>
                    </nav>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-start">
                    {/* LEFT: Image Gallery */}
                    <div className="lg:sticky lg:top-6 space-y-4">
                        <div className="bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-10 flex items-center justify-center border border-gray-100 min-h-[300px] md:min-h-[450px] shadow-sm">
                            <img src={product.img} alt={product.name} className="max-h-[250px] md:max-h-[350px] object-contain hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="flex gap-2 md:gap-3 justify-start overflow-x-auto pb-2 no-scrollbar">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="min-w-[70px] md:min-w-[80px] h-[70px] md:h-[80px] bg-white border border-gray-200 rounded-xl p-2 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-all shadow-sm">
                                    <img src={product.img} alt="thumbnail" className="max-h-full object-contain opacity-70" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Product Details */}
                    <div className="flex flex-col space-y-4 md:space-y-6 pt-2 md:pt-4">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1 md:space-y-2">
                                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">{product.name}</h2>
                                <div className="flex items-center gap-2 md:gap-3">
                                    <div className="flex text-yellow-400 text-xs md:text-sm">
                                        {"★".repeat(4)}<span className="text-gray-200">★</span>
                                    </div>
                                    <span className="text-gray-400 text-[10px] md:text-xs font-medium">4.5/5 - {product.reviews} Reviews</span>
                                </div>
                            </div>
                            <button 
                                onClick={handleWishlist}
                                className={`p-2.5 md:p-3 rounded-full transition-all shadow-sm ${isLiked ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-red-400'}`}
                            >
                                <Heart fill={isLiked ? "currentColor" : "none"} size={20} className="md:w-6 md:h-6" />
                            </button>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Specs List */}
                        <div className="space-y-2 md:space-y-3">
                            {product.specs.map((spec, index) => (
                                <div key={index} className="flex items-center gap-2 md:gap-3 text-gray-600 text-xs md:text-sm">
                                    <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                                    <span className="leading-tight">{spec}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2 md:pt-4">
                            <p className="text-gray-400 text-[10px] md:text-sm font-medium mb-1 uppercase tracking-wider">Price</p>
                            <span className="text-3xl md:text-4xl font-bold text-gray-900">PKR {product.price.toLocaleString()}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                            <button 
                                onClick={handleAddToCart} 
                                className="w-full sm:flex-1 py-3.5 md:py-4 bg-[#1D58EF] text-white text-sm md:text-base font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg active:scale-95"
                            >
                                Add to Cart
                            </button>
                            <button 
                                onClick={handleBuyNow}
                                className="w-full sm:flex-1 py-3.5 md:py-4 bg-gradient-to-b from-[#F9C341] to-[#E2A11B] text-slate-900 text-sm md:text-base font-bold rounded-xl hover:brightness-105 transition-all shadow-lg active:scale-95"
                            >
                                Buy Now
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-2 md:gap-3 pt-4 md:pt-6">
                            {[
                                { icon: "📦", label: "Sourced" },
                                { icon: "🛡️", label: "Guarantee" },
                                { icon: "🚚", label: "Free Shipping" }
                            ].map((badge, idx) => (
                                <div key={idx} className="bg-white p-2.5 md:p-4 rounded-xl flex flex-col items-center text-center space-y-1 shadow-sm border border-gray-50">
                                    <span className="text-lg md:text-xl">{badge.icon}</span>
                                    <p className="text-[8px] md:text-[10px] font-bold text-gray-800 leading-tight uppercase">{badge.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SPECIFICATIONS TABLE */}
                <div className="mt-12 md:mt-16 bg-white rounded-2xl md:rounded-3xl border border-gray-100 overflow-hidden shadow-xl">
                    <div className="inline-block bg-blue-50 px-6 md:px-8 py-3 md:py-4 rounded-br-2xl md:rounded-br-3xl">
                        <h3 className="text-lg md:text-xl font-bold text-blue-900">Technical Specs</h3>
                    </div>
                    
                    <div className="p-5 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-20 gap-y-4 md:gap-y-6 text-xs md:text-sm">
                        {Object.entries(product.technical).map(([key, value]) => (
                            <div key={key} className="flex justify-between border-b border-gray-50 pb-2 md:pb-3">
                                <span className="text-gray-500 font-medium capitalize">{key}:</span>
                                <span className="text-gray-900 font-semibold text-right pl-4">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RELATED PRODUCTS */}
                <div className="mt-12 md:mt-20">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 flex items-center gap-2">
                        <span className="w-1.5 md:w-2 h-6 md:h-8 bg-blue-500 rounded-full"></span>
                        Customers also viewed
                    </h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                        {ALL_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map((item) => (
                            <Link to={`/product/${item.id}`} key={item.id} className="bg-white p-3 md:p-6 rounded-xl md:rounded-2xl border border-gray-100 hover:shadow-xl transition-all group">
                                <div className="h-24 md:h-32 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                                    <img src={item.img} alt={item.name} className="max-h-full object-contain" />
                                </div>
                                <h3 className="font-bold text-gray-800 text-[10px] md:text-sm truncate">{item.name}</h3>
                                <p className="text-blue-600 font-bold mt-1 text-[10px] md:text-sm">PKR {item.price.toLocaleString()}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;