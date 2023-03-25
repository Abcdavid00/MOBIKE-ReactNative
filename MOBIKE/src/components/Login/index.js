import { Gesture } from 'react-native-gesture-handler';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Container from '../../components/common/container';
import { FORGOTPASSWORD, REGISTRATION } from '../../constants/routeNames';
import TextInputOutline from '../../components/common/textInputOutline-Kohana';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { login } from '../../redux/slice/authSlice';
import CustomButton from '../../components/common/customButton';
import { useDispatch } from 'react-redux';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Checkbox } from 'react-native-paper';
import MobikeImage from '../common/image';

const LoginComponent = ({
  onChange,
  onSubmit,
  onTest,
  OnSigninWithGoogle,
}) => {
  const { navigate } = useNavigation();
  const [checked, setChecked] = useState();
  const [image, setimage] = useState(require('../../assets/images/MoBike.png'));

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={[styles.wrapper, { height: '100%', backgroundColor: 'white' }]}>
        <View>
          <Image
            source={require('../../assets/images/MoBike.png')}
            // source={{ uri: "https://abcdavid-knguyen.ddns.net:30001/image/get/1" }}
            style={styles.logo}
          />

          <Text style={styles.boldText}>Sign in to your account</Text>

          <View style={styles.form}>
            <TextInputOutline
              label={'Username'}
              iconClass={Ionicons}
              iconName={'person'}
              iconColor={'#90B4D3'}
              inputPadding={12}
              borderWidthtoTop={0}
              onChangeText={value => {
                onChange({ name: 'username', value });
              }}
            />
            
            <TextInputOutline
              label={'Password'}
              iconClass={MaterialCommunityIcons}
              iconName={'lock'}
              iconColor={'#90B4D3'}
              inputPadding={12}
              borderWidthtoTop={0}
              inputType="password"
              onChangeText={value => {
                onChange({ name: 'password', value });
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 5,
                paddingBottom: 20,
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Text style={{ fontSize: 12 }}>Remember my account</Text>
              </View>

              <TouchableWithoutFeedback
                onPress={() => navigate(FORGOTPASSWORD)}>
                <Text style={{ fontSize: 12 }}>Forgot Password ?</Text>
              </TouchableWithoutFeedback>
            </View>

            <CustomButton
              onPress={onSubmit}
              title="Sign in"
              primary
              styleTitle={{ fontSize: 18, fontWeight: 'bold' }}
              styleWrapper={{
                borderRadius: 62,
                width: '50%',
                alignSelf: 'center',
                height: 46,
              }}
            />

            {/* <View style={{ alignSelf: 'center', paddingTop: 50 }}>
              <Text
                style={{ alignSelf: 'center', paddingBottom: 10, fontSize: 12 }}>
                Or login with:
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableWithoutFeedback onPress={onTest}>
                  <Image
                    source={require('../../assets/images/logo_facebook.png')}
                    style={{ width: 40, height: 40, marginEnd: 10 }}
                  />
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={OnSigninWithGoogle}>
                  <Image
                    source={require('../../assets/images/logo_google.png')}
                    style={{ width: 40, height: 40, marginStart: 10 }}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View> */}
          </View>
        </View>
        <View>
          <TouchableWithoutFeedback onPress={() => navigate(REGISTRATION)}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  paddingEnd: 5,
                  color: 'black',
                }}>
                Join us now!
              </Text>
              <Text style={{ fontSize: 14, fontStyle: 'italic' }}>
                Create your account here
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginComponent;
