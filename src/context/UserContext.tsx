import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User, Order } from '../types';

interface UserContextType {
    user: User | null;
    login: () => void;
    logout: () => void;
    orders: Order[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

// Mock Data
const MOCK_USER: User = {
    id: 'u1',
    name: 'Mahamudul Hasan',
    email: 'user@example.com',
    address: {
        street: '123 Artisian Way',
        city: 'Dhaka',
        state: 'Dhaka',
        zip: '1205'
    }
};

const MOCK_ORDERS: Order[] = [
    {
        id: 'ord_12345',
        date: '2024-01-15',
        total: 4700,
        status: 'Delivered',
        items: [
            {
                id: '1',
                name: 'Traditional Red Nakshi Kantha',
                price: 3500,
                description: '',
                category: 'Nakshi Kantha',
                image: 'https://images.unsplash.com/photo-1597113366853-fea190b6cd82?w=800&q=80',
                rating: 5,
                reviews: 0,
                available: true,
                quantity: 1
            },
            {
                id: '2',
                name: 'Baby Nakshi Kantha - Blue Lotus',
                price: 1200,
                description: '',
                category: 'Baby Nakshi Katha',
                image: 'https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?w=800&q=80',
                rating: 5,
                reviews: 0,
                available: true,
                quantity: 1
            }
        ]
    },
    {
        id: 'ord_67890',
        date: '2024-01-28',
        total: 1350,
        status: 'Processing',
        items: [
            {
                id: '3',
                name: 'Cotton Baby Nima Set (Pack of 3)',
                price: 450,
                description: '',
                category: 'Baby Nima Napi',
                image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=80',
                rating: 5,
                reviews: 0,
                available: true,
                quantity: 3
            }
        ]
    }
];

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(MOCK_USER); // Default logged in for demo
    const [orders] = useState<Order[]>(MOCK_ORDERS);

    const login = () => {
        setUser(MOCK_USER);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout, orders }}>
            {children}
        </UserContext.Provider>
    );
};
