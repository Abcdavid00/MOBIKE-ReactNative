import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import colors, {ColorThemeProps} from '../../../assets/theme/colors';
import TextInputOutline from '../../common/textInputOutline-Kohana';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MobikeImage from '../../common/image';
import {useState} from 'react';
import Animated, {Layout} from 'react-native-reanimated';
import {ScrollView} from 'react-native-gesture-handler';
import {TouchableWithoutFeedback} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Dimensions} from 'react-native';
import Store, {RootState} from '../../../redux/store';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  vehicleBrandsItemType,
  vehicleBrandsType,
  vehicleLineUpsItemType,
  vehicleLineUpsType,
} from '../../../redux/clientDatabase/vehicleModel';
import TextField from '../../common/textField';
import {getThemeColor} from '../../../utils/getThemeColor';
import {getFontSize} from '../../../utils/fontSizeResponsive';
import {
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMI_BOLD,
} from '../../../assets/fonts';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

type BrandBottomSheetContentProps = {
  initialValue: {
    brand?: number;
    lineup?: number;
  };
  onSetBrand_Lineup: (brand: number, lineup: number) => void;
  onCloseBottomSheet: () => void;
};

const BrandBottomSheetContent: React.FC<BrandBottomSheetContentProps> = ({
  initialValue,
  onSetBrand_Lineup,
  onCloseBottomSheet,
}) => {
  useEffect(() => {
    setIsManufacturerSelected(true);
    setSelectedManufacturer(initialValue.brand);
    setSelectedLineup(initialValue.lineup);
    setSearchData(dataManufacturer);
  }, [initialValue]);

  const dataManufacturer = useSelector<RootState, vehicleBrandsType>(
    state => state.vehicleModels.VehicleBrands,
  );
  const dataLineup = Array.from(
    useSelector<RootState, vehicleLineUpsType>(
      state => state.vehicleModels.VehicleLineUps,
    ),
  ).sort((a, b) => a.Lineup.localeCompare(b.Lineup));

  const [selectedManufacturer, setSelectedManufacturer] =
    React.useState<number>();
  const [selectedLineup, setSelectedLineup] = React.useState<number>();
  const [isManufacturerSelected, setIsManufacturerSelected] =
    React.useState(true);

  const [dataLineupSelected, setDataLineupSelected] =
    React.useState(dataLineup);

  const onChoose = (item: vehicleBrandsItemType | vehicleLineUpsItemType) => {
    if (isManufacturerSelected && 'ID_Image' in item) {
      setIsManufacturerSelected(false);
      setSelectedManufacturer(item.ID);
      const tmp = dataLineup.filter(i => i.ID_VehicleBrand == item.ID);
      setSearchData(tmp);
      setDataLineupSelected(tmp);
    } else if ('ID_VehicleBrand' in item) {
      onSetBrand_Lineup(item.ID_VehicleBrand, item.ID);
      console.log('onChoose + ' + selectedManufacturer + ' ' + item.ID);
      onCloseBottomSheet();
      setIsManufacturerSelected(true);
      setSearchData(dataManufacturer);
    }
  };

  const _renderContent = (data: vehicleBrandsType | vehicleLineUpsType) => {
    return data.map((item, index) => {
      let flag = false;
      let firstLetter = '';

      if (
        (isManufacturerSelected && item.ID == selectedManufacturer) ||
        (!isManufacturerSelected && item.ID == selectedLineup)
      ) {
        flag = true;
      }

      if (!isManufacturerSelected && item && 'Lineup' in item) {
        if (index === 0) firstLetter = item.Lineup[0].toUpperCase();
        else if (
          item.Lineup[0] !==
          (data[index - 1] as vehicleLineUpsItemType).Lineup[0]
        )
          firstLetter = item.Lineup[0].toUpperCase();
      }
      return (
        <Pressable key={index} onPress={() => onChoose(item)}>
          <View>
            {!isManufacturerSelected && (
              <View
                style={{
                  paddingBottom:
                    index === data.length - 1 ? heightScreen / 12 + 110 : 0,
                }}>
                <View
                  style={[
                    {
                      flexDirection: 'row',
                    },
                    isManufacturerSelected && {
                      paddingStart: 10,
                      paddingVertical: 5,
                      paddingEnd: 12,
                    },
                    !isManufacturerSelected && {padding: 12},
                  ]}>
                  {!isManufacturerSelected && (
                    <View style={{width: 25}}>
                      {firstLetter && (
                        <Text
                          style={{
                            color: color.onBackground_light,
                            fontSize: getFontSize(14),
                            fontFamily: POPPINS_MEDIUM,
                          }}>
                          {firstLetter}
                        </Text>
                      )}
                    </View>
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        fontSize: getFontSize(12),
                        fontFamily: POPPINS_REGULAR,
                        color: flag ? color.primary : color.onBackground,
                        textAlignVertical: 'center',
                      }}>
                      {isManufacturerSelected
                        ? (item as vehicleBrandsItemType).Name
                        : (item as vehicleLineUpsItemType).Lineup}
                    </Text>

                    {flag && (
                      <MaterialIcons
                        name="check"
                        size={16}
                        color={colors.primary}
                        style={{paddingTop: isManufacturerSelected ? 8 : 3}}
                      />
                    )}
                  </View>
                </View>

                <View
                  style={{
                    height: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: color.divider,
                    marginStart: isManufacturerSelected ? 50 : 35,
                  }}
                />
              </View>
            )}
            {isManufacturerSelected && (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                <View
                  style={{
                    width: widthScreen / 4 - 2,
                    marginBottom: 5,
                    padding: 10,
                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: flag ? color.primary : color.divider,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 5,
                    }}>
                    <MobikeImage
                      style={{
                        width: widthScreen / 4 - 30,
                        height: widthScreen / 4 - 30,
                      }}
                      imageID={(item as vehicleBrandsItemType).ID_Image}
                    />
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          //   color: flag ? colors.primary : 'black',
                          color: flag ? color.primary : color.onBackground,
                          textAlignVertical: 'center',
                          fontSize: getFontSize(12),
                          fontFamily: POPPINS_REGULAR,
                          textAlign: 'center',
                        }}>
                        {(item as vehicleBrandsItemType).Name}
                      </Text>
                      {flag && (
                        <MaterialIcons
                          name="check"
                          size={16}
                          color={colors.primary}
                          style={{marginLeft: 2}}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        </Pressable>
      );
    });
  };

  //Search bar
  const [searchData, setSearchData] = useState<
    vehicleBrandsType | vehicleLineUpsType
  >(dataManufacturer);
  const onTextChange = (text: string) => {
    if (text) {
      if (isManufacturerSelected) {
        const newData = dataManufacturer.filter(item => {
          const itemData = item.Name
            ? item.Name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setSearchData(newData);
      } else {
        const newData = dataLineupSelected.filter(item => {
          const itemData = item.Lineup
            ? item.Lineup.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setSearchData(newData);
      }
    } else {
      setSearchData(
        isManufacturerSelected ? dataManufacturer : dataLineupSelected,
      );
    }
  };

  const color = useSelector<RootState, ColorThemeProps>(state =>
    getThemeColor(state.theme),
  );
  return (
    <View style={{backgroundColor: color.surface, height: '100%'}}>
      <Text style={[styles.selectedLabel, {color: color.onBackground}]}>
        {isManufacturerSelected ? 'Choose brand' : 'Choose lineup'}
      </Text>
      <TextField
        label={'Search ' + (isManufacturerSelected ? 'brand' : 'lineup')}
        iconClass={Ionicons}
        iconName={'search-outline'}
        iconColor={color.primary}
        style={{width: '85%', alignSelf: 'center'}}
        onChangeText={text => onTextChange(text)}
      />
      <Animated.View
        layout={Layout.stiffness(100).damping(10).duration(300)}
        style={styles.selectedSectionContent}>
        {!isManufacturerSelected && (
          <ScrollView>{_renderContent(searchData)}</ScrollView>
        )}
        {isManufacturerSelected && (
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                paddingHorizontal: 4,
              }}>
              {_renderContent(searchData)}
            </View>
          </ScrollView>
        )}
      </Animated.View>
    </View>
  );
};

export default BrandBottomSheetContent;

const styles = StyleSheet.create({
  selectedSectionLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  selectedLabel: {
    marginStart: 15,
    fontSize: getFontSize(16),
    fontFamily: POPPINS_SEMI_BOLD,
    marginTop: 8,
    alignSelf: 'flex-start',
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginStart: 25,
  },
  selectedSectionItemText: {
    marginStart: 10,
    color: '#000',
    alignSelf: 'flex-end',
  },
});
