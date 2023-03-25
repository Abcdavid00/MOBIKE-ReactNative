import {View, Text, Button} from 'react-native';
import React from 'react';
import {LOGIN} from '../../constants/routeNames';
import ForgotPasswordComponent from '../../components/ForgotPassword';
import LoadingComponent from '../../components/Loading';

const ForgotPassword = ({navigation}) => {
  return <ForgotPasswordComponent />;
};

export default ForgotPassword;
