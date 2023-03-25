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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {login} from '../../redux/slice/authSlice';
import CustomButton from '../../components/common/customButton';
import {useDispatch} from 'react-redux';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {Checkbox} from 'react-native-paper';

const RegistrationComponent = ({
  onSubmit,
  onChange,
  onEdited,
  form,
  errors = {errors},
}) => {
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
          <Text style={styles.boldText}>Start your bike journey</Text>

          <View style={styles.form}>
            <TextInputOutline
              label={'Email'}
              iconClass={MaterialCommunityIcons}
              iconName={'email'}
              iconColor={'#90B4D3'}
              inputPadding={12}
              borderWidthtoTop={0}
              marginBottomContainer={27}
              onChangeText={value => {
                onChange({name: 'email', value});
              }}
              onEndEditing={value => {
                onEdited({name: 'email', value});
              }}
              error={errors.email}
              maxLength={32}
            />

            <TextInputOutline
              label={'Username'}
              iconClass={Ionicons}
              iconName={'person'}
              iconColor={'#90B4D3'}
              inputPadding={12}
              borderWidthtoTop={0}
              marginBottomContainer={27}
              onChangeText={value => {
                onChange({name: 'username', value});
              }}
              onEndEditing={value => {
                onEdited({name: 'username', value});
              }}
              error={errors.username}
            />

            <TextInputOutline
              label={'Phone'}
              iconClass={Ionicons}
              iconName={'call'}
              iconColor={'#90B4D3'}
              inputPadding={12}
              borderWidthtoTop={0}
              marginBottomContainer={27}
              onChangeText={value => {
                onChange({name: 'phone', value});
              }}
              onEndEditing={value => {
                onEdited({name: 'phone', value});
              }}
              error={errors.phone}
            />

            <TextInputOutline
              label={'Password'}
              iconClass={MaterialCommunityIcons}
              iconName={'lock'}
              iconColor={'#90B4D3'}
              inputPadding={12}
              borderWidthtoTop={0}
              marginBottomContainer={27}
              inputType="password"
              onChangeText={value => {
                onChange({name: 'password', value});
              }}
              error={errors.password}
            />
            <TextInputOutline
              label={'Confirm Password'}
              iconClass={MaterialCommunityIcons}
              iconName={'lock'}
              iconColor={'#90B4D3'}
              inputPadding={12}
              borderWidthtoTop={0}
              marginBottomContainer={27}
              inputType="password"
              onChangeText={value => {
                onChange({name: 'confirmPassword', value});
              }}
              error={errors.confirmPassword}
            />

            <CustomButton
              //onPress={}
              title="Create Account"
              primary
              styleTitle={{fontSize: 18, fontWeight: 'bold'}}
              styleWrapper={{
                borderRadius: 62,
                width: '70%',
                alignSelf: 'center',
                height: 46,
                marginTop: 40,
              }}
              onPress={onSubmit}
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
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationComponent;
