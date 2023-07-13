import {View, Text, TouchableWithoutFeedback, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import colors, {ColorThemeProps} from '../../assets/theme/colors';
import {signOut} from '../../services/TokenStorage';
import {
  EDIT_ACCOUNT,
  EDIT_PROFILE,
  SAVED_POST_NAVIGATOR,
} from '../../constants/routeNames';
import {useNavigation, useTheme} from '@react-navigation/native';
import store, {RootState} from '../../redux/store';
import MobikeImage from '../common/image';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileStackParamList} from '../../navigations/ProfileNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {getThemeColor} from '../../utils/getThemeColor';
import {getFontSize} from '../../utils/fontSizeResponsive';
import {POPPINS_MEDIUM, POPPINS_REGULAR} from '../../assets/fonts';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Switch} from 'react-native-paper';
import {ThemeState, setTheme} from '../../redux/slice/themeSlice';
import {saveThemeState} from '../../services/ThemeStorage';

type ProfileComponentProps = {
  navigation: StackNavigationProp<ProfileStackParamList, 'Profile'>;
};

const ProfileComponent: React.FC<ProfileComponentProps> = ({navigation}) => {
  const userInfo = store.getState().personalInfo;
  const color = useTheme().colors.customColors;
  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const [isSwitchOn, setIsSwitchOn] = React.useState(theme == 'dark');

  const dispatch = useDispatch();
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    dispatch(setTheme(isSwitchOn ? 'light' : 'dark'));
    saveThemeState(isSwitchOn ? 'light' : 'dark');
  };
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        backgroundColor: color.background_bottomNav,
        minHeight: 56,
        maxHeight: 80,
      },
    });
  }, [isSwitchOn]);
  return (
    <View
      style={{
        height: '100%',
        alignItems: 'center',
        backgroundColor: color.background,
      }}>
      <MobikeImage
        style={{height: 100, width: 100, borderRadius: 500, marginTop: 30}}
        imageID={userInfo.ID_Image_Profile}
        avatar={true}
      />
      <Text
        style={{
          color: color.onBackground,
          fontSize: getFontSize(18),
          marginTop: 10,
          fontFamily: POPPINS_MEDIUM,
        }}>
        {userInfo.Name}
      </Text>

      <View
        style={{
          height: 1,
          width: '90%',
          backgroundColor: color.divider,
          marginVertical: 10,
          marginTop: 30,
        }}
      />

      {/*Edit Profile */}
      <Pressable
        onPress={() => navigation.navigate(EDIT_PROFILE)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal: 20,
          marginVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: 20,
            marginVertical: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome5 name="user-edit" color={color.primary} size={20} />

            <Text
              style={{
                color: color.onBackground,
                fontSize: getFontSize(18),
                fontFamily: POPPINS_REGULAR,
                marginLeft: 8,
                top: 2,
              }}>
              Edit Profile
            </Text>
          </View>

          <SimpleLineIcons
            name="arrow-right"
            color={color.onBackground_light}
            size={16}
          />
        </View>
      </Pressable>

      <View
        style={{
          height: 1,
          width: '90%',
          backgroundColor: color.divider,
          marginVertical: 10,
        }}
      />

      {/*Saved Post */}
      <Pressable
        onPress={() => navigation.navigate(SAVED_POST_NAVIGATOR)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal: 20,
          marginVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: 20,
            marginVertical: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Fontisto name="heart" color={color.error} size={20} />

            <Text
              style={{
                color: color.onBackground,
                fontSize: getFontSize(18),
                fontFamily: POPPINS_REGULAR,
                marginLeft: 8,
                top: 2,
              }}>
              Saved Post
            </Text>
          </View>

          <SimpleLineIcons
            name="arrow-right"
            color={color.onBackground_light}
            size={16}
          />
        </View>
      </Pressable>
      <View
        style={{
          height: 1,
          width: '90%',
          backgroundColor: color.divider,
          marginVertical: 10,
        }}
      />

      {/*Theme */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal: 20,
          marginVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: 20,
            marginVertical: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="moon" color={color.onBackground_light} size={20} />

            <Text
              style={{
                color: color.onBackground,
                fontSize: getFontSize(18),
                fontFamily: POPPINS_REGULAR,
                marginLeft: 8,
                top: 2,
              }}>
              Dark Theme
            </Text>
          </View>

          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            style={{right: -12}}
          />
        </View>
      </View>

      <View
        style={{
          height: 1,
          width: '90%',
          backgroundColor: color.divider,
          marginVertical: 10,
        }}
      />

      {/*LogOut */}
      <Pressable
        onPress={() => signOut()}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal: 20,
          marginVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: 20,
            marginVertical: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons
              name="logout"
              color={color.onBackground_light}
              size={24}
            />

            <Text
              style={{
                color: color.onBackground,
                fontSize: getFontSize(18),
                fontFamily: POPPINS_REGULAR,
                marginLeft: 8,
                top: 2,
              }}>
              Log out
            </Text>
          </View>

          <SimpleLineIcons
            name="arrow-right"
            color={color.onBackground_light}
            size={16}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default ProfileComponent;
