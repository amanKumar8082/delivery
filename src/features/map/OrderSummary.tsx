/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Image} from 'react-native';
import React, { FC } from 'react';
import { Colors, Fonts } from '@utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '@components/ui/CustomText';
import BillDetails from '@features/order/BillDetails';

const OrderSummary:FC<{order:any}> = ({order}) => {

    const totalPrice = order?.items?.reduce((acc:any, item:any) => acc + item.count * item.item.price, 0) || 0;

    return (
        <View style={styles.container}>
            <View style={styles.flexRow}>
                <View style={styles.iconContainer}>
                    <Icon name="shopping-outline" size={RFValue(20)} color={Colors.disabled} />
                </View>
                <View>
                    <CustomText variant="h5" fontFamily={Fonts.SemiBold}>Order Summary</CustomText>
                    <CustomText variant="h8" fontFamily={Fonts.Medium}>Order ID - #{order?._id}</CustomText>
                </View>
            </View>

            {order?.items?.map((item:any, index:number) => {
                return (
                    <View style={styles.flexRow} key={index}>
                        <View style={styles.imgContainer}>
                            <Image source={{uri: item.item.image}} style={styles.img} />
                        </View>
                        <View style={{width:'55%'}}>
                            <CustomText variant="h8" numberOfLines={2} fontFamily={Fonts.Medium}>{item.item.name}</CustomText>
                            <CustomText variant="h9" fontFamily={Fonts.Regular}>{item.item.quantity}</CustomText>
                        </View>
                    </View>
                );
            })}

            <BillDetails totalItemPrice={totalPrice} />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width: '100%',
        borderRadius: 15,
        marginVertical: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
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

export default OrderSummary;
