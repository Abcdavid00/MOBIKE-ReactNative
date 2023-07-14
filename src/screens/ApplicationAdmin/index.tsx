import React from 'react';
import ApplicationAdminComponent from '../../components/ApplicationAdmin/index';
import {StackNavigationProp} from '@react-navigation/stack';
import {ApplicatonAdminStackParamList} from '../../navigations/AdminApplicationNavigator';

type ApplicationAdminProps = {
  navigation: StackNavigationProp<
    ApplicatonAdminStackParamList,
    'ApplicationAdmin'
  >;
};

const ApplicationAdmin: React.FC<ApplicationAdminProps> = ({navigation}) => {
  return <ApplicationAdminComponent navigation={navigation} />;
};

export default ApplicationAdmin;
