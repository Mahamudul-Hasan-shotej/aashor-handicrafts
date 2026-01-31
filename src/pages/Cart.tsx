import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
    const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-6 py-20 text-center">
                <h2 className="text-3xl font-serif text-gray-900 mb-4">Your Shopping Bag is Empty</h2>
                <p className="text-gray-500 mb-8 font-light">Looks like you haven't added any luxury pieces yet.</p>
                <Link to="/shop" className="inline-block bg-gray-900 text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-secondary transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-12 text-center">Shopping Bag</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items */}
                <div className="lg:w-2/3">
                    <div className="hidden md:flex justify-between border-b border-gray-200 pb-4 mb-4 text-xs uppercase tracking-widest text-gray-500">
                        <span className="w-1/2">Product</span>
                        <span className="w-1/6 text-center">Quantity</span>
                        <span className="w-1/6 text-right">Total</span>
                        <span className="w-1/12 text-right"></span>
                    </div>

                    <ul className="divide-y divide-gray-100">
                        {items.map((item) => (
                            <li key={item.id} className="py-6 flex flex-col md:flex-row items-center gap-6">
                                <div className="flex items-center gap-6 w-full md:w-1/2">
                                    <div className="w-20 h-24 bg-gray-50 flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 font-serif mb-1">{item.name}</h3>
                                        <p className="text-xs text-secondary">৳{item.price.toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between w-full md:w-1/2">
                                    <div className="w-full md:w-1/3 flex justify-center">
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                            className="w-16 h-10 border border-gray-200 text-center text-sm"
                                        />
                                    </div>
                                    <div className="w-full md:w-1/3 text-right text-sm text-gray-900 font-medium">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                    <div className="w-full md:w-1/6 text-right">
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Summary */}
                <div className="lg:w-1/3">
                    <div className="bg-surface p-8">
                        <h2 className="text-lg font-serif text-gray-900 mb-6">Order Summary</h2>
                        <div className="space-y-4 text-sm text-gray-600 mb-6">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>৳{totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between pt-4 border-t border-gray-200 text-gray-900 font-medium text-base">
                                <span>Total</span>
                                <span>৳{totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <Link
                            to="/checkout"
                            className="block w-full bg-gray-900 text-white text-center py-4 text-sm uppercase tracking-widest hover:bg-secondary transition-colors"
                        >
                            Proceed to Checkout
                        </Link>

                        <div className="mt-6 text-center">
                            <Link to="/shop" className="text-xs uppercase tracking-widest text-gray-500 hover:text-gray-900 border-b border-gray-300 pb-1">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
