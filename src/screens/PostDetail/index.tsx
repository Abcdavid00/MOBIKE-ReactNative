import React, {useState} from 'react';
import {useEffect} from 'react';
import PostDetailComponent from '../../components/PostDetail';
import store, {RootState} from '../../redux/store';
import {StackNavigationProp} from '@react-navigation/stack';
import {PostDetailStackParamList} from '../../navigations/PostDetailNavigator';
import {useNavigationState} from '@react-navigation/native';
import {MARKETPLACE} from '../../constants/routeNames';
import {useSelector} from 'react-redux';
import {ColorThemeProps} from '../../assets/theme/colors';
import {getThemeColor} from '../../utils/getThemeColor';
import {selectedPostState} from '../../redux/slice/selectedPostSlice';

type PostDetailScreenProps = {
  navigation: StackNavigationProp<PostDetailStackParamList, 'PostDetail'>;
};

const PostDetailScreen: React.FC<PostDetailScreenProps> = ({navigation}) => {
  const color = useSelector<RootState, ColorThemeProps>(state =>
    getThemeColor(state.theme),
  );

  const navigationState = useNavigationState(state => state);
  const routes = navigation.getParent()?.getState().routes;
  const previousScreen = navigation.getParent()?.getState().routes[
    routes.length - 2
  ]?.name;
  useEffect(() => {
    navigation
      .getParent()
      .getParent()
      ?.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
    if (previousScreen == MARKETPLACE) {
      return () =>
        navigation
          .getParent()
          .getParent()
          ?.setOptions({
            tabBarStyle: {
              backgroundColor: color.background_bottomNav,
              minHeight: 56,
              maxHeight: 80,
            },
          });
    }
  }, [navigation]);

  const selectedPost = useSelector<RootState, selectedPostState>(
    state => state.selectedPost,
  );

  return (
    <PostDetailComponent
      postID={selectedPost.ID ? selectedPost.ID : -1}
      isActivePost={
        selectedPost.isActivePost ? selectedPost.isActivePost : undefined
      }
      isAdmin={selectedPost.isAdmin ? selectedPost.isAdmin : undefined}
      navigation={navigation}
    />
  );
};

export default PostDetailScreen;
