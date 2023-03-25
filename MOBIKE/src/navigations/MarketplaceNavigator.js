import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableWithoutFeedback } from 'react-native';
import Header from '../components/common/header';
import HeaderSearch from '../components/HeaderSearch';
import { FILTERS_POP_UP_NAVIGATOR, MARKETPLACE, POST_DETAIL, POST_DETAIL_NAVIGATOR, PRODUCT_LIST } from '../constants/routeNames';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Marketplace from '../screens/Marketplace';
import PostDetail from '../screens/PostDetail';
import FiltersPopUpNavigator from './FiltersPopUpNavigator';
import colors from '../assets/theme/colors';
import PostDetailNavigator from './PostDetailNavigator';
import ProductList from '../screens/ProductList';

const Stack = createNativeStackNavigator();

const MarketplaceNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={MARKETPLACE}>
      <Stack.Screen
        name={MARKETPLACE}
        component={Marketplace}
        options={{ header: () => <HeaderSearch /> }}
      />
      <Stack.Screen
        name={FILTERS_POP_UP_NAVIGATOR}
        component={FiltersPopUpNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={POST_DETAIL_NAVIGATOR}
        component={PostDetailNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={PRODUCT_LIST}
        component={ProductList}
        options={{ header: () => <HeaderSearch /> }}
      />
    </Stack.Navigator>
  );
};

export default MarketplaceNavigator;
