export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: number;
    reviews: number;
    available: boolean;
}

export interface CartItem extends Product {
    quantity: number;
}

export type Category = 'Nakshi Kantha' | 'Baby Nakshi Katha' | 'Baby Nima Napi';

export interface User {
    id: string;
    name: string;
    email: string;
    address: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
}

export interface Order {
    id: string;
    date: string;
    total: number;
    status: 'Processing' | 'Shipped' | 'Delivered';
    items: CartItem[];
}
