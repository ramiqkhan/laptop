import React, { useState } from 'react';
import { X, CheckCircle, Package, MapPin, CreditCard, User, Mail, Phone } from 'lucide-react';

const OrderConfirm = ({ isOpen, onClose, onConfirm, isPending, totalAmount }) => {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        phone: '', // Phone field
        address: '',
        paymentType: 'cash'
    });
    const [orderResult, setOrderResult] = useState(null);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await onConfirm(formData);
            if (result) {
                setOrderResult(result);
            }
        } catch (error) {
            // Error handled in Cart.js fetch
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl relative">
                
                {/* Close Button */}
                {!orderResult && (
                    <button 
                        onClick={onClose} 
                        className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                    >
                        <X size={20} className="text-gray-400" />
                    </button>
                )}

                {!orderResult ? (
                    <form onSubmit={handleSubmit} className="p-8 md:p-10">
                        <div className="mb-8">
                            <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Checkout Details</h2>
                            <p className="text-gray-500 text-sm font-medium">Please provide shipping and contact information.</p>
                        </div>

                        <div className="space-y-4">
                            {/* User Name */}
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    required
                                    name="userName"
                                    type="text"
                                    placeholder="Full Name"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#d6a11e] focus:ring-1 focus:ring-[#d6a11e] outline-none transition-all font-bold text-slate-800"
                                />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    required
                                    name="email"
                                    type="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#d6a11e] focus:ring-1 focus:ring-[#d6a11e] outline-none transition-all font-bold text-slate-800"
                                />
                            </div>

                            {/* Phone Number - New Field */}
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    required
                                    name="phone"
                                    type="tel"
                                    placeholder="Phone Number (e.g. 03xx-xxxxxxx)"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#d6a11e] focus:ring-1 focus:ring-[#d6a11e] outline-none transition-all font-bold text-slate-800"
                                />
                            </div>

                            {/* Address */}
                            <div className="relative">
                                <MapPin className="absolute left-4 top-4 text-gray-400" size={18} />
                                <textarea 
                                    required
                                    name="address"
                                    placeholder="Shipping Address (Street, City, Zip)"
                                    rows="3"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#d6a11e] focus:ring-1 focus:ring-[#d6a11e] outline-none transition-all font-bold text-slate-800 resize-none"
                                />
                            </div>

                            {/* Payment Type */}
                            <div className="relative">
                                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <select 
                                    name="paymentType"
                                    value={formData.paymentType}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#d6a11e] focus:ring-1 focus:ring-[#d6a11e] outline-none transition-all font-bold text-slate-800 appearance-none cursor-pointer"
                                >
                                    <option value="cash">Cash on Delivery</option>
                                    <option value="online">Online Payment (Beta)</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Payable Amount</span>
                                <span className="text-2xl font-black text-slate-900">PKR {totalAmount.toLocaleString()}</span>
                            </div>

                            <button 
                                type="submit"
                                disabled={isPending}
                                className="w-full py-4 bg-[#0F172A] text-white font-black rounded-2xl shadow-xl hover:bg-[#d6a11e] hover:text-black transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isPending ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Processing...
                                    </>
                                ) : 'Place Order Now'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="p-10 text-center animate-in zoom-in duration-300">
                        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={48} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-2">Order Success!</h2>
                        <p className="text-gray-500 font-medium mb-8">Thank you, {formData.userName}! Your machine is being prepared.</p>
                        
                        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left border border-gray-100">
                            <div className="flex items-center gap-3 mb-4 text-[#d6a11e]">
                                <Package size={20} />
                                <span className="font-black uppercase text-xs tracking-widest">Order Receipt</span>
                            </div>
                            
                            <div className="space-y-3">
                                {/* Order ID */}
                                <div className="flex justify-between border-b border-gray-200/50 pb-2">
                                    <span className="text-gray-400 text-[10px] font-bold uppercase">Order ID</span>
                                    <span className="text-slate-800 font-mono font-bold text-sm">
                                        #{orderResult.orderId || orderResult._id}
                                    </span>
                                </div>

                                {/* Customer Name */}
                                <div className="flex justify-between border-b border-gray-200/50 pb-2">
                                    <span className="text-gray-400 text-[10px] font-bold uppercase">Customer</span>
                                    <span className="text-slate-800 font-bold text-sm uppercase">
                                        {orderResult.userName}
                                    </span>
                                </div>

                                {/* Email & Phone */}
                                <div className="flex justify-between border-b border-gray-200/50 pb-2">
                                    <span className="text-gray-400 text-[10px] font-bold uppercase">Contact</span>
                                    <div className="text-right">
                                        <p className="text-slate-800 font-bold text-sm">{orderResult.email}</p>
                                        <p className="text-slate-500 font-medium text-xs">{orderResult.phone}</p>
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div className="flex flex-col gap-1 border-b border-gray-200/50 pb-2">
                                    <span className="text-gray-400 text-[10px] font-bold uppercase">Shipping Address</span>
                                    <span className="text-slate-700 font-medium text-xs leading-relaxed">
                                        {orderResult.address}
                                    </span>
                                </div>

                                {/* Shipping Fee - NEW ROW ADDED */}
                                <div className="flex justify-between border-b border-gray-200/50 pb-2">
                                    <span className="text-gray-400 text-[10px] font-bold uppercase">Shipping Fee</span>
                                    <span className="text-slate-800 font-bold text-sm">
                                        PKR {(orderResult.shippingFee || 3500).toLocaleString()}
                                    </span>
                                </div>

                                {/* Total Paid */}
                                <div className="flex justify-between pt-1">
                                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Total Paid</span>
                                    <span className="text-[#d6a11e] font-black text-base">
                                        PKR {orderResult.totalAmount.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => {
                                onClose();
                                window.location.href = "/";
                            }}
                            className="w-full py-4 bg-[#0F172A] text-white font-black rounded-2xl hover:bg-[#d6a11e] hover:text-black transition-all uppercase tracking-widest shadow-lg"
                        >
                            Return to Store
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderConfirm;