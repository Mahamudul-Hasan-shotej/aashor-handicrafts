import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '../data/products';

const Home: React.FC = () => {
    const featuredProducts = products.slice(0, 4);

    return (
        <div className="space-y-20 pb-20">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center bg-gray-100 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1600&q=80"
                        alt="Traditional Handicrafts"
                        className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </div>

                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto space-y-6">
                    <h2 className="text-sm md:text-base uppercase tracking-[0.3em] font-light">Heritage Collection</h2>
                    <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight">
                        Art of Bengal
                    </h1>
                    <p className="text-lg md:text-xl font-light max-w-2xl mx-auto opacity-90">
                        Celebrate tradition with our exquisite Nakshi Kantha and handmade baby essentials. Crafted with love, woven with stories.
                    </p>
                    <div className="pt-8">
                        <Link
                            to="/shop"
                            className="inline-block bg-white text-gray-900 px-10 py-4 text-xs md:text-sm uppercase tracking-widest hover:bg-secondary hover:text-white transition-all duration-300"
                        >
                            Explore Collection
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Collection */}
            <section className="container mx-auto px-6">
                <div className="text-center mb-12 space-y-3">
                    <h2 className="text-sm uppercase tracking-widest text-gray-500">Handcrafted with Love</h2>
                    <h3 className="text-3xl font-serif text-gray-900">Featured Creations</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="group cursor-pointer">
                            <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-gray-50 aspect-[4/5] mb-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Quick action overlay */}
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
                </div>

                <div className="text-center mt-12">
                    <Link to="/shop" className="inline-flex items-center space-x-2 text-sm uppercase tracking-widest border-b border-gray-900 pb-1 hover:text-secondary hover:border-secondary transition-colors">
                        <span>View All Products</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

            {/* Story / About Section */}
            <section className="bg-surface py-20">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1596238686001-c882d8c34533?w=800&q=80"
                            alt="Artisan at work"
                            className="w-full h-auto shadow-sm"
                        />
                    </div>
                    <div className="md:w-1/2 space-y-6">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-900">Stitched with Tradition</h2>
                        <p className="text-gray-600 leading-relaxed font-light">
                            At Aashor, we bring you the finest Nakshi Kantha and handmade baby essentials directly from rural artisans.
                            Every stitch tells a story of heritage, patience, and skill. By choosing our products, you support the
                            livelihoods of talented women artisans and keep the ancient art of Bengal alive.
                        </p>
                        <Link to="/about" className="inline-block text-xs uppercase tracking-widest border bg-primary text-white px-8 py-3 hover:bg-secondary border-none transition-colors">
                            Our Story
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
