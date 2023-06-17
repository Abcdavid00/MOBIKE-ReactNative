import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import FilterPropFrameComponent from '../FilterPropFrame';
import Animated, {FadeInUp, Layout} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {ColorThemeProps} from '../../../assets/theme/colors';
import {getThemeColor} from '../../../utils/getThemeColor';
import {POPPINS_ITALIC, POPPINS_REGULAR} from '../../../assets/fonts';
import {getFontSize} from '../../../utils/fontSizeResponsive';
import {colorHexFromID, colorNameFromID} from '../../../utils/idToProperty';
import {setColor} from '../../../redux/slice/filterSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type FilterPropColorComponentProps = {
  onPress: () => void;
};

const FilterPropColorComponent: React.FC<FilterPropColorComponentProps> = ({
  onPress,
}) => {
  //Toogle show/hide filter options
  const [show, setShow] = useState(false);
  const durationLayout = 300;
  const onToggle = () => {
    setShow(prevState => !prevState);
  };

  const color = useSelector<RootState, ColorThemeProps>(state =>
    getThemeColor(state.theme),
  );

  const colorSelected = useSelector<RootState, number | undefined>(
    state => state.filter.color,
  );

  const dispatch = useDispatch();
  return (
    <FilterPropFrameComponent
      type={'Color'}
      animate={true}
      show={show}
      onToggle={onToggle}>
      <Animated.View
        entering={FadeInUp.duration(300).delay(100)}
        layout={Layout.stiffness(100).damping(10).duration(durationLayout)}>
        {colorSelected ? (
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
              paddingLeft: 10,
              alignSelf: 'center',
            }}>
            <MaterialCommunityIcons
              name={'circle'}
              size={20}
              color={colorHexFromID(colorSelected)}
            />
            <Text
              style={{
                color: color.onBackground_light,
                fontFamily: POPPINS_REGULAR,
                fontSize: getFontSize(14),
                marginStart: 8,
              }}>
              {colorNameFromID(colorSelected)}
            </Text>
            <Pressable
              onPress={() => dispatch(setColor(undefined))}
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

export default FilterPropColorComponent;

const styles = StyleSheet.create({
  chooseFrom: {
    fontSize: getFontSize(16),
    fontFamily: POPPINS_ITALIC,
    marginBottom: 5,
  },
});
