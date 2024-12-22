import {appAxios} from './apiInterceptor';
import { SHOPPING_URL } from './config';

export const createOrder = async (products: any[], total: number, address: any) => {
    try {
        const response = await appAxios.post(`${SHOPPING_URL}/order`, {
            products,
            total,
            address,
        });
        return response.data;
    }catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
};

export const getOrderByID = async (id: string) => {
    try {
        const response = await appAxios.get(`${SHOPPING_URL}/order/${id}`);
        return response.data;
    }catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
};
