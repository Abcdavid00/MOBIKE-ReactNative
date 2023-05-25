import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAweSome from 'react-native-vector-icons/FontAwesome';
import {Form} from '../../screens/Registration';
import TextField from '../common/textField';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {ThemeState} from '../../redux/slice/themeSlice';
import colors from '../../assets/theme/colors';
import CustomButton from '../common/customButton';
import {POPPINS_BOLD, POPPINS_REGULAR} from '../../assets/fonts';
import Container from '../common/container';

type RegistrationComponentProps = {
  onNavigateToLogin: () => void;
  onSubmit: () => void;
  onChange: ({name, value}: Key_Value) => void;
  onEdited: ({name, value}: Key_Value) => void;
  form: Form;
  errors: Form;
};

type Key_Value = {
  name: string;
  value: string;
};

const RegistrationComponent: React.FC<RegistrationComponentProps> = ({
  onNavigateToLogin,
  onSubmit,
  onChange,
  onEdited,
  form,
  errors,
}) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;
  return (
    <Container
      keyboardShouldPersistTaps="handled"
      styleScrollView={{backgroundColor: color.background}}>
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
            Start your bike journey
          </Text>

          <View style={styles.form}>
            <TextField
              label="Your email (example@email.com)"
              iconClass={MaterialCommunityIcons}
              iconName="email"
              iconColor={color.primary}
              iconSize={20}
              onChangeText={value => {
                onChange({name: 'email', value});
              }}
              onEndEditing={value => {
                onEdited({
                  name: 'email',
                  value: value.nativeEvent.text,
                });
              }}
              error={errors.email}
              maxLength={32}
              value={form.email}
              spellCheck={false}
            />

            <TextField
              label="Your username"
              iconClass={Ionicons}
              iconName="person"
              iconColor={color.primary}
              iconSize={20}
              onChangeText={value => {
                onChange({name: 'username', value});
              }}
              onEndEditing={value => {
                onEdited({
                  name: 'username',
                  value: value.nativeEvent.text,
                });
              }}
              error={errors.username}
              maxLength={32}
              value={form.username}
            />

            <TextField
              label="Your phone number"
              iconClass={Ionicons}
              iconName="call"
              iconColor={color.primary}
              iconSize={20}
              onChangeText={value => {
                onChange({name: 'phone', value});
              }}
              onEndEditing={value => {
                onEdited({
                  name: 'phone',
                  value: value.nativeEvent.text,
                });
              }}
              error={errors.phone}
              maxLength={15}
              value={form.phone}
            />

            <TextField
              label="Your password"
              isTypePassword={true}
              iconClass={FontAweSome}
              iconName="lock"
              iconColor={color.primary}
              iconSize={22}
              onChangeText={value => {
                onChange({name: 'password', value});
              }}
              onEndEditing={value => {
                onEdited({
                  name: 'password',
                  value: value.nativeEvent.text,
                });
              }}
              error={errors.password}
              value={form.password}
            />

            <TextField
              label="Your confirm password"
              isTypePassword={true}
              iconClass={FontAweSome}
              iconName="lock"
              iconColor={color.primary}
              iconSize={22}
              onChangeText={value => {
                onChange({name: 'confirmPassword', value});
              }}
              onEndEditing={value => {
                onEdited({
                  name: 'confirmPassword',
                  value: value.nativeEvent.text,
                });
              }}
              error={errors.confirmPassword}
              value={form.confirmPassword}
            />

            {/* <TextInputOutline
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
            /> */}

            <CustomButton
              onPress={onSubmit}
              title={'Create Account'}
              style={{marginTop: 30}}
            />
          </View>

          <Pressable
            onPress={onNavigateToLogin}
            style={{alignSelf: 'center', marginTop: 30}}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: POPPINS_REGULAR,
                color: color.onBackground_light,
              }}>
              Back to login
            </Text>
          </Pressable>
        </View>
      </View>
    </Container>
  );
};

export default RegistrationComponent;

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
    fontSize: 18,
    alignSelf: 'flex-start',
    fontFamily: POPPINS_BOLD,
  },

  form: {
    paddingTop: 5,
  },
});
