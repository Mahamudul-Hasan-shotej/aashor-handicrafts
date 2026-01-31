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

export type Category = 'Electronics' | 'Fashion' | 'Home' | 'Accessories';
