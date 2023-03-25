import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, TouchableWithoutFeedback} from 'react-native';
import Header from '../components/common/header';
import {EDIT_ACCOUNT, EDIT_PTOFILE, PROFILE} from '../constants/routeNames';
import EditAccount from '../screens/EditAccount';
import EditProfile from '../screens/EditProfile';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={PROFILE}>
      <Stack.Screen
        name={PROFILE}
        component={Profile}
        options={{headerShown: false}}
        //options={{header: () => <HeaderSearch />}}
      />
      <Stack.Screen
        name={EDIT_PTOFILE}
        component={EditProfile}
        options={{
          header: ({navigation}) => (
            <Header
              title={'Edit Profile'}
              onLeftClick={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name={EDIT_ACCOUNT}
        component={EditAccount}
        options={{
          header: ({navigation}) => (
            <Header
              title={'Edit Account'}
              onLeftClick={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
