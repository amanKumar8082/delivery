
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import { resetAndNavigate } from '@utils/NavigationUtils';
import React, { FC, useEffect } from 'react';
import { Alert, Animated, Image, Keyboard, SafeAreaView, StyleSheet,  View} from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import Logo from '@assets/images/logo.png';
import CustomText from '@components/ui/CustomText';
import { Colors, Fonts, lightColors } from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import CustomButton from '@components/ui/CustomButton';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import { customerLogin } from '@service/authService';

const bottomColors = [...lightColors].reverse();

const CustomerLogin: FC = () => {

    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [gestureSequence, setGestureSequence] = React.useState<string[]>([]);
    const keyboardOffsetHeight = useKeyboardOffsetHeight();

    const animatedValue = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if(keyboardOffsetHeight === 0){
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }else{
            Animated.timing(animatedValue, {
                toValue: -keyboardOffsetHeight * 0.84,
                duration: 400,
                useNativeDriver: true,
            }).start();
        }
    }, [animatedValue, keyboardOffsetHeight]);

    const handleGesture = ({nativeEvent}:any) => {
        if(nativeEvent.state === State.END){
            const {translationX, translationY} = nativeEvent;
            let direction = '';
            if(Math.abs(translationX) > Math.abs(translationY)){
                direction = translationX > 0 ? 'right' : 'left';
            }
            else{
                direction = translationY > 0 ? 'down' : 'up';
            }

            console.log(translationX, translationY, direction);

            const newSequence = [...gestureSequence, direction].slice(-5);
            setGestureSequence(newSequence);
            console.log(newSequence);
            if(newSequence.join(' ') === 'up up down left right'){
                setGestureSequence([]);
                resetAndNavigate('DeliveryLogin');
            }
        }
    };

    const handleAuth = async () => {
        Keyboard.dismiss();
        setLoading(true);
        try {
            // await sendOTP(phoneNumber);
            await customerLogin(phoneNumber, 'Aman@123');
            resetAndNavigate('ProductDashboard');
        }
        catch (e) {
            Alert.alert('Login Failed');
        } finally {
            setLoading(false);
        }
    };

  return (
    <GestureHandlerRootView style={styles.container}>
        <View style={styles.container}>
            <CustomSafeAreaView>
                <ProductSlider/>
                <PanGestureHandler onHandlerStateChange={handleGesture}>
                    <Animated.ScrollView
                        bounces={false}
                        keyboardDismissMode="on-drag"
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.subContainer}
                        style={{transform: [{translateY: animatedValue}]}}
                    >
                        <LinearGradient colors={bottomColors} style={styles.gradient}/>
                        <View style={[styles.content]}>
                            <Image source={Logo} style={styles.logo}/>
                            <CustomText variant="h2" fontFamily={Fonts.Bold}>India's Last Minute APP</CustomText>
                            <CustomText variant="h5" fontFamily={Fonts.SemiBold} style={styles.text}>Login Or Signup</CustomText>
                            <CustomInput
                                left={<CustomText variant="h6" style={styles.phoneText} fontFamily={Fonts.SemiBold}>+91</CustomText>}
                                value={phoneNumber}
                                onChangeText={(text) => setPhoneNumber(text.slice(0, 10))}
                                onClear={() => setPhoneNumber('')}
                                placeholder="Enter mobile number"
                                keyboardType="phone-pad"
                                inputMode="numeric"
                            />
                            <CustomButton
                                title="Continue"
                                onPress={() => handleAuth()}
                                disabled={phoneNumber.length !== 10}
                                loading={loading}
                            />
                        </View>
                    </Animated.ScrollView>
                </PanGestureHandler>
            </CustomSafeAreaView>
            <View style={styles.footer}>
                <SafeAreaView>
                    <CustomText fontSize={RFValue(6)}>By continuing, you agree to our Terms of Service & Privacy Policy</CustomText>
                </SafeAreaView>
            </View>
        </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
    phoneText: {
        marginLeft: 15,
    },
    text:{
        marginTop:2,
        marginBottom: 25,
        opacity: 0.8,
    },
    container: {
        flex: 1,
    },
    subContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        height: 50,
        width: 50,
        borderRadius: 20,
        marginVertical: 10,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    footer: {
        borderTopWidth:0.8,
        borderColor: Colors.border,
        paddingBottom: 10,
        zIndex: 22,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding:10,
        backgroundColor: '#f8f9fc',
        width: '100%',
    },
    gradient : {
        paddingTop: 60,
        width: '100%',
    },
    });

export default CustomerLogin;
