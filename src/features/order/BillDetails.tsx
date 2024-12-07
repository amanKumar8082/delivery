/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from '@components/ui/CustomText';
import { Colors, Fonts } from '@utils/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';

const ReportItem:FC<{iconName:string, underline?:boolean, title:string, price:number}> = ({iconName, underline, title, price}) => {
    return (
        <View style={[styles.flexRowBetween, {marginBottom:10}]}>
            <View style={styles.flexRow}>
                <Icon name={iconName} style={{opacity:0.7}} size={RFValue(12)} color={Colors.text} />
                <CustomText
                style={{textDecorationLine: underline ? 'underline' : 'none', textDecorationStyle: 'dashed'}}
                variant="h8"
                >{title}</CustomText>
            </View>
            <CustomText variant="h8">
                ₹{price}
            </CustomText>
        </View>
    );
};


const BillDetails:FC<{totalItemPrice:number}> = ({totalItemPrice}) => {
    return (
        <View style={styles.container}>
            <CustomText style={styles.text} fontFamily={Fonts.SemiBold}>Bill Details</CustomText>

            <View style={styles.billContainer}>
                <ReportItem iconName="cart-outline" title="Item total" price={totalItemPrice} />
                <ReportItem iconName="bicycle" title="Delivery charge" price={29} />
                <ReportItem iconName="briefcase-outline" title="Handling charge" price={2} />
                <ReportItem iconName="weather-cloudy" title="Surge charge" price={3} />
            </View>

            <View style={[styles.flexRowBetween, {marginBottom: 15}]}>
                <CustomText variant="h7" style={styles.text} fontFamily={Fonts.SemiBold}>Grand Total</CustomText>
                <CustomText style={styles.text} fontFamily={Fonts.SemiBold}>₹{totalItemPrice + 34}</CustomText>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginVertical: 15,
    },
    text:{
        marginHorizontal: 10,
        marginTop: 15,
    },
    billContainer: {
        padding: 10,
        paddingBottom: 0,
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.7,
    },
    flexRowBetween : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
});

export default BillDetails;
