/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View, Image } from 'react-native';
import React, { FC } from 'react';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import UniversalAdd from '@components/ui/UniversalAdd';

const OrderItem: FC<{ item: any }> = ({ item }) => {
    return (
        <View style={styles.flexRow}>
            <View style={styles.imgContainer}>
                <Image source={{ uri: item?.item?.banner }} style={styles.img} />
            </View>

            <View style={styles.textContainer}>
                <CustomText numberOfLines={2} variant="h8" fontFamily={Fonts.Medium}>
                    {item?.item?.name}
                </CustomText>
                <CustomText variant="h9" style={{ marginTop: 4 }}>
                    {item?.item?.quantity}
                </CustomText>
            </View>

            <View style={styles.actionContainer}>
                <UniversalAdd item={item?.item} />
                <CustomText
                    variant="h8"
                    fontFamily={Fonts.Medium}
                    style={{ alignSelf: 'flex-end', marginTop: 4 }}
                >
                    ₹{item.count * item.item.price}
                </CustomText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    img: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    imgContainer: {
        backgroundColor: Colors.backgroundSecondary,
        padding: 10,
        borderRadius: 15,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderTopWidth: 0.6,
        borderTopColor: Colors.border,
    },
    textContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    actionContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        minWidth: 80,
    },
});

export default OrderItem;
