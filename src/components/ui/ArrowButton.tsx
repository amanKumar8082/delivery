/* eslint-disable react-native/no-inline-styles */
import { Colors, Fonts } from '@utils/Constants';
import React, { FC } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import CustomText from './CustomText';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';


interface ArrowButtonProps {
    title : string;
    price? : number;
    loading? : boolean;
    onPress? : () => void;
}

const ArrowButton:FC<ArrowButtonProps> = ({title, price, loading, onPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            disabled={loading}
            onPress={onPress}
            style={[styles.btn, { justifyContent: price !== 0 ? 'space-between' : 'center' }]}>
            {price !== 0 && price &&
                <View>
                    <CustomText variant="h7" style={{color:'white'}} fontFamily={Fonts.Medium}>
                        ₹{price + 34}.0
                    </CustomText>
                    <CustomText variant="h9" style={{color:'white'}} fontFamily={Fonts.Medium}>
                        Total
                    </CustomText>
                </View>
            }
            <View style={styles.flexRow}>
                <CustomText variant="h6" style={{color:'white'}} fontFamily={Fonts.Medium}>
                    {title}
                </CustomText>
                {loading ? <ActivityIndicator
                    size="small"
                    color="white"/>
                    :
                    <Icon name="arrow-right" size={RFValue(25)} color="white"/>}
            </View>
        </TouchableOpacity>
    );

};

const styles = StyleSheet.create({
    btn:{
        backgroundColor: Colors.secondary,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 12,
        marginVertical: 10,
        marginHorizontal: 15,
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ArrowButton;
