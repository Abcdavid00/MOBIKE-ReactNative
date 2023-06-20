import React from 'react';
import YourPostsComponent from '../../components/YourPosts';
import {StackNavigationProp} from '@react-navigation/stack';
import {YourPostsStackParamList} from '../../navigations/YourPostsNavigator';

type YourPostsScreenProps = {
  navigation: StackNavigationProp<YourPostsStackParamList, 'YourPosts'>;
};

const YourPosts: React.FC<YourPostsScreenProps> = ({navigation}) => {
  return <YourPostsComponent navigation={navigation} />;
};

export default YourPosts;
