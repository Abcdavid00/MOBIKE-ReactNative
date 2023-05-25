import React from 'react';
import ForgotPasswordComponent from '../../components/ForgotPassword';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigations/AuthenticationNavigator';
import {LOGIN} from '../../constants/routeNames';
import {Key_Value} from '../Registration';

type ForgotPasswordScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;
};

const ForgotPassword: React.FC<ForgotPasswordScreenProps> = ({navigation}) => {
  const [email, setEmail] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const onNavigateToLogin = () => {
    navigation.navigate(LOGIN);
  };

  const onChange = (value: string) => {
    setEmail(value);
  };

  const onSubmit = () => {
    console.log('Submit');
  };

  return (
    <ForgotPasswordComponent
      onNavigationToLogin={onNavigateToLogin}
      email={email}
      error={error}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default ForgotPassword;
