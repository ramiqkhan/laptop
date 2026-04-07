import React, { useState, useEffect, useMemo } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OrderConfirm from '../components/OrderConfirm';

const Cart = () => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('globalCart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('globalCart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        const handleCartUpdate = (event) => {
            const product = event.detail;
            setCartItems(prev => {
                const existing = prev.find(item => item.id === product.id);
                let newCart;
                if (existing) {
                    newCart = prev.map(item => 
                        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                    );
                } else {
                    newCart = [...prev, { ...product, quantity: 1 }];
                }
                return newCart;
            });
        };

        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, []);

    // --- CALCULATIONS ---
    const subtotal = useMemo(() => cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cartItems]);
    const shipping = cartItems.length > 0 ? 3500 : 0;
    const tax = cartItems.length > 0 ? (subtotal * 0.02) : 0;
    const total = subtotal + shipping + tax;

    const updateQuantity = (id, delta) => {
        setCartItems(prev => prev.map(item => 
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

  const handleConfirmOrder = async (userData) => {
    if (cartItems.length === 0) {
        alert("Please select a product first!");
        return;
    }

    setIsPending(true);
    try {
        const orderPayload = {
            userName: userData.userName,
            email: userData.email,
            phone: userData.phone,
            address: userData.address,
            paymentType: userData.paymentType,
            products: cartItems.map(item => ({
                productId: item._id || item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            totalAmount: total
        };

        const response = await fetch('https://laptopbackend-orpin.vercel.app/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderPayload),
        });

        const data = await response.json();

        if (response.ok) {
            setCartItems([]);
            localStorage.removeItem('globalCart');
            return data; 
        } else {
            throw new Error(data.error || "Order failed");
        }
    } catch (error) {
        alert(error.message);
        throw error;
    } finally {
        setIsPending(false);
    }
};

    return (
        <div className="bg-[#F8F9FA] min-h-screen p-4 md:p-10 font-sans relative">
            <div className="max-w-[1300px] mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-slate-900 uppercase italic tracking-tighter">Cart</h1>
                
                <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                    {/* Items Section */}
                    <div className="flex-1 space-y-4 md:space-y-6">
                        <h2 className="text-xl md:text-2xl font-bold mb-4">Shipping Cart</h2>
                        
                        {cartItems.length === 0 ? (
                            <div className="bg-white p-10 md:p-16 rounded-3xl text-center shadow-sm border border-gray-100 flex flex-col items-center">
                                <ShoppingBag size={64} className="text-slate-200 mb-4" />
                                <p className="text-lg md:text-xl font-medium text-slate-500">Your cart is empty.</p>
                                <button 
                                    onClick={() => navigate('/laptops')}
                                    className="mt-4 bg-[#0F172A] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#d6a11e] hover:text-black transition-all uppercase text-sm tracking-widest"
                                >
                                    Go Shopping
                                </button>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 group hover:shadow-md transition-all">
                                    <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto">
                                        <img src={item.img} alt={item.name} className="w-20 h-20 md:w-24 md:h-24 object-contain shrink-0 group-hover:scale-105 transition-transform" />
                                        <div className="flex-1">
                                            <h3 className="text-lg md:text-xl font-black text-slate-900 line-clamp-1 uppercase tracking-tighter italic">{item.name}</h3>
                                            <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest">{item.brand || "Premium"}</p>
                                            
                                            {/* Dynamic Rating */}
                                            <div className="flex items-center gap-1 mt-1 text-[#d6a11e]">
                                                <Star size={12} fill="currentColor" />
                                                <span className="text-gray-900 text-[11px] font-black ml-1">{item.rating || "0.0"}</span>
                                                <span className="text-gray-400 text-[10px] font-bold ml-1">(12)</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between w-full sm:w-auto gap-4 md:gap-12 border-t sm:border-t-0 pt-4 sm:pt-0">
                                        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-1.5 bg-gray-50">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-[#d6a11e] transition-colors"><Minus size={14}/></button>
                                            <span className="font-black w-6 text-center text-sm">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-[#d6a11e] transition-colors"><Plus size={14}/></button>
                                        </div>
                                        <div className="text-right min-w-[100px] md:min-w-[120px]">
                                            <p className="text-lg md:text-xl font-black text-slate-900 text-nowrap">PKR {(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                        <button onClick={() => removeItem(item.id)} className="text-red-500 hover:bg-red-50 p-2.5 rounded-full transition-all shrink-0">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Summary Section */}
                  {/* Summary Section */}
<div className="lg:w-[400px]">
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-24">
        <h2 className="text-xl md:text-2xl font-black mb-6 md:mb-8 text-slate-900 uppercase tracking-tighter italic">Order Summary</h2>
        <div className="space-y-4 mb-8 md:mb-10">
            <div className="flex justify-between text-base">
                <span className="font-bold text-gray-500 uppercase text-xs tracking-widest">Subtotal</span>
                <span className="font-black text-slate-900">PKR {subtotal.toLocaleString()}</span>
            </div>
            
            {/* Shipping Fee Display - Highlighted */}
            <div className="flex justify-between text-base items-center bg-blue-50/50 p-2 rounded-lg border border-blue-100">
                <span className="font-bold text-blue-700 uppercase text-xs tracking-widest">Shipping Fee</span>
                <span className="font-black text-blue-600">
                    {shipping > 0 ? `PKR ${shipping.toLocaleString()}` : "FREE"}
                </span>
            </div>

            <div className="flex justify-between text-base">
                <span className="font-bold text-gray-500 uppercase text-xs tracking-widest">Estimated Tax (2%)</span>
                <span className="font-black text-slate-900">PKR {tax.toLocaleString()}</span>
            </div>
        </div>

        <div className="border-t-2 border-dashed border-gray-100 my-6"></div>

        <div className="flex justify-between items-center mb-8">
            <span className="text-lg font-black uppercase italic text-slate-900">Total</span>
            <span className="text-2xl font-black text-[#0F172A]">PKR {total.toLocaleString()}</span>
        </div>

        <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-4 bg-gradient-to-r from-[#d6a11e] via-[#F4C430] to-[#d6a11e] text-slate-900 text-sm font-black rounded-2xl shadow-[0_10px_20px_rgba(214,161,30,0.3)] hover:brightness-110 transition-all active:scale-95 uppercase tracking-[0.2em]"
        >
            Confirm Order
        </button>
    </div>
</div>
                </div>
            </div>

            <OrderConfirm 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={handleConfirmOrder}
                isPending={isPending}
                totalAmount={total}
            />
        </div>
    );
};

export default Cart;