import {createStackNavigator} from '@react-navigation/stack';
import Header from '../components/common/header';
import {POST_DETAIL, SEE_ALL_REVIEWS} from '../constants/routeNames';
import PostDetailScreen from '../screens/PostDetail';
import SeeAllReviews from '../screens/SeeAllReviews';
import React from 'react';

export type PostDetailStackParamList = {
  [POST_DETAIL]: {
    postID: number;
    isActivePost: boolean;
    isAdmin: boolean;
  };
  [SEE_ALL_REVIEWS]: undefined;
};

const PostDetailStack = createStackNavigator<PostDetailStackParamList>();

const PostDetailNavigator: React.FC = () => {
  return (
    <PostDetailStack.Navigator
      initialRouteName={POST_DETAIL}
      screenOptions={{headerShown: false}}>
      <PostDetailStack.Screen
        name={POST_DETAIL}
        component={PostDetailScreen}
        // options={{
        //   header: ({navigation}) => (
        //     <Header
        //       title={'Post Detail'}
        //       onLeftClick={() => {
        //         navigation.goBack();
        //       }}
        //     />
        //   ),
        // }}
      />
      <PostDetailStack.Screen
        name={SEE_ALL_REVIEWS}
        component={SeeAllReviews}
        options={{
          header: ({navigation}) => (
            <Header
              title={'Reviews'}
              onLeftClick={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
    </PostDetailStack.Navigator>
  );
};

export default PostDetailNavigator;
