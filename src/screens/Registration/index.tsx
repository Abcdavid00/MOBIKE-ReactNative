import React from 'react';
import RegistrationComponent from '../../components/Registration';
import {
  ValidateEmail,
  ValidateUsername,
  ValidatePassword,
  ValidateConfirmPassword,
  ValidatePhone,
} from '../../utils/validateForm';
import BackendAPI from '../../backendAPI';
import TokenStorage from '../../services/TokenStorage';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigations/AuthenticationNavigator';
import {LOGIN} from '../../constants/routeNames';

export type Form = {
  email: string;
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export type Key_Value = {
  name: string;
  value: string;
};

type RegistrationScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'Registration'>;
};

const Registration: React.FC<RegistrationScreenProps> = ({navigation}) => {
  const [form, setForm] = React.useState<Form>({
    email: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = React.useState<Form>({
    email: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [firstSubmit, setFirstSubmit] = React.useState<boolean>(true);

  // Use a set to store the state of each field
  // in order to show the error only after the first submit
  const [isEmailChecked, setIsEmailChecked] = React.useState<boolean>(false);
  const [isUsernameChecked, setIsUsernameChecked] =
    React.useState<boolean>(false);
  const [isPhoneChecked, setIsPhoneChecked] = React.useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
  const [isSignUpRequestSent, setIsSignUpRequestSent] =
    React.useState<boolean>(false);

  const onChange = ({name, value}: Key_Value) => {
    setForm({...form, [name]: value});
    // isSubmitted = false;
    setIsSubmitted(false);
    if (!firstSubmit) {
      if (value !== '') {
        //email
        if (name === 'email') {
          // isEmailChecked = false;
          setIsEmailChecked(false);
          setErrors(prev => {
            return {...prev, [name]: ValidateEmail(value)};
          });
        }

        //username
        else if (name === 'username') {
          // isUsernameChecked = false;
          setIsUsernameChecked(false);
          setErrors(prev => {
            return {...prev, [name]: ValidateUsername(value)};
          });
        }

        //phone
        else if (name === 'phone') {
          // isPhoneChecked = false;
          setIsPhoneChecked(false);
          setErrors(prev => {
            return {...prev, [name]: ValidatePhone(value)};
          });
        }

        //password
        else if (name === 'password') {
          setErrors(prev => {
            return {
              ...prev,
              [name]: ValidatePassword(value),
              confirmPassword: ValidateConfirmPassword(
                value,
                form.confirmPassword,
              ),
            };
          });
        }

        //confirm password
        else if (name === 'confirmPassword') {
          setErrors(prev => {
            return {
              ...prev,
              [name]: ValidateConfirmPassword(form.password, value),
            };
          });
        }
      } else {
        setErrors(prev => {
          return {...prev, [name]: '* Please enter your ' + name};
        });
      }
    }
  };

  const onEdited = ({name, value}: Key_Value) => {
    if (value !== '') {
      // email
      if (name === 'email') {
        checkEmail();
      }

      //username
      else if (name === 'username') {
        checkUsername();
      }

      //phone
      else if (name === 'phone') {
        checkPhone();
      }

      console.log('Error list: ', errors);
    }
  };

  const signUp = async () => {
    if (
      errors.email ||
      errors.username ||
      errors.password ||
      errors.confirmPassword
    ) {
      return;
    }

    const response = await TokenStorage.signUp(
      form.username,
      form.email,
      form.phone,
      form.password,
    );

    console.log(response);
  };

  const checkEmail = async () => {
    let exists = await BackendAPI.isEmailExist(form.email);
    if (exists) {
      setErrors(prev => {
        return {...prev, email: '* Email already exists'};
      });
    } else {
      setErrors(prev => {
        if (prev.email && prev.email === '* Email already exists') {
          return {...prev, email: ''};
        }
        return prev;
      });
      // isEmailChecked = true;
      setIsEmailChecked(true);
      if (
        isUsernameChecked &&
        isPhoneChecked &&
        isSubmitted &&
        !isSignUpRequestSent
      ) {
        // isSignUpRequestSent = true;
        setIsSignUpRequestSent(true);
        signUp();
      }
    }
  };

  const checkUsername = async () => {
    let exists = await BackendAPI.isUsernameExist(form.username);
    if (exists) {
      setErrors(prev => {
        return {...prev, username: '* Username already exists'};
      });
    } else {
      setErrors(prev => {
        if (prev.username && prev.username === '* Username already exists') {
          return {...prev, username: ''};
        }
        return prev;
      });
      // isUsernameChecked = true;
      setIsUsernameChecked(true);
      if (
        isEmailChecked &&
        isPhoneChecked &&
        isSubmitted &&
        !isSignUpRequestSent
      ) {
        // isSignUpRequestSent = true;
        setIsSignUpRequestSent(true);
        signUp();
      }
    }
  };

  const checkPhone = async () => {
    let exists = await BackendAPI.isPhoneExist(form.phone);
    if (exists) {
      setErrors(prev => {
        return {...prev, phone: '* Phone already exists'};
      });
    } else {
      setErrors(prev => {
        if (prev.phone && prev.phone === '* Phone already exists') {
          return {...prev, phone: ''};
        }
        return prev;
      });
      // isPhoneChecked = true;
      setIsPhoneChecked(true);
      if (
        isEmailChecked &&
        isEmailChecked &&
        isSubmitted &&
        !isSignUpRequestSent
      ) {
        // isSignUpRequestSent = true;
        setIsSignUpRequestSent(true);
        signUp();
      }
    }
  };

  const onSubmit = () => {
    //validation
    //console.log({form});
    setFirstSubmit(false);
    // isSubmitted = true;
    // isSignUpRequestSent = false;
    setIsSubmitted(true);
    setIsSignUpRequestSent(false);
    if (!form.email) {
      setErrors(prev => {
        return {...prev, email: '* Please enter your email'};
      });
    } else {
      setErrors(prev => {
        return {...prev, email: ValidateEmail(form.email)};
      });
    }

    if (!form.username) {
      setErrors(prev => {
        return {...prev, username: '* Please enter your username'};
      });
    } else {
      setErrors(prev => {
        return {...prev, username: ValidateUsername(form.username)};
      });
    }

    if (!form.phone) {
      setErrors(prev => {
        return {...prev, phone: '* Please enter your phone'};
      });
    } else {
      setErrors(prev => {
        return {...prev, phone: ValidatePhone(form.phone)};
      });
    }

    if (!form.password) {
      setErrors(prev => {
        return {...prev, password: '* Please enter your password'};
      });
    } else {
      setErrors(prev => {
        return {...prev, password: ValidatePassword(form.password)};
      });
    }

    if (!form.confirmPassword) {
      setErrors(prev => {
        return {
          ...prev,
          confirmPassword: '* Please enter your confirm password',
        };
      });
    } else {
      setErrors(prev => {
        return {
          ...prev,
          confirmPassword: ValidateConfirmPassword(
            form.password,
            form.confirmPassword,
          ),
        };
      });
    }

    checkEmail();
    checkUsername();
    checkPhone();

    console.log(
      'Submit: ' +
        isSubmitted +
        '\nEmail: ' +
        isEmailChecked +
        '\nUsername: ' +
        isUsernameChecked +
        '\nPhone: ' +
        isPhoneChecked +
        '\nRequest: ' +
        isSignUpRequestSent,
    );

    if (isEmailChecked && isUsernameChecked && isPhoneChecked) {
      // isSignUpRequestSent = true;
      setIsSignUpRequestSent(true);
      signUp();
    }
  };

  const onNavigateToLogin = () => {
    navigation.navigate(LOGIN);
  };

  return (
    <RegistrationComponent
      onNavigateToLogin={onNavigateToLogin}
      onSubmit={onSubmit}
      onChange={onChange}
      onEdited={onEdited}
      form={form}
      errors={errors}
    />
  );
};

export default Registration;
