import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableWithoutFeedback } from 'react-native';
import Header from '../components/common/header';
import HeaderSearch from '../components/HeaderSearch';
import {
  ADD_POST,
  APPLICATION_ADMIN,
  FILTERS_POP_UP,
  LOADING,
  POST_DETAIL_NAVIGATOR,
  POST_PREVIEW,
  YOUR_POSTS,
} from '../constants/routeNames';
import AddPost from '../screens/AddPost';
import FiltersPopUp from '../screens/FiltersPopUp';
import Loading from '../screens/Loading';
import Marketplace from '../screens/Marketplace';
import YourPosts from '../screens/YourPosts';
import PostPreview from '../screens/PostPreview';
import ApplicationAdmin from './../screens/ApplicationAdmin/index';
import PostDetailNavigator from './PostDetailNavigator';

const Stack = createNativeStackNavigator();

const ApplicationAdminNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={APPLICATION_ADMIN}>
      <Stack.Screen
        name={APPLICATION_ADMIN}
        component={ApplicationAdmin}
        options={{ headerShown: false }}
      //options={{header: () => <HeaderSearch />}}
      />
      <Stack.Screen
        name={POST_DETAIL_NAVIGATOR}
        component={PostDetailNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ApplicationAdminNavigator;
