
import { resetAndNavigate } from '@utils/NavigationUtils';
import React, { FC } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { deliveryLogin } from '@service/authService';
import { View } from 'react-native';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import { screenHeight } from '@utils/Scaling';
import LottieView from 'lottie-react-native';
import CustomText from '@components/ui/CustomText';
import CustomInput from '@components/ui/CustomInput';
import { Fonts } from '@utils/Constants';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomButton from '@components/ui/CustomButton';
const DeliveryLogin:FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await deliveryLogin(email, password, 'delivery_partner');
      resetAndNavigate('DeliveryDashboard');
    } catch (error) {
      Alert.alert('Login Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomSafeAreaView>
      <ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView
              source={require('@assets/animations/delivery_man.json')}
              autoPlay
              loop
              style={styles.lottie}
            />
          </View>
          <CustomText variant="h3" fontFamily={Fonts.Bold} >
            Delivery Partner Portal
          </CustomText>
          <CustomText variant="h6" style={styles.text} fontFamily={Fonts.SemiBold} >
            Faster Than Flash
          </CustomText>
          <CustomInput
            onChangeText={setEmail}
            value={email}
            left={
              <Icon
                name="mail"
                size={RFValue(18)}
                color="#F8890E"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ marginLeft: 10 }}
              />}
            placeholder="Email"
            inputMode="email"
            right={false}
          />
          <CustomInput
            onChangeText={setPassword}
            value={password}
            left={
              <Icon
                name="key-sharp"
                size={RFValue(18)}
                color="#F8890E"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ marginLeft: 10 }}
              />}
            placeholder="Password"
            secureTextEntry
            right={false}
          />

          <CustomButton
            disabled={!email || password.length < 8}
            title="Login"
            onPress={handleLogin}
            loading={loading}
          />
        </View>
       </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  lottie: {
    width: 100,
    height: 100,
  },
  lottieContainer: {
    height: screenHeight * 0.12,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
});

export default DeliveryLogin;
