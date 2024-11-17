import { useAuthStore } from '@state/authStore';
import { tokenStorage } from '@state/storage';
import axios from 'axios';
import { CUSTOMER_URL } from './config';
import { resetAndNavigate } from '@utils/NavigationUtils';
import { appAxios } from './apiInterceptor';

export const sendOTP = async (phone: string) => {
    try {
        const response = await axios.post(`${CUSTOMER_URL}/send-otp`, {
            phone,
        });
        return response.data;
    } catch (error) {
        console.error('OTP Error:', error);
        throw error;
    }
};

export const customerLogin = async (phone: string, password: string) => {
    try {
        if (!password) {
            password = 'Aman@123';
        }
        const response = await axios.post(`${CUSTOMER_URL}/login`, {
            phone,
            password,
        });

        tokenStorage.set('accessToken', response.data.token);
        tokenStorage.set('refreshToken', response.data.refreshToken);
        const { setUser } = useAuthStore.getState();
        setUser(response.data.user);
    }catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
};

export const deliveryLogin = async (email: string, password: string) => {
    try {
        if (!password) {
            password = 'Aman@123';
        }
        const response = await axios.post(`${CUSTOMER_URL}/login`, {
            email,
            password,
        });

        tokenStorage.set('accessToken', response.data.token);
        tokenStorage.set('refreshToken', response.data.refreshToken);
        const { setUser } = useAuthStore.getState();
        setUser(response.data.user);
    }catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
};

export const refetchUser = async (setUser: any) => {
    try {
        const response = await appAxios.get(`${CUSTOMER_URL}/profile`);
        setUser(response.data.user);
    }catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
};

export const refresh_tokens = async () => {
    try {
        const refreshToken = tokenStorage.getString('refreshToken');
        const response = await axios.post(`${CUSTOMER_URL}/refresh-token`, {
            refreshToken,
        });

        const new_access_token = response.data.token;
        const new_refresh_token = response.data.refresToken;

        tokenStorage.set('accessToken', new_access_token);
        tokenStorage.set('refreshToken', new_refresh_token);
        return new_access_token;
    } catch (error) {
        console.log('Refresh Token Error', error);
        tokenStorage.clearAll();
        resetAndNavigate('CustomerLogin');
    }
};
