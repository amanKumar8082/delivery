import{create}from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import { mmkvStorage } from './storage';

interface CartItem{
    _id: string|number;
    item: any;
    count: number;
}

interface cartStore{
    cart: CartItem[];
    addItem: (item: any) => void;
    removeItem: (id: string|number) => void;
    clearCart: () => void;
    getItemCount: (id: string|number) => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<cartStore>()(
    persist(
        (set, get) => ({
            cart: [],
            addItem: (item) => {
                const index = get().cart.findIndex((cartItem) => cartItem._id === item._id);
                if(index === -1){
                    set({cart: [...get().cart, {_id: item._id, item, count: 1}]});
                }else{
                    const cart = get().cart.map((cartItem) => {
                        if(cartItem._id === item._id){
                            return {...cartItem, count: cartItem.count + 1};
                        }
                        return cartItem;
                    });
                    set({cart});
                }
            },
            removeItem: (id) => {
                const cart = get().cart.map((cartItem) => {
                    if (cartItem._id === id) {
                        if (cartItem.count > 1) {
                            return { ...cartItem, count: cartItem.count - 1 };
                        } else {
                            return null;
                        }
                    }
                    return cartItem;
                }).filter(cartItem => cartItem !== null);
                set({cart});
            },
            clearCart: () => {
                set({cart: []});
            },
            getItemCount: (id) => {
                const currentItem = get().cart.find((cartItem) => cartItem._id === id);
                return currentItem?.count || 0;
            },
            getTotalPrice: () => {
                return get().cart.reduce((total, cartItem) => total + (cartItem.item.price * cartItem.count), 0);
            },
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => mmkvStorage),
        }
    ),
);
