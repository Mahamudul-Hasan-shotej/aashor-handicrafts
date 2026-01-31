import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
    const { items, totalPrice } = useCart();
    const [isOrdered, setIsOrdered] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsOrdered(true);
    };

    if (items.length === 0 && !isOrdered) {
        return (
            <div className="container mx-auto px-6 py-20 text-center">
                <p>Your cart is empty.</p>
                <Link to="/shop" className="text-secondary underline">Go shopping</Link>
            </div>
        );
    }

    if (isOrdered) {
        return (
            <div className="container mx-auto px-6 py-20 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h2 className="text-3xl font-serif text-gray-900 mb-4">Order Placed Successfully</h2>
                <p className="text-gray-500 mb-8 font-light max-w-md mx-auto">
                    Thank you for your purchase. You will receive an email confirmation shortly with your order details.
                </p>
                <Link to="/" className="inline-block bg-gray-900 text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-secondary transition-colors">
                    Back to Home
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-3xl font-serif text-gray-900 mb-12 text-center">Checkout</h1>

            <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                {/* Form */}
                <div className="lg:w-3/5">
                    <h2 className="text-sm uppercase tracking-widest font-bold mb-6 pb-2 border-b border-gray-200">Shipping Details</h2>
                    <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-xs uppercase text-gray-500">First Name</label>
                                <input type="text" required className="w-full border border-gray-200 p-3 focus:outline-none focus:border-secondary transition-colors" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs uppercase text-gray-500">Last Name</label>
                                <input type="text" required className="w-full border border-gray-200 p-3 focus:outline-none focus:border-secondary transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs uppercase text-gray-500">Email Address</label>
                            <input type="email" required className="w-full border border-gray-200 p-3 focus:outline-none focus:border-secondary transition-colors" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs uppercase text-gray-500">Street Address</label>
                            <input type="text" required className="w-full border border-gray-200 p-3 focus:outline-none focus:border-secondary transition-colors" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-1">
                                <label className="text-xs uppercase text-gray-500">City</label>
                                <input type="text" required className="w-full border border-gray-200 p-3 focus:outline-none focus:border-secondary transition-colors" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs uppercase text-gray-500">State</label>
                                <input type="text" required className="w-full border border-gray-200 p-3 focus:outline-none focus:border-secondary transition-colors" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs uppercase text-gray-500">Zip Code</label>
                                <input type="text" required className="w-full border border-gray-200 p-3 focus:outline-none focus:border-secondary transition-colors" />
                            </div>
                        </div>

                        <div className="pt-8">
                            <h2 className="text-sm uppercase tracking-widest font-bold mb-6 pb-2 border-b border-gray-200">Payment</h2>
                            <div className="p-4 bg-gray-50 text-sm text-gray-600">
                                Payment integration is mocked for this demo. Just click "Place Order" to finish.
                            </div>
                        </div>
                    </form>
                </div>

                {/* Summary */}
                <div className="lg:w-2/5">
                    <div className="bg-surface p-8 sticky top-24">
                        <h3 className="text-lg font-serif text-gray-900 mb-6">Order Summary</h3>
                        <ul className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                            {items.map(item => (
                                <li key={item.id} className="flex gap-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover bg-gray-50" />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium font-serif">{item.name}</h4>
                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        <p className="text-sm text-secondary">৳{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="space-y-3 text-sm text-gray-600 mb-6 pt-6 border-t border-gray-200">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between font-medium text-gray-900 text-base pt-2">
                                <span>Total</span>
                                <span>৳{totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            form="checkout-form"
                            className="w-full bg-secondary text-white py-4 text-sm uppercase tracking-widest hover:bg-secondary-hover transition-colors shadow-sm"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
