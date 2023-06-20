import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from '../components/common/header';
import {
  EDIT_ACCOUNT,
  EDIT_PROFILE,
  PROFILE,
  SAVED_POST,
  SAVED_POST_NAVIGATOR,
} from '../constants/routeNames';
import EditAccount from '../screens/EditAccount';
import EditProfileScreen from '../screens/EditProfile';
import ProfileScreen from '../screens/Profile';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SavedPostScreen from '../screens/SavedPost';
import SavedPostNavigator from './SavedPostNavigator';

export type ProfileStackParamList = {
  [PROFILE]: undefined;
  [EDIT_PROFILE]: undefined;
  [SAVED_POST_NAVIGATOR]: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={PROFILE}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={PROFILE}
        component={ProfileScreen}
        options={{headerShown: false}}
        //options={{header: () => <HeaderSearch />}}
      />
      <Stack.Screen
        name={EDIT_PROFILE}
        component={EditProfileScreen}
        options={{
          header: ({navigation}) => (
            <Header
              title={'Edit Profile'}
              onLeftClick={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name={SAVED_POST_NAVIGATOR}
        component={SavedPostNavigator}
        options={{headerShown: false}}
        //options={{header: () => <HeaderSearch />}}
      />
      {/* <Stack.Screen
        name={EDIT_ACCOUNT}
        component={EditAccount}
        options={{
          header: ({navigation}) => (
            <Header
              title={'Edit Account'}
              onLeftClick={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
