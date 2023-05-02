import { View, Text, Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, { useRef, useState } from 'react'
import TextInputOutline from '../common/textInputOutline-Kohana'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import data from '../../data/dataManufacturer'
import BottomSheet from 'reanimated-bottom-sheet';
import { Dimensions } from 'react-native'
import colors from '../../assets/theme/colors'
import LineupBottomSheetContent from '../FilterPopUpManufacturer/LineupBottomSheetContent'
import { useDispatch, useSelector } from 'react-redux'
import { setBrand, setLineup, setManufacturer } from '../../redux/slice/filterSlice'
import { useNavigation } from '@react-navigation/native'
import { FILTERS_POP_UP } from '../../constants/routeNames'
import store from '../../redux/store'

const heightScreen = Dimensions.get('window').height;
const heightTabBar = heightScreen / 12;
const FilterPopUpManufacturerComponent = () => {

  const dataBrand = store.getState().vehicleModels.VehicleBrands;
  const dataLineup = store.getState().vehicleModels.VehicleLineups;
  console.log('dataBrand: ' + JSON.stringify(dataBrand));
  console.log('dataLineup: ' + JSON.stringify(dataLineup));
  //Search bar
  const [searchData, setSearchData] = useState(data);
  const onTextChange = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSearchData(newData);
    } else {
      setSearchData(data);
    }
  };


  //OnSelectManufacturer
  const [selectedManufacturer, setSelectedManufacturer] = useState({ value: [] });
  const [selectedLineup, setSelectedLineup] = useState([]);
  const onChooseManufacturer = (item) => {
    Keyboard.dismiss();
    setSelectedManufacturer(item);
    changeBottomSheetVisibility(true);
    let temp = selectedManufacturerFilter.filter((i) => i.id === item.id);
    if (temp[0]) setSelectedLineup(temp[0].value);
    else setSelectedLineup([]);
    dispatch(setBrand(item.id));
  }

  const { navigate } = useNavigation();
  const onChooseLineup = (item) => {

    changeBottomSheetVisibility(false);
    dispatch(setLineup(item.id));
    navigate(FILTERS_POP_UP);
    // if (selectedLineup.indexOf(item.id) === -1) return setSelectedLineup([...selectedLineup, item.id]);
    // else return setSelectedLineup(selectedLineup.filter((id) => id !== item.id));
  };

  const selectedManufacturerFilter = useSelector(state => state.filter.manufacturer);

  const _renderListManufacturer = (data) => {
    return data.map((item, index) => {
      let firstLetter = '';
      if (index === 0) firstLetter = item.name[0].toUpperCase();
      else if (item.name[0] !== data[index - 1].name[0])
        firstLetter = item.name[0].toUpperCase();

      let flag = false;
      let temp = selectedManufacturerFilter.filter((i) => i.id === item.id);
      if (temp[0] && temp[0].value.length !== 0) flag = true;

      return (
        <TouchableWithoutFeedback onPress={() => onChooseManufacturer(item)} key={index}>
          <View
            style={{
              paddingBottom: index === data.length - 1 ? heightTabBar + 100 : 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                padding: 12,
              }}>
              <View style={{ width: 25 }}>
                {firstLetter && (
                  <Text style={{ color: colors.grey }}>{firstLetter}</Text>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <Text style={{ color: flag ? colors.primary : 'black' }}>
                  {item.name}
                </Text>
                {flag && (
                  <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary, paddingHorizontal: 6, marginEnd: 5, borderRadius: 20 }}>
                    <Text style={{ color: 'white', fontSize: 12, fontWeight: '500' }}>{temp[0].value.length}</Text>
                  </View>
                )}
              </View>
            </View>
            <View
              style={{
                height: 1,
                borderBottomWidth: 1,
                borderBottomColor: '#e9e9e9',
                marginStart: 35,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      );
    });
  };

  //bottomSheet
  const bottomSheet = useRef(null);
  const fall = new Animated.Value(1);
  const changeBottomSheetVisibility = visibility => {
    bottomSheet.current.snapTo(visibility ? 0 : 1);
  };
  const _renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const _renderContent = () => {
    return (
      <LineupBottomSheetContent
        data={selectedManufacturer.value}
        onCloseBottomSheet={() => changeBottomSheetVisibility(false)}
        manufacturer={selectedManufacturer}
        selectedLineup={selectedLineup.sort((a, b) => a - b)}
        onChooseLineup={onChooseLineup}
      />
    );
  };

  const dispatch = useDispatch();

  return (
    <View style={{ height: heightScreen }}>
      <Animated.View style={{ backgroundColor: '#FFF', height: "100%", opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)), }}>
        <TextInputOutline
          label={'Search manufacturer'}
          iconClass={Ionicons}
          iconName={'search-outline'}
          iconColor={'#90B4D3'}
          inputPadding={6}
          borderWidthtoTop={0}
          bigContainerStyle={{ marginHorizontal: 15, marginTop: 15 }}
          containerStyle={{ height: 44, borderColor: 'transparent' }}
          labelStyle={{ fontSize: 12 }}
          inputStyle={{ fontSize: 14 }}
          labelContainerStyle={{ padding: 13 }}
          iconSize={20}
          onChangeText={(text) => onTextChange(text)}
        />
        <View
          style={[styles.selectedSectionContent]}>
          <ScrollView>{_renderListManufacturer(searchData)}</ScrollView>
        </View>

      </Animated.View>
      <BottomSheet
        ref={bottomSheet}
        snapPoints={[heightScreen - 15, 0]}
        initialSnap={1}
        callbackNode={fall}
        onCloseEnd={() => {
          changeBottomSheetVisibility(false);
          dispatch(setManufacturer({ manufacturer: { id: selectedManufacturer.id, value: selectedLineup } }))
        }}
        enabledGestureInteraction={true}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
      />
    </View>

  )
}

export default FilterPopUpManufacturerComponent

const styles = StyleSheet.create({

  selectedSectionContent: {
    marginTop: 0,
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
