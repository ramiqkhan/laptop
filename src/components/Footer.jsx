import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Globe } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo/bglogo.png' 

const PRIMARY_GOLD = '#D4AF37'
const BG_DARK = 'bg-[#0F172A]' 

const TikTokIcon = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
)

function Footer() {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Laptops', path: '/laptops' }, 
        { name: 'Gaming Laptops', path: '/gaming' },
        { name: 'Deals', path: '/deals' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' }
    ]

    const customerServiceLinks = [
        { name: 'Track Order', path: '/track-order' },
        { name: 'Return Policy', path: '/return-policy' }, 
        { name: 'Warranty', path: '/warranty' },
        { name: 'Payment Methods', path: '/payment-methods' },
        { name: 'Shipping Info', path: '/shipping-info' },
        { name: 'FAQs', path: '/faqs' }
    ]

    const socialLinks = [
        { Icon: Facebook, url: 'https://www.facebook.com/iqratraderspk' },
        { Icon: Instagram, url: 'https://www.instagram.com/iqratraderspk?igsh=MWl5MzhpN2ppN2hwMw==' },
        { Icon: TikTokIcon, url: 'https://www.tiktok.com/@iqratraders34?_r=1&_t=ZS-94Po67KBKc5' },
        { Icon: Globe, url: 'https://share.google/N292kb8eUMGND8VKH' }, 
    ]

    // Google Maps Search Link for External Navigation
    const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Iqra+Traders+Saddar+Karachi"
    
    // Embed URL for the visual map
    const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.123456789!2d67.026!3d24.860!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDUxJzM2LjAiTiA2N8KwMDEnMzMuNiJF!5e0!3m2!1sen!2spk!4v1712150000000!5m2!1sen!2spk"

    return (
        <footer className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-6 mt-12 font-['Poppins',sans-serif]">
            <div className={`${BG_DARK} text-white rounded-[2rem] md:rounded-[2.5rem] px-6 md:px-12 pt-12 pb-8 shadow-2xl relative overflow-hidden`}>
                
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 relative z-10">
                    
                    {/* Column 1: Logo & About */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center group">
                            <img src={logo} alt="Iqra Traders Logo" className="h-20 md:h-28 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
                        </Link>
                        <p className="text-slate-400 text-[14px] leading-relaxed">
                            Pakistan's most trusted online laptop store. We provide high-end gaming machines and professional laptops at the best prices.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map(({Icon, url}, index) => (
                                <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center hover:bg-[#D4AF37] hover:text-slate-900 transition-all hover:-translate-y-1 border border-slate-700/50">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="lg:pl-8">
                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-[#D4AF37] rounded-full"></span>
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <NavLink to={link.path} className={({ isActive }) => `text-[14px] transition-all duration-300 flex items-center gap-2 group ${isActive ? 'text-[#D4AF37] font-semibold' : 'text-slate-400 hover:text-[#D4AF37]'}`}>
                                        <span className="w-1 h-1 bg-current rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Support */}
                    <div className="lg:pl-4">
                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-[#D4AF37] rounded-full"></span>
                            Support
                        </h4>
                        <ul className="space-y-3">
                            {customerServiceLinks.map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className="text-slate-400 text-[14px] hover:text-[#D4AF37] transition-all flex items-center gap-2 group">
                                        <span className="w-1 h-1 bg-[#D4AF37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact & Interactive Map */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-[#D4AF37] rounded-full"></span>
                            Get in Touch
                        </h4>
                        <ul className="space-y-4 text-slate-400 text-[14px]">
                            <li className="flex items-center gap-3 group">
                                <div className="p-2 rounded-lg bg-slate-800/50 text-[#D4AF37]">
                                    <Phone size={18} />
                                </div>
                                <span className="group-hover:text-white transition-colors">
                                    0322-9299951 / 0323-9900866
                                </span>
                            </li>

                            <li className="flex flex-col gap-4">
                                <div className="flex items-start gap-3 group">
                                    <div className="p-2 rounded-lg bg-slate-800/50 text-[#D4AF37] shrink-0">
                                        <MapPin size={18} />
                                    </div>
                                    <span className="group-hover:text-white transition-colors leading-snug">
                                        Plot no 83, Saghir Hussain United Center, Saddar Karachi
                                    </span>
                                </div>

                                {/* Map Iframe Container */}
                                <div className="w-full h-40 rounded-2xl overflow-hidden border border-slate-700/50 relative group">
                                    <iframe 
                                        src={mapEmbedUrl}
                                        width="100%" 
                                        height="100%" 
                                        style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(0.2)' }} 
                                        allowFullScreen="" 
                                        loading="lazy"
                                        title="Store Location"
                                    ></iframe>
                                    <a 
                                        href={googleMapsUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors flex items-center justify-center"
                                    >
                                        <div className="bg-[#D4AF37] text-slate-900 px-3 py-1 rounded-lg text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                            CLICK TO NAVIGATE
                                        </div>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[13px]">
                    <p>© 2026 <span className="text-white font-semibold">Iqra Traders</span>. All Rights Reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;