import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import FilterPopUpManufacturerComponent from '../../components/FilterPopUpManufacturer';

const FilterPropManufacturer = ({navigation}) => {
  useEffect(() => {
    navigation
      .getParent()
      .getParent()
      ?.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
  }, [navigation]);
  return <FilterPopUpManufacturerComponent />;
};

export default FilterPropManufacturer;
