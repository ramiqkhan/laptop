import React from 'react';

const WhatsAppFloatingButton = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      <a
        href="https://wa.me/923092794449"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-2xl shadow-[0_15px_30px_-5px_rgba(18,140,126,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(18,140,126,0.6)] hover:-translate-y-1.5 active:scale-95 transition-all duration-300 group"
        aria-label="Contact on WhatsApp"
      >
        {/* Premium Frosted Tooltip */}
        <div className="absolute right-20 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
          <div className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-2xl whitespace-nowrap border border-white/10">
            Chat with us
            {/* Tooltip Arrow */}
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-900/80 rotate-45 border-r border-t border-white/10"></div>
          </div>
        </div>

        {/* Official WhatsApp SVG Icon with slight drop shadow */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="34" 
          height="34" 
          fill="currentColor" 
          viewBox="0 0 24 24"
          className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.483 8.413-.003 6.557-5.338 11.892-11.893 11.892-1.972-.001-3.911-.496-5.631-1.432l-6.365 1.669zm6.335-3.094l.361.214a9.873 9.873 0 005.031 1.378h.004c5.449 0 9.882-4.433 9.885-9.884.001-2.64-1.03-5.122-2.893-6.989a9.824 9.824 0 00-6.988-2.898c-5.451 0-9.887 4.434-9.888 9.884-.001 2.096.547 4.142 1.51 5.26l.235.374-.998 3.648 3.741-.982zm11.138-7.859c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppFloatingButton;