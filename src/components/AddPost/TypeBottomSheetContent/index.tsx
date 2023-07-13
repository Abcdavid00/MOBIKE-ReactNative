import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import colors from '../../../assets/theme/colors';
import Animated, {Layout} from 'react-native-reanimated';
import {ScrollView} from 'react-native-gesture-handler';
import {TouchableWithoutFeedback} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Dimensions} from 'react-native';
import Store, {RootState} from '../../../redux/store';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {vehicleType} from '../../../redux/clientDatabase/vehicleType';
import {useTheme} from '@react-navigation/native';
import {getFontSize} from '../../../utils/fontSizeResponsive';
import {POPPINS_REGULAR, POPPINS_SEMI_BOLD} from '../../../assets/fonts';

type TypeBottomSheetContentProps = {
  initialValue: {
    type: number;
  };
  onSetType: (typeID: number) => void;
  onCloseBottomSheet: () => void;
};

const heightScreen = Dimensions.get('window').height;
const TypeBottomSheetContent: React.FC<TypeBottomSheetContentProps> = ({
  initialValue,
  onSetType,
  onCloseBottomSheet,
}) => {
  useEffect(() => {
    setSelectedType(initialValue.type);
  }, [initialValue]);

  const dataVehicleTypes = useSelector<RootState, vehicleType[]>(
    state => state.vehicleTypes,
  );

  const [selectedType, setSelectedType] = React.useState(initialValue.type);

  const onChoose = (item: vehicleType) => {
    onSetType(item.ID);
    onCloseBottomSheet();
  };

  const _renderContent = (data: vehicleType[]) => {
    return data.map((item, index) => {
      let flag = false;
      let firstLetter = '';

      if (item.ID == selectedType) {
        flag = true;
      }

      return (
        <TouchableWithoutFeedback key={index} onPress={() => onChoose(item)}>
          <View>
            <View
              style={[
                {
                  flexDirection: 'row',
                  padding: 12,
                  paddingLeft: 15,
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <Text
                  style={{
                    color: flag ? color.primary : color.onBackground,
                    textAlignVertical: 'center',
                    fontFamily: POPPINS_REGULAR,
                    fontSize: getFontSize(14),
                  }}>
                  {item.Type}
                </Text>

                {flag && (
                  <MaterialIcons
                    name="check"
                    size={16}
                    color={colors.primary}
                    style={{paddingTop: 3}}
                  />
                )}
              </View>
            </View>
            <View
              style={{
                height: 1,
                borderBottomWidth: 1,
                borderBottomColor: '#e9e9e9',
                marginStart: 10,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      );
    });
  };

  const color = useTheme().colors.customColors;

  return (
    <View style={{backgroundColor: color.surface, height: '100%'}}>
      <Text
        style={[
          styles.selectedLabel,
          {color: color.onBackground, fontSize: getFontSize(16)},
        ]}>
        Choose type
      </Text>
      <Animated.View
        layout={Layout.stiffness(100).damping(10).duration(300)}
        style={styles.selectedSectionContent}>
        <ScrollView>{_renderContent(dataVehicleTypes)}</ScrollView>
      </Animated.View>
    </View>
  );
};

export default TypeBottomSheetContent;

const styles = StyleSheet.create({
  selectedSectionLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  selectedLabel: {
    marginStart: 15,
    color: colors.black,
    fontFamily: POPPINS_SEMI_BOLD,
    alignSelf: 'flex-start',
    marginTop: 8,
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
