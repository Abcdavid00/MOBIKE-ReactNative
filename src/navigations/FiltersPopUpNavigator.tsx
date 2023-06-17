import React from 'react';
import {
  FILTERS_POP_UP,
  FILTERS_POP_UP_MANUFACTURER,
  PRODUCT_LIST,
} from '../constants/routeNames';
import FilterPropManufacturer from '../screens/FilterPropManufacturer';
import FiltersPopUpScreen from '../screens/FiltersPopUp';
import {createStackNavigator} from '@react-navigation/stack';
import Header from '../components/common/header';
import ProductListScreen from '../screens/ProductList';

export type FilterPopUpStackParamList = {
  [FILTERS_POP_UP]: undefined;
  [FILTERS_POP_UP_MANUFACTURER]: undefined;
  // [PRODUCT_LIST]: undefined;
};

const FilterStack = createStackNavigator();

const FiltersPopUpNavigator = () => {
  return (
    <FilterStack.Navigator
      initialRouteName={FILTERS_POP_UP}
      screenOptions={{
        headerShown: false,
      }}>
      <FilterStack.Screen
        name={FILTERS_POP_UP}
        component={FiltersPopUpScreen}
      />
      <FilterStack.Screen
        name={FILTERS_POP_UP_MANUFACTURER}
        component={FilterPropManufacturer}
        options={{
          header: ({navigation}) => (
            <Header
              title={'Manufacturer'}
              textRight={'Reset'}
              onLeftClick={() => {
                navigation.goBack();
              }}
              iconRight={undefined}
              onClickRight={undefined}
            />
          ),
        }}
      />
      {/* <FilterStack.Screen
        name={PRODUCT_LIST}
        component={ProductListScreen}
        options={{headerShown: false}}
      /> */}
    </FilterStack.Navigator>
  );
};

export default FiltersPopUpNavigator;
