/* eslint-disable react-native/no-inline-styles */
import { View, StyleSheet, Image } from 'react-native';
import React, { FC } from 'react';
import { Colors, Fonts } from '@utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '@components/ui/CustomText';
import BillDetails from '@features/order/BillDetails';

const OrderSummary: FC<{ order: any }> = ({ order }) => {
  console.log('order summary:', order);

  // Calculate total price from products array
  const totalPrice = order?.products?.reduce(
    (acc: number, product: any) => acc + product.quantity * product.price,
    0
  ) || 0;

  console.log('total price:', totalPrice);

  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
          <Icon name="shopping-outline" size={RFValue(20)} color={Colors.disabled} />
        </View>
        <View>
          <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
            Order Summary
          </CustomText>
          <CustomText variant="h8" fontFamily={Fonts.Medium}>
            Order ID - #{order?._id}
          </CustomText>
        </View>
      </View>

      {/* Render products */}
      {order?.products?.map((product: any, index: number) => (
        <View style={styles.flexRow} key={index}>
          <View style={styles.imgContainer}>
            <Image source={{ uri: product.banner }} style={styles.img} />
          </View>
          <View style={{ width: '55%' }}>
            <CustomText variant="h8" numberOfLines={2} fontFamily={Fonts.Medium}>
              {product.name}
            </CustomText>
            <CustomText variant="h9" fontFamily={Fonts.Regular}>
              {product.weight}
            </CustomText>
          </View>

          <View style={{ width: '20%', alignItems: 'flex-end' }}>
            <CustomText
              variant="h8"
              fontFamily={Fonts.Medium}
              style={{ alignSelf: 'flex-end', marginTop: 4 }}
            >
              ₹{product.quantity * product.price}
            </CustomText>
            <CustomText
              variant="h8"
              fontFamily={Fonts.Medium}
              style={{ alignSelf: 'flex-end', marginTop: 4 }}
            >
              {product.quantity}x
            </CustomText>
          </View>
        </View>
      ))}

      <BillDetails totalItemPrice={totalPrice} />
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 40,
    height: 40,
  },
  imgContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 15,
    width: '17%',
  },
  container: {
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
