// import React, {useEffect, useState} from 'react';
// import Container from '../../components/common/container';
// import {REGISTRATION} from '../../constants/routeNames';
// import TextInputOutline from '../../components/common/textInputOutline-Kohana';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useDispatch} from 'react-redux';
// import {login} from '../../redux/slice/authSlice';
// import CustomButton from '../../components/common/customButton';
import TokenStorage from '../../services/TokenStorage';
import React from 'react';

import LoginComponent from '../../components/Login';
import {StackNavigationProp} from '@react-navigation/stack';

import {AuthStackParamList} from '../../navigations/AuthenticationNavigator';

const config = {
  issuer: 'https://accounts.google.com',
  clientId:
    '681579473082-k52dgdcgg1vte6tlp9krmj75dbefecel.apps.googleusercontent.com',
  redirectUrl:
    'https://abcdavid-knguyen.ddns.net:30001/auth/signin/google/authorize',
  scopes: ['openid', 'profile', 'email'],
};

type LoginScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'Login'>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  type formState = {
    username: string;
    password: string;
    savePassword: boolean;
  };
  const [form, setForm] = React.useState<formState>({
    username: '',
    password: '',
    savePassword: false,
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  type paramState = {
    name: string;
    value: string;
  };
  const onChange = ({name, value}: paramState) => {
    setForm({...form, [name]: value});
  };

  const onChangeSavePassword = (checked: boolean) => {
    setForm({...form, savePassword: checked});
  };

  type response = {
    msg: string;
    token: string;
    error: string;
  };

  const [wrongPopupVisibility, setWrongPopupVisibility] = React.useState(false);
  const onChangePopupVisibility = (visibility: boolean) => {
    setWrongPopupVisibility(visibility);
  };
  const login = async () => {
    console.log('Login Submitted');
    const res = await TokenStorage.signIn(
      form.username,
      form.password,
      form.savePassword,
    );
    // if (res.msg == 'Incompleted') {
    //   Popup.show({
    //     type: 'Warning',
    //     title: 'Login Failed',
    //     button: true,
    //     buttonText: 'Try again',
    //     background: '#a0a0a080',
    //     callback: () => Popup.hide(),
    //   });
    // }
    if (res.msg == 'Incompleted') {
      onChangePopupVisibility(true);
    }
  };

  const onSubmit = () => {
    setIsLoading(true);
    login();
  };

  const onTest = () => {
    console.log('Test');
  };

  // const openURL = async (url: string) => {
  //   try {
  //     const supported = await Linking.canOpenURL(url);
  //     if (supported) {
  //       await Linking.openURL(url);
  //     } else {
  //       console.log("Unable to open URL: " + url);
  //     }
  //   } catch (error) {
  //     console.error("An error occurred while opening the URL: " + error);
  //   }
  // };

  const OnSigninWithGoogle = async () => {
    console.log('Signin with Google');
    // try {
    //   const result = await authorize(config);
    //   console.log("Res: " + JSON.stringify(result));
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <LoginComponent
      onChange={onChange}
      onChangeSavePassword={onChangeSavePassword}
      onSubmit={onSubmit}
      onTest={onTest}
      OnSigninWithGoogle={OnSigninWithGoogle}
      navigation={navigation}
      wrongPopupVisibility={wrongPopupVisibility}
      onChangePopupVisibility={onChangePopupVisibility}
    />
  );
};

export default LoginScreen;
