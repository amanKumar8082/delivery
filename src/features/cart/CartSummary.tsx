
import CustomText from '@components/ui/CustomText';
import { Colors, Fonts } from '@utils/Constants';
import { navigate } from '@utils/NavigationUtils';
import { screenHeight, screenWidth } from '@utils/Scaling';
import React, { FC } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

interface CartSummaryProps {
    cartCount: number;
    cartImage: string;
}

const CartSummary: FC<CartSummaryProps> = ({ cartCount, cartImage }) => {
    return (
        <View style={styles.container}>
            <View style={styles.flexRowGap}>
                <Image source={cartImage === null ? require('@assets/icons/bucket.png') : { uri: cartImage }} style={styles.image} />
                <CustomText fontFamily={Fonts.SemiBold}>
                    {cartCount} ITEM{cartCount > 1 ? 'S' : ''}
                </CustomText>

                <Icon name = "arrow-drop-up" color={Colors.secondary} size={RFValue(12)} />
            </View>
            <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.7}
                onPress={() => navigate('ProductOrder')}
            >
                <CustomText style={styles.btnText} fontFamily={Fonts.Medium}>Next</CustomText>
                <Icon name = "arrow-right" color="#fff" size={RFValue(25)} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: screenWidth * 0.05,
        paddingBottom: screenHeight * 0.03,
        paddingTop: screenHeight * 0.014,
    },
    flexRowGap: {
        flexDirection: 'row',
        gap:screenWidth * 0.03,
        alignItems: 'center',
    },
    image: {
        width: screenWidth * 0.1,
        height: screenWidth * 0.1,
        borderRadius: screenWidth * 0.025,
        borderColor: Colors.border,
        borderWidth: 1,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: screenHeight * 0.01,
        borderRadius: screenWidth * 0.025,
        backgroundColor: Colors.secondary,
        paddingHorizontal: screenWidth * 0.1,
    },
    btnText: {
        marginLeft: screenWidth * 0.02,
        color: '#fff',
    },
});

export default CartSummary;
