/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import CustomText from '@components/ui/CustomText';
import { useAuthStore } from '@state/authStore';
import { Fonts } from '@utils/Constants';
import { FC } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

const Header:FC<{showNotice:()=>void}> = ({showNotice}) => {
    const {user} = useAuthStore();
    return (
        <View style={styles.subContainer}>
            <TouchableOpacity activeOpacity={0.8}>
                <CustomText fontFamily={Fonts.SemiBold} variant="h8" style={styles.text}>
                    Delivery in
                </CustomText>
                <View style={styles.flexRowGap}>
                    <CustomText fontFamily={Fonts.SemiBold} variant="h2" style={styles.text}>
                        10 mins
                    </CustomText>
                    <TouchableOpacity style={styles.noticeBtn} onPress={showNotice}>
                        <CustomText
                            fontFamily={Fonts.SemiBold}
                            fontSize={RFValue(5)}
                            style={{color: '#3B4886'}}>
                            🌧️ Rain
                        </CustomText>
                    </TouchableOpacity>
                </View>

                <View style={styles.flexRowGap}>
                    <CustomText numberOfLines={1} fontFamily={Fonts.Medium} variant="h8" style={styles.text2}>
                        {user && user.address.length > 0 ? user.address[0] : 'Knowhere'}
                    </CustomText>
                    <Icon name="menu-down"size={RFValue(20)} color="#fff" style={{bottom:-1}} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name="account-circle-outline" size={RFValue(36)} color="#fff" />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    subContainer:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        paddingTop: Platform.OS === 'ios' ? 10 : 5,
        justifyContent:'space-between',
    },
    text:{
        color:'#fff',
    },
    flexRowGap:{
        flexDirection:'row',
        alignItems:'center',
        gap:5,
    },
    noticeBtn:{
        backgroundColor:'#E8EAF5',
        borderRadius:100,
        paddingHorizontal:8,
        paddingVertical:2,
        bottom:-2,
    },
    text2:{
        color:'#fff',
        maxWidth:'90%',
        textAlign:'center',
    },
    flexRow:{
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
        gap:2,
        width:'70%',
    },
});

export default Header;
