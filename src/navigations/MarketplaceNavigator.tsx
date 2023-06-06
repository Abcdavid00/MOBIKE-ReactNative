import {
  FILTERS_POP_UP_NAVIGATOR,
  MARKETPLACE,
  POST_DETAIL_NAVIGATOR,
  PRODUCT_LIST,
  SEARCH,
} from '../constants/routeNames';
import MarketplaceScreen from '../screens/Marketplace';
import FiltersPopUpNavigator from './FiltersPopUpNavigator';
import PostDetailNavigator from './PostDetailNavigator';
import ProductList from '../screens/ProductList';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SearchScreen from '../screens/Search';

export type MarketplaceStackParamList = {
  [MARKETPLACE]: undefined;
  [FILTERS_POP_UP_NAVIGATOR]: undefined;
  [POST_DETAIL_NAVIGATOR]: undefined;
  [PRODUCT_LIST]: undefined;
  [SEARCH]: undefined;
};

const MarketplaceStack = createStackNavigator();

const MarketplaceNavigator = () => {
  return (
    <MarketplaceStack.Navigator
      initialRouteName={MARKETPLACE}
      screenOptions={{headerShown: false}}>
      <MarketplaceStack.Screen
        name={MARKETPLACE}
        component={MarketplaceScreen}
      />
      <MarketplaceStack.Screen
        name={FILTERS_POP_UP_NAVIGATOR}
        component={FiltersPopUpNavigator}
      />
      <MarketplaceStack.Screen
        name={POST_DETAIL_NAVIGATOR}
        component={PostDetailNavigator}
      />
      <MarketplaceStack.Screen name={PRODUCT_LIST} component={ProductList} />

      <MarketplaceStack.Screen name={SEARCH} component={SearchScreen} />
    </MarketplaceStack.Navigator>
  );
};

export default MarketplaceNavigator;
