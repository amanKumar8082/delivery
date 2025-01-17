/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, Pressable} from 'react-native';
import React, {FC} from 'react';
import { useCartStore } from '@state/cartStore';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from './CustomText';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';

const UniversalAdd:FC<{item:any}> = ({item}) => {

    const count = useCartStore(state => state.getItemCount(item._id));
    const {addItem, removeItem} = useCartStore();

    return (
        <View style={[styles.container, {backgroundColor: count === 0 ? '#fff' : Colors.secondary}]}>
            {count === 0 ?
                <Pressable onPress={()=>addItem(item)} style={styles.add} >
                    <CustomText variant="h9" fontFamily={Fonts.SemiBold} style={styles.addText}> Add </CustomText>
                </Pressable> :
                <View style={styles.counterContainer}>
                    <Pressable onPress={()=>removeItem(item._id)}>
                        <Icon name="minus" size={RFValue(13)} color="#fff"/>
                    </Pressable>
                    <CustomText variant="h8" fontFamily={Fonts.SemiBold} style={styles.text}>{count}</CustomText>
                    <Pressable onPress={()=>addItem(item)}>
                        <Icon name="plus" size={RFValue(13)} color="#fff"/>
                    </Pressable>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.secondary,
        width: 65,
        borderRadius: 8,
    },
    add: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
        paddingVertical: 6,
    },
    addText: {
        color: Colors.secondary,
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 4,
        paddingVertical: 6,
    },
    text: {
        color: '#fff',
    },
});

export default UniversalAdd;
