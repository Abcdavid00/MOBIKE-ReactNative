import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FORGOTPASSWORD, LOGIN, REGISTRATION} from '../constants/routeNames';
import Registration from '../screens/Registration';
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';

const Stack = createNativeStackNavigator();

const AuthenticationNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={LOGIN}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={LOGIN} component={Login} />
      <Stack.Screen name={REGISTRATION} component={Registration} />
      <Stack.Screen name={FORGOTPASSWORD} component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthenticationNavigator;
