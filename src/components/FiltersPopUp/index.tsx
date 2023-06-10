import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Pressable,
  Text,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Container from '../common/container';
import FilterPropNameComponent from './FilterPropName';
import {useDispatch, useSelector} from 'react-redux';
import {
  setBrand,
  setInitial,
  setLineup,
  setMinMaxText,
  setPriceRange,
} from '../../redux/slice/filterSlice';
import FilterPropVehicleTypesComponent from './FilterPropVehicleTypes';
import FilterPropPriceRangeComponent from './FilterPropPriceRange';
import data from '../../data/dataCategoryList';
import FilterPropManufacturerComponent from './FilterPropManufacturer';
import FilterPropManufacturerYearComponent from './FilterPropManufacturerYear';
import {FAB} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import colors, {ColorThemeProps} from '../../assets/theme/colors';
import {PRODUCT_LIST} from '../../constants/routeNames';
import store, {RootState} from '../../redux/store';
import BrandBottomSheetContent from '../AddPost/BrandBottomSheetContent';
import BottomSheet from 'reanimated-bottom-sheet';
import {StackNavigationProp} from '@react-navigation/stack';
import {FilterPopUpStackParamList} from '../../navigations/FiltersPopUpNavigator';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import TextField from '../common/textField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getThemeColor} from '../../utils/getThemeColor';
import {getFontSize} from '../../utils/fontSizeResponsive';
import {
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
} from '../../assets/fonts';
import CustomButton from '../common/customButton';
import FilterPropFrameComponent from './FilterPropFrame';
import {
  vehicleType,
  vehicleTypeState,
} from '../../redux/clientDatabase/vehicleType';
const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

type FiltersPopUpComponentProps = {
  navigation: StackNavigationProp<FilterPopUpStackParamList, 'FiltersPopUp'>;
};

const FiltersPopUpComponent: React.FC<FiltersPopUpComponentProps> = ({
  navigation,
}) => {
  const min = 0;
  const max = 200;
  const sliderWidth = 300;
  const step = 1;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setInitial());
    dispatch(
      setPriceRange({
        min: min,
        max: max,
        minPosition: 0,
        maxPosition: sliderWidth,
      }),
    );
    dispatch(setMinMaxText({min: min, max: max}));
  }, []);

  const {navigate} = useNavigation();

  const filter = store.getState().filter;

  const bottomSheet = useRef<BottomSheet>(null);
  const fall = new Animated.Value(1);
  const [isBottomSheetVisible, setBottomSheetVisible] =
    useState<Boolean>(false);
  const changeBottomSheetVisibility = (visibility: Boolean) => {
    if (!bottomSheet) {
      bottomSheet.current.snapTo(visibility ? 0 : 1);
      setBottomSheetVisible(visibility);
    }
  };

  const _renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const _renderContent = () => (
    <BrandBottomSheetContent
      onSetBrand_Lineup={onSetBrand_Lineup}
      onCloseBottomSheet={() => {
        changeBottomSheetVisibility(false);
      }}
      initialValue={{
        brand: filter.brand,
        lineup: filter.lineup,
      }}
    />
  );

  const onSetBrand_Lineup = (brand: number, lineup: number) => {
    dispatch(setBrand(brand));
    dispatch(setLineup(lineup));
  };

  const onNavigationProductList = () => {
    navigation.navigate(PRODUCT_LIST);
  };

  const color = useSelector<RootState, ColorThemeProps>(state =>
    getThemeColor(state.theme),
  );

  const onGoBack = () => {
    navigation.goBack();
  };

  //Vehicle Type
  const dataVehicleType = useSelector<RootState, vehicleTypeState>(
    state => state.vehicleTypes,
  );

  return (
    <View style={{height: '100%', backgroundColor: color.background}}>
      {/*Header*/}
      <View style={styles.wrapperHeader}>
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
          style={{
            height: 70,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[styles.resetText, {color: color.error}]}>Reset</Text>
        </Pressable>
      </View>

      <Animated.View
        style={{
          flex: 1,
          opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)),
          height: '100%',
        }}>
        {/* <Container styleScrollView={{backgroundColor: 'white'}}>
          <FilterPropNameComponent />
          <FilterPropVehicleTypesComponent data={data} />
          <FilterPropPriceRangeComponent
            min={min}
            max={max}
            sliderWidth={sliderWidth}
            step={step}
          />
          <FilterPropManufacturerComponent
            onPress={() => changeBottomSheetVisibility(true)}
          />
          <FilterPropManufacturerYearComponent />
          <View style={{marginTop: 100}}></View>
        </Container> */}

        <FilterPropVehicleTypesComponent />

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
      {/* <BottomSheet
        ref={bottomSheet}
        snapPoints={[heightScreen - 150, 0]}
        initialSnap={1}
        callbackNode={fall}
        onCloseEnd={() => {
          changeBottomSheetVisibility(false);
        }}
        enabledGestureInteraction={true}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
      /> */}
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
    fontSize: getFontSize(16),
    fontFamily: POPPINS_BOLD,
    height: 24,
  },
  resetText: {
    fontSize: getFontSize(14),
    fontFamily: POPPINS_MEDIUM,
    marginTop: 4,
    height: 24,
  },
  // btnParentSection: {
  //   alignItems: 'center',
  //   marginTop: 10,
  // },
  // ImageSections: {
  //   flexDirection: 'row',
  //   paddingHorizontal: 8,
  //   paddingVertical: 8,
  //   justifyContent: 'center',
  // },
  // images: {
  //   width: (widthScreen - 40) / 4 - 10,
  //   height: (widthScreen - 40) / 4 - 10,
  //   resizeMode: 'cover',
  //   margin: 5,
  //   borderRadius: 5,
  // },
  // btnSection: {
  //   width: 225,
  //   height: 50,
  //   backgroundColor: '#DCDCDC',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderRadius: 10,
  //   marginBottom: 10,
  // },
  // btnText: {
  //   textAlign: 'center',
  //   color: 'gray',
  //   fontSize: 14,
  //   fontWeight: 'bold',
  // },
  // header: {
  //   backgroundColor: '#fff',
  //   shadowColor: '#333333',
  //   shadowOffset: {width: -1, height: -3},
  //   shadowRadius: 2,
  //   shadowOpacity: 0.4,
  //   paddingTop: 20,
  //   borderTopLeftRadius: 20,
  //   borderTopRightRadius: 20,
  //   borderWidth: 1,
  //   borderBottomWidth: 0,
  //   borderColor: '#ddd',
  // },
  // panelHeader: {
  //   alignItems: 'center',
  // },
  // panelHandle: {
  //   width: 40,
  //   height: 8,
  //   borderRadius: 4,
  //   backgroundColor: '#00000040',
  //   marginBottom: 10,
  // },
});
