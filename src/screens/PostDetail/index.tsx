import React, {useState} from 'react';
import {useEffect} from 'react';
import PostDetailComponent from '../../components/PostDetail';
import store, {RootState} from '../../redux/store';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {PostDetailStackParamList} from '../../navigations/PostDetailNavigator';
import {
  RouteProp,
  useNavigationState,
  useTheme,
} from '@react-navigation/native';
import {MARKETPLACE} from '../../constants/routeNames';
import {useSelector} from 'react-redux';
import {ColorThemeProps} from '../../assets/theme/colors';
import {getThemeColor} from '../../utils/getThemeColor';
import {selectedPostState} from '../../redux/slice/selectedPostSlice';

type PostDetailScreenProps = {
  navigation: StackNavigationProp<PostDetailStackParamList, 'PostDetail'>;
  route: RouteProp<PostDetailStackParamList, 'PostDetail'>;
};

const PostDetailScreen: React.FC<PostDetailScreenProps> = ({
  navigation,
  route,
}) => {
  // const {navigation} = navigationProp;
  const {params} = route;

  return (
    <PostDetailComponent
      postID={params.postID}
      isActivePost={params.isActivePost}
      isAdmin={params.isAdmin}
      navigation={navigation}
    />
  );
};

export default PostDetailScreen;
