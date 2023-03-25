import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableWithoutFeedback } from 'react-native';
import Header from '../components/common/header';
import HeaderSearch from '../components/HeaderSearch';
import {
  ADD_POST,
  FILTERS_POP_UP,
  LOADING,
  POST_DETAIL,
  POST_PREVIEW,
  SEE_ALL_REVIEWS,
  YOUR_POSTS,
} from '../constants/routeNames';
import PostDetail from '../screens/PostDetail';
import SeeAllReviews from '../screens/SeeAllReviews';

const Stack = createNativeStackNavigator();

const PostDetailNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={POST_DETAIL}>
      <Stack.Screen
        name={POST_DETAIL}
        component={PostDetail}
        options={{
          header: ({ navigation }) => <Header
            title={'Post Detail'}
            onLeftClick={() => {
              navigation.goBack();
            }}
          />
        }}
      />
      <Stack.Screen
        name={SEE_ALL_REVIEWS}
        component={SeeAllReviews}
        options={{
          header: ({ navigation }) => <Header
            title={'Reviews'}
            onLeftClick={() => {
              navigation.goBack();
            }}
          />
        }}
      />
      
    </Stack.Navigator>
  );
};

export default PostDetailNavigator;
