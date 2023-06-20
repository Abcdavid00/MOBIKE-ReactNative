import React from 'react';
import ProfileComponent from '../../components/Profile';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileStackParamList} from '../../navigations/ProfileNavigator';

type ProfileScreenProps = {
  navigation: StackNavigationProp<ProfileStackParamList, 'Profile'>;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  return <ProfileComponent navigation={navigation} />;
};

export default ProfileScreen;
