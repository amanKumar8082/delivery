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

export const verifyOTP = async (phone: string, otp: string, role: string) => {
    try {
        console.log('OTP Verification:', phone, otp);
        const response = await axios.post(`${CUSTOMER_URL}/verify-code`, {
            phone,
            code: otp,
            role,
        });
        tokenStorage.set('accessToken', response.data.token);
        tokenStorage.set('refreshToken', response.data.refreshToken);
        const { setUser } = useAuthStore.getState();
        setUser(response.data.user);
        return response.data;
    } catch (error) {
        console.error('OTP Verification Error:', error);
        throw error;
    }
};

export const customerLogin = async (phone: string, password: string) => {
    try {
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

export const deliveryLogin = async (email: string, password: string, role: string) => {
    try {
        const response = await axios.post(`${CUSTOMER_URL}/login`, {
            email,
            password,
            role,
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
        console.log('Refetch User:', response.data);
        console.log('setUser:', setUser);
        setUser(response.data.user);
    }catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
};

export const refresh_tokens = async () => {
    try {
        const refreshToken = tokenStorage.getString('refreshToken');
        const user = useAuthStore.getState().user;
        if (!user) {
            throw new Error('User is not authenticated');
        }
        const response = await axios.post(`${CUSTOMER_URL}/refresh-token`, {
            refreshToken,
            phone: user.phone,
        });

        console.log('Refresh Token Response:', response.data);
        const new_access_token = response.data.token;

        tokenStorage.set('accessToken', response.data.token);
        tokenStorage.set('refreshToken', response.data.refreshToken);
        return new_access_token;
    } catch (error) {
        console.log('Refresh Token Error', error);
        tokenStorage.clearAll();
        resetAndNavigate('CustomerLogin');
    }
};
