import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Minus, Plus, Star, Truck, ShieldCheck, ArrowLeft, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import type { Product } from '../types';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState<string>('');

    useEffect(() => {
        const foundProduct = products.find((p) => p.id === id);
        if (foundProduct) {
            setProduct(foundProduct);
            setActiveImage(foundProduct.image);
        }
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    const handleAddToCart = () => {
        // In a real app we would pass quantity, but our context is simple
        // so we'll just add it multiple times or update logic later.
        // For now, let's just add one item 'quantity' times
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        // Show feedback or open cart sidebar
        alert(`Added ${quantity} ${product.name} to cart`);
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <button onClick={() => navigate(-1)} className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-900 mb-8">
                <ArrowLeft size={16} />
                <span>Back to Shop</span>
            </button>

            <div className="flex flex-col lg:flex-row gap-16">
                {/* Left: Images */}
                <div className="lg:w-3/5 space-y-4">
                    {/* Main Image */}
                    <div className="aspect-[4/5] bg-gray-50 relative overflow-hidden">
                        <img
                            src={activeImage}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Thumbnails (Mocking multiple views of same image for now) */}
                    <div className="grid grid-cols-4 gap-4">
                        {[product.image, product.image, product.image, product.image].map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(img)}
                                className={`aspect-square bg-gray-50 border ${activeImage === img && idx === 0 ? 'border-secondary' : 'border-transparent'} hover:border-gray-300 transition-colors`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Info */}
                <div className="lg:w-2/5 space-y-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-serif text-gray-900 leading-tight mb-2">{product.name}</h1>
                        <div className="flex items-center space-x-2 text-sm">
                            <div className="flex text-yellow-500">
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                            </div>
                            <span className="text-gray-500">({product.reviews} Reviews)</span>
                        </div>
                    </div>

                    <p className="text-2xl font-light text-secondary">৳{product.price.toFixed(2)}</p>

                    <div className="border-t border-b border-gray-100 py-6 space-y-6">
                        <p className="text-gray-600 font-light leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <span className="text-sm uppercase tracking-widest text-gray-900 w-20">Quantity</span>
                            <div className="flex items-center border border-gray-300">
                                <button
                                    className="p-3 hover:bg-gray-50"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="w-12 text-center text-sm">{quantity}</span>
                                <button
                                    className="p-3 hover:bg-gray-50"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-gray-900 text-white text-sm uppercase tracking-widest py-4 hover:bg-secondary transition-colors duration-300"
                            >
                                Add to Cart
                            </button>
                            <button className="p-4 border border-gray-300 hover:border-secondary hover:text-secondary transition-colors">
                                <Heart size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4 pt-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-3">
                            <Truck size={18} />
                            <span>Free shipping worldwide</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <ShieldCheck size={18} />
                            <span>2 Year Warranty included</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
