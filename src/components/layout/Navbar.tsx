import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Navbar: React.FC = () => {
    const { totalItems } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Nakshi Kantha', path: '/shop?category=Nakshi%20Kantha' },
        { name: 'Baby Items', path: '/shop?category=Baby%20Nima%20Napi' },
    ];

    return (
        <nav className="bg-white sticky top-0 z-50 border-b border-gray-100">
            {/* Top Bar for Promos */}
            <div className="bg-primary text-white text-xs text-center py-2 tracking-widest uppercase">
                Celebrating Bengali Craftsmanship | Free Shipping on Orders Over ৳2000
            </div>

            <div className="container mx-auto px-6 py-4 md:py-6 flex justify-between items-center transition-all duration-300">
                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-800"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Logo */}
                <Link to="/" className="text-2xl md:text-3xl font-serif font-bold tracking-widest text-gray-900">
                    AASHOR
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-8 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm uppercase tracking-widest hover:text-secondary transition-colors ${location.pathname === link.path ? 'text-secondary font-semibold' : 'text-gray-600'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-5">
                    <button className="text-gray-800 hover:text-secondary transition-colors">
                        <Search size={20} strokeWidth={1.5} />
                    </button>
                    <Link to="/profile" className="hidden sm:block text-gray-800 hover:text-secondary transition-colors">
                        <User size={20} strokeWidth={1.5} />
                    </Link>
                    <Link to="/cart" className="relative text-gray-800 hover:text-secondary transition-colors">
                        <ShoppingBag size={20} strokeWidth={1.5} />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 py-4 shadow-lg">
                    <div className="flex flex-col space-y-4 px-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-sm uppercase tracking-widest text-gray-800 py-2 border-b border-gray-50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
