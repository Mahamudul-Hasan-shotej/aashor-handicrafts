import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import { products } from '../data/products';

const Shop: React.FC = () => {
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // State for filters
    const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam || 'All');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
    const [sortBy, setSortBy] = useState<string>('newest');

    // Filter products
    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (selectedCategory && selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }

        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        if (sortBy === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        }
        // Default 'newest' uses original order or id for now

        return result;
    }, [selectedCategory, priceRange, sortBy]);

    const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row gap-12">
                {/* Sidebar Filters */}
                <aside className={`md:w-1/4 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
                    <div className="space-y-8 sticky top-24">
                        <div>
                            <h3 className="text-sm uppercase tracking-widest font-bold mb-4 border-b border-gray-200 pb-2">Category</h3>
                            <ul className="space-y-3">
                                {categories.map(cat => (
                                    <li key={cat}>
                                        <button
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`text-sm hover:text-secondary transition-colors ${selectedCategory === cat ? 'text-secondary font-medium' : 'text-gray-600'}`}
                                        >
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm uppercase tracking-widest font-bold mb-4 border-b border-gray-200 pb-2">Price</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>${priceRange[0]}</span>
                                    <span>${priceRange[1]}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="3000"
                                    step="50"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                                />
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="md:w-3/4 w-full">
                    {/* Toolbar */}
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                        <span className="text-sm text-gray-500">{filteredProducts.length} Products</span>

                        <div className="flex items-center space-x-4">
                            <button
                                className="md:hidden flex items-center space-x-1 text-sm text-gray-600"
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            >
                                <Filter size={16} />
                                <span>Filter</span>
                            </button>

                            <div className="relative group">
                                <button className="flex items-center space-x-1 text-sm text-gray-800 hover:text-secondary">
                                    <span>Sort By</span>
                                    <ChevronDown size={14} />
                                </button>
                                {/* Dropdown would be implemented here, simple select for now to save time/complexity */}
                                <select
                                    className="absolute opacity-0 inset-0 cursor-pointer"
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="newest">Newest</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="group cursor-pointer">
                                <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-gray-50 aspect-[4/5] mb-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center">
                                        <span className="text-xs uppercase tracking-widest text-gray-800">View Details</span>
                                    </div>
                                </Link>
                                <div className="text-center space-y-1">
                                    <h4 className="text-sm font-medium text-gray-900 font-serif">{product.name}</h4>
                                    <p className="text-sm text-secondary">৳{product.price.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}

                        {filteredProducts.length === 0 && (
                            <div className="col-span-full text-center py-20 text-gray-500">
                                No products found matching your criteria.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
