import CustomText from '@components/ui/CustomText';
import { useAuthStore } from '@state/authStore';
import { Colors, Fonts } from '@utils/Constants';
import { replace } from '@utils/NavigationUtils';
import { screenWidth } from '@utils/Scaling';
import LottieView from 'lottie-react-native';
import React, { FC, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

const OrderSuccess: FC = () => {
    const {user} = useAuthStore();

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            replace('LiveTracking');
        }, 2300);
        return () => clearTimeout(timeOutId);
    }, []);

    return (
        <View style={styles.container}>
            <LottieView
                source={require('@assets/animations/confirm.json')}
                autoPlay
                duration={3000}
                loop={false}
                speed={1}
                style={styles.lottieView}
                enableMergePathsAndroidForKitKatAndAbove
                hardwareAccelerationAndroid
            />
            <CustomText variant="h8" fontFamily={Fonts.SemiBold} style={styles.orderPlacedText}>
                ORDER PLACED
            </CustomText>
            <View style={styles.deliveryContainer}>
                <CustomText variant="h4" fontFamily={Fonts.SemiBold} style={styles.deliveryText}>
                    Delivering to Home
                </CustomText>
            </View>
            <CustomText variant="h8" style={styles.addressText} fontFamily={Fonts.Medium}>
                {user?.address[0]?.completeAddress || 'Somewhere, Knowhere'}
            </CustomText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottieView: {
        width: screenWidth * 0.6,
        height: 150,
    },
    orderPlacedText: {
        opacity: 0.4,
    },
    deliveryContainer: {
        borderBottomWidth: 2,
        paddingBottom: 4,
        marginBottom: 5,
        borderColor: Colors.secondary,
    },
    deliveryText:{
        marginTop: 15,
        borderColor: Colors.secondary,
    },
    addressText:{
        textAlign: 'center',
        width: '80%',
        opacity: 0.8,
        marginTop: 10,
    },
});

export default OrderSuccess;
