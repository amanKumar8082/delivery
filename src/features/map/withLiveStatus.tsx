/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import CustomText from '@components/ui/CustomText';
import { useNavigationState } from '@react-navigation/native';
import { getOrderByID } from '@service/orderService';
import { useAuthStore } from '@state/authStore';
import { hocStyles } from '@styles/globalStyles';
import { Colors, Fonts } from '@utils/Constants';
import { navigate } from '@utils/NavigationUtils';
import { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';



const withLiveStatus = <P extends object>(WrappedComponent: React.ComponentType<P>):FC<P> => {
    const WithLiveStatusComponent:FC<P> = (props) => {

        const {currentOrder, setCurrentOrder} = useAuthStore();
        const routename = useNavigationState(state => state.routes[state.index]?.name);

        const fecthOrderDetails = async () => {
            const data = await getOrderByID(currentOrder?._id as any);
            setCurrentOrder(data);
        };

        console.log('currentOrder hoc:', currentOrder);

        return (
            <View style={styles.container}>
                <WrappedComponent {...props}/>

                {currentOrder && routename === 'ProductDashboard' && (
                    <View style={[hocStyles.cartContainer, {flexDirection: 'row', alignItems: 'center'}]}>
                        <View style={styles.flexRow}>
                            <View style={styles.img}>
                                <Image source={require('@assets/icons/bucket.png')} style={{width:20,height:20}}/>
                            </View>
                            <View style={{width:'68%'}}>
                                <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
                                    Order is {currentOrder?.status}
                                </CustomText>
                                <CustomText variant="h9" fontFamily={Fonts.SemiBold}>
                                    {currentOrder?.products?.length > 1
                                        ? `${currentOrder?.products![0]?.name} + ${currentOrder?.products?.length - 1} other items`
                                        : currentOrder?.products![0]?.name}
                                </CustomText>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => navigate('LiveTracking')} style={styles.btn}>
                            <CustomText variant="h8" fontFamily={Fonts.Medium} style={{color: Colors.secondary}}>
                                View
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                )};
            </View>
        );
    };

    return WithLiveStatusComponent;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderRadius: 15,
        marginBottom: 15,
        paddingVertical: 10,
        padding: 10,
    },
    img: {
        backgroundColor: Colors.backgroundSecondary,
        padding: 10,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 5,
        borderColor: Colors.secondary,
        borderWidth: 0.7,
    },
});

export default withLiveStatus;
