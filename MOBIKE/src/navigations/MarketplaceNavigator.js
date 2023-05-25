import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderSearch from '../components/HeaderSearch';
import { FILTERS_POP_UP_NAVIGATOR, MARKETPLACE, POST_DETAIL_NAVIGATOR, PRODUCT_LIST } from '../constants/routeNames';
import Marketplace from '../screens/Marketplace';
import FiltersPopUpNavigator from './FiltersPopUpNavigator';
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
