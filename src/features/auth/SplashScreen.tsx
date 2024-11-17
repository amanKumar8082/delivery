import { View, Image, StyleSheet, Alert } from 'react-native';
import React, { FC, useEffect } from 'react';
import { Colors } from '@utils/Constants';
import { screenHeight } from '@utils/Scaling';
import Logo from '@assets/images/splash_logo.jpeg';
import GeoLocation from '@react-native-community/geolocation';
import { useAuthStore } from '@state/authStore';
import { tokenStorage } from '@state/storage';
import { resetAndNavigate } from '@utils/NavigationUtils';
import { jwtDecode } from 'jwt-decode';
import { refetchUser, refresh_tokens } from '@service/authService';

GeoLocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    enableBackgroundLocationUpdates: true,
    locationProvider: 'auto',
});

interface DecodedToken{
    exp: number;
}

const SplashScreen: FC = () => {
    const tokenCheck = async () => {
        const accessToken = tokenStorage.getString('accessToken') as string;
        const refreshToken = tokenStorage.getString('refreshToken') as string;
        const user = useAuthStore.getState().user;

        if (accessToken) {
            const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
            const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

            const currentTime = Date.now() / 1000;

            if (decodedRefreshToken?.exp < currentTime) {
                resetAndNavigate('CustomerLogin');
                Alert.alert('Error', 'Session Expired Please login again');
                return false;
            }

            if (decodedAccessToken.exp < currentTime) {
                console.log('Access Token Expired');
                try {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const {setUser} = useAuthStore();
                    refresh_tokens();
                    await refetchUser(setUser);
                } catch (error) {
                    resetAndNavigate('CustomerLogin');
                    Alert.alert('Error', 'Session Expired Please login again');
                    return false;
                }
            }
            if (user?.role === 'customer') {
                resetAndNavigate('ProductDashboard');
            } else if (user?.role === 'delivery_partner') {
                resetAndNavigate('DeliveryDashboard');
            } else {
                resetAndNavigate('CustomerLogin');
            }
        }

        resetAndNavigate('CustomerLogin');
        return false;
    };



    // getting live location
    useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                GeoLocation.requestAuthorization();
                tokenCheck();
            } catch (error) {
                Alert.alert('Error', 'Sorry we need your location to give you the best experience');
            }
        };
        const timeoutId = setTimeout(() => {
            fetchUserLocation();
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }
    , []);

    // // getting live location

  return (
    <View style = {styles.container} >
      <Image source={Logo} style={styles.logoImage}/>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        height: screenHeight * 0.4,
        width: screenHeight * 0.4,
        resizeMode: 'contain',
    },
    });

export default SplashScreen;
