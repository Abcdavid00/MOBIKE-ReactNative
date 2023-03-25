import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import colors from '../../assets/theme/colors';
import { signOut } from '../../services/TokenStorage';
import { EDIT_ACCOUNT, EDIT_PTOFILE } from '../../constants/routeNames';
import { useNavigation } from '@react-navigation/native';
import store from '../../redux/store';
import MobikeImage from '../common/image';

const ProfileComponent = () => {
  const { navigate } = useNavigation();
  const userInfo = store.getState().personalInfo;
  return (
    <View style={{ height: '100%', alignItems: 'center' }}>
      <MobikeImage style={{ height: 100, width: 100, borderRadius: 500, marginTop: 30 }} imageID={userInfo.ID_Image_Profile} />
      <Text style={{ color: '#000', fontSize: 18, marginTop: 10, }}>{userInfo.Name}</Text>

      <View style={{ height: 2, width: '90%', backgroundColor: '#d8d8d8', marginVertical: 10, }} />


      <TouchableWithoutFeedback onPress={() => navigate(EDIT_PTOFILE)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 20,
            marginVertical: 10,
          }}>
          <Text style={{ color: '#000', fontSize: 18 }}>Edit Profile</Text>
          <Text style={{ color: '#000', fontSize: 18 }}>></Text>
        </View>
      </TouchableWithoutFeedback>

      {/* <View style={{ height: 2, width: '90%', backgroundColor: '#d8d8d8', marginVertical: 10, }} /> */}

      {/* <TouchableWithoutFeedback onPress={() => signOut()}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 20,
            marginVertical: 10,
          }}>
          <Text style={{ color: '#000', fontSize: 18 }}>Saved Post</Text>
          <Text style={{ color: '#000', fontSize: 18 }}>></Text>
        </View>
      </TouchableWithoutFeedback> */}

      <View style={{ height: 2, width: '90%', backgroundColor: '#d8d8d8', marginVertical: 10, }} />

      <TouchableWithoutFeedback onPress={() => signOut()}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 20,
            marginVertical: 10,
          }}>
          <Text style={{ color: '#000', fontSize: 18 }}>Logout</Text>
          <Text style={{ color: '#000', fontSize: 18 }}>></Text>
        </View>
      </TouchableWithoutFeedback>

    </View>
  );
};

export default ProfileComponent;
