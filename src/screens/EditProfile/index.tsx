import React, {useEffect} from 'react';
import EditProfileComponent from '../../components/Profile/EditProfile';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileStackParamList} from '../../navigations/ProfileNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {ColorThemeProps} from '../../assets/theme/colors';
import {getThemeColor} from '../../utils/getThemeColor';

type EditProfileScreenProps = {
  navigation: StackNavigationProp<ProfileStackParamList, 'EditProfile'>;
};

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({navigation}) => {
  return <EditProfileComponent navigation={navigation} />;
};

export default EditProfileScreen;
