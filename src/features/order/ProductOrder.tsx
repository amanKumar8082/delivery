/* eslint-disable react-native/no-inline-styles */
import { View, StyleSheet, ScrollView, Image, Platform, TouchableOpacity, Alert } from 'react-native';
import React, { FC, useEffect } from 'react';
import CustomHeader from '@components/ui/CustomHeader';
import { Colors, Fonts } from '@utils/Constants';
import OrderList from './OrderList';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import { useCartStore } from '@state/cartStore';
import BillDetails from './BillDetails';
import { hocStyles } from '@styles/globalStyles';
import { useAuthStore } from '@state/authStore';
import ArrowButton from '@components/ui/ArrowButton';
import { navigate } from '@utils/NavigationUtils';
import { refetchUser } from '@service/authService';
import { createOrder } from '@service/orderService';

const ProductOrder:FC = () => {

    const {getTotalPrice,cart,clearCart} = useCartStore();
    const {user, setCurrentOrder, currentOrder, setUser} = useAuthStore.getState();
    console.log('user from product order page: ' , user);
    const totalItemPrice = getTotalPrice();
    const [laoding, setLoading] = React.useState(false);

    useEffect(() => {
        if (cart.length === 0 && !currentOrder) {
            navigate('ProductDashboard');
        }
    }, [cart, currentOrder]);


    console.log('cart', cart);

    const handlePlaceOrder = async () => {
        // if (currentOrder != null) {
        //     Alert.alert('Let Your Current Order Deliver First');
        //     return;
        // }
        // Validate cart is not empty
        if (cart.length === 0) {
            Alert.alert('Cart is Empty, Add Some Items to Place Order');
            return;
        }
        // Format the `products` array to match API schema
        const products = cart.map((item) => ({
            _id: item.item._id,
            banner: item.item.banner,
            brand: item.item.brand,
            category: item.item.category,
            name: item.item.name,
            price: item.item.price,
            quantity: item.count, // Use `count` as `quantity`
            regular_price: item.item.regular_price,
            store: item.item.store,
            subcategory: item.item.subcategory,
            unit: item.item.unit,
            weight: item.item.weight,
        }));
        const total = totalItemPrice; // Total price of items
        const address = user?.address[0]?.completeAddress; // User's address
        // Validate required fields
        if (!address) {
            Alert.alert('Please set your address before placing an order');
            return;
        }
        setLoading(true);
        // Call API to create order
        try {
            const data = await createOrder( products, total, user?.address[0] );
            if (data) {
                setCurrentOrder(data);
                refetchUser(setUser); // Refresh user data
                clearCart();
                navigate('OrderSuccess',{...data});
            } else {
                Alert.alert('Something Went Wrong, Try Again');
            }
        } catch (error) {
            console.error('Order creation failed:', error);
            Alert.alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style = {styles.container}>
            <CustomHeader title = "Checkout" />
            <ScrollView contentContainerStyle = {styles.scrollContainer}>
                <OrderList />
                <View style={styles.flexRowBetween}>
                    <View style={styles.flexRow}>
                        <Image source={require('@assets/icons/coupon.png')} style={{width:25, height:25}} />
                        <View>
                            <CustomText variant="h6" fontFamily={Fonts.SemiBold}>Use Coupon</CustomText>
                        </View>
                    </View>
                    <Icon name="chevron-right" size={RFValue(16)} color={Colors.text} />
                </View>

                <BillDetails totalItemPrice={totalItemPrice}/>

                <View style={styles.flexRowBetween}>
                    <View>
                        <CustomText variant="h8" fontFamily={Fonts.SemiBold}>
                            Cancellation Policy
                        </CustomText>
                        <CustomText variant="h9" style={styles.cancleText} fontFamily={Fonts.SemiBold}>Orders cannot be cancelled once packed for delivery, In case of unexpected delays, a refund will be provided if applicable.
                        </CustomText>
                    </View>
                </View>
            </ScrollView>

            <View style={hocStyles.cartContainer}>
                <View style={styles.absoluteContainer}>
                    <View style={styles.addressContainer}>
                        <View style={styles.flexRow}>
                            <Image source={require('@assets/icons/home.png')} style={{width:20, height:20}} />
                            <View style={{width:'75%'}}>
                                <CustomText variant="h8" fontFamily={Fonts.Medium}>Delivering to Home</CustomText>
                                <CustomText variant="h9" numberOfLines={2} style={{opacity:0.6}}>
                                    {user?.address[0]?.completeAddress || 'Knowhere'}
                                </CustomText>
                            </View>
                        </View>

                        <TouchableOpacity>
                            <CustomText variant="h8" style={{color:Colors.secondary}} fontFamily={Fonts.Medium}>
                                Change
                            </CustomText>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.paymentGateway}>
                        <View style={{width:'30%'}}>
                            <CustomText fontSize={RFValue(6)} fontFamily={Fonts.Regular}>💵 PAY USING</CustomText>
                            <CustomText variant="h9" fontFamily={Fonts.Regular} style={{marginTop:2}}>Cash On Delivery</CustomText>
                        </View>
                        <View style={{width:'70%'}}>
                            <ArrowButton
                                title="Place Order"
                                price={totalItemPrice}
                                loading={laoding}
                                onPress={async() => {
                                    await handlePlaceOrder();
                                }}/>
                        </View>
                    </View>

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    absoluteContainer: {
        marginVertical: 15,
        marginBottom: Platform.OS === 'ios' ? 30 : 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        backgroundColor: Colors.backgroundSecondary,
        padding: 10,
        paddingBottom: 250,
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    flexRowBetween: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 15,
    },
    cancleText: {
        marginTop:4,
        opacity:0.6,
    },
    addressContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.7,
        borderColor: Colors.border,
    },
    paymentGateway: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 14,
    },
});

export default ProductOrder;
