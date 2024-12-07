/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import { useCartStore } from '@state/cartStore';
import CustomText from '@components/ui/CustomText';
import { Colors, Fonts } from '@utils/Constants';
import OrderItem from './OrderItem';

const OrderList = () => {
    const cartItem = useCartStore((state) => state.cart);
    const totalItems = cartItem?.reduce((acc, cart) => acc + cart.count, 0);
    return (
        <View style = {styles.container}>
            <View style = {styles.flexRow}>
                <View style={styles.imgContainer}>
                    <Image source = {require('@assets/icons/clock.png')} style = {styles.img} />
                </View>
                <View>
                    <CustomText variant="h6" fontFamily={Fonts.SemiBold}>Delivery in 9 minutes</CustomText>
                    <CustomText variant="h8" style={{opacity:0.5}} fontFamily={Fonts.SemiBold}>Shipment of {totalItems || 0} item</CustomText>
                </View>
            </View>
            {cartItem?.map((item) => {
                return (
                    <OrderItem key={item._id} item={item} />
                );
            }
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 15,
    },
    flexRow: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
    img: {
        width: 30,
        height: 30,
    },
    imgContainer: {
        backgroundColor: Colors.backgroundSecondary,
        padding: 10,
        borderRadius: 15,
    },
});

export default OrderList;
