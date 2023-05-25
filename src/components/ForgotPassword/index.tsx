import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import {LOGIN} from '../../constants/routeNames';
import TextInputOutline from '../common/textInputOutline-Kohana';
import CustomButton1 from '../common/customButton1';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TextField from '../common/textField';
import {Key_Value} from '../../screens/Registration';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {ThemeState} from '../../redux/slice/themeSlice';
import colors from '../../assets/theme/colors';
import {POPPINS_BOLD, POPPINS_REGULAR} from '../../assets/fonts';
import CustomButton from '../common/customButton';

type ForgotPasswordComponentProps = {
  onChange: (value: string) => void;
  onEdited?: (value: string) => void;
  onNavigationToLogin: () => void;
  onSubmit: () => void;
  email: string;
  error: string;
};

const ForgotPasswordComponent: React.FC<ForgotPasswordComponentProps> = ({
  onChange,
  onEdited,
  onNavigationToLogin,
  onSubmit,
  email,
  error,
}) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={[
          styles.wrapper,
          {height: '100%', backgroundColor: color.background},
        ]}>
        <View>
          {theme == 'light' ? (
            <Image
              source={require('../../assets/images/logoText_light.png')}
              style={styles.logo}
            />
          ) : (
            <Image
              source={require('../../assets/images/logoText_dark.png')}
              style={styles.logo}
            />
          )}
          <Text style={[styles.boldText, {color: color.onBackground}]}>
            Enter the email associated with your account
          </Text>

          <View style={styles.form}>
            <TextField
              label="Your email (example@email.com)"
              iconClass={MaterialCommunityIcons}
              iconName="email"
              iconColor={color.primary}
              iconSize={20}
              onChangeText={value => {
                onChange(value);
              }}
              // onEndEditing={value => {
              //   onEdited({
              //     name: 'email',
              //     value: value.nativeEvent.text,
              //   });
              // }}
              error={error}
              maxLength={32}
              value={email}
              spellCheck={false}
            />

            <CustomButton
              onPress={onSubmit}
              title="Confirm"
              style={{marginTop: 30}}
            />
            <View style={{alignSelf: 'center', paddingTop: 40}}>
              <TouchableWithoutFeedback onPress={onNavigationToLogin}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: POPPINS_REGULAR,
                    paddingEnd: 5,
                    color: color.onBackground_light,
                  }}>
                  Back to login
                </Text>
              </TouchableWithoutFeedback>
            </View>

            <Text
              style={{
                fontSize: 14,
                fontFamily: POPPINS_BOLD,
                paddingEnd: 5,
                color: color.primary,
                textAlign: 'center',
                paddingTop: 50,
              }}>
              We have sent you a confirmation email to your mailbox. Please
              check your email.
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPasswordComponent;

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
    width: widthScreen * 0.7,
    height: heightScreen * 0.2,
  },

  boldText: {
    fontSize: 14,
    alignSelf: 'flex-start',
    fontFamily: POPPINS_BOLD,
  },

  form: {
    paddingTop: 5,
  },
});
