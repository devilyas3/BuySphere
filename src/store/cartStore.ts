import {create} from "zustand";

interface CartState {
    cart: {
        id: number;
        title: string;
        price: number;
        image: string
    }[];
    addToCart: (product: any) => void;
    removeFromCart: (id: number) => void;
};

export const CartStore = create<CartState>((set) => ({
    cart: [],
    addToCart: (product) =>
        set((state) => ({
            cart: [...state.cart, product],
        })),
    removeFromCart: (id) =>
        set((state) => ({
            cart: state.cart.filter((product) => product.id !== id),
        })),
}));