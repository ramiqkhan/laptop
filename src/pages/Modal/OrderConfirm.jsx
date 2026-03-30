import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderConfirm = ({ isOpen, onClose, orderNumber = "#123456" }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleContinue = () => {
    onClose();
    navigate('/'); 
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white w-full max-w-[95%] sm:max-w-[550px] md:max-w-[600px] rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-16 shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-8 sm:right-8 text-slate-900 hover:rotate-90 transition-transform duration-200 p-1"
        >
          <X size={24} className="sm:w-8 sm:h-8" strokeWidth={2.5} />
        </button>

        <div className="mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-24 sm:h-24 bg-[#f7b733] rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(247,183,51,0.4)]">
            <CheckCircle2 size={36} className="text-white sm:w-14 sm:h-14" strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-2 sm:mb-4 tracking-tight">
          Order Confirmed!
        </h1>
        
        <p className="text-slate-500 text-base sm:text-xl font-medium mb-6 sm:mb-8">
          Thank you for your purchase.
        </p>

        <div className="space-y-1 mb-6 sm:mb-10 text-sm sm:text-lg">
          <p className="text-slate-600">
            Your Order <span className="font-bold text-slate-900">{orderNumber}</span> has been placed successfully!
          </p>
          <p className="text-slate-600">
            <span className="font-bold text-slate-900">Estimated Delivery:</span> 3-6 Working Days
          </p>
        </div>

        <div className="w-full h-[1px] bg-slate-100 mb-6 sm:mb-10"></div>

        <button 
          onClick={handleContinue}
          className="w-full max-w-sm px-4 py-3 sm:py-5 bg-gradient-to-r from-[#F4C430] to-[#d6a11e] text-slate-800 text-sm sm:text-xl font-bold rounded-xl sm:rounded-2xl border-b-[3px] sm:border-b-[4px] border-[#b8962d] uppercase whitespace-nowrap hover:brightness-110 active:scale-95 transition-all mb-6 sm:mb-8 shadow-lg"
        >
          Continue Shopping
        </button>

        <div className="space-y-1 sm:space-y-2 px-2">
          <p className="text-slate-400 text-[10px] sm:text-sm font-medium leading-tight">
            A confirmation email has been sent to your email address.
          </p>
          <p className="text-slate-400 text-[10px] sm:text-sm font-medium">
            You can track your order in the <span className="text-[#fc9403] font-bold cursor-pointer hover:underline">My Orders</span> section.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;