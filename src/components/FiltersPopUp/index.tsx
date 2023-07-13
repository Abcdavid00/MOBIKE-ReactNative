import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  FilterState,
  initialState,
  setBrand,
  setColor,
  setInitial,
  setIsFiltered,
  setLineup,
  setMinMaxText,
  setPriceRange,
} from '../../redux/slice/filterSlice';
import FilterPropVehicleTypesComponent from './FilterPropVehicleTypes';
import FilterPropPriceRangeComponent from './FilterPropPriceRange';
import FilterPropManufacturerComponent from './FilterPropManufacturer';
import {ColorThemeProps} from '../../assets/theme/colors';
import {PRODUCT_LIST} from '../../constants/routeNames';
import store, {RootState} from '../../redux/store';
import BrandBottomSheetContent from '../AddPost/BrandBottomSheetContent';
import {StackNavigationProp} from '@react-navigation/stack';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {getThemeColor} from '../../utils/getThemeColor';
import {getFontSize} from '../../utils/fontSizeResponsive';
import {POPPINS_BOLD, POPPINS_MEDIUM} from '../../assets/fonts';
import CustomButton from '../common/customButton';
import {vehicleTypeState} from '../../redux/clientDatabase/vehicleType';
import BottomSheet from '@gorhom/bottom-sheet';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {MarketplaceStackParamList} from '../../navigations/MarketplaceNavigator';
import {setInitialSort} from '../../redux/slice/sortSlice';
import FilterPropManufacturerYearComponent from './FilterPropManufacturerYear';
import ColorBottomSheetContent from '../AddPost/ColorBottomSheetContent';
import FilterPropColorComponent from './FilterPropColor';
import {useTheme} from '@react-navigation/native';
const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

type FiltersPopUpComponentProps = {
  navigation: StackNavigationProp<MarketplaceStackParamList, 'FiltersPopUp'>;
};

const FiltersPopUpComponent: React.FC<FiltersPopUpComponentProps> = ({
  navigation,
}) => {
  const min = 0;
  const max = 200;
  const sliderWidth = 300;
  const step = 1;
  const dispatch = useDispatch();

  const filter = useSelector<RootState, FilterState>(state => state.filter);

  const onSetBrand_Lineup = (brand: number, lineup: number) => {
    dispatch(setBrand(brand));
    dispatch(setLineup(lineup));
  };

  const onNavigationProductList = () => {
    navigation.goBack();
    if (
      filter.vehicleType == undefined &&
      JSON.stringify(filter.priceRange).toString() ==
        JSON.stringify(initialState.priceRange).toString() &&
      filter.brand == undefined &&
      filter.lineup == undefined &&
      filter.manufacturerYear == undefined &&
      filter.color == undefined
    ) {
      dispatch(setIsFiltered(false));
    } else dispatch(setIsFiltered(true));
    dispatch(setInitialSort());
  };

  const color = useTheme().colors.customColors;

  const onGoBack = () => {
    // dispatch(setInitial());
    navigation.goBack();
  };

  //Vehicle Type
  const dataVehicleType = useSelector<RootState, vehicleTypeState>(
    state => state.vehicleTypes,
  );

  //Bottom Sheet Brand
  const bottomSheetBrandRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['65%', '90%'], []);

  // callbacks
  const handleSheetChange = useCallback((index: number) => {
    console.log('handleSheetChange', index);
  }, []);
  const handleSnapPress = useCallback((index: number) => {
    bottomSheetBrandRef.current?.snapToIndex(index);
    if (index == 0) {
      opacity.value = 0.3;
      opacityBlack.value = 0.3;
    } else {
      opacity.value = 0.1;
      opacityBlack.value = 0.1;
    }
  }, []);
  const handleClosePress = useCallback(() => {
    bottomSheetBrandRef.current?.close();
    opacity.value = 1;
    opacityBlack.value = 0;
  }, []);

  //Bottom Sheet Color
  const bottomSheetColorRef = useRef<BottomSheet>(null);
  const snapPointsColor = useMemo(() => ['30%'], []);

  // callbacks
  const handleColorSheetChange = useCallback((index: number) => {
    console.log('handleColorSheetChange', index);
  }, []);
  const handleColorSnapPress = useCallback((index: number) => {
    bottomSheetColorRef.current?.snapToIndex(index);
    if (index == 0) {
      opacity.value = 0.3;
      opacityBlack.value = 0.3;
    }
  }, []);
  const handleCloseColorPress = useCallback(() => {
    bottomSheetColorRef.current?.close();
    opacity.value = 1;
    opacityBlack.value = 0;
  }, []);
  const onSetColor = (idColor: number) => {
    dispatch(setColor(idColor));
  };

  const opacity = useSharedValue(1);
  const opacityAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, {
        duration: 50,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  });

  const opacityBlack = useSharedValue(0);
  const opacityBlackAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacityBlack.value, {
        duration: 50,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  });

  const onReset = () => {
    dispatch(setInitial());
  };

  return (
    <View style={{height: '100%', backgroundColor: color.background}}>
      {/*Header*/}
      <Animated.View
        style={[
          {
            backgroundColor: '#000',
            height: heightScreen,
            width: widthScreen,
            position: 'absolute',
          },
          opacityBlackAnimatedStyle,
        ]}
      />
      <Animated.View style={[styles.wrapperHeader, opacityAnimatedStyle]}>
        <Pressable
          onPress={onGoBack}
          style={{
            height: 70,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <SimpleLineIcons
            name="arrow-left"
            color={color.onBackground_light}
            size={20}
          />
        </Pressable>
        <View
          style={{
            height: 70,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[styles.textHeader, {color: color.onBackground}]}>
            Filters
          </Text>
        </View>

        <Pressable
          onPress={onReset}
          style={{
            height: 70,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[styles.resetText, {color: color.error}]}>Reset</Text>
        </Pressable>
      </Animated.View>

      <Animated.View
        style={[
          {
            flex: 1,
            // opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)),
            height: '100%',
          },
          opacityAnimatedStyle,
        ]}>
        <ScrollView>
          <FilterPropVehicleTypesComponent />
          <FilterPropPriceRangeComponent
            min={min}
            max={max}
            sliderWidth={sliderWidth}
            step={step}
          />
          <FilterPropManufacturerComponent
            onPress={() => handleSnapPress(0)}
            navigation={navigation}
          />
          <FilterPropManufacturerYearComponent />
          <FilterPropColorComponent onPress={() => handleColorSnapPress(0)} />
          <View style={{marginTop: '50%'}} />
        </ScrollView>
        {/*Button Apply*/}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            marginTop: 10,
            position: 'absolute',
            bottom: '8%',
            height: 70,
            alignItems: 'center',
          }}>
          <CustomButton onPress={onNavigationProductList} title="Apply" />
        </View>
      </Animated.View>

      {/*Brand Bottom Sheet*/}
      <BottomSheet
        ref={bottomSheetBrandRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => {
          opacity.value = 1;
          opacityBlack.value = 0;
        }}
        handleIndicatorStyle={{backgroundColor: color.onBackground_light}}
        handleStyle={{
          backgroundColor: color.background,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
        }}
        style={{
          backgroundColor: color.background,
          borderColor: color.divider,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
        }}>
        <BrandBottomSheetContent
          onSetBrand_Lineup={onSetBrand_Lineup}
          onCloseBottomSheet={() => {
            handleClosePress();
          }}
          initialValue={{
            brand: filter.brand,
            lineup: filter.lineup,
          }}
        />
      </BottomSheet>

      <BottomSheet
        ref={bottomSheetColorRef}
        index={-1}
        snapPoints={snapPointsColor}
        enablePanDownToClose={true}
        onClose={() => {
          opacity.value = 1;
          opacityBlack.value = 0;
        }}
        handleIndicatorStyle={{backgroundColor: color.onBackground_light}}
        handleStyle={{
          backgroundColor: color.background,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
        }}
        style={{
          backgroundColor: color.background,
          borderColor: color.divider,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
        }}>
        <ColorBottomSheetContent
          onSetColor={onSetColor}
          onCloseBottomSheet={() => {
            handleCloseColorPress();
          }}
          initialValue={{
            color: filter.color,
          }}
        />
      </BottomSheet>
    </View>
  );
};

export default FiltersPopUpComponent;

const styles = StyleSheet.create({
  wrapperHeader: {
    flexDirection: 'row',
    paddingHorizontal: '2%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
  },
  textHeader: {
    fontSize: getFontSize(18),
    fontFamily: POPPINS_BOLD,
    height: 24,
  },
  resetText: {
    fontSize: getFontSize(14),
    fontFamily: POPPINS_MEDIUM,
    marginTop: 4,
    height: 24,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  ImageSections: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: (widthScreen - 40) / 4 - 10,
    height: (widthScreen - 40) / 4 - 10,
    resizeMode: 'cover',
    margin: 5,
    borderRadius: 5,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#fff',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#ddd',
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
});
