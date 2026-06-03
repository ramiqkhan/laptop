import React, { useState, useEffect } from 'react'
import { Heart, ShoppingCart, Target, Menu, X, ShoppingBag } from 'lucide-react'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom' 
import logo from '../assets/logo/logo1.png' 
import SearchBar from './Searchbar'

const PRIMARY_COLOR = 'bg-[#D4AF37]'
const TEXT_DARK = 'text-slate-800'

const EmptyState = ({ title, message, onBrowse }) => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
        <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center border-2 border-dashed border-slate-200">
            <ShoppingBag size={48} className="text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-700">{title}</h3>
        <p className="text-slate-500 text-sm max-w-[250px]">{message}</p>
        <button 
            onClick={onBrowse}
            className="bg-[#D4AF37] text-white px-8 py-3 rounded-xl font-semibold hover:brightness-110 transition-all"
        >
            Browse Product
        </button>
    </div>
);

const Drawer = ({ isOpen, onClose, title, children }) => (
    <>
        <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={onClose} />
        <div className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800">{title}</h2>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} /></button>
            </div>
            <div className="p-6 h-[calc(100%-150px)] overflow-y-auto">{children}</div>
        </div>
    </>
);

function Navbar() {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const saved = localStorage.getItem('globalCart');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });
    
    const [wishlistCount, setWishlistCount] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [drawer, setDrawer] = useState({ isOpen: false, type: '' });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleCartUpdate = (e) => {
            try {
                const saved = localStorage.getItem('globalCart');
                const freshCart = saved ? JSON.parse(saved) : [];
                setCartItems(freshCart);
            } catch (err) {
                console.error("Cart sync error", err);
            }
            
            if (window.location.pathname !== '/cart') {
                setDrawer({ isOpen: true, type: 'Your Cart' });
            }
        };

        const handleWishlistUpdate = (e) => {
            const { increment } = e.detail || {};
            setWishlistCount(prev => increment ? prev + 1 : Math.max(0, prev - 1));
        };

        window.addEventListener('cartUpdated', handleCartUpdate);
        window.addEventListener('wishlistUpdated', handleWishlistUpdate);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
            window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
        };
    }, []);

    const openDrawer = (type) => setDrawer({ isOpen: true, type });
    const closeDrawer = () => setDrawer({ isOpen: false, type: '' });
    const handleBrowseClick = () => { closeDrawer(); navigate('/laptops'); };
    const handleCompareClick = () => { closeDrawer(); navigate('/compare'); };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Laptops', path: '/laptops' }, 
        { name: 'New Laptops', path: '/new-products' },
        { name: 'Gaming', path: '/gaming' }, 
        { name: 'Work Station', path: '/workstation' },
        { name: 'Deals', path: '/deals' },
        { name: 'About us', path: '/about' },
        { name: 'Contact', path: '/contact' }
    ]

    const bannerItems = [
      "🛡️ 1 Year Official Warranty on Selected Laptops",
      "💻 100% Genuine Products | No Refurbished Items",
      "📞 24/7 Expert Support for Your Tech Needs"
    ];

    return (
        <nav className="w-full bg-white shadow-sm border-b border-[#E6E6E6] font-['Poppins','Inter',sans-serif] sticky top-0 z-50">
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-container {
                    width: 100%;
                    overflow: hidden;
                    display: flex;
                }
                .marquee-track {
                    display: flex;
                    animation: marquee 25s linear infinite;
                    will-change: transform;
                    backface-visibility: hidden;
                }
            `}</style>
            
            <div className="w-full bg-white text-slate-900 py-2 marquee-container border-b border-slate-200">
                <div className="marquee-track">
                    {[...bannerItems, ...bannerItems].map((item, index) => (
                        <div key={index} className="flex items-center flex-shrink-0 whitespace-nowrap">
                            <span className="mx-6 text-xs md:text-sm font-semibold">
                                {item}
                            </span>
                            <span className="mx-4 opacity-30">•</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-4 sm:px-6 xl:px-12 py-1">
                <div className="max-w-[1750px] mx-auto flex items-center justify-between gap-2 xl:gap-4 w-full">
                    <div className="flex items-center gap-2">
                        {/* ✅ FIXED: Toggle button ab laptop screens (2xl se choti) par bhi show hoga */}
                        <button
                            className="2xl:hidden p-2 text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        
                        <Link 
                            to="/" 
                            className="flex items-center sm:gap-2 md:gap-2 group shrink-0"
                        >
                            {/* LOGO */}
                            <img 
                                src={logo} 
                                alt="IQRA Trader Logo" 
                                className="
                                  h-16 sm:h-20 md:h-24 lg:h-26 xl:h-28
                                  w-auto object-contain
                                  transition-transform duration-300
                                  group-hover:scale-105
                                "
                            />

                            {/* Divider */}
                            <div className="hidden sm:block w-[2px] h-6 sm:h-8 md:h-10 bg-gray-300 mx-1"></div>

                            {/* TEXT */}
                            <div className="flex flex-col leading-tight">
                                {/* Brand Name */}
                                <h1 className="text-[11px] sm:text-sm md:text-md lg:text-xl xl:text-2xl font-extrabold tracking-wide whitespace-nowrap">
                                    <span className="text-[#0F172A]">IQRA</span>
                                    <span className="bg-gradient-to-r from-[#8C5A14] via-[#C9972E] to-[#F2C94C] bg-clip-text text-transparent ml-1">
                                        TRADERS
                                    </span>
                                </h1>

                                {/* Tagline */}
                                <p className="text-[5.5px] xs:text-[7px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm text-gray-500 font-medium tracking-tight leading-[1] mt-0.5">
                                    Leading Trading Platform in Pakistan
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* ✅ FIXED: NavLinks ab normal laptop screens par hide hokar sirf '2xl' ultra-wide screens par dikhenge */}
                    <div className="hidden 2xl:flex flex-1 items-center justify-center gap-5 mx-2">
                        {navLinks.map((link) => (
                            <NavLink key={link.name} to={link.path} className={({ isActive }) => `text-[15px] transition-all duration-300 relative pb-1 whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D4AF37] after:transition-all hover:after:w-full ${isActive ? 'text-[#D4AF37] font-semibold after:w-full' : `font-medium ${TEXT_DARK} hover:text-[#D4AF37]`}`}>
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 xl:gap-4 shrink-0">
                        <div className="flex items-center gap-2 xl:gap-4">
                            {/* Search */}
                            <div className="hidden lg:flex items-center ml-2 xl:ml-6">
                                <SearchBar />
                            </div>

                            {/* Compare */}
                            <button onClick={handleCompareClick} className="relative cursor-pointer group p-1">
                                <Target className={`w-5 h-5 md:w-[22px] md:h-[22px] ${TEXT_DARK} group-hover:text-[#D4AF37]`} strokeWidth={1.8} />
                            </button>

                            {/* Cart */}
                            <button
                                onClick={() => openDrawer('Your Cart')}
                                className="relative cursor-pointer group p-1"
                            >
                                <ShoppingCart className={`w-5 h-5 md:w-[22px] md:h-[22px] ${TEXT_DARK} group-hover:text-[#D4AF37]`} strokeWidth={1.8} />
                                <span className={`absolute top-0 -right-1 min-w-[14px] h-[14px] px-1 rounded-full flex items-center justify-center text-[8px] font-bold text-white ${PRIMARY_COLOR} ring-2 ring-white`}>
                                    {cartItems?.length || 0}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ FIXED: Mobile & Laptop Responsive Dropdown Menu */}
            <div className={`2xl:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white ${isMenuOpen ? 'max-h-[450px] border-t border-slate-100 shadow-inner' : 'max-h-0'}`}>
                <div className="p-4 space-y-4">
                    {/* Laptop Screen Par Search Bar Chupa Hoga To Dropdown Me Dikhane K Liye */}
                    <div className="block lg:hidden mb-2">
                        <SearchBar />
                    </div>
                    <div className="flex flex-col space-y-1">
                        {navLinks.map((link) => (
                            <NavLink 
                                key={link.name} 
                                to={link.path} 
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) => `px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-between ${isActive ? 'bg-slate-50 text-[#D4AF37] border-l-4 border-[#D4AF37]' : 'text-slate-700 hover:bg-slate-50'}`}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>

            <Drawer isOpen={drawer.isOpen} onClose={closeDrawer} title={drawer.type}>
                 {(!cartItems || cartItems.length === 0) ? (
                    <EmptyState 
                        title="Your cart is empty" 
                        message="Looks like you haven't added anything to your cart yet." 
                        onBrowse={handleBrowseClick}
                    />
                ) : (
                    <div className="space-y-4">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex gap-4 p-3 border rounded-xl items-center">
                                <img src={item?.img} alt="" className="w-16 h-16 object-contain" />
                                <div>
                                    <h4 className="font-bold text-sm text-slate-800">{item?.name || 'Product'}</h4>
                                    <p className="text-[#D4AF37] font-bold text-sm">PKR {item?.price?.toLocaleString() || '0'}</p>
                                </div>
                            </div>
                        ))}
                        <button 
                            onClick={() => { closeDrawer(); navigate('/cart'); }}
                            className="w-full py-3 bg-[#D4AF37] text-white rounded-xl font-bold mt-4"
                        >
                            View Full Cart
                        </button>
                    </div>
                )}
            </Drawer>
        </nav>
    )
}

export default Navbar;