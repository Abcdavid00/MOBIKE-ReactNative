import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/common/header';
import {
  POST_DETAIL,
  SEE_ALL_REVIEWS,
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
