import React, {useEffect} from 'react';
import YourPostsComponent from '../../components/YourPosts';
import {StackNavigationProp} from '@react-navigation/stack';
import {YourPostsStackParamList} from '../../navigations/YourPostsNavigator';
import {useIsFocused, useTheme} from '@react-navigation/native';

type YourPostsScreenProps = {
  navigation: StackNavigationProp<YourPostsStackParamList, 'YourPosts'>;
};

const YourPosts: React.FC<YourPostsScreenProps> = ({navigation}) => {
  const isFocused = useIsFocused();
  const color = useTheme().colors.customColors;
  useEffect(() => {
    if (isFocused) {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          backgroundColor: color.background_bottomNav,
          minHeight: 56,
          maxHeight: 80,
        },
      });
    } else {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
    }
  }, [isFocused]);
  return <YourPostsComponent navigation={navigation} />;
};

export default YourPosts;
