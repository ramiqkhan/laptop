import React, { useState, useEffect } from 'react';

const Cookie = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already interacted
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // 2 second delay ke baad show hoga taake user experience kharab na ho
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAction = (status) => {
        localStorage.setItem('cookie-consent', status);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-[380px] z-[9999] animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="bg-[#0F172A] border border-[#b8962d]/50 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-6 backdrop-blur-sm">
                <div className="flex flex-col gap-4">
                    {/* Icon & Title */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#F4C430] to-[#d6a11e] rounded-lg flex items-center justify-center text-xl shadow-lg">
                            🍪
                        </div>
                        <h3 className="text-white font-bold text-lg tracking-tight">Cookie Settings</h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed">
                        We use cookies to enhance your shopping experience and provide you with personalized laptop deals. By clicking 'Accept All', you agree to our use of cookies.
                    </p>

                    {/* Buttons - Same as your laptop theme */}
                    <div className="flex gap-3 mt-2">
                        <button
                            onClick={() => handleAction('accepted')}
                            className="flex-1 bg-gradient-to-r from-[#F4C430] to-[#d6a11e] text-[#0F172A] font-extrabold py-2.5 rounded-xl text-xs uppercase tracking-wider border-b-[3px] border-[#b8962d] hover:brightness-110 active:border-b-0 active:translate-y-[2px] transition-all"
                        >
                            Accept All
                        </button>
                        <button
                            onClick={() => handleAction('declined')}
                            className="flex-1 bg-transparent border border-gray-700 text-gray-400 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-white/5 transition-colors"
                        >
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cookie;