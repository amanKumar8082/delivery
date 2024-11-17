import axios from 'axios';
import { BASE_URL } from './config';
import { tokenStorage } from '@state/storage';
import { refresh_tokens } from './authService';
import { Alert } from 'react-native';

export const appAxios = axios.create({
    baseURL: BASE_URL,
});

appAxios.interceptors.request.use(
    async (config) => {
        const accessToken = tokenStorage.getString('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

appAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    async error => {
        const originalRequest = error.config;
        if (error.response && error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await refresh_tokens();
                if (newAccessToken) {
                    error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                    return appAxios(error.config);
                }
            // eslint-disable-next-line no-catch-shadow, @typescript-eslint/no-shadow
            } catch (error) {
                console.log('Refresh Token Error', error);
            }
        }
        if (error.response && error.response.status !== 401) {
            const errorMessage = error.response.data.message || 'Something went wrong';
            Alert.alert('Error', errorMessage);
        }

        return Promise.resolve(error);
    },
);
