import React from 'react';
import {FORGOTPASSWORD, LOGIN, REGISTRATION} from '../constants/routeNames';
import Registration from '../screens/Registration';
import LoginScreen from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';

export type AuthStackParamList = {
  [LOGIN]: undefined;
  [REGISTRATION]: undefined;
  [FORGOTPASSWORD]: undefined;
};

const AuthStack = createStackNavigator();

const AuthenticationNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName={LOGIN}
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <AuthStack.Screen name={LOGIN} component={LoginScreen} />
      <AuthStack.Screen name={REGISTRATION} component={Registration} />
      <AuthStack.Screen name={FORGOTPASSWORD} component={ForgotPassword} />
    </AuthStack.Navigator>
  );
};

export default AuthenticationNavigator;
