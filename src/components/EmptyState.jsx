import { ShoppingBag } from 'lucide-react';

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
      Browse Products
    </button>
  </div>
);

export default EmptyState;