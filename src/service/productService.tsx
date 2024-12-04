import axios from 'axios';
import { PRODUCT_URL } from './config';

export const getAllCategories = async () => {
    try {
        const response = await axios.get(`${PRODUCT_URL}/get/categories`);
        // console.log('category response:', response?.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories', error);
        return [];
    }
};

export const getProductsByCategoryType = async (type: string) => {
    try {
        const response = await axios.get(`${PRODUCT_URL}/category/${type}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products by category type', error);
        return [];
    }
};
