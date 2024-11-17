
import { resetAndNavigate } from '@utils/NavigationUtils';
import React, { FC } from 'react';
import { Alert } from 'react-native';
import { deliveryLogin } from '@service/authService';
import { View, Text } from 'react-native';
const DeliveryLogin:FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    try {
      await deliveryLogin(email, password);
      resetAndNavigate('DeliveryDashboard');
    } catch (error) {
      Alert.alert('Login Failed');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text>Delivery Login</Text>
    </View>
  );
};

export default DeliveryLogin;
