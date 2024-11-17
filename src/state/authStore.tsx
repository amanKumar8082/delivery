import{create}from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import { mmkvStorage } from './storage';

interface authStore{
    user: Record<string, any> | null;
    setUser: (user: any) => void;
    setCurrentOrder: (order: any) => void;
    currentOrder: Record<string, any> | null;
    logout: () => void;
}

export const useAuthStore = create<authStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (data) => set({user: data}),
            setCurrentOrder: (order) => set({currentOrder: order}),
            currentOrder: null,
            logout: () => {
                set({user: null});
                set({currentOrder: null});
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => mmkvStorage),
        }
    ),
);
