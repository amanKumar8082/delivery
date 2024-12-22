import React, { FC } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '@features/auth/SplashScreen';
import { navigationRef } from '@utils/NavigationUtils';
import CustomerLogin from '@features/auth/CustomerLogin';
import DeliveryLogin from '@features/auth/DeliveryLogin';
import ProductDashboard from '@features/dashboard/ProductDashboard';
import DeliveryDashboard from '@features/delivery/DeliveryDashboard';
import ProductCategories from '@features/category/ProductCategories';
import ProductOrder from '@features/order/ProductOrder';
import OrderSuccess from '@features/order/OrderSuccess';
import LiveTracking from '@features/map/LiveTracking';

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  return (
    <GestureHandlerRootView>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="ProductDashboard" component={ProductDashboard} />
          <Stack.Screen name="ProductCategories" component={ProductCategories} />
          <Stack.Screen name="DeliveryDashboard" component={DeliveryDashboard} />
          <Stack.Screen name="LiveTracking" component={LiveTracking} />
          <Stack.Screen name="ProductOrder" component={ProductOrder} />
          <Stack.Screen name="OrderSuccess" component={OrderSuccess} />

          <Stack.Screen
            options={{
              animation: 'fade',
            }}
            name="CustomerLogin"
            component={CustomerLogin}
          />
          <Stack.Screen
            options={{
              animation: 'fade',
            }}
            name="DeliveryLogin"
            component={DeliveryLogin}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default Navigation;
