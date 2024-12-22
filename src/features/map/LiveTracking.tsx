/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import { View, StyleSheet, ScrollView } from 'react-native';
import React, { FC, useEffect } from 'react';
import { useAuthStore } from '@state/authStore';
import { getOrderByID } from '@service/orderService';
import { Colors, Fonts } from '@utils/Constants';
import LiveHeader from './LiveHeader';
import LiveMap from './LiveMap';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import DeliveryDetails from './DeliveryDetails';
import OrderSummary from './OrderSummary';

const LiveTracking:FC = () => {

    const {user, currentOrder, setCurrentOrder} = useAuthStore();

    const fecthOrderDetails = async () => {
        const data = await getOrderByID(currentOrder?._id as any);
        setCurrentOrder(data);
    };

    useEffect(() => {
        fecthOrderDetails();
    }, []);


    let msg = 'Packing your order';
    let time = 'Arriving in 10 mins';
    if(currentOrder?.status === 'confirmed') {
        msg = 'Arriving Soon';
        time = 'Arriving in 8 mins';
    } else if(currentOrder?.status === 'arriving') {
        msg = 'Order Picked Up';
        time = 'Arriving in 6 mins';
    } else if(currentOrder?.status === 'delivered') {
        msg = 'Order Delivered';
        time = 'Fastest Delivery ⚡️';
    }

    return (
        <View style={styles.container}>
            <LiveHeader type="Customer" title={msg} secondTitle={time} />
            <ScrollView showsVerticalScrollIndicator={false}  style={styles.scrollContent}>

                <LiveMap />

                <View style={styles.flexRow}>
                    <View style={styles.iconContainer}>
                        <Icon name={currentOrder?.deliveryPartner ? 'phone' : 'bag-handle'} size={RFValue(20)} color={Colors.disabled} />
                    </View>
                    <View style={{width:'82%'}}>
                        {/* {currentOrder?.deliveryPartner && */}
                            <CustomText numberOfLines={1} variant="h7" fontFamily={Fonts.SemiBold}>
                                {currentOrder?.deliveryPartner?.name || 'We will soon assign a delivery partner'}
                            </CustomText>
                        {/* } */}
                        {currentOrder?.deliveryPartner &&
                            <CustomText variant="h7" fontFamily={Fonts.Medium}>
                                {currentOrder?.deliveryPartner?.phone}
                            </CustomText>
                        }
                        {/* {currentOrder?.deliveryPartner && */}
                            <CustomText variant="h9" fontFamily={Fonts.Medium}>
                                {currentOrder?.deliveryPartner ? 'For Delivery instructions contact here' : msg}
                            </CustomText>
                        {/* } */}
                    </View>
                </View>

                <DeliveryDetails details={user} />
                <OrderSummary order={currentOrder} />

                <View style={styles.flexRow}>
                    <View style={styles.iconContainer}>
                        <Icon name="cards-heart-outline" size={RFValue(20)} color={Colors.disabled} />
                    </View>

                    <View style={{width:'82%'}}>
                        <CustomText variant="h7" fontFamily={Fonts.SemiBold}>Payment Method</CustomText>
                        <CustomText variant="h9" fontFamily={Fonts.Medium}>Cash on Delivery</CustomText>
                    </View>
                </View>

                <CustomText fontFamily={Fonts.SemiBold} variant="h6" style={{opacity:0.6, marginTop:20}}>
                    Aman Kumar x Blinkit
                </CustomText>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary,
    },
    scrollContent: {
        paddingBottom: 150,
        backgroundColor: Colors.backgroundSecondary,
        padding: 15,
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        borderRadius: 15,
        marginTop: 10,
        paddingVertical: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderBottomWidth: 0.7,
        borderColor: Colors.border,
    },
    iconContainer: {
        backgroundColor: Colors.backgroundSecondary,
        padding: 10,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LiveTracking;
