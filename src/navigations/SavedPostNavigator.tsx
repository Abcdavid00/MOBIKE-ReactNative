import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from '../components/common/header';
import {
  EDIT_ACCOUNT,
  EDIT_PROFILE,
  POST_DETAIL_NAVIGATOR,
  PROFILE,
  SAVED_POST,
} from '../constants/routeNames';
import EditAccount from '../screens/EditAccount';
import EditProfileScreen from '../screens/EditProfile';
import ProfileScreen from '../screens/Profile';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SavedPostScreen from '../screens/SavedPost';
import PostDetailNavigator, {
  PostDetailStackParamList,
} from './PostDetailNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';

export type SavedPostStackParamList = {
  [SAVED_POST]: undefined;
  [POST_DETAIL_NAVIGATOR]: NavigatorScreenParams<PostDetailStackParamList>;
};

const Stack = createStackNavigator<SavedPostStackParamList>();

const SavedPostNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={SAVED_POST}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={SAVED_POST}
        component={SavedPostScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={POST_DETAIL_NAVIGATOR}
        component={PostDetailNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SavedPostNavigator;
