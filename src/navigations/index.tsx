import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AuthenticationNavigator from './AuthenticationNavigator';
import BottomNavigator from './BottomNavigator';
import ApplicationAdminNavigator from './AdminApplicationNavigator';
import LoadingNavigator from './LoadingNavigator';
import {RootState} from '../redux/store';
import {View} from 'react-native';
import {ThemeState} from '../redux/slice/themeSlice';
import colors, {MyDarkTheme, MyLightTheme} from '../assets/theme/colors';

const AppNavContainer = () => {
  // const {
  //   authState: {isLoggedIn},
  // } = useContext(GlobalContext);

  const isLoggedIn = useSelector<RootState, boolean>(
    state => state.auth.isLoggedIn,
  );
  const permission = useSelector<RootState, number | null>(
    state => state.auth.permission,
  );
  const isLoading = useSelector<RootState, boolean>(state => state.loading);
  console.log('isLoggedIn', isLoggedIn);
  console.log('permission', permission);
  console.log('isLoading', isLoading);

  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  return (
    <NavigationContainer theme={theme == 'light' ? MyLightTheme : MyDarkTheme}>
      {isLoading ? (
        <LoadingNavigator />
      ) : isLoggedIn ? (
        permission == 4 ? (
          <BottomNavigator />
        ) : permission == 2 ? (
          <ApplicationAdminNavigator />
        ) : (
          <View />
        )
      ) : (
        <AuthenticationNavigator />
      )}
      {/* <BottomNavigator /> */}
    </NavigationContainer>
  );
};

export default AppNavContainer;
