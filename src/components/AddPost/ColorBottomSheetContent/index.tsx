import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import colors, {ColorThemeProps} from '../../../assets/theme/colors';
import FontAwnesome from 'react-native-vector-icons/FontAwesome';
import Animated, {Layout} from 'react-native-reanimated';
import {TouchableWithoutFeedback} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Dimensions} from 'react-native';
import Store, {RootState} from '../../../redux/store';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {colorType} from '../../../redux/clientDatabase/color';
import {getThemeColor} from '../../../utils/getThemeColor';
import {getFontSize} from '../../../utils/fontSizeResponsive';
import {POPPINS_SEMI_BOLD} from '../../../assets/fonts';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

type ColorBottomSheetContentProps = {
  initialValue: {
    color?: number;
  };
  onSetColor: (color: number) => void;
  onCloseBottomSheet: () => void;
};

const ColorBottomSheetContent: React.FC<ColorBottomSheetContentProps> = ({
  initialValue,
  onSetColor,
  onCloseBottomSheet,
}) => {
  useEffect(() => {
    setSelectedColor(initialValue.color);
  }, [initialValue]);

  const dataColors = useSelector<RootState, colorType[]>(state => state.colors);

  const [selectedColor, setSelectedColor] = React.useState(initialValue.color);

  const onChoose = (item: colorType) => {
    onSetColor(item.ID);
    onCloseBottomSheet();
  };

  const _renderContent = (data: colorType[]) => {
    return data.map((item: colorType, index) => {
      let flag = false;

      if (item.ID == selectedColor) {
        flag = true;
      }

      return (
        <Pressable key={index} onPress={() => onChoose(item)}>
          <View style={{marginHorizontal: 4, position: 'relative'}}>
            <FontAwnesome
              name="circle"
              size={widthScreen / 8 - 4}
              color={'#' + item.Color_hex}
            />
            {flag && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialIcons
                  name="check"
                  size={widthScreen / 16}
                  color={colors.primary}
                />
              </View>
            )}
          </View>
        </Pressable>
      );
    });
  };

  const color = useSelector<RootState, ColorThemeProps>(state =>
    getThemeColor(state.theme),
  );

  return (
    <View style={{backgroundColor: color.surface, height: '100%'}}>
      <Text style={[styles.selectedLabel, {color: color.onBackground}]}>
        Choose color
      </Text>
      <Animated.View
        layout={Layout.stiffness(100).damping(10).duration(300)}
        style={styles.selectedSectionContent}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: 9,
          }}>
          {_renderContent(dataColors)}
        </View>
      </Animated.View>
    </View>
  );
};

export default ColorBottomSheetContent;

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
