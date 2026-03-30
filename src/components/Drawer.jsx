import React from 'react';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Drawer = () => {
  // Context se state uthayi
  const { cartItems, removeFromCart, subtotal, isDrawerOpen, setIsDrawerOpen } = useCart();

  const onClose = () => setIsDrawerOpen(false);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity ${isDrawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
        onClick={onClose} 
      />
      
      {/* Drawer Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[70] transform transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag size={20} /> Cart ({cartItems.length})
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full"><X size={24} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 items-center bg-slate-50 p-3 rounded-2xl">
                <img src={item.img} className="w-16 h-12 object-contain" alt={item.name} />
                <div className="flex-1">
                  <h4 className="font-bold text-sm">{item.name}</h4>
                  <p className="text-xs text-blue-600 font-bold">PKR {item.price.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-500">Qty: {item.quantity}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-400"><Trash2 size={16}/></button>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t bg-slate-50">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Subtotal:</span>
            <span className="font-bold">PKR {subtotal.toLocaleString()}</span>
          </div>
          <Link to="/cart" onClick={onClose} className="block w-full text-center py-4 bg-slate-900 text-white font-bold rounded-xl">
            View Bill & Checkout
          </Link>
        </div>
      </div>
    </>
  );
};

export default Drawer;