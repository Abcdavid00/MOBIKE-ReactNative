import {
  View,
  Text,
  TouchableWithoutFeedback,
  Easing,
  LayoutAnimation,
  UIManager,
  Platform,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import TextInputOutline from '../../common/textInputOutline-Kohana';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CategoryList from '../../CategoryList/flatList';
import dataCategoryList from '../../../data/dataCategoryList';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RangeSlider from '../../common/rangeSlider';
import {useDispatch, useSelector} from 'react-redux';
import FilterPropFrameComponent from '../FilterPropFrame';
import {FILTERS_POP_UP_MANUFACTURER} from '../../../constants/routeNames';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  FadeInDown,
  FadeInUp,
  Layout,
  SlideInLeft,
} from 'react-native-reanimated';
import data from '../../../data/dataManufacturer';
import {StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {FilterPopUpStackParamList} from '../../../navigations/FiltersPopUpNavigator';
import {RootState} from '../../../redux/store';
import {
  manufacturerType,
  removeBrand_Lineup,
} from '../../../redux/slice/filterSlice';
import {ColorThemeProps} from '../../../assets/theme/colors';
import {getThemeColor} from '../../../utils/getThemeColor';
import {getFontSize} from '../../../utils/fontSizeResponsive';
import {
  POPPINS_ITALIC,
  POPPINS_LIGHT,
  POPPINS_REGULAR,
} from '../../../assets/fonts';
import {brandNameFromID, lineupNameFromID} from '../../../utils/idToProperty';
import {MarketplaceStackParamList} from '../../../navigations/MarketplaceNavigator';

UIManager.setLayoutAnimationEnabledExperimental(true);

type FilterPropManufacturerProps = {
  onPress: () => void;
  navigation: StackNavigationProp<MarketplaceStackParamList, 'FiltersPopUp'>;
};

const FilterPropManufacturerComponent: React.FC<
  FilterPropManufacturerProps
> = ({onPress, navigation}) => {
  //Toogle show/hide filter options
  const [show, setShow] = useState(false);
  const durationLayout = 300;
  const onToggle = () => {
    setShow(prevState => !prevState);
  };

  //Prepare data for filter
  const selectedManufacturer = useSelector<RootState, manufacturerType>(
    state => state.filter.manufacturer,
  );
  const dispatch = useDispatch();
  const brandSelected = useSelector<RootState, number | undefined>(
    state => state.filter.brand,
  );
  const lineupSelected = useSelector<RootState, number | undefined>(
    state => state.filter.lineup,
  );

  const color = useSelector<RootState, ColorThemeProps>(state =>
    getThemeColor(state.theme),
  );

  return (
    <FilterPropFrameComponent
      type={'Brand & Lineup'}
      animate={true}
      show={show}
      onToggle={onToggle}>
      <Animated.View
        entering={FadeInUp.duration(300).delay(100)}
        layout={Layout.stiffness(100).damping(10).duration(durationLayout)}>
        {brandSelected ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: color.secondary,
              backgroundColor: color.secondary + '4D',
              borderRadius: 12,
              padding: 5,
              paddingEnd: '10%',
              marginVertical: 5,
              paddingLeft: 20,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: color.onBackground_light,
                fontFamily: POPPINS_REGULAR,
                fontSize: getFontSize(14),
              }}>
              {brandNameFromID(brandSelected) +
                (lineupSelected
                  ? ' - ' + lineupNameFromID(lineupSelected || -1)
                  : '')}
            </Text>
            <Pressable
              onPress={() => dispatch(removeBrand_Lineup())}
              style={{
                position: 'absolute',
                right: 10,
                padding: 2,
                borderWidth: 1,
                borderColor: color.divider,
                backgroundColor: color.background,
                borderRadius: 100,
              }}>
              <MaterialCommunityIcons
                name="close"
                size={14}
                color={color.onBackground_light}
              />
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={onPress}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={[
                  {
                    color: color.primary,
                  },
                  styles.chooseFrom,
                ]}>
                Choose from list {'>'}
              </Text>
            </View>
          </Pressable>
        )}
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
    // color: colors.black,
    fontWeight: 'bold',
  },
  resetLabel: {
    marginEnd: 15,
    // color: colors.primary,
    fontWeight: 'bold',
  },
  selectedSectionContent: {
    marginTop: 15,
  },
  chooseFrom: {
    fontSize: getFontSize(16),
    fontFamily: POPPINS_ITALIC,
    marginBottom: 5,
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
