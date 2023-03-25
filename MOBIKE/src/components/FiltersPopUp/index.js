import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Container from '../common/container';
import FilterPropNameComponent from './FilterPropName';
import { useDispatch } from 'react-redux';
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
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import colors from '../../assets/theme/colors';
import { PRODUCT_LIST } from '../../constants/routeNames';
import store from '../../redux/store';
import Animated from 'react-native-reanimated';
import BrandBottomSheetContent from '../AddPost/BrandBottomSheetContent';
import BottomSheet from 'reanimated-bottom-sheet';
const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;
const FiltersPopUpComponent = () => {
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
    dispatch(setMinMaxText({ min: min, max: max }));
  }, []);

  const { navigate } = useNavigation();

  const filter = store.getState().filter;

  const bottomSheet = useRef(null);
  const fall = new Animated.Value(1);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const changeBottomSheetVisibility = visibility => {
    bottomSheet.current.snapTo(visibility ? 0 : 1);
    setBottomSheetVisible(visibility);
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
        changeBottomSheetVisibility(false)
      }}
      initialValue={{
        brand: filter.brand,
        lineup: filter.lineup,
      }}
    />
  );

  const onSetBrand_Lineup = (brand, lineup) => {
    dispatch(setBrand(brand));
    dispatch(setLineup(lineup));
  }
  return (
    <View style={{ height: '100%' }}>
      <Animated.View
        style={{
          flex: 1,
          opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)),
          height: '100%',
        }}
      >

        <Container styleScrollView={{ backgroundColor: 'white' }}>
          <FilterPropNameComponent />
          <FilterPropVehicleTypesComponent data={data} />
          <FilterPropPriceRangeComponent
            min={min}
            max={max}
            sliderWidth={sliderWidth}
            step={step}
          />
          <FilterPropManufacturerComponent onPress={() => changeBottomSheetVisibility(true)} />
          <FilterPropManufacturerYearComponent />
          <View style={{ marginTop: 100 }}></View>
        </Container>
        {/*Brand Bottom Sheet*/}


        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 10, position: 'absolute', bottom: 0, backgroundColor: '#f5f5f5', height: 70, alignItems: 'center' }}>

          <FAB
            onPress={() => {
              navigate(PRODUCT_LIST);
            }}
            label='Apply'
            variant='extended'
            size='small'
            style={{ backgroundColor: colors.secondary, height: 50, paddingHorizontal: 10, }}
          />

        </View>
      </Animated.View>
      <BottomSheet
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
      />
    </View>
  );
};

export default FiltersPopUpComponent;

const styles = StyleSheet.create({
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
    shadowOffset: { width: -1, height: -3 },
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
