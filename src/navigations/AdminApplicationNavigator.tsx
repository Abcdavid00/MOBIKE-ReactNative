import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  APPLICATION_ADMIN,
  POST_DETAIL_NAVIGATOR,
} from '../constants/routeNames';
import ApplicationAdmin from '../screens/ApplicationAdmin/index';
import PostDetailNavigator, {
  PostDetailStackParamList,
} from './PostDetailNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {NavigatorScreenParams} from '@react-navigation/native';

export type ApplicatonAdminStackParamList = {
  [APPLICATION_ADMIN]: undefined;
  [POST_DETAIL_NAVIGATOR]: NavigatorScreenParams<PostDetailStackParamList>;
};

const Stack = createStackNavigator<ApplicatonAdminStackParamList>();

const ApplicationAdminNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={APPLICATION_ADMIN}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={APPLICATION_ADMIN} component={ApplicationAdmin} />
      <Stack.Screen
        name={POST_DETAIL_NAVIGATOR}
        component={PostDetailNavigator}
      />
    </Stack.Navigator>
  );
};

export default ApplicationAdminNavigator;
