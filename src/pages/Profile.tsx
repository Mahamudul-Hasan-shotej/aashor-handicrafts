import React from 'react';
import { useUser } from '../context/UserContext';
import { Package, User as UserIcon, LogOut, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
    const { user, orders, logout } = useUser();

    if (!user) {
        return (
            <div className="container mx-auto px-6 py-20 text-center">
                <h2 className="text-3xl font-serif text-gray-900 mb-4">Please Log In</h2>
                <p className="text-gray-500 mb-8">Access your profile and order history.</p>
                {/* Mock Login Button */}
                <button className="bg-gray-900 text-white px-8 py-3 uppercase tracking-widest text-sm" onClick={() => window.location.reload()}>
                    Login (Mock)
                </button>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-12">My Account</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Sidebar */}
                <aside className="lg:w-1/4 space-y-6">
                    <div className="bg-surface p-6 text-center">
                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                            <UserIcon size={32} />
                        </div>
                        <h2 className="font-serif text-xl font-medium">{user.name}</h2>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    <div className="border border-gray-100 rounded-lg overflow-hidden">
                        <button className="w-full text-left px-6 py-4 bg-gray-50 font-medium text-gray-900 border-b border-gray-100 flex items-center gap-3">
                            <UserIcon size={18} />
                            Profile Details
                        </button>
                        <button className="w-full text-left px-6 py-4 hover:bg-gray-50 text-gray-600 border-b border-gray-100 flex items-center gap-3">
                            <Package size={18} />
                            Orders
                        </button>
                        <button
                            onClick={logout}
                            className="w-full text-left px-6 py-4 hover:bg-gray-50 text-red-500 flex items-center gap-3"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="lg:w-3/4 space-y-12">
                    {/* Address Section */}
                    <section>
                        <h3 className="text-lg uppercase tracking-widest font-bold mb-6 pb-2 border-b border-gray-200">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white border border-gray-200 p-6 rounded-sm">
                                <h4 className="flex items-center gap-2 text-gray-900 font-medium mb-4">
                                    <MapPin size={18} /> Shipping Address
                                </h4>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {user.name}<br />
                                    {user.address.street}<br />
                                    {user.address.city}, {user.address.state} {user.address.zip}<br />
                                    Bangladesh
                                </p>
                                <button className="text-secondary text-sm mt-4 underline hover:text-gray-900">Edit Address</button>
                            </div>
                        </div>
                    </section>

                    {/* Order History */}
                    <section>
                        <h3 className="text-lg uppercase tracking-widest font-bold mb-6 pb-2 border-b border-gray-200">Order History</h3>

                        {orders.length === 0 ? (
                            <p className="text-gray-500">No orders yet.</p>
                        ) : (
                            <div className="space-y-6">
                                {orders.map((order) => (
                                    <div key={order.id} className="border border-gray-200 rounded-sm overflow-hidden">
                                        <div className="bg-gray-50 px-6 py-4 flex flex-wrap justify-between items-center text-sm gap-4">
                                            <div>
                                                <span className="text-gray-500 block text-xs uppercase">Order Placed</span>
                                                <span className="font-medium text-gray-900">{order.date}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block text-xs uppercase">Total</span>
                                                <span className="font-medium text-secondary">৳{order.total.toFixed(2)}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block text-xs uppercase">Order #</span>
                                                <span className="font-medium text-gray-900">{order.id}</span>
                                            </div>
                                            <div className="ml-auto">
                                                <Link to={`/order/${order.id}`} className="text-secondary hover:underline">View Details</Link>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                {order.items.map(item => (
                                                    <div key={item.id} className="flex gap-4">
                                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover bg-gray-100" />
                                                        <div>
                                                            <Link to={`/product/${item.id}`} className="text-sm font-medium text-gray-900 hover:text-secondary font-serif block">
                                                                {item.name}
                                                            </Link>
                                                            <p className="text-xs text-secondary mt-1">৳{item.price}</p>
                                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Profile;
