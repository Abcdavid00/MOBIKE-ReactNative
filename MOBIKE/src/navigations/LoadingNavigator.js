import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LOADING} from '../constants/routeNames';
import Loading from '../screens/Loading';

const Stack = createNativeStackNavigator();

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
