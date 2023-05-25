import {
  View,
  Text,
  TouchableWithoutFeedback,
  Easing,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import TextInputOutline from '../../common/textInputOutline-Kohana';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CategoryList from '../../CategoryList/flatList';
import dataCategoryList from '../../../data/dataCategoryList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RangeSlider from '../../common/rangeSlider';
import { useDispatch, useSelector } from 'react-redux';
import { setName, setPriceRange } from '../../../redux/slice/filterSlice';
import FilterPropFrameComponent from '../FilterPropFrame';
import { FILTERS_POP_UP_MANUFACTURER } from '../../../constants/routeNames';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FadeInUp, Layout, SlideInLeft } from 'react-native-reanimated';
import colors from '../../../assets/theme/colors';
import data from '../../../data/dataManufacturer';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

UIManager.setLayoutAnimationEnabledExperimental(true);
const FilterPropManufacturerComponent = ({ onPress }) => {

  //Toogle show/hide filter options
  const [show, setShow] = useState(false);
  const durationLayout = 300;
  const onToggle = () => {
    setShow(prevState => !prevState);
  };
  const { navigate } = useNavigation();
  const onNavigate = () => {
    navigate(FILTERS_POP_UP_MANUFACTURER);
  };

  //Prepare data for filter
  const selectedManufacturer = useSelector(state => state.filter.manufacturer);
  const dispatch = useDispatch();

  return (
    <FilterPropFrameComponent
      type={'Brand & Lineup'}
      animate={true}
      show={show}
      onToggle={onToggle}>
      <Animated.View
        entering={FadeInUp.duration(300).delay(100)}
        layout={Layout.stiffness(100)
          .damping(10)
          .duration(durationLayout)}>
        {/* {selectedManufacturer.map((item, index) => {
          return (
            <View key={index} style={styles.selectedSectionItem} >
              <Text style={styles.selectedSectionItemText}>
                {data.find(x => x.id === item.id).name}
              </Text>
              <TouchableWithoutFeedback >
                <MaterialCommunityIcons
                  name="close"
                  size={14}
                  color={colors.grey}
                />
              </TouchableWithoutFeedback>

            </View>
          );
        })} */}
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontStyle: 'italic', color: colors.primary, marginBottom: 5 }}>Choose from list ></Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </FilterPropFrameComponent>
  );
};

export default FilterPropManufacturerComponent;

const styles = StyleSheet.create({
  selectedSectionLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  selectedLabel: {
    marginStart: 15,
    color: colors.black,
    fontWeight: 'bold',
  },
  resetLabel: {
    marginEnd: 15,
    color: colors.primary,
    fontWeight: 'bold',
  },
  selectedSectionContent: {
    marginTop: 15,
  },

  selectedSectionItem: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9e9e9',
    // backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 5,
    paddingEnd: 7,
    margin: 5,
    marginEnd: 10,
  },
  selectedSectionItemText: {
    marginStart: 10,
    color: '#000',
    alignSelf: 'flex-end',
    fontWeight: '500',
    marginEnd: 5,
  },
});
