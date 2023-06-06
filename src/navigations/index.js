import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AuthenticationNavigator from './AuthenticationNavigator';
import BottomNavigator from './BottomNavigator';
import ApplicationAdminNavigator from './AdminApplicationNavigator';
import LoadingNavigator from './LoadingNavigator';

const AppNavContainer = () => {
  // const {
  //   authState: {isLoggedIn},
  // } = useContext(GlobalContext);

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const permission = useSelector(state => state.auth.permission);
  const isLoading = useSelector(state => state.loading);
  console.log('isLoggedIn', isLoggedIn);
  console.log('permission', permission);
  console.log('isLoading', isLoading);
  return (
    <NavigationContainer>
      {isLoading ? (
        <LoadingNavigator />
      ) : isLoggedIn ? (
        (permission == 4) ? (<BottomNavigator />) : ( (permission == 2) ? <ApplicationAdminNavigator/> : <View/>)
        // <BottomNavigator />
      ) : (
        <AuthenticationNavigator />
      )}
      {/* <BottomNavigator /> */}
    </NavigationContainer>
  );
};

export default AppNavContainer;