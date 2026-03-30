import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo/bglogo.png' // Logo import kiya gaya hai

const PRIMARY_GOLD = '#D4AF37'
const BG_DARK = 'bg-[#0F172A]' 

function Footer() {
    // NavLinks paths matched with Navbar and Gaming Laptop page
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Laptops', path: '/laptops' }, 
        { name: 'Gaming Laptops', path: '/gaming' }, // Yeh aapke gaminglaptop component ko target karega
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

    return (
        <footer className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-6 mt-12 font-['Poppins',sans-serif]">
            <div className={`${BG_DARK} text-white rounded-[2rem] md:rounded-[2.5rem] px-6 md:px-12 pt-12 pb-8 shadow-2xl relative overflow-hidden`}>
                
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 relative z-10">
                    
                    {/* Column 1: Logo & About */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center group">
                            {/* "Scms" text hatakar logo ko bara kar diya hai */}
                            <img 
                                src={logo} 
                                alt="Logo" 
                                className="h-20 md:h-28 w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
                            />
                        </Link>
                        <p className="text-slate-400 text-[14px] leading-relaxed">
                            Pakistan's most trusted online laptop store. We provide high-end gaming machines and professional laptops at the best prices.
                        </p>
                        <div className="flex gap-3">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                                <a key={index} href="#" className="w-9 h-9 rounded-xl bg-slate-800/50 flex items-center justify-center hover:bg-[#D4AF37] hover:text-slate-900 transition-all hover:-translate-y-1 border border-slate-700/50">
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
                                    <NavLink 
                                        to={link.path} 
                                        className={({ isActive }) => 
                                            `text-[14px] transition-all duration-300 flex items-center gap-2 group ${isActive ? 'text-[#D4AF37] font-semibold' : 'text-slate-400 hover:text-[#D4AF37]'}`
                                        }
                                    >
                                        <span className="w-1 h-1 bg-current rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Customer Service */}
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

                    {/* Column 4: Contact & Newsletter */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-[#D4AF37] rounded-full"></span>
                            Get in Touch
                        </h4>
                        <ul className="space-y-4 text-slate-400 text-[14px]">
                            <li className="flex items-start gap-3 group">
                                <div className="p-2 rounded-lg bg-slate-800/50 text-[#D4AF37]">
                                    <MapPin size={18} />
                                </div>
                                <span className="group-hover:text-white transition-colors">Karachi, Sindh, Pakistan</span>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="p-2 rounded-lg bg-slate-800/50 text-[#D4AF37]">
                                    <Mail size={18} />
                                </div>
                                <span className="group-hover:text-white transition-colors break-all">support@scms.pk</span>
                            </li>
                        </ul>

                        <div className="pt-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Newsletter</label>
                            <div className="flex items-center gap-2 p-1.5 bg-slate-800/40 rounded-2xl border border-slate-700/50 focus-within:border-[#D4AF37] transition-all">
                                <input 
                                    type="email" 
                                    placeholder="Your email" 
                                    className="bg-transparent pl-3 py-2 text-[13px] focus:outline-none w-full"
                                />
                                <button className="bg-[#D4AF37] text-slate-900 font-bold px-5 py-2 rounded-xl text-[12px] hover:scale-105 transition-all active:scale-95 shadow-lg">
                                    GO
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[13px]">
                    <p>© 2026 <span className="text-white font-semibold">Scms</span>. Powered by Next-Gen Tech.</p>
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