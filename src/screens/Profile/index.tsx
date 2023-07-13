import React, {useEffect} from 'react';
import ProfileComponent from '../../components/Profile';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileStackParamList} from '../../navigations/ProfileNavigator';
import {useIsFocused, useTheme} from '@react-navigation/native';

type ProfileScreenProps = {
  navigation: StackNavigationProp<ProfileStackParamList, 'Profile'>;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const color = useTheme().colors.customColors;
  const isFocused = useIsFocused();
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
  return <ProfileComponent navigation={navigation} />;
};

export default ProfileScreen;
