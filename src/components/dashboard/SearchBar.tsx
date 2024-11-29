/* eslint-disable react/react-in-jsx-scope */
import CustomText from '@components/ui/CustomText';
import { Colors, Fonts } from '@utils/Constants';
import { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import RollingBar from 'react-native-rolling-bar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchBar:FC = () => {
    return (
        <TouchableOpacity style={styles.constainer} activeOpacity={0.8}>
            <Icon name="magnify" size={RFValue(20)} color={Colors.text} />
            <RollingBar interval={3000} defaultStyle={false} customStyle={styles.textContainer}>
                <CustomText variant="h6" fontFamily={Fonts.Medium} style={{color: Colors.text}}>Search for "sweets"</CustomText>
                <CustomText variant="h6" fontFamily={Fonts.Medium} style={{color: Colors.text}}>Search for "cream"</CustomText>
                <CustomText variant="h6" fontFamily={Fonts.Medium} style={{color: Colors.text}}>Search for "aata"</CustomText>
                <CustomText variant="h6" fontFamily={Fonts.Medium} style={{color: Colors.text}}>Search for "daal"</CustomText>
                <CustomText variant="h6" fontFamily={Fonts.Medium} style={{color: Colors.text}}>Search for "potato"</CustomText>
                <CustomText variant="h6" fontFamily={Fonts.Medium} style={{color: Colors.text}}>Search for "onion"</CustomText>
                <CustomText variant="h6" fontFamily={Fonts.Medium} style={{color: Colors.text}}>Search for "milk"</CustomText>
            </RollingBar>
            <View style={styles.divider}/>
            <Icon name="microphone" size={RFValue(20)} color={Colors.text} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    constainer:{
        backgroundColor:'#F3F4F7',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius:10,
        borderWidth:0.6,
        borderColor:Colors.border,
        marginTop:15,
        overflow:'hidden',
        marginHorizontal:10,
        paddingHorizontal:10,
    },
    textContainer:{
        width:'90%',
        paddingLeft:10,
        height:50,
    },
    divider:{
        width:1,
        height:24,
        backgroundColor:'#ddd',
        marginHorizontal:10,
    },
});

export default SearchBar;
