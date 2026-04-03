import React, { useState, useEffect } from 'react'
import { Search, Heart, ShoppingCart, Target, Menu, X, ShoppingBag } from 'lucide-react'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom' 
import logo from '../assets/logo/bglogo.png' 

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
    // UPDATED: Added try-catch for safe parsing to prevent crash
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
    const [searchQuery, setSearchQuery] = useState('');
    const [drawer, setDrawer] = useState({ isOpen: false, type: '' });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleCartUpdate = (e) => {
            // UPDATED: Force refresh data from localStorage to ensure sync
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

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            if (searchQuery.trim()) {
                navigate(`/laptops?search=${encodeURIComponent(searchQuery)}`);
                setIsMenuOpen(false);
            }
        }
    };

    const openDrawer = (type) => setDrawer({ isOpen: true, type });
    const closeDrawer = () => setDrawer({ isOpen: false, type: '' });
    const handleBrowseClick = () => { closeDrawer(); navigate('/laptops'); };
    const handleCompareClick = () => { closeDrawer(); navigate('/compare'); };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Laptops', path: '/laptops' }, 
        { name: 'Gaming', path: '/gaming' }, 
        { name: 'Deals', path: '/deals' },
         { name: 'About us', path: '/about' }
    ]

    return (
        <nav className="w-full bg-white shadow-sm border-b border-[#E6E6E6] font-['Poppins','Inter',sans-serif] sticky top-0 z-50">
            <div className="px-4 md:px-6 py-1 md:py-1">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <button className="lg:hidden p-1 text-slate-800 hover:bg-slate-100 rounded-md transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <Link to="/" className="flex items-center group shrink-0">
                            <img 
                                src={logo} 
                                alt="Logo" 
                                className="h-20 md:h-24 w-auto object-contain group-hover:scale-105 transition-transform -my-2" 
                            />
                        </Link>
                    </div>

                    <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
                        {navLinks.map((link) => (
                            <NavLink key={link.name} to={link.path} className={({ isActive }) => `text-[15px] transition-all duration-300 relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D4AF37] after:transition-all hover:after:w-full ${isActive ? 'text-[#D4AF37] font-semibold after:w-full' : `font-medium ${TEXT_DARK} hover:text-[#D4AF37]`}`}>
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="relative hidden sm:block w-32 md:w-56 lg:w-72">
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                placeholder="Search laptops..." 
                                className="w-full pl-3 pr-10 py-1.5 bg-slate-50 text-[12px] rounded-lg border border-[#E6E6E6] focus:border-[#D4AF37] outline-none transition-all" 
                            />
                            <button onClick={handleSearch} className={`absolute right-1 top-1 p-1.5 rounded-md ${PRIMARY_COLOR} text-white hover:brightness-110 transition-all`}><Search size={12} /></button>
                        </div>

                        <div className="flex items-center gap-3 md:gap-4">
                            <button onClick={() => openDrawer('Wishlist')} className="relative cursor-pointer group">
                                <Heart className={`w-5 h-5 md:w-[22px] md:h-[22px] ${TEXT_DARK} group-hover:text-[#D4AF37]`} strokeWidth={1.8} />
                                {wishlistCount > 0 && <span className="absolute -top-1 -right-1.5 min-w-[14px] h-[14px] rounded-full flex items-center justify-center text-[8px] font-bold text-white bg-red-500 ring-2 ring-white">{wishlistCount}</span>}
                            </button>
                            
                            <button onClick={handleCompareClick} className="relative cursor-pointer group">
                                <Target className={`w-5 h-5 md:w-[22px] md:h-[22px] ${TEXT_DARK} group-hover:text-[#D4AF37]`} strokeWidth={1.8} />
                            </button>
                            
                            <button onClick={() => openDrawer('Your Cart')} className="relative cursor-pointer group">
                                <ShoppingCart className={`w-5 h-5 md:w-[22px] md:h-[22px] ${TEXT_DARK} group-hover:text-[#D4AF37]`} strokeWidth={1.8} />
                                <span className={`absolute -top-1 -right-1.5 min-w-[14px] h-[14px] px-1 rounded-full flex items-center justify-center text-[8px] font-bold text-white ${PRIMARY_COLOR} ring-2 ring-white`}>{cartItems?.length || 0}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white ${isMenuOpen ? 'max-h-[400px] border-t border-slate-100 shadow-inner' : 'max-h-0'}`}>
                <div className="p-4 space-y-4">
                    <div className="relative sm:hidden pb-2">
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            placeholder="Search..." 
                            className="w-full pl-4 pr-10 py-2 bg-slate-50 text-[14px] rounded-xl border border-slate-100 focus:border-[#D4AF37] outline-none" 
                        />
                        <button onClick={handleSearch} className="absolute right-3 top-2.5 text-slate-400"><Search size={18} /></button>
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

export default Navbar