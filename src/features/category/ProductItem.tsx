/* eslint-disable react-native/no-inline-styles */
import CustomText from '@components/ui/CustomText';
import UniversalAdd from '@components/ui/UniversalAdd';
import { Colors, Fonts } from '@utils/Constants';
import { screenHeight } from '@utils/Scaling';
import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const ProductItem:FC<{item: any, index: number}> = ({item, index}) => {

    const isSecondColumn = index % 2 !== 0;

    return (
        <View style={[styles.container, {marginRight: isSecondColumn ? 10 : 0}]}>
            <View style={styles.imageContainer}>
                <Image source={{uri: item?.banner}} style={styles.image} />
            </View>
            <View style={styles.content}>
                <View style={styles.flexRow}>
                    <Image source={require('@assets/icons/clock.png')} style={styles.clockIcon} />
                    <CustomText fontSize={RFValue(6)} fontFamily={Fonts.Medium}>
                        8 MINS
                    </CustomText>
                </View>
                <CustomText variant="h8" numberOfLines={2} fontFamily={Fonts.Medium} style={{marginVertical:4}}>
                    {item.name}
                </CustomText>
                <View style={styles.priceContainer}>
                    <View>
                        <CustomText variant="h8" fontFamily={Fonts.Medium}>
                            ₹{item?.price}
                        </CustomText>
                        <CustomText variant="h8" style={{opacity:0.8,textDecorationLine:'line-through'}} fontFamily={Fonts.Medium}>
                            ₹{item?.regular_price}
                        </CustomText>
                    </View>
                    <UniversalAdd item={item} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '45%',
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        overflow: 'hidden',
    },
    imageContainer: {
        height:screenHeight * 0.14,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    image: {
        width: '100%',
        height: '100%',
        aspectRatio: 1 / 1,
        resizeMode: 'contain',
    },
    content: {
        flex: 1,
        paddingHorizontal: 10,
    },
    flexRow: {
        flexDirection: 'row',
        padding: 2,
        borderRadius: 4,
        alignItems: 'center',
        gap: 2,
        backgroundColor: Colors.backgroundSecondary,
        alignSelf: 'flex-start',
    },
    clockIcon: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 'auto',
        paddingVertical: 10,
    },
});

export default ProductItem;
