import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {FORGOTPASSWORD, REGISTRATION} from '../../constants/routeNames';
import {AuthStackParamList} from '../../navigations/AuthenticationNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  POPPINS_BOLD,
  POPPINS_LIGHT,
  POPPINS_LIGHT_ITALIC,
  POPPINS_SEMI_BOLD,
} from '../../assets/fonts';
import colors from '../../assets/theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAweSome from 'react-native-vector-icons/FontAwesome';
import TextField from '../common/textField';
import {Button, Checkbox} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {ThemeState} from '../../redux/slice/themeSlice';
import CustomButton from '../common/customButton';
import Modal, {ModalContent, ScaleAnimation} from 'react-native-modals';
import Feather from 'react-native-vector-icons/Feather';
import PopUpMessage from '../common/popupMessage';
import PopUpLoading from '../common/popupLoading';

type LoginComponentProps = {
  onChange: (value: {name: string; value: string}) => void;
  onChangeSavePassword: (checked: boolean) => void;
  onSubmit: () => void;
  onTest: () => void;
  OnSigninWithGoogle: () => void;
  navigation: StackNavigationProp<AuthStackParamList, 'Login'>;
  wrongPopupVisibility: boolean;
  onChangePopupVisibility: (value: boolean) => void;
};

const LoginComponent: React.FC<LoginComponentProps> = ({
  onChange,
  onChangeSavePassword,
  onSubmit,
  onTest,
  OnSigninWithGoogle,
  navigation,
  wrongPopupVisibility,
  onChangePopupVisibility,
}) => {
  const [checked, setChecked] = useState(false);

  const theme: ThemeState = useSelector<RootState, ThemeState>(
    state => state.theme,
  );
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.wrapper, {backgroundColor: color.background}]}>
        <View style={{width: '100%'}}>
          {theme == 'light' ? (
            <Image
              source={require('../../assets/images/logo_light.png')}
              style={styles.logo}
            />
          ) : (
            <Image
              source={require('../../assets/images/logo_dark.png')}
              style={styles.logo}
            />
          )}

          <Text style={[styles.boldText, {color: color.onBackground}]}>
            Sign in to your account
          </Text>

          <View style={styles.form}>
            <TextField
              label="Username"
              iconClass={Ionicons}
              iconName="person"
              iconColor={color.primary}
              iconSize={20}
              onChangeText={value => {
                onChange({name: 'username', value});
              }}
            />

            <TextField
              label="Password"
              isTypePassword={true}
              iconClass={FontAweSome}
              iconName="lock"
              iconColor={color.primary}
              iconSize={22}
              onChangeText={value => {
                onChange({name: 'password', value});
              }}
            />
          </View>

          <View style={styles.wrapperRemember_Forgot}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                  onChangeSavePassword(!checked);
                }}
                uncheckedColor={color.onBackground_disabled}
              />

              <Text
                style={[
                  styles.normalText,
                  {
                    color: color.onBackground_light,
                  },
                ]}>
                Remember my account
              </Text>
            </View>

            <Pressable onPress={() => navigation.navigate(FORGOTPASSWORD)}>
              <Text
                style={[
                  styles.normalText,
                  {
                    color: color.onBackground_light,
                  },
                ]}>
                Forgot Password ?
              </Text>
            </Pressable>
          </View>

          <CustomButton onPress={onSubmit} title="Sign in" />

          {/* <View
            style={{alignSelf: 'center', paddingTop: 40, alignItems: 'center'}}>
            <Text
              style={{
                paddingBottom: 10,
                fontSize: 12,
                fontFamily: POPPINS_LIGHT,
                color: color.onBackground_light,
              }}>
              Or login with:
            </Text>
            <View style={styles.wrapperLogoGG_FB}>
              <Pressable onPress={onTest}>
                <FontAweSome
                  name="google"
                  size={28}
                  color={color.onBackground}
                  style={{marginRight: 10}}
                />
              </Pressable>

              <Pressable onPress={OnSigninWithGoogle}>
                <FontAweSome
                  name="facebook"
                  size={26}
                  color={color.onBackground}
                  style={{marginLeft: 10}}
                />
              </Pressable>
            </View>
          </View> */}
        </View>

        <View>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(REGISTRATION)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: POPPINS_BOLD,
                  fontSize: 16,
                  paddingEnd: 5,
                  color: color.onBackground,
                }}>
                Join us now!
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: POPPINS_LIGHT_ITALIC,
                  color: color.onBackground,
                }}>
                Create your account here
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <PopUpMessage
          message={'Your username or password is incorrect. Please try again!'}
          type={'error'}
          visibility={wrongPopupVisibility}
          onChangePopupVisibility={onChangePopupVisibility}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginComponent;

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: '8%',
    paddingHorizontal: '6.75%',
    justifyContent: 'space-between',
    height: '100%',
  },

  logo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: widthScreen * 0.5,
    height: widthScreen * 0.5,
    marginTop: '7%',
    marginBottom: '6%',
  },

  boldText: {
    fontSize: 18,
    alignSelf: 'flex-start',
    fontFamily: POPPINS_BOLD,
  },

  form: {
    justifyContent: 'center',
  },

  normalText: {
    fontSize: 12,
    fontFamily: POPPINS_LIGHT,
    marginTop: 5,
  },
  wrapperRemember_Forgot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 30,
  },
  wrapperLogoGG_FB: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
