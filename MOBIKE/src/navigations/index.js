import { Gesture } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticationNavigator from './AuthenticationNavigator';
import { GlobalContext } from '../context/Provider';
import BottomNavigator from './BottomNavigator';
import { useSelector } from 'react-redux';
import YourPosts from '../screens/YourPosts';
import LoadingNavigator from './LoadingNavigator';
import ApplicationAdminNavigator from './AdminApplicationNavigator';

const AppNavContainer = () => {
  // const {
  //   authState: {isLoggedIn},
  // } = useContext(GlobalContext);

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const permission = useSelector(state => state.auth.permission);
  const isLoading = useSelector(state => state.loading.loading);
  return (
    <NavigationContainer>
      {isLoading ? (
        <LoadingNavigator />
      ) : isLoggedIn ? (
        // (permission == 4) ? (<BottomNavigator />) : ( (permission == 2) ? <ApplicationAdminNavigator/> : <View/>)
        <BottomNavigator />
      ) : (
        <AuthenticationNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavContainer;
