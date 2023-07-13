import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LOADING} from '../constants/routeNames';
import Loading from '../screens/Loading';
import {createStackNavigator} from '@react-navigation/stack';

type LoadingParamsList = {
  [LOADING]: undefined;
};

const Stack = createStackNavigator<LoadingParamsList>();

const LoadingNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={LOADING}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={LOADING} component={Loading} />
    </Stack.Navigator>
  );
};

export default LoadingNavigator;
