import React, { useState, useEffect, useMemo } from 'react';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OrderConfirm from './Modal/OrderConfirm'; 

const Cart = () => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('globalCart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleConfirmOrder = () => {
        if (cartItems.length === 0) {
            alert("Please select a product first!");
        } else {
            setIsModalOpen(true);
        }
    };

    return (
        <div className="bg-[#F8F9FA] min-h-screen p-4 md:p-10 font-sans relative">
            <div className="max-w-[1300px] mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Cart</h1>
                
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
                                    className="mt-4 bg-[#D4AF37] text-white px-6 py-2 rounded-xl font-bold hover:brightness-105 transition-all"
                                >
                                    Go Shopping
                                </button>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto">
                                        <img src={item.img} alt={item.name} className="w-20 h-20 md:w-24 md:h-24 object-contain shrink-0" />
                                        <div className="flex-1">
                                            <h3 className="text-lg md:text-xl font-bold line-clamp-1">{item.name}</h3>
                                            <p className="text-gray-400 text-xs md:text-sm">Premium Laptop</p>
                                            <div className="flex text-yellow-400 text-[10px] md:text-xs mt-1">
                                                {"★".repeat(item.rating || 5)}
                                                <span className="text-gray-400 ml-1">({item.reviews || 12})</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between w-full sm:w-auto gap-4 md:gap-12 border-t sm:border-t-0 pt-4 sm:pt-0">
                                        <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-2 py-1">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-gray-100 rounded-md"><Minus size={14}/></button>
                                            <span className="font-bold w-4 text-center text-sm">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-gray-100 rounded-md"><Plus size={14}/></button>
                                        </div>
                                        <div className="text-right min-w-[100px] md:min-w-[120px]">
                                            <p className="text-lg md:text-xl font-bold text-nowrap">PKR {(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                        <button onClick={() => removeItem(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors shrink-0">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Summary Section */}
                    <div className="lg:w-[400px]">
                        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-24">
                            <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-slate-900">Order Summary</h2>
                            <div className="space-y-4 mb-8 md:mb-12">
                                <div className="flex justify-between text-base md:text-lg">
                                    <span className="font-semibold text-gray-700">Subtotal</span>
                                    <span className="font-bold">PKR {subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-base md:text-lg">
                                    <span className="font-semibold text-gray-700">Shipping</span>
                                    <span className="font-bold">PKR {shipping.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-base md:text-lg">
                                    <span className="font-semibold text-gray-700">Tax</span>
                                    <span className="font-bold">PKR {tax.toLocaleString()}</span>
                                </div>
                            </div>

                            <hr className="my-6 border-gray-100" />

                            <div className="flex justify-between items-center mb-6 md:mb-8">
                                <span className="text-lg md:text-xl font-bold">Total</span>
                                <span className="text-xl md:text-2xl font-black">PKR {total.toLocaleString()}</span>
                            </div>

                            <button 
                                onClick={handleConfirmOrder}
                                className="w-full py-3 md:py-4 bg-gradient-to-b from-[#F9C341] to-[#E2A11B] text-slate-900 text-base md:text-lg font-bold rounded-2xl shadow-lg hover:brightness-105 transition-all active:scale-95"
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
                orderNumber="#INV-2026-X" 
            />
        </div>
    );
};

export default Cart;