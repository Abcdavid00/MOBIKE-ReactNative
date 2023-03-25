import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/common/container';
import {FORGOTPASSWORD, LOGIN, REGISTRATION} from '../../constants/routeNames';
import TextInputOutline from '../../components/common/textInputOutline-Kohana';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {login} from '../../redux/slice/authSlice';
import CustomButton from '../../components/common/customButton';
import {useDispatch} from 'react-redux';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {Checkbox} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ForgotPasswordComponent = () => {
  const {navigate} = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={[styles.wrapper, {height: '100%', backgroundColor: 'white'}]}>
        <View>
          <Image
            source={require('../../assets/images/MoBike.png')}
            style={styles.logo}
          />
          <Text style={styles.boldText}>
            Enter the email associated with your account
          </Text>

          <View style={styles.form}>
            <TextInputOutline
              label={'Email'}
              iconClass={MaterialCommunityIcons}
              iconName={'email'}
              iconColor={'#90B4D3'}
              inputPadding={12}
              borderWidthtoTop={0}
              //onChangeText={handleUsernameChange}
            />

            <CustomButton
              //onPress={}
              title="Confirm"
              primary
              styleTitle={{fontSize: 18, fontWeight: 'bold'}}
              styleWrapper={{
                borderRadius: 62,
                width: '50%',
                alignSelf: 'center',
                height: 46,
                marginTop: 30,
              }}
            />
          </View>
        </View>
        <View style={{alignSelf: 'center', paddingTop: 20}}>
          <TouchableWithoutFeedback onPress={() => navigate(LOGIN)}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                paddingEnd: 5,
                color: 'black',
              }}>
              Back to login
            </Text>
          </TouchableWithoutFeedback>
        </View>

        <Text
          style={{
            fontSize: 14,
            fontWeight: '700',
            paddingEnd: 5,
            //color: 'black',
            textAlign: 'center',
            paddingTop: 50,
          }}>
          We have sent you a confirmation email to your mailbox. Please check
          your email.
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPasswordComponent;
