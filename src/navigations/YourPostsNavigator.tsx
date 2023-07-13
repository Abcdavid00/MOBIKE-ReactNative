import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from '../components/common/header';
import {
  ADD_POST,
  POST_DETAIL_NAVIGATOR,
  POST_PREVIEW,
  YOUR_POSTS,
} from '../constants/routeNames';
import AddPostScreen from '../screens/AddPost';
import YourPosts from '../screens/YourPosts';
import PostPreview from '../screens/PostPreview';
import PostDetailNavigator, {
  PostDetailStackParamList,
} from './PostDetailNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {formAddPostState} from '../components/AddPost';
import {NavigatorScreenParams} from '@react-navigation/native';

export type YourPostsStackParamList = {
  [YOUR_POSTS]: undefined;
  [ADD_POST]: undefined;
  [POST_PREVIEW]: {
    form: formAddPostState;
  };
  [POST_DETAIL_NAVIGATOR]: NavigatorScreenParams<PostDetailStackParamList>;
};

const Stack = createStackNavigator<YourPostsStackParamList>();

const YourPostsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={YOUR_POSTS}>
      <Stack.Screen
        name={YOUR_POSTS}
        component={YourPosts}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ADD_POST}
        component={AddPostScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={POST_PREVIEW}
        component={PostPreview}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={POST_DETAIL_NAVIGATOR}
        component={PostDetailNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default YourPostsNavigator;
