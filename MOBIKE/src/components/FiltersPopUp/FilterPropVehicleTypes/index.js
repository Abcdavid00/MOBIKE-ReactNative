import {
  View,
  Text,
  TouchableWithoutFeedback,
  Easing,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  Layout,
  SlideInLeft,
  SlideInRight,
  ZoomInLeft,
} from 'react-native-reanimated';
import React, { useEffect, useRef, useState } from 'react';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import TextInputOutline from '../../common/textInputOutline-Kohana';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CategoryList from '../../CategoryList/flatList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RangeSlider from '../../common/rangeSlider';
import { useDispatch, useSelector } from 'react-redux';
import { setName, setPriceRange } from '../../../redux/slice/filterSlice';
import FilterPropFrameComponent from '../FilterPropFrame';
import store from '../../../redux/store';

UIManager.setLayoutAnimationEnabledExperimental(true);
const FilterPropVehicleTypes = ({ data }) => {
  //Toogle show/hide filter options
  const [show, setShow] = useState(false);
  const durationLayout = 300;
  const onToggle = () => {
    setShow(prevState => !prevState);
  };

  const dataType = store.getState().vehicleTypes;
  //Prepare data for filter

  return (
    <FilterPropFrameComponent type={'Vehicle Types'} onToggle={onToggle} show={show}>
      <Animated.View
        entering={FadeInUp.duration(300).delay(100)}
        layout={Layout.stiffness(100).damping(10).duration(durationLayout)}>
        <CategoryList data={dataType} type={'choose'} />
      </Animated.View>
    </FilterPropFrameComponent>
  );
};

export default FilterPropVehicleTypes;
