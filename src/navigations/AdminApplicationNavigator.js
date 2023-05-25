import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  APPLICATION_ADMIN,
  POST_DETAIL_NAVIGATOR,
} from '../constants/routeNames';
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
