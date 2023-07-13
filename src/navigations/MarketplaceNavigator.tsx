import {
  FILTERS_POP_UP,
  FILTERS_POP_UP_NAVIGATOR,
  MARKETPLACE,
  POST_DETAIL_NAVIGATOR,
  PRODUCT_LIST,
  SEARCH,
} from '../constants/routeNames';
import MarketplaceScreen from '../screens/Marketplace';
import FiltersPopUpNavigator from './FiltersPopUpNavigator';
import PostDetailNavigator, {
  PostDetailStackParamList,
} from './PostDetailNavigator';
import ProductListScreen from '../screens/ProductList';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SearchScreen from '../screens/Search';
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import FiltersPopUpScreen from '../screens/FiltersPopUp';

export type MarketplaceStackParamList = {
  [MARKETPLACE]: undefined;
  [FILTERS_POP_UP]: undefined;
  [POST_DETAIL_NAVIGATOR]: NavigatorScreenParams<PostDetailStackParamList>;
  [PRODUCT_LIST]: undefined;
  [SEARCH]: undefined;
};

const MarketplaceStack = createStackNavigator<MarketplaceStackParamList>();

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
        name={FILTERS_POP_UP}
        component={FiltersPopUpScreen}
      />
      <MarketplaceStack.Screen
        name={POST_DETAIL_NAVIGATOR}
        component={PostDetailNavigator}
      />
      <MarketplaceStack.Screen
        name={PRODUCT_LIST}
        component={ProductListScreen}
      />

      <MarketplaceStack.Screen name={SEARCH} component={SearchScreen} />
    </MarketplaceStack.Navigator>
  );
};

export default MarketplaceNavigator;
