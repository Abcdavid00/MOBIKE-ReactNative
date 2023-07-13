import React from 'react';
import PostPreviewComponent from '../../components/PostPreviewComponent';
import {StackNavigationProp} from '@react-navigation/stack';
import {YourPostsStackParamList} from '../../navigations/YourPostsNavigator';
import {RouteProp} from '@react-navigation/native';

type PostPreviewProps = {
  navigation: StackNavigationProp<YourPostsStackParamList, 'PostPreview'>;
  route: RouteProp<YourPostsStackParamList, 'PostPreview'>;
};

const PostPreview: React.FC<PostPreviewProps> = ({navigation, route}) => {
  const {form} = route.params;
  return <PostPreviewComponent form={form} navigation={navigation} />;
};

export default PostPreview;
