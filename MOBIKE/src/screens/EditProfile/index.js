import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import EditProfileComponent from '../../components/Profile/EditProfile';

const EditProfile = ({navigation}) => {
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          backgroundColor: '#EDF8FF',
          minHeight: 56,
          maxHeight: 80,
        },
      });
  }, [navigation]);
  return <EditProfileComponent />;
};

export default EditProfile;
